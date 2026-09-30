"use client";
import { useState } from "react";

const TAB_ON = "flex-1 sm:flex-initial text-center px-2.5 sm:px-space-md py-1.5 rounded-md font-label-sm text-xs sm:text-label-sm bg-primary-container text-on-primary font-bold shadow-sm whitespace-nowrap";
const TAB_OFF = "flex-1 sm:flex-initial text-center px-2.5 sm:px-space-md py-1.5 rounded-md font-label-sm text-xs sm:text-label-sm text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap";

const BAR_NAME_HI = "w-24 sm:w-28 truncate font-label-sm text-xs sm:text-label-sm text-on-surface shrink-0";
const BAR_NAME_LO = "w-24 sm:w-28 truncate font-label-sm text-xs sm:text-label-sm text-on-surface-variant shrink-0";
const BAR_TRACK_HI = "flex-1 h-3 rounded-full bg-surface-container-highest overflow-hidden min-w-[50px]";
const BAR_TRACK_LO = "flex-1 h-2 rounded-full bg-surface-container-highest overflow-hidden min-w-[50px]";
const BAR_AMT_HI = "font-label-sm text-xs sm:text-label-sm font-bold text-on-surface text-left min-w-[65px] sm:min-w-[70px] shrink-0";
const BAR_AMT_LO = "font-label-sm text-xs sm:text-label-sm text-on-surface-variant text-left min-w-[65px] sm:min-w-[70px] shrink-0";

const SALES_BARS = [
  { name: "التحلية (الرياض)", nameClass: BAR_NAME_HI, trackClass: BAR_TRACK_HI, fill: "h-full bg-primary-container rounded-full", width: "100%", amountClass: BAR_AMT_HI, amount: "28,450 ر.س" },
  { name: "العليا (الرياض)", nameClass: BAR_NAME_HI, trackClass: BAR_TRACK_HI, fill: "h-full bg-primary-container/90 rounded-full", width: "86%", amountClass: BAR_AMT_HI, amount: "24,500 ر.س" },
  { name: "الياسمين (الرياض)", nameClass: BAR_NAME_HI, trackClass: BAR_TRACK_HI, fill: "h-full bg-secondary-container rounded-full", width: "76%", amountClass: BAR_AMT_HI, amount: "21,650 ر.س" },
  { name: "طريق الملك (جدة)", nameClass: BAR_NAME_HI, trackClass: BAR_TRACK_HI, fill: "h-full bg-secondary-container/90 rounded-full", width: "67%", amountClass: BAR_AMT_HI, amount: "19,100 ر.س" },
  { name: "الروضة (الرياض)", nameClass: BAR_NAME_LO, trackClass: BAR_TRACK_LO, fill: "h-full bg-secondary rounded-full", width: "58%", amountClass: BAR_AMT_LO, amount: "16,400 ر.س" },
  { name: "الشاطئ (جدة)", nameClass: BAR_NAME_LO, trackClass: BAR_TRACK_LO, fill: "h-full bg-secondary/80 rounded-full", width: "49%", amountClass: BAR_AMT_LO, amount: "13,950 ر.س" },
  { name: "الخبر", nameClass: BAR_NAME_LO, trackClass: BAR_TRACK_LO, fill: "h-full bg-secondary/70 rounded-full", width: "41%", amountClass: BAR_AMT_LO, amount: "11,800 ر.س" },
  { name: "العزيزية (مكة)", nameClass: BAR_NAME_LO, trackClass: BAR_TRACK_LO, fill: "h-full bg-secondary/60 rounded-full", width: "27%", amountClass: BAR_AMT_LO, amount: "7,600 ر.س" },
  { name: "سلطانة (المدينة)", nameClass: BAR_NAME_LO, trackClass: BAR_TRACK_LO, fill: "h-full bg-secondary/50 rounded-full", width: "19%", amountClass: BAR_AMT_LO, amount: "5,500 ر.س" },
];

const EXP_AMT_TOP = "p-3 text-left font-bold text-secondary";
const EXP_AMT = "p-3 text-left font-bold text-on-surface";
const EXPENSES = [
  { dot: "w-2 h-2 rounded-full bg-secondary-container", branch: "فرع التحلية - الرياض", items: "إيجار ورواتب كوادر المطبخ", amountClass: EXP_AMT_TOP, amount: "18,200 ر.س", pct: "28.1%" },
  { dot: "w-2 h-2 rounded-full bg-secondary", branch: "فرع العليا - الرياض", items: "كهرباء وتشغيل ورواتب", amountClass: EXP_AMT, amount: "11,400 ر.س", pct: "17.6%" },
  { dot: "w-2 h-2 rounded-full bg-primary-fixed-dim", branch: "فرع طريق الملك - جدة", items: "صيانة دورية ومعدات تبريد", amountClass: EXP_AMT, amount: "9,850 ر.س", pct: "15.2%" },
  { dot: "w-2 h-2 rounded-full bg-outline", branch: "فرع الياسمين - الرياض", items: "مستلزمات تغليف واستهلاكيات", amountClass: EXP_AMT, amount: "8,300 ر.س", pct: "12.8%" },
  { dot: "w-2 h-2 rounded-full bg-surface-variant", branch: "الفروع الأخرى (5 فروع)", items: "فواتير مجمعة ومصروفات نثرية", amountClass: EXP_AMT, amount: "17,100 ر.س", pct: "26.3%" },
];

const STATUS_PAID = "px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-label-sm";
const STATUS_DUE = "px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm";
const SUPPLIERS = [
  { name: "شركة الدواجن الوطنية", category: "دجاج متبل ولحوم طازجة", invoices: "10 فواتير", amount: "22,600 ر.س", statusClass: STATUS_PAID, status: "مسدد بالكامل" },
  { name: "مؤسسة المأكولات البحرية العالمية", category: "سلمون طازج ومأكولات بحرية", invoices: "6 فواتير", amount: "14,200 ر.س", statusClass: STATUS_PAID, status: "مسدد بالكامل" },
  { name: "شركة مطاحن الحبوب العضوية", category: "أرز صحي وشوفان معبأ", invoices: "5 فواتير", amount: "8,750 ر.س", statusClass: STATUS_DUE, status: "أجل (مستحق)" },
  { name: "شركة كينزا للمشروبات الدايت", category: "مشروبات صحية وعصائر صفر سعرات", invoices: "3 فواتير", amount: "6,850 ر.س", statusClass: STATUS_PAID, status: "مسدد بالكامل" },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("month");

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md py-space-lg mb-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">التقارير</h1>
            <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full text-label-sm font-label-sm bg-primary/10 text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              تحليلات شاملة
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            تقارير مالية وتشغيلية شاملة لفروع دايت كينج التسعة — مبيعات، مصروفات، مشتريات، ومخزون
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-space-sm px-space-lg py-space-sm rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg shadow-sm transition-colors w-full sm:w-auto" type="button">
          <span className="material-symbols-outlined text-[20px] text-primary">download</span>
          <span>تصدير التقارير (PDF/Excel)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl mb-space-lg shadow-sm">
        <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg overflow-x-auto no-scrollbar w-full sm:w-auto" id="time-filter-group">
          <button className={period === "today" ? TAB_ON : TAB_OFF} onClick={() => setPeriod("today")} type="button">اليوم</button>
          <button className={period === "week" ? TAB_ON : TAB_OFF} onClick={() => setPeriod("week")} type="button">هذا الأسبوع</button>
          <button className={period === "month" ? TAB_ON : TAB_OFF} onClick={() => setPeriod("month")} type="button">هذا الشهر</button>
          <button className={period === "custom" ? TAB_ON : TAB_OFF} onClick={() => setPeriod("custom")} type="button">فترة مخصصة</button>
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-space-sm w-full sm:w-auto">
          <label className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap" htmlFor="report-branch-select">الفرع:</label>
          <div className="relative flex-1 sm:flex-initial">
            <select className="w-full sm:w-auto bg-surface-container-lowest text-on-surface font-body-md text-body-md py-space-xs px-space-md pl-space-xl rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container appearance-none cursor-pointer" defaultValue="all" id="report-branch-select">
              <option value="all">كل الفروع (9 فروع)</option>
              <option value="tahlia">فرع التحلية - الرياض</option>
              <option value="olaya">فرع العليا - الرياض</option>
              <option value="yasmin">فرع الياسمين - الرياض</option>
              <option value="king-road">فرع طريق الملك - جدة</option>
              <option value="rawdah">فرع الروضة - جدة</option>
              <option value="shatea">فرع الشاطئ - الدمام</option>
              <option value="khobar">فرع الخبر الشمالية</option>
              <option value="aziziya">فرع العزيزية - مكة</option>
              <option value="sultana">فرع سلطانة - المدينة المنورة</option>
            </select>
            <span className="material-symbols-outlined absolute left-space-xs top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-xl pb-space-xl">

        {/* Section 1: Sales Report */}
        <section className="bg-surface-container-low rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-6 rounded-full bg-primary-container"></div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">تقرير المبيعات</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">إجمالي إيرادات الفروع التسعة وتحليل طرق الدفع</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary-container/15 text-primary font-label-sm text-label-sm shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              شهري نشط
            </span>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">

            <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">إجمالي المبيعات</span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">148,950 <span className="text-primary font-label-lg text-label-lg">ر.س</span></span>
              <span className="inline-flex items-center gap-1 text-tertiary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span dir="ltr">+12.4%</span>
                <span className="text-on-surface-variant">مقارنة بالشهر السابق</span>
              </span>
            </div>
            <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">عدد عمليات البيع</span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">1,842 <span className="text-secondary font-label-lg text-label-lg">عملية</span></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                متوسط السلة: <strong className="text-on-surface">80.8</strong> ر.س
              </span>
            </div>
          </div>

          {/* Payment Method Distribution */}
          <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface font-semibold">المبيعات حسب طريقة الدفع</span>
            <div className="flex h-3 rounded-full overflow-hidden w-full">
              <div className="h-full bg-primary" style={{ width: "55.3%" }} title="فيزا ومدى: 55.3%"></div>
              <div className="h-full bg-tertiary" style={{ width: "23.0%" }} title="كاش: 23.0%"></div>
              <div className="h-full bg-secondary" style={{ width: "21.7%" }} title="تطبيقات التوصيل: 21.7%"></div>
            </div>
            <div className="grid grid-cols-3 gap-space-xs text-center">
              <div className="flex flex-col items-center gap-0.5">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-label-sm text-label-sm text-on-surface font-bold">55.3%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">فيزا ومدى</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span className="font-label-sm text-label-sm text-on-surface font-bold">23.0%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">كاش</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm text-on-surface font-bold">21.7%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">توصيل</span>
              </div>
            </div>
          </div>

          {/* Branch Comparison Bars */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-on-surface font-semibold mb-space-xs">مقارنة مبيعات الفروع التسعة</span>
            {SALES_BARS.map(row => (
              <div key={row.name} className="flex items-center gap-space-sm text-body-sm">
                <span className={row.nameClass}>{row.name}</span>
                <div className={row.trackClass}>
                  <div className={row.fill} style={{ width: row.width }}></div>
                </div>
                <span className={row.amountClass}>{row.amount}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Expenses Report */}
        <section className="bg-surface-container-low rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-6 rounded-full bg-secondary-container"></div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">تقرير المصروفات</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">تحليل مصروفات التشغيل والإيجارات والرواتب لجميع الفروع</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm shrink-0">
              <span className="material-symbols-outlined text-[14px]">account_balance</span>
              مالي
            </span>
          </div>

          {/* Total Card */}
          <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">إجمالي المصروفات الشهرية</span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">64,850 <span className="text-secondary font-label-lg text-label-lg">ر.س</span></span>
              <span className="inline-flex items-center gap-1 text-tertiary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">trending_down</span>
                <span dir="ltr">-4.2%</span>
                <span className="text-on-surface-variant">مقارنة بالشهر السابق</span>
              </span>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary text-[24px] sm:text-[28px]">savings</span>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="overflow-x-auto rounded-lg bg-surface-container">
            <table className="w-full text-right font-body-sm text-body-sm min-w-[500px]">
              <thead>
                <tr className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                  <th className="p-3 rounded-r-lg">الفرع</th>
                  <th className="p-3">أبرز بنود المصروفات</th>
                  <th className="p-3 text-left">الإجمالي</th>
                  <th className="p-3 text-left rounded-l-lg">النسبة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {EXPENSES.map(row => (
                  <tr key={row.branch} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="p-3 font-semibold flex items-center gap-1.5">
                      <span className={row.dot}></span>
                      <span>{row.branch}</span>
                    </td>
                    <td className="p-3 text-on-surface-variant">{row.items}</td>
                    <td className={row.amountClass}>{row.amount}</td>
                    <td className="p-3 text-left text-on-surface-variant">{row.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Distribution Bar */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant">توزيع المصروفات بالنسبة المئوية</span>
            <div className="flex h-2.5 rounded-full overflow-hidden w-full">
              <div className="h-full bg-secondary-container" style={{ width: "28.1%" }} title="التحلية: 28.1%"></div>
              <div className="h-full bg-secondary" style={{ width: "17.6%" }} title="العليا: 17.6%"></div>
              <div className="h-full bg-primary-fixed-dim" style={{ width: "15.2%" }} title="طريق الملك: 15.2%"></div>
              <div className="h-full bg-outline" style={{ width: "12.8%" }} title="الياسمين: 12.8%"></div>
              <div className="h-full bg-surface-variant" style={{ width: "26.3%" }} title="الفروع الأخرى: 26.3%"></div>
            </div>
          </div>
        </section>

        {/* Section 3: Purchases Report */}
        <section className="bg-surface-container-low rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-6 rounded-full bg-tertiary"></div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">تقرير المشتريات</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">فواتير التوريد والمشتريات من الموردين المعتمدين</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm shrink-0">
              <span className="material-symbols-outlined text-[14px]">local_shipping</span>
              الموردون
            </span>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">إجمالي المشتريات الشهرية</span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">52,400 <span className="text-tertiary font-label-lg text-label-lg">ر.س</span></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">24 فاتورة توريد</span>
            </div>
            <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">الموردون النشطون</span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">8 <span className="text-on-surface-variant font-label-lg text-label-lg">موردين</span></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">4 معتمدون رئيسيون</span>
            </div>
          </div>

          {/* Suppliers Table */}
          <div className="overflow-x-auto rounded-lg bg-surface-container">
            <table className="w-full text-right font-body-sm text-body-sm min-w-[500px]">
              <thead>
                <tr className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                  <th className="p-3 rounded-r-lg">المورد والفئة</th>
                  <th className="p-3 text-center">الفواتير</th>
                  <th className="p-3 text-left">المبلغ</th>
                  <th className="p-3 text-left rounded-l-lg">حالة السداد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {SUPPLIERS.map(row => (
                  <tr key={row.name} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface">{row.name}</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">{row.category}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center font-semibold text-secondary">{row.invoices}</td>
                    <td className="p-3 text-left font-bold text-on-surface">{row.amount}</td>
                    <td className="p-3 text-left"><span className={row.statusClass}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Inventory Report */}
        <section className="bg-surface-container-low rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-6 rounded-full bg-primary"></div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">تقرير المخزون</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">رصيد المستودع المركزي وحركة الوارد والمنصرف الشهرية</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm shrink-0">
              <span className="material-symbols-outlined text-[14px]">inventory_2</span>
              المستودع
            </span>
          </div>

          {/* Inventory Value Card */}
          <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">القيمة التقديرية للمخزون</span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">186,400 <span className="text-primary font-label-lg text-label-lg">ر.س</span></span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                4.2x{" "}<span className="font-label-sm text-label-sm text-on-surface-variant">شهرياً</span>
              </span>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[24px] sm:text-[28px]">warehouse</span>
            </div>
          </div>

          {/* In / Out Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-tertiary text-[18px]">south_west</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">الوارد هذا الشهر</span>
              </div>
              <span className="font-headline-md text-headline-md text-tertiary font-bold">
                +6,450{" "}<span className="font-label-sm text-label-sm">كجم</span>
              </span>
            </div>
            <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">north_east</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">المنصرف هذا الشهر</span>
              </div>
              <span className="font-headline-md text-headline-md text-secondary font-bold">
                -5,800{" "}<span className="font-label-sm text-label-sm">كجم</span>
              </span>
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface font-semibold">أصناف منخفضة المخزون</span>
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-error">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                3 أصناف بحاجة لتوريد
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-surface-container rounded-lg p-space-sm sm:px-space-md sm:py-space-sm gap-2">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[20px]">phishing</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">فيليه سلمون نرويجي طازج</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">RAW-SLM-03</span>
                </div>
              </div>
              <span className="self-start sm:self-auto px-space-sm py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm font-bold shrink-0">420 كجم متبقي</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-surface-container rounded-lg p-space-sm sm:px-space-md sm:py-space-sm gap-2">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-error text-[20px]">liquor</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">صوص الباربكيو دايت</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">SAU-BBQ-04</span>
                </div>
              </div>
              <span className="self-start sm:self-auto px-space-sm py-0.5 rounded-full bg-error/15 text-error font-label-sm text-label-sm font-bold shrink-0">95 عبوة متبقية</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-surface-container rounded-lg p-space-sm sm:px-space-md sm:py-space-sm gap-2">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-error text-[20px]">water_drop</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">زيت زيتون بكر ممتاز (احتياطي)</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">OIL-OLV-02</span>
                </div>
              </div>
              <span className="self-start sm:self-auto px-space-sm py-0.5 rounded-full bg-error/15 text-error font-label-sm text-label-sm font-bold shrink-0">120 لتر متبقي</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
