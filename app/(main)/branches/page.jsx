"use client";

import { useState } from "react";
import { useProfile } from "../../../hooks/useProfile";
import { supabase, api } from "../../../lib/api";
import { useBranches } from "../../../hooks/useData";
import { useQueryClient } from "@tanstack/react-query";

export default function BranchesPage() {
  const queryClient = useQueryClient();
  const { profile, isOwner, loading: profileLoading } = useProfile();
  
  const { data: branches = [], isLoading: loading, error } = useBranches();
  
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: "", code: "", phone: ""
  });

  const handleOpenModal = (branch = null) => {
    if (branch) {
      setCurrentBranch(branch);
      setFormData({
        name: branch.name, code: branch.code || "", phone: branch.phone || ""
      });
    } else {
      setCurrentBranch(null);
      setFormData({
        name: "", code: "", phone: ""
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (isSaving) return;
    
    const isDirty = currentBranch 
      ? Object.keys(formData).some(k => formData[k] !== (currentBranch[k] === null && formData[k] === "" ? "" : currentBranch[k]))
      : formData.name !== "" || formData.code !== "";
      
    if (isDirty) {
      if (!window.confirm("هناك تغييرات لم يتم حفظها. هل أنت متأكد أنك تريد الإغلاق؟")) {
        return;
      }
    }
    setShowModal(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      alert("الاسم والكود مطلوبين");
      return;
    }
    try {
      setIsSaving(true);
      
      const payload = { 
        name: formData.name.trim(),
        code: formData.code.trim(),
        phone: formData.phone.trim() || null
      };
      
      if (currentBranch) {
        const { error: updateError } = await supabase.from("branches")
          .update(payload)
          .eq("id", currentBranch.id)
          .eq("version", currentBranch.version)
          .is("deleted_at", null);
          
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("branches").insert([payload]);
        if (insertError) throw insertError;
      }
      
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      setShowModal(false);
    } catch (err) {
      if (err.code === '23505') {
        alert("هذا الكود مستخدم بالفعل لفرع آخر");
      } else {
        alert(err.message || "حدث خطأ أثناء الحفظ");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (branch) => {
    if (!window.confirm("سيتم نقل الفرع للأرشيف ولن تُفقد بياناته")) return;
    
    try {
      await api.rpc("soft_delete_branch", { p_id: branch.id, p_version: branch.version });
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    } catch (err) {
      alert(err.message);
    }
  };

  if (profileLoading || (loading && branches.length === 0)) {
    return <div className="p-8 text-center text-on-surface">جاري التحميل...</div>;
  }

  return (
    <div className="flex flex-col w-full py-space-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col gap-space-xs">
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">الفروع</h1>
          <span className="font-body-sm text-body-sm text-on-surface-variant">إدارة مواقع ومنافذ تقديم وجبات دايت كينج</span>
        </div>
        {isOwner && (
          <button onClick={() => handleOpenModal()} className="inline-flex items-center justify-center gap-space-xs bg-primary-container hover:bg-inverse-primary text-on-primary font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-colors shadow-sm cursor-pointer w-full sm:w-auto" type="button">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>إضافة فرع</span>
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 bg-error-container text-error p-4 rounded-lg">
          {error.message || error}
        </div>
      )}

      <div className="w-full bg-surface-container rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-surface-container-high">
                <th className="py-space-md px-space-lg font-label-md text-label-md text-on-surface-variant font-bold" scope="col">الكود</th>
                <th className="py-space-md px-space-lg font-label-md text-label-md text-on-surface-variant font-bold" scope="col">اسم الفرع</th>
                <th className="py-space-md px-space-lg font-label-md text-label-md text-on-surface-variant font-bold" scope="col">رقم الهاتف</th>
                {isOwner && <th className="py-space-md px-space-lg font-label-md text-label-md text-on-surface-variant font-bold text-center" scope="col">الإجراءات</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest/20 font-body-md text-body-md text-on-surface">
              {branches.length === 0 ? (
                <tr>
                  <td colSpan={isOwner ? 4 : 3} className="py-8 text-center text-on-surface-variant">
                    لا توجد فروع بعد
                  </td>
                </tr>
              ) : (
                branches.map(branch => (
                  <tr key={branch.id} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="py-space-md px-space-lg font-body-md text-body-md text-on-surface-variant">{branch.code}</td>
                    <td className="py-space-md px-space-lg">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span className="font-body-lg text-body-lg font-semibold text-on-surface">{branch.name}</span>
                      </div>
                    </td>
                    <td className="py-space-md px-space-lg font-body-md text-body-md text-on-surface dir-ltr text-right">{branch.phone || "-"}</td>
                    {isOwner && (
                      <td className="py-space-md px-space-lg text-center">
                        <div className="inline-flex items-center justify-center gap-space-sm">
                          <button onClick={() => handleOpenModal(branch)} className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md cursor-pointer" type="button">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            <span>تعديل</span>
                          </button>
                          <span className="text-surface-container-highest">|</span>
                          <button onClick={() => handleDelete(branch)} className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-error transition-colors font-label-md text-label-md cursor-pointer" type="button">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            <span>حذف</span>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-space-lg border-b border-surface-container-highest flex items-center justify-between">
              <h2 className="font-headline-sm text-on-surface">{currentBranch ? "تعديل فرع" : "إضافة فرع"}</h2>
              <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-md">
              <div>
                <label className="block text-label-md text-on-surface mb-2">اسم الفرع *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-surface-container-highest rounded-lg bg-surface-container-high focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">كود الفرع *</label>
                <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full p-2 border border-surface-container-highest rounded-lg bg-surface-container-high focus:outline-none focus:border-primary dir-ltr text-right" />
              </div>
              <div>
                <label className="block text-label-md text-on-surface mb-2">الهاتف</label>
                <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border border-surface-container-highest rounded-lg bg-surface-container-high focus:outline-none focus:border-primary dir-ltr text-right" />
              </div>
            </form>
            
            <div className="p-space-lg border-t border-surface-container-highest flex items-center justify-end gap-space-sm bg-surface-container">
              <button type="button" onClick={handleCloseModal} disabled={isSaving} className="px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container-highest rounded-lg cursor-pointer">
                إلغاء
              </button>
              <button onClick={handleSave} disabled={isSaving || !formData.name.trim() || !formData.code.trim()} className="px-space-md py-space-sm bg-primary text-on-primary rounded-lg hover:bg-inverse-primary disabled:opacity-50 cursor-pointer">
                {isSaving ? "جاري الحفظ..." : "حفظ الفرع"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
