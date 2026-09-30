"use client";

import { useState } from "react";
import { CURRENCY } from "../../../lib/config";
import { useProfile } from "../../../hooks/useProfile";
import { supabase, api } from "../../../lib/api";
import { useCategories, useProducts, useProductVariants } from "../../../hooks/useData";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const { profile, isOwner, loading: profileLoading } = useProfile();
  const [activeTab, setActiveTab] = useState("meals");
  const [query, setQuery] = useState("");
  
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();
  const { data: variants = [], isLoading: variantsLoading, error: variantsError } = useProductVariants();
  
  const loading = categoriesLoading || productsLoading || variantsLoading;
  const error = categoriesError || productsError || variantsError;
  
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // Default form state
  const [formData, setFormData] = useState({
    name: "", sku: "", description: "", options: "", tag: "", price: "", cost: "0", is_active: true, has_variants: false
  });
  const [formVariants, setFormVariants] = useState([]);

  const mealsCategory = categories.find(c => c.name === 'الوجبات');
  const addonsCategory = categories.find(c => c.name === 'الإضافات');

  // Filter products by search and category
  const activeProducts = products.filter(p => p.name.toLowerCase().includes(query.trim().toLowerCase()));
  const mealsProducts = activeProducts.filter(p => p.category_id === mealsCategory?.id);
  const addonsProducts = activeProducts.filter(p => p.category_id === addonsCategory?.id);

  // For meals, we display one row per variant
  const mealsList = [];
  mealsProducts.forEach(prod => {
    if (prod.has_variants) {
      const prodVariants = variants.filter(v => v.product_id === prod.id).sort((a,b) => a.sort_order - b.sort_order);
      prodVariants.forEach(v => {
        mealsList.push({
          ...prod,
          variantId: v.id,
          variantVersion: v.version,
          variantLabel: v.label,
          variantPrice: v.price,
          variantActive: v.is_active
        });
      });
    } else {
      mealsList.push({
        ...prod,
        variantId: null,
        variantLabel: "-",
        variantPrice: prod.price,
        variantActive: prod.is_active
      });
    }
  });

  const handleOpenModal = (product = null, forceCategoryName = null) => {
    let catId = null;
    let hasVars = false;
    
    if (product) {
      catId = product.category_id;
      hasVars = product.has_variants;
    } else {
      // Create new
      if (forceCategoryName === 'الوجبات' || activeTab === 'meals') {
        catId = mealsCategory?.id;
        hasVars = true; // usually meals have variants
      } else {
        catId = addonsCategory?.id;
        hasVars = false;
      }
    }
    
    if (!catId) {
      alert("لم يتم العثور على التصنيف في قاعدة البيانات");
      return;
    }

    if (product) {
      setCurrentProduct(product);
      setFormData({
        category_id: product.category_id,
        name: product.name,
        sku: product.sku || "",
        description: product.description || "",
        options: product.options || "",
        tag: product.tag || "",
        price: product.price ? product.price.toString() : "",
        cost: product.cost ? product.cost.toString() : "0",
        is_active: product.is_active,
        has_variants: product.has_variants
      });
      if (product.has_variants) {
        const prodVars = variants.filter(v => v.product_id === product.id).map(v => ({
          ...v,
          price: v.price.toString(),
          cost: v.cost.toString()
        }));
        setFormVariants(prodVars);
      } else {
        setFormVariants([]);
      }
    } else {
      setCurrentProduct(null);
      setFormData({
        category_id: catId,
        name: "", sku: "", description: "", options: "", tag: "", price: "", cost: "0", is_active: true, has_variants: hasVars
      });
      setFormVariants(hasVars ? [{ id: null, label: "", price: "", cost: "0", sort_order: 0, is_active: true }] : []);
    }
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (isSaving) return;
    if (window.confirm("هناك تغييرات لم يتم حفظها. هل أنت متأكد أنك تريد الإغلاق؟")) {
      setShowModal(false);
    }
  };

  const addVariantRow = () => {
    setFormVariants([...formVariants, { id: null, label: "", price: "", cost: "0", sort_order: formVariants.length, is_active: true }]);
  };
  
  const removeVariantRow = (index) => {
    setFormVariants(formVariants.filter((_, i) => i !== index));
  };
  
  const updateVariantRow = (index, field, value) => {
    const updated = [...formVariants];
    updated[index][field] = value;
    setFormVariants(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      
      // Basic validation
      const numRegex = /^\d{1,10}(\.\d{1,2})?$/;
      if (!formData.has_variants) {
        if (!numRegex.test(formData.price)) throw new Error("سعر المنتج غير صحيح");
      } else {
        if (formVariants.length === 0) throw new Error("يجب إضافة وزن واحد على الأقل");
        for (const v of formVariants) {
          if (!v.label.trim()) throw new Error("اسم الوزن مطلوب");
          if (!numRegex.test(v.price)) throw new Error("سعر الوزن غير صحيح");
        }
      }

      const payload = {
        id: currentProduct ? currentProduct.id : null,
        version: currentProduct ? currentProduct.version : undefined,
        category_id: formData.category_id,
        name: formData.name,
        sku: formData.sku || null,
        description: formData.description || null,
        options: formData.options || null,
        tag: formData.tag || null,
        is_active: formData.is_active,
        has_variants: formData.has_variants,
        price: formData.has_variants ? null : parseFloat(formData.price),
        cost: parseFloat(formData.cost || 0),
        variants: formData.has_variants ? formVariants.map(v => ({
          id: v.id,
          label: v.label,
          price: parseFloat(v.price),
          cost: parseFloat(v.cost || 0),
          sort_order: v.sort_order,
          is_active: v.is_active
        })) : []
      };

      await api.rpc('save_product', { p: payload });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product_variants"] });
      setShowModal(false);
    } catch (err) {
      alert(err.message || "حدث خطأ أثناء الحفظ");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVariant = async (variantId, variantVersion) => {
    if (!window.confirm("سيتم نقل هذا الوزن للأرشيف. هل أنت متأكد؟")) return;
    try {
      await api.rpc("soft_delete_variant", { p_id: variantId, p_version: variantVersion });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product_variants"] });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm("سيتم نقل المنتج وكل الأوزان المرتبطة به للأرشيف. هل أنت متأكد؟")) return;
    try {
      await api.rpc("soft_delete_product", { p_id: product.id, p_version: product.version });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product_variants"] });
    } catch (err) {
      alert(err.message);
    }
  };

  if (profileLoading || (loading && products.length === 0 && categories.length === 0)) {
    return <div className="p-8 text-center text-on-surface">جاري التحميل...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full pb-space-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col">
            <h1 className="font-headline-xl text-headline-xl text-on-surface">المنتجات</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">إدارة وتحديث قائمة الأطباق الغذائية والوجبات الصحية</p>
          </div>
          {isOwner && (
            <button onClick={() => handleOpenModal()} className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-primary-container text-on-primary-container font-label-lg text-label-lg rounded-lg shadow-md hover:opacity-95 transition-all cursor-pointer" type="button">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>إضافة منتج +</span>
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 bg-error-container text-error p-4 rounded-lg">
            {error.message || error}
          </div>
        )}

        <div className="flex items-center gap-space-xs border-b border-surface-container-highest mb-space-lg overflow-x-auto no-scrollbar">
          <button 
            type="button"
            onClick={() => setActiveTab("meals")}
            className={activeTab === "meals" 
              ? "px-space-lg py-space-sm font-label-lg text-label-lg transition-colors border-b-2 border-primary-container text-primary-container flex items-center gap-space-xs cursor-pointer" 
              : "px-space-lg py-space-sm font-label-lg text-label-lg transition-colors border-b-2 border-transparent text-on-surface-variant hover:text-on-surface flex items-center gap-space-xs cursor-pointer"}
          >
            <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
            <span>الوجبات</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("addons")}
            className={activeTab === "addons" 
              ? "px-space-lg py-space-sm font-label-lg text-label-lg transition-colors border-b-2 border-primary-container text-primary-container flex items-center gap-space-xs cursor-pointer" 
              : "px-space-lg py-space-sm font-label-lg text-label-lg transition-colors border-b-2 border-transparent text-on-surface-variant hover:text-on-surface flex items-center gap-space-xs cursor-pointer"}
          >
            <span className="material-symbols-outlined text-[18px]">fastfood</span>
            <span>الإضافات</span>
          </button>
        </div>

        <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm mb-space-lg flex flex-col md:flex-row gap-space-md items-center justify-between">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 right-0 pr-space-md flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input 
              className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md pr-10 pl-space-md py-space-sm rounded-lg focus:outline-none focus:bg-surface-container-highest transition-colors placeholder:text-on-surface-variant" 
              placeholder="بحث عن منتج..." 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {loading && products.length === 0 ? (
          <div className="p-8 text-center text-on-surface">جاري التحميل...</div>
        ) : (
          <>
            {activeTab === "meals" && (
              <div className="flex flex-col gap-space-lg">
                <div className="bg-surface-container-low rounded-xl shadow-sm overflow-hidden">
                  <div className="px-space-lg py-space-md bg-surface-container-high/60 border-b border-surface-container-highest">
                    <h3 className="font-label-lg text-label-lg text-on-surface">جدول فئات أوزان البروتين وأسعار الوجبة</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right min-w-[650px]">
                      <thead>
                        <tr className="bg-surface-container-high/30">
                          <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">المنتج</th>
                          <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">خيارات البروتين المتاحة</th>
                          <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">وزن البروتين</th>
                          <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-left" scope="col">السعر</th>
                          <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-center" scope="col">الحالة</th>
                          {isOwner && <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-left" scope="col">الإجراءات</th>}
                        </tr>
                      </thead>
                      <tbody className="font-body-md text-body-md text-on-surface">
                        {mealsList.length === 0 ? (
                          <tr><td colSpan={isOwner ? 6 : 5} className="py-8 text-center">لا يوجد بيانات</td></tr>
                        ) : mealsList.map((meal, index) => (
                          <tr 
                            key={`${meal.id}-${meal.variantId || 'base'}`} 
                            className={`meal-row hover:bg-surface-container-high/30 transition-colors ${index === mealsList.length - 1 ? "" : "border-b border-surface-container-high/40"}`}
                          >
                            <td className="py-space-md px-space-lg font-semibold text-on-surface">{meal.name}</td>
                            <td className="py-space-md px-space-lg text-on-surface-variant">{meal.options || "-"}</td>
                            <td className="py-space-md px-space-lg">
                              <span className="px-space-sm py-0.5 rounded-md bg-surface-container-highest text-on-surface font-label-md">{meal.variantLabel}</span>
                            </td>
                            <td className="py-space-md px-space-lg text-left font-headline-sm text-body-md text-primary">
                              {Number(meal.variantPrice).toFixed(2)} <span className="font-body-sm text-body-sm text-on-surface-variant">{CURRENCY}</span>
                            </td>
                            <td className="py-space-md px-space-lg text-center">
                              <span className={`inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full ${meal.variantActive ? "bg-tertiary-container/15 text-tertiary" : "bg-error-container/20 text-error"} font-label-sm text-label-sm`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${meal.variantActive ? "bg-tertiary" : "bg-error"}`}></span>{meal.variantActive ? "متوفر" : "غير متوفر"}
                              </span>
                            </td>
                            {isOwner && (
                              <td className="py-space-md px-space-lg text-left">
                                <div className="inline-flex items-center gap-space-sm">
                                  <button onClick={() => handleOpenModal(products.find(p => p.id === meal.id))} className="px-space-sm py-1 rounded-md text-secondary hover:bg-surface-container-highest transition-colors font-label-md text-label-md flex items-center gap-1 cursor-pointer" type="button">
                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                    <span>تعديل المنتج</span>
                                  </button>
                                  {meal.variantId ? (
                                    <button onClick={() => handleDeleteVariant(meal.variantId, meal.variantVersion)} className="px-space-sm py-1 rounded-md text-error hover:bg-surface-container-highest transition-colors font-label-md text-label-md flex items-center gap-1 cursor-pointer" type="button">
                                      <span className="material-symbols-outlined text-[16px]">delete</span>
                                      <span>حذف الوزن</span>
                                    </button>
                                  ) : (
                                    <button onClick={() => handleDeleteProduct(meal)} className="px-space-sm py-1 rounded-md text-error hover:bg-surface-container-highest transition-colors font-label-md text-label-md flex items-center gap-1 cursor-pointer" type="button">
                                      <span className="material-symbols-outlined text-[16px]">delete</span>
                                      <span>حذف</span>
                                    </button>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addons" && (
              <div>
                <div className="bg-surface-container-low rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-right min-w-[600px]">
                      <thead>
                        <tr className="bg-surface-container-high/60">
                          <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">اسم المنتج</th>
                          <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">التصنيف / الوزن</th>
                          <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-left" scope="col">السعر</th>
                          <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-center" scope="col">الحالة</th>
                          {isOwner && <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-left" scope="col">الإجراءات</th>}
                        </tr>
                      </thead>
                      <tbody className="font-body-md text-body-md text-on-surface">
                        {addonsProducts.length === 0 ? (
                          <tr><td colSpan={isOwner ? 5 : 4} className="py-8 text-center">لا يوجد بيانات</td></tr>
                        ) : addonsProducts.map((addon, index) => (
                          <tr 
                            key={addon.id} 
                            className={`addon-row hover:bg-surface-container-high/30 transition-colors ${index === addonsProducts.length - 1 ? "" : "border-b border-surface-container-high/40"}`}
                          >
                            <td className="py-space-md px-space-lg font-semibold text-on-surface">{addon.name}</td>
                            <td className="py-space-md px-space-lg">
                              <span className="inline-flex items-center px-space-sm py-0.5 rounded-md bg-surface-container-highest text-on-surface-variant font-label-md text-label-md">{addon.tag || "-"}</span>
                            </td>
                            <td className="py-space-md px-space-lg text-left font-headline-sm text-body-md text-primary">
                              {Number(addon.price).toFixed(2)} <span className="font-body-sm text-body-sm text-on-surface-variant">{CURRENCY}</span>
                            </td>
                            <td className="py-space-md px-space-lg text-center">
                              <span className={`inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full ${addon.is_active ? "bg-tertiary-container/15 text-tertiary" : "bg-error-container/20 text-error"} font-label-sm text-label-sm`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${addon.is_active ? "bg-tertiary" : "bg-error"}`}></span>{addon.is_active ? "متوفر" : "غير متوفر"}
                              </span>
                            </td>
                            {isOwner && (
                              <td className="py-space-md px-space-lg text-left">
                                <div className="inline-flex items-center gap-space-sm">
                                  <button onClick={() => handleOpenModal(addon)} className="px-space-sm py-1 rounded-md text-secondary hover:bg-surface-container-highest transition-colors font-label-md text-label-md flex items-center gap-1 cursor-pointer" type="button">
                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                    <span>تعديل</span>
                                  </button>
                                  <button onClick={() => handleDeleteProduct(addon)} className="px-space-sm py-1 rounded-md text-error hover:bg-surface-container-highest transition-colors font-label-md text-label-md flex items-center gap-1 cursor-pointer" type="button">
                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                    <span>حذف</span>
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-space-lg border-b border-surface-container-highest flex items-center justify-between">
              <h2 className="font-headline-sm text-on-surface">{currentProduct ? "تعديل منتج" : "إضافة منتج"}</h2>
              <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-md">
              <div className="grid grid-cols-2 gap-space-md">
                <div>
                  <label className="block text-label-md text-on-surface mb-2">الاسم *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-surface-container-highest rounded-lg bg-surface-container-high focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-label-md text-on-surface mb-2">التصنيف</label>
                  <select 
                    value={formData.category_id} 
                    onChange={e => setFormData({...formData, category_id: e.target.value})} 
                    className="w-full p-2 border border-surface-container-highest rounded-lg bg-surface-container-high focus:outline-none focus:border-primary"
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-label-md text-on-surface mb-2">وصف مختصر (خيارات / تفاصيل)</label>
                <input type="text" value={formData.options} onChange={e => setFormData({...formData, options: e.target.value})} placeholder="مثال: دجاج، لحم، سمك" className="w-full p-2 border border-surface-container-highest rounded-lg bg-surface-container-high focus:outline-none focus:border-primary" />
              </div>

              <div className="flex gap-4 mt-2 mb-4 border-b border-surface-container-highest pb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="rounded text-primary focus:ring-primary h-4 w-4" />
                  <span className="text-body-md text-on-surface">نشط ومتاح للبيع</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.has_variants} onChange={e => {
                    const hasVars = e.target.checked;
                    setFormData({...formData, has_variants: hasVars});
                    if (hasVars && formVariants.length === 0) setFormVariants([{ id: null, label: "", price: "", cost: "0", sort_order: 0, is_active: true }]);
                  }} className="rounded text-primary focus:ring-primary h-4 w-4" />
                  <span className="text-body-md text-on-surface">له أوزان/أحجام مختلفة</span>
                </label>
              </div>

              {!formData.has_variants ? (
                <div className="grid grid-cols-2 gap-space-md bg-surface-container p-4 rounded-lg">
                  <div>
                    <label className="block text-label-md text-on-surface mb-2">السعر *</label>
                    <input required pattern="^\d{1,10}(\.\d{1,2})?$" type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-2 border border-surface-container-highest rounded-lg bg-surface-container-high focus:outline-none focus:border-primary dir-ltr text-right" />
                  </div>
                  <div>
                    <label className="block text-label-md text-on-surface mb-2">وسم (Tag)</label>
                    <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full p-2 border border-surface-container-highest rounded-lg bg-surface-container-high focus:outline-none focus:border-primary" />
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container p-4 rounded-lg flex flex-col gap-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-label-md text-on-surface font-bold">الأوزان والأسعار *</label>
                    <button type="button" onClick={addVariantRow} className="text-primary text-sm font-bold flex items-center gap-1 cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">add</span> إضافة وزن
                    </button>
                  </div>
                  {formVariants.map((v, i) => (
                    <div key={i} className="flex gap-2 items-center bg-surface-container-high p-2 rounded-md">
                      <input required placeholder="الوزن (مثال 100 جم)" value={v.label} onChange={e => updateVariantRow(i, 'label', e.target.value)} className="flex-1 p-1 border border-surface-container-highest rounded bg-surface focus:outline-none" />
                      <input required pattern="^\d{1,10}(\.\d{1,2})?$" placeholder="السعر" value={v.price} onChange={e => updateVariantRow(i, 'price', e.target.value)} className="w-24 p-1 border border-surface-container-highest rounded bg-surface focus:outline-none dir-ltr text-right" />
                      <label className="flex items-center gap-1 cursor-pointer text-xs mr-2">
                        <input type="checkbox" checked={v.is_active} onChange={e => updateVariantRow(i, 'is_active', e.target.checked)} className="rounded" /> نشط
                      </label>
                      <button type="button" onClick={() => removeVariantRow(i)} className="text-error mr-2 cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  ))}
                  {formVariants.length === 0 && <span className="text-error text-sm">يجب إضافة وزن واحد على الأقل</span>}
                </div>
              )}
            </form>
            
            <div className="p-space-lg border-t border-surface-container-highest flex items-center justify-end gap-space-sm bg-surface-container">
              <button type="button" onClick={handleCloseModal} disabled={isSaving} className="px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container-highest rounded-lg cursor-pointer">
                إلغاء
              </button>
              <button onClick={handleSave} disabled={isSaving || !formData.name.trim()} className="px-space-md py-space-sm bg-primary text-on-primary rounded-lg hover:bg-inverse-primary disabled:opacity-50 cursor-pointer">
                {isSaving ? "جاري الحفظ..." : "حفظ المنتج"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
