"use client";

import { useState } from "react";
import { CURRENCY } from "../../../lib/config";

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("الأسبوع الحالي");
  const filters = ["الأسبوع الحالي", "الشهر الحالي", "الربع السنوي"];

  const recentSales = [
    { id: "#DK-8924", branch: "الفرع الرئيسي - جدة", amount: "245.00", time: "منذ 4 دقائق", status: "مكتمل" },
    { id: "#DK-8923", branch: "فرع طريق الملك فهد", amount: "180.50", time: "منذ 11 دقيقة", status: "مكتمل" },
    { id: "#DK-8922", branch: "فرع النخيل مول", amount: "512.00", time: "منذ 24 دقيقة", status: "قيد التجهيز" },
    { id: "#DK-8921", branch: "فرع الصحافة", amount: "95.00", time: "منذ 36 دقيقة", status: "مكتمل" },
    { id: "#DK-8920", branch: "الفرع الرئيسي - الرياض", amount: "340.00", time: "منذ 48 دقيقة", status: "مكتمل" },
  ];

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Top Bar / Quick Filter Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md py-space-lg">
        <div className="flex flex-col">
          <span className="font-headline-lg text-headline-lg text-on-surface">نظرة عامة على الأداء</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">مؤشرات الإيرادات والمصروفات وحركة الفروع المباشرة</span>
        </div>
        <div className="flex items-center gap-space-xs bg-surface-container-low p-space-xs rounded-xl w-full sm:w-auto overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 sm:flex-initial text-center px-3 sm:px-space-md py-space-xs rounded-lg font-label-md text-xs sm:text-label-md transition-all whitespace-nowrap ${activeFilter === filter
                ? "bg-primary-container text-on-primary-container"
                : "text-on-surface-variant hover:text-on-surface"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 1. The 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
        {/* 1: المبيعات (Sales) */}
        <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow group">
          <div className="absolute top-0 right-0 left-0 h-1 bg-primary-container"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="font-body-md text-body-md text-on-surface-variant">المبيعات الإجمالية</span>
            <div className="w-10 h-10 rounded-lg bg-primary-container/15 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[22px]">trending_up</span>
            </div>
          </div>
          <div className="flex items-baseline gap-space-xs mb-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface tracking-tight">184,520</span>
            <span className="font-label-md text-label-md text-primary">{CURRENCY}</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center text-tertiary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              14.2%+
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant/70">مقارنة بالأسبوع السابق</span>
          </div>
        </div>

        {/* 2: المصروفات (Expenses) */}
        <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 left-0 h-1 bg-surface-container-highest"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="font-body-md text-body-md text-on-surface-variant">المصروفات التشغيلية</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
            </div>
          </div>
          <div className="flex items-baseline gap-space-xs mb-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface tracking-tight">42,300</span>
            <span className="font-label-md text-label-md text-on-surface-variant">{CURRENCY}</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">trending_flat</span>
              0.8%-
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant/70">ضمن الميزانية المحددة</span>
          </div>
        </div>

        {/* 3: المشتريات (Purchases) */}
        <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 left-0 h-1 bg-outline-variant"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="font-body-md text-body-md text-on-surface-variant">المشتريات والتوريد</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            </div>
          </div>
          <div className="flex items-baseline gap-space-xs mb-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface tracking-tight">58,140</span>
            <span className="font-label-md text-label-md text-on-surface-variant">{CURRENCY}</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center text-secondary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              3.1%-
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant/70">انخفاض تكلفة التوريد</span>
          </div>
        </div>

        {/* 4: المخزون (Inventory) */}
        <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 left-0 h-1 bg-secondary"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="font-body-md text-body-md text-on-surface-variant">قيمة المخزون الحالي</span>
            <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">warehouse</span>
            </div>
          </div>
          <div className="flex items-baseline gap-space-xs mb-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface tracking-tight">312,000</span>
            <span className="font-label-md text-label-md text-secondary">{CURRENCY}</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center text-secondary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              مستقر
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant/70">مستوى آمن لـ 18 يوماً</span>
          </div>
        </div>
      </div>

      {/* 2. Sales Trajectory Chart */}
      <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm mb-space-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <div className="w-2.5 h-6 bg-primary-container rounded-full"></div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">مسار مبيعات الأسبوع</h2>
              <span className="font-body-sm text-body-sm text-on-surface-variant">المبيعات اليومية الفعلية بمنافذ الفروع الرئيسية</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-3 rounded-full bg-primary-container"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">المبيعات الفعلية ({CURRENCY})</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">الهدف المجدول</span>
            </div>
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div className="w-full relative h-72">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 900 240">
            <defs>
              <linearGradient id="orangeAreaGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.32" />
                <stop offset="60%" stopColor="#ee9800" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="amberLineGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#ee9800" />
                <stop offset="100%" stopColor="#ffb95f" />
              </linearGradient>
            </defs>
            <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="900" y1="30" y2="30" />
            <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="900" y1="80" y2="80" />
            <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="900" y1="130" y2="130" />
            <line stroke="#222a3d" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="900" y1="180" y2="180" />

            <path d="M 50 120 Q 200 110, 340 100 T 630 85 T 850 70" fill="none" opacity="0.65" stroke="url(#amberLineGrad)" strokeDasharray="6 6" strokeWidth="2" />
            <path d="M 850 140 C 780 120, 750 110, 716 110 C 670 110, 620 135, 583 125 C 530 115, 490 75, 450 75 C 400 75, 360 105, 316 95 C 260 85, 220 40, 183 40 C 140 40, 90 55, 50 50 L 50 210 L 850 210 Z" fill="url(#orangeAreaGrad)" />
            <path d="M 850 140 C 780 120, 750 110, 716 110 C 670 110, 620 135, 583 125 C 530 115, 490 75, 450 75 C 400 75, 360 105, 316 95 C 260 85, 220 40, 183 40 C 140 40, 90 55, 50 50" fill="none" stroke="#f97316" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />

            <circle className="transition-all" cx="850" cy="140" fill="#f97316" r="4.5" />
            <circle cx="716" cy="110" fill="#f97316" r="4.5" />
            <circle cx="583" cy="125" fill="#f97316" r="4.5" />
            <circle cx="450" cy="75" fill="#f97316" r="4.5" />
            <circle cx="316" cy="95" fill="#f97316" r="4.5" />
            <circle cx="183" cy="40" fill="#f97316" fillOpacity="0.25" r="9" />
            <circle cx="183" cy="40" fill="#ffdbca" r="5" stroke="#f97316" strokeWidth="2.5" />
            <circle cx="50" cy="50" fill="#f97316" r="4.5" />
          </svg>
        </div>

        {/* RTL Days of Week Axis */}
        <div className="grid grid-cols-7 text-center pt-space-sm gap-0.5">
          <div className="flex flex-col items-center">
            <span className="text-[11px] sm:text-label-md font-semibold text-on-surface">الجمعة</span>
            <span className="text-[10px] sm:text-body-sm text-on-surface-variant">31.2k</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] sm:text-label-md font-semibold text-primary font-bold">الخميس</span>
            <span className="text-[10px] sm:text-body-sm text-primary font-semibold">34.8k</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] sm:text-label-md font-semibold text-on-surface">الأربعاء</span>
            <span className="text-[10px] sm:text-body-sm text-on-surface-variant">25.4k</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] sm:text-label-md font-semibold text-on-surface">الثلاثاء</span>
            <span className="text-[10px] sm:text-body-sm text-on-surface-variant">28.9k</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] sm:text-label-md font-semibold text-on-surface">الإثنين</span>
            <span className="text-[10px] sm:text-body-sm text-on-surface-variant">21.6k</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] sm:text-label-md font-semibold text-on-surface">الأحد</span>
            <span className="text-[10px] sm:text-body-sm text-on-surface-variant">23.8k</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] sm:text-label-md font-semibold text-on-surface">السبت</span>
            <span className="text-[10px] sm:text-body-sm text-on-surface-variant">18.8k</span>
          </div>
        </div>
      </div>

      {/* 3. Recent Sales Table */}
      <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-2.5 h-6 bg-secondary rounded-full"></div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">آخر المبيعات المكتملة</h2>
              <span className="font-body-sm text-body-sm text-on-surface-variant">العمليات المنفذة في الفروع خلال الساعات الأخيرة</span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-space-sm py-space-xs rounded-lg">
            تحديث فوري
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[550px]">
            <thead>
              <tr className="bg-surface-container-high text-on-surface-variant font-label-md text-label-md">
                <th className="py-space-sm px-space-md rounded-r-lg">رقم الطلب</th>
                <th className="py-space-sm px-space-md">الفرع</th>
                <th className="py-space-sm px-space-md text-left">المبلغ</th>
                <th className="py-space-sm px-space-md text-center">الوقت</th>
                <th className="py-space-sm px-space-md rounded-l-lg text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {recentSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-space-md px-space-md font-label-md text-label-md text-primary font-mono">{sale.id}</td>
                  <td className="py-space-md px-space-md font-body-md text-body-md text-on-surface">{sale.branch}</td>
                  <td className="py-space-md px-space-md font-label-lg text-label-lg text-on-surface text-left font-mono">
                    {sale.amount} <span className="font-body-sm text-body-sm text-on-surface-variant">{CURRENCY}</span>
                  </td>
                  <td className="py-space-md px-space-md font-body-sm text-body-sm text-on-surface-variant text-center">{sale.time}</td>
                  <td className="py-space-md px-space-md text-center">
                    {sale.status === "مكتمل" ? (
                      <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-tertiary-container/15 text-tertiary font-label-sm text-label-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                        مكتمل
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary-container/15 text-secondary font-label-sm text-label-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                        قيد التجهيز
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
