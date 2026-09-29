"use client";

import { useState } from "react";
import { CURRENCY } from "../../../lib/config";

const MEALS = [
  { id: 1, name: "الوجبة الصحية المتكاملة", options: "دجاج، لحم، سمك", weight: "100 جم", price: "19.00" },
  { id: 2, name: "الوجبة الصحية المتكاملة", options: "دجاج، لحم، سمك", weight: "150 جم", price: "22.00" },
  { id: 3, name: "الوجبة الصحية المتكاملة", options: "دجاج، لحم، سمك", weight: "200 جم", price: "25.00" },
  { id: 4, name: "الوجبة الصحية المتكاملة", options: "دجاج، لحم، سمك", weight: "250 جم", price: "28.00" },
  { id: 5, name: "الوجبة الصحية المتكاملة", options: "دجاج، لحم، سمك", weight: "300 جم", price: "44.00" },
];

const ADDONS = [
  { id: 1, name: "الساندوتشات", tag: "الوزن: 90-120 جم", price: "15.00" },
  { id: 2, name: "السلطة", tag: "الوزن: 100-160 جم", price: "5.00" },
  { id: 3, name: "السناك", tag: "الوزن: 90-120 جم", price: "10.00" },
  { id: 4, name: "آيس تي", tag: "مشروبات", price: "5.00" },
  { id: 5, name: "كينزا", tag: "مشروبات", price: "2.00" },
  { id: 6, name: "البيبسي", tag: "مشروبات", price: "3.00" },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("meals");
  const [query, setQuery] = useState("");

  const filteredMeals = MEALS.filter(meal => meal.name.toLowerCase().includes(query.trim().toLowerCase()));
  const filteredAddons = ADDONS.filter(addon => addon.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="flex flex-col w-full">
      <div className="w-full pb-space-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md mb-space-lg">
          <div className="flex flex-col">
            <h1 className="font-headline-xl text-headline-xl text-on-surface">المنتجات</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">إدارة وتحديث قائمة الأطباق الغذائية والوجبات الصحية</p>
          </div>
          <button className="inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-primary-container text-on-primary-container font-label-lg text-label-lg rounded-lg shadow-md hover:opacity-95 transition-all" type="button">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>إضافة منتج +</span>
          </button>
        </div>

        <div className="flex items-center gap-space-xs border-b border-surface-container-highest mb-space-lg">
          <button 
            type="button"
            onClick={() => setActiveTab("meals")}
            className={activeTab === "meals" 
              ? "px-space-lg py-space-sm font-label-lg text-label-lg transition-colors border-b-2 border-primary-container text-primary-container flex items-center gap-space-xs" 
              : "px-space-lg py-space-sm font-label-lg text-label-lg transition-colors border-b-2 border-transparent text-on-surface-variant hover:text-on-surface flex items-center gap-space-xs"}
          >
            <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
            <span>الوجبات</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("addons")}
            className={activeTab === "addons" 
              ? "px-space-lg py-space-sm font-label-lg text-label-lg transition-colors border-b-2 border-primary-container text-primary-container flex items-center gap-space-xs" 
              : "px-space-lg py-space-sm font-label-lg text-label-lg transition-colors border-b-2 border-transparent text-on-surface-variant hover:text-on-surface flex items-center gap-space-xs"}
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

        {activeTab === "meals" && (
          <div className="flex flex-col gap-space-lg">
            <div className="bg-surface-container-low rounded-xl shadow-sm overflow-hidden">
              <div className="px-space-lg py-space-md bg-surface-container-high/60 border-b border-surface-container-highest">
                <h3 className="font-label-lg text-label-lg text-on-surface">جدول فئات أوزان البروتين وأسعار الوجبة</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="bg-surface-container-high/30">
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">المنتج</th>
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">خيارات البروتين المتاحة</th>
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">وزن البروتين</th>
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-left" scope="col">السعر</th>
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-center" scope="col">الحالة</th>
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-left" scope="col">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md text-on-surface">
                    {filteredMeals.map((meal, index) => (
                      <tr 
                        key={meal.id} 
                        className={`meal-row hover:bg-surface-container-high/30 transition-colors ${index === filteredMeals.length - 1 ? "" : "border-b border-surface-container-high/40"}`}
                      >
                        <td className="py-space-md px-space-lg font-semibold text-on-surface">{meal.name}</td>
                        <td className="py-space-md px-space-lg text-on-surface-variant">{meal.options}</td>
                        <td className="py-space-md px-space-lg">
                          <span className="px-space-sm py-0.5 rounded-md bg-surface-container-highest text-on-surface font-label-md">{meal.weight}</span>
                        </td>
                        <td className="py-space-md px-space-lg text-left font-headline-sm text-body-md text-primary">
                          {meal.price} <span className="font-body-sm text-body-sm text-on-surface-variant">{CURRENCY}</span>
                        </td>
                        <td className="py-space-md px-space-lg text-center">
                          <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-tertiary-container/15 text-tertiary font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>متوفر
                          </span>
                        </td>
                        <td className="py-space-md px-space-lg text-left">
                          <div className="inline-flex items-center gap-space-sm">
                            <button className="px-space-sm py-1 rounded-md text-secondary hover:bg-surface-container-highest transition-colors font-label-md text-label-md flex items-center gap-1" type="button">
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                              <span>تعديل</span>
                            </button>
                            <button className="px-space-sm py-1 rounded-md text-error hover:bg-surface-container-highest transition-colors font-label-md text-label-md flex items-center gap-1" type="button">
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                              <span>حذف</span>
                            </button>
                          </div>
                        </td>
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
                <table className="w-full text-right">
                  <thead>
                    <tr className="bg-surface-container-high/60">
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">اسم المنتج</th>
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant" scope="col">التصنيف / الوزن</th>
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-left" scope="col">السعر</th>
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-center" scope="col">الحالة</th>
                      <th className="py-space-md px-space-lg font-headline-sm text-label-md text-on-surface-variant text-left" scope="col">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md text-on-surface">
                    {filteredAddons.map((addon, index) => (
                      <tr 
                        key={addon.id} 
                        className={`addon-row hover:bg-surface-container-high/30 transition-colors ${index === filteredAddons.length - 1 ? "" : "border-b border-surface-container-high/40"}`}
                      >
                        <td className="py-space-md px-space-lg font-semibold text-on-surface">{addon.name}</td>
                        <td className="py-space-md px-space-lg">
                          <span className="inline-flex items-center px-space-sm py-0.5 rounded-md bg-surface-container-highest text-on-surface-variant font-label-md text-label-md">{addon.tag}</span>
                        </td>
                        <td className="py-space-md px-space-lg text-left font-headline-sm text-body-md text-primary">
                          {addon.price} <span className="font-body-sm text-body-sm text-on-surface-variant">{CURRENCY}</span>
                        </td>
                        <td className="py-space-md px-space-lg text-center">
                          <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-tertiary-container/15 text-tertiary font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>متوفر
                          </span>
                        </td>
                        <td className="py-space-md px-space-lg text-left">
                          <div className="inline-flex items-center gap-space-sm">
                            <button className="px-space-sm py-1 rounded-md text-secondary hover:bg-surface-container-highest transition-colors font-label-md text-label-md flex items-center gap-1" type="button">
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                              <span>تعديل</span>
                            </button>
                            <button className="px-space-sm py-1 rounded-md text-error hover:bg-surface-container-highest transition-colors font-label-md text-label-md flex items-center gap-1" type="button">
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                              <span>حذف</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
