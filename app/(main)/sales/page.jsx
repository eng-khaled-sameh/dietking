"use client";
import { useState } from "react";

const TAB_ON = "period-tab flex-1 sm:flex-initial text-center px-2.5 sm:px-space-md py-space-xs rounded-md font-label-md text-xs sm:text-label-md bg-primary-container text-on-primary-container font-semibold transition-colors whitespace-nowrap";
const TAB_OFF = "period-tab flex-1 sm:flex-initial text-center px-2.5 sm:px-space-md py-space-xs rounded-md font-label-md text-xs sm:text-label-md text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap";
const TAB_CUSTOM_ON = "period-tab flex-1 sm:flex-initial inline-flex items-center justify-center gap-space-xs px-2.5 sm:px-space-md py-space-xs rounded-md font-label-md text-xs sm:text-label-md bg-primary-container text-on-primary-container font-semibold transition-colors whitespace-nowrap";
const TAB_CUSTOM_OFF = "period-tab flex-1 sm:flex-initial inline-flex items-center justify-center gap-space-xs px-2.5 sm:px-space-md py-space-xs rounded-md font-label-md text-xs sm:text-label-md text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap";

const ROW_ON = "branch-row bg-surface-container-high/60 hover:bg-surface-container-high transition-colors cursor-pointer";
const ROW_OFF = "branch-row hover:bg-surface-container-high/50 transition-colors cursor-pointer";

const DOT_ON = "active-indicator w-2 h-2 rounded-full bg-primary-container";
const DOT_OFF = "active-indicator w-2 h-2 rounded-full bg-transparent";

const BTN_ON = "btn-select-branch px-space-md py-1 rounded bg-primary-container text-on-primary-container font-label-md text-label-md hover:brightness-110 transition-all shadow-sm";
const BTN_OFF = "btn-select-branch px-space-md py-1 rounded bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-all";

const PAY = {
  card: { box: "inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-bright text-on-surface text-label-sm font-label-sm font-semibold", iconClass: "material-symbols-outlined text-[14px] text-primary", icon: "credit_card", label: "فيزا / مدى" },
  cash: { box: "inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-tertiary-container/20 text-tertiary text-label-sm font-label-sm font-semibold", iconClass: "material-symbols-outlined text-[14px]", icon: "payments", label: "كاش" },
  delivery_jahez: { box: "inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-secondary-container/20 text-secondary text-label-sm font-label-sm font-semibold", iconClass: "material-symbols-outlined text-[14px]", icon: "moped", label: "تطبيق توصيل - جاهز" },
  delivery_hunger: { box: "inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-secondary-container/20 text-secondary text-label-sm font-label-sm font-semibold", iconClass: "material-symbols-outlined text-[14px]", icon: "moped", label: "تطبيق توصيل - هنقرستيشن" },
};

const BARS = [
  { name: "1. التحلية - الرياض", width: "100%", pct: "19.1%", amount: "28,450", bar: "h-full bg-gradient-to-l from-primary-container to-secondary-container rounded-md transition-all duration-700" },
  { name: "2. العليا - الرياض", width: "86%", pct: "16.4%", amount: "24,500", bar: "h-full bg-gradient-to-l from-primary-container/90 to-secondary-container/90 rounded-md transition-all duration-700" },
  { name: "3. الياسمين - الرياض", width: "76%", pct: "14.5%", amount: "21,650", bar: "h-full bg-gradient-to-l from-primary-container/80 to-secondary-container/80 rounded-md transition-all duration-700" },
  { name: "4. طريق الملك - جدة", width: "67%", pct: "12.8%", amount: "19,100", bar: "h-full bg-gradient-to-l from-primary-container/70 to-secondary-container/70 rounded-md transition-all duration-700" },
  { name: "5. الروضة - جدة", width: "54%", pct: "10.3%", amount: "15,300", bar: "h-full bg-gradient-to-l from-primary-container/60 to-secondary-container/60 rounded-md transition-all duration-700" },
  { name: "6. الشاطئ - الدمام", width: "44%", pct: "8.4%", amount: "12,500", bar: "h-full bg-gradient-to-l from-primary-container/50 to-secondary-container/50 rounded-md transition-all duration-700" },
  { name: "7. الخبر الشمالية", width: "38%", pct: "7.2%", amount: "10,750", bar: "h-full bg-gradient-to-l from-primary-container/45 to-secondary-container/45 rounded-md transition-all duration-700" },
  { name: "8. العزيزية - مكة", width: "32%", pct: "6.1%", amount: "9,100", bar: "h-full bg-gradient-to-l from-primary-container/40 to-secondary-container/40 rounded-md transition-all duration-700" },
  { name: "9. سلطانة - المدينة", width: "27%", pct: "5.2%", amount: "7,600", bar: "h-full bg-gradient-to-l from-primary-container/35 to-secondary-container/35 rounded-md transition-all duration-700" },
];

const BRANCHES = [
  { key: "tahlia", name: "فرع التحلية - الرياض", region: "المنطقة الوسطى", total: "28,450 ر.س", ops: "342 عملية", cash: "6,500 ر.س", card: "16,200 ر.س", delivery: "5,750 ر.س" },
  { key: "olaya", name: "فرع العليا - الرياض", region: "المنطقة الوسطى", total: "24,500 ر.س", ops: "308 عملية", cash: "5,200 ر.س", card: "13,900 ر.س", delivery: "5,400 ر.س" },
  { key: "yasmin", name: "فرع الياسمين - الرياض", region: "شمال الرياض", total: "21,650 ر.س", ops: "265 عملية", cash: "4,800 ر.س", card: "12,250 ر.س", delivery: "4,600 ر.س" },
  { key: "king-road", name: "فرع طريق الملك - جدة", region: "المنطقة الغربية", total: "19,100 ر.س", ops: "232 عملية", cash: "4,350 ر.س", card: "10,850 ر.س", delivery: "3,900 ر.س" },
  { key: "rawdah", name: "فرع الروضة - جدة", region: "المنطقة الغربية", total: "15,300 ر.س", ops: "198 عملية", cash: "3,700 ر.س", card: "8,600 ر.س", delivery: "3,000 ر.س" },
  { key: "shatea", name: "فرع الشاطئ - الدمام", region: "المنطقة الشرقية", total: "12,500 ر.س", ops: "160 عملية", cash: "3,100 ر.س", card: "6,900 ر.س", delivery: "2,500 ر.س" },
  { key: "khobar", name: "فرع الخبر الشمالية", region: "المنطقة الشرقية", total: "10,750 ر.س", ops: "138 عملية", cash: "2,600 ر.س", card: "5,850 ر.س", delivery: "2,300 ر.س" },
  { key: "aziziya", name: "فرع العزيزية - مكة", region: "منطقة مكة المكرمة", total: "9,100 ر.س", ops: "112 عملية", cash: "2,100 ر.س", card: "4,900 ر.س", delivery: "2,100 ر.س" },
  { key: "sultana", name: "فرع سلطانة - المدينة المنورة", region: "المدينة المنورة", total: "7,600 ر.س", ops: "91 عملية", cash: "1,900 ر.س", card: "3,850 ر.س", delivery: "1,850 ر.س" },
];

const TRANSACTIONS = {
  tahlia: [
    { time: "2024-10-24 14:35", id: "#POS-9842", items: "وجبة ستيك تندرلوين صحي + عصير كينزا دايت", method: "card", total: "78.50" },
    { time: "2024-10-24 14:31", id: "#POS-9841", items: "سلطة كينوا بالأفوكادو + صدر دجاج مشوي", method: "cash", total: "54.00" },
    { time: "2024-10-24 14:26", id: "#POS-9840", items: "سالمون نرويجي مشوي مع أرز بني وخضار سوتيه", method: "delivery_jahez", total: "92.00" },
    { time: "2024-10-24 14:20", id: "#POS-9839", items: "بروتين شيك زبدة الفول السوداني + بودينغ الشيا كيتو", method: "card", total: "46.00" },
    { time: "2024-10-24 14:14", id: "#POS-9838", items: "وجبة كفتة مشوية دايت + بطاطا حلوة مشوية + سلطة خضراء", method: "delivery_hunger", total: "84.50" },
    { time: "2024-10-24 14:02", id: "#POS-9837", items: "ساندوتش فاهيتا دجاج خبز بر + ماء معدني", method: "card", total: "39.00" },
  ],
  olaya: [
    { time: "2024-10-24 14:40", id: "#POS-8721", items: "وجبة دجاج بالليمون والأعشاب + شوربة قرع صحية", method: "card", total: "68.00" },
    { time: "2024-10-24 14:28", id: "#POS-8720", items: "وجبة ستيك لحم بقر قليل الدهون + أرز أبيض دايت", method: "delivery_jahez", total: "88.50" },
    { time: "2024-10-24 14:15", id: "#POS-8719", items: "سلطة سيزر الدجاج المشوي بدون مايونيز", method: "cash", total: "42.00" },
    { time: "2024-10-24 13:58", id: "#POS-8718", items: "سموذي البروتين الأخضر + مافن الشوفان الصحي", method: "card", total: "36.50" },
    { time: "2024-10-24 13:45", id: "#POS-8717", items: "2x برجر كيتو لحم مع خبز الخس + عصير برتقال طازج", method: "card", total: "96.00" },
    { time: "2024-10-24 13:30", id: "#POS-8716", items: "باستا بروتين مع دجاج مشوي وصلصة ريحان خفيفة", method: "delivery_hunger", total: "64.00" },
  ],
  yasmin: [
    { time: "2024-10-24 14:38", id: "#POS-7452", items: "وجبة سمك دنيس مشوي مع سلطة فتوش دايت", method: "card", total: "82.00" },
    { time: "2024-10-24 14:22", id: "#POS-7451", items: "وجبة تاكو الدجاج الصحي بخبز الذرة الكاملة", method: "cash", total: "49.00" },
    { time: "2024-10-24 14:10", id: "#POS-7450", items: "بوك باول سالمون تونة كيتو دايت", method: "delivery_jahez", total: "79.00" },
    { time: "2024-10-24 13:55", id: "#POS-7449", items: "شوربة عدس بالخضار + ساندوتش ديك رومي مدخن", method: "card", total: "44.00" },
    { time: "2024-10-24 13:40", id: "#POS-7448", items: "كرات الطاقة بالتمر والمكسرات + قهوة كولد برو بدون سكر", method: "card", total: "28.00" },
    { time: "2024-10-24 13:21", id: "#POS-7447", items: "وجبة شيش طاووق صحي مع ثومية لايت وخضار مشوي", method: "delivery_hunger", total: "61.50" },
  ],
  "king-road": [
    { time: "2024-10-24 14:30", id: "#POS-6310", items: "فيليه هامور مشوي بصلصة الليمون والأعشاب + أرز بسمتي", method: "card", total: "89.00" },
    { time: "2024-10-24 14:12", id: "#POS-6309", items: "سلطة شمندر وجوز مع جبنة فيتا لايت", method: "cash", total: "38.00" },
    { time: "2024-10-24 13:50", id: "#POS-6308", items: "وجبة دجاج بالباربيكيو دايت + هريس بطاطا حلوة", method: "delivery_jahez", total: "58.00" },
    { time: "2024-10-24 13:35", id: "#POS-6307", items: "شيك الأفوكادو باللوز بدون سكر", method: "card", total: "24.00" },
    { time: "2024-10-24 13:18", id: "#POS-6306", items: "وجبة ستيك ريب آي قليل الدهن + بروكلي سوتيه", method: "card", total: "95.00" },
    { time: "2024-10-24 13:00", id: "#POS-6305", items: "ساندوتش تونة حارة صحي + شاي مثلج غير محلى", method: "delivery_hunger", total: "41.00" },
  ],
  rawdah: [
    { time: "2024-10-24 14:24", id: "#POS-5120", items: "وجبة صدور دجاج متبلة بالزعتر مع أرز كاري دايت", method: "card", total: "56.00" },
    { time: "2024-10-24 14:05", id: "#POS-5119", items: "صحن خضار مشوية مع صوص الحمص الخفيف", method: "cash", total: "32.00" },
    { time: "2024-10-24 13:48", id: "#POS-5118", items: "وجبة كفتة دجاج مشوية مع كينوا بالرمان", method: "delivery_jahez", total: "63.00" },
    { time: "2024-10-24 13:30", id: "#POS-5117", items: "زبادي يوناني مع التوت البري وبذور الشيا", method: "card", total: "22.00" },
    { time: "2024-10-24 13:11", id: "#POS-5116", items: "وجبة ستيك سلمون مع صلصة ترياكي لايت", method: "card", total: "87.00" },
    { time: "2024-10-24 12:55", id: "#POS-5115", items: "برجر دجاج كيتو بصلصة المستردة الخردل", method: "delivery_hunger", total: "51.00" },
  ],
  shatea: [
    { time: "2024-10-24 14:18", id: "#POS-4390", items: "وجبة جمبري مشوي بالأعشاب مع رز صيادية صحي", method: "card", total: "76.00" },
    { time: "2024-10-24 13:59", id: "#POS-4389", items: "سلطة جرجير بالمشروم وجبن بارميزان خفيف", method: "card", total: "35.00" },
    { time: "2024-10-24 13:40", id: "#POS-4388", items: "وجبة فاهيتا لحم بقري صحية مع تورتيلا شوفان", method: "cash", total: "65.00" },
    { time: "2024-10-24 13:20", id: "#POS-4387", items: "عصير ديتوكس بالزنجبيل والليمون والتفاح الأخضر", method: "delivery_jahez", total: "26.00" },
    { time: "2024-10-24 13:02", id: "#POS-4386", items: "وجبة كاري الدجاج بجوز الهند لايت", method: "card", total: "58.00" },
    { time: "2024-10-24 12:44", id: "#POS-4385", items: "شطيرة جبن حلوم مشوي مع طماطم مجففة وريحان", method: "delivery_hunger", total: "38.00" },
  ],
  khobar: [
    { time: "2024-10-24 14:22", id: "#POS-3870", items: "وجبة بيف بريسكت صحي مطهو ببطء مع كوسا مشوية", method: "card", total: "84.00" },
    { time: "2024-10-24 13:51", id: "#POS-3869", items: "سلطة يونانية كلاسيكية دايت مع زيت زيتون بكر", method: "cash", total: "34.00" },
    { time: "2024-10-24 13:30", id: "#POS-3868", items: "وجبة سالمون فيليه بالفرن مع هليون طازج", method: "delivery_jahez", total: "91.00" },
    { time: "2024-10-24 13:12", id: "#POS-3867", items: "وافل الشوفان الصحي مع زبدة الفول السوداني وعسل النحل", method: "card", total: "32.00" },
    { time: "2024-10-24 12:48", id: "#POS-3866", items: "وجبة دجاج بالثوم والليمون مع أرز بري", method: "card", total: "55.00" },
    { time: "2024-10-24 12:30", id: "#POS-3865", items: "ساندوتش بيض مسلوق بالأفوكادو على خبز الحبوب الكاملة", method: "delivery_hunger", total: "33.00" },
  ],
  aziziya: [
    { time: "2024-10-24 14:11", id: "#POS-2612", items: "وجبة لحم مفروم قليل الدهن مع صوص الطماطم العضوي وأرز أسمر", method: "card", total: "59.00" },
    { time: "2024-10-24 13:46", id: "#POS-2611", items: "سلطة تبولة كينوا صحية بزيت الزيتون", method: "cash", total: "29.00" },
    { time: "2024-10-24 13:25", id: "#POS-2610", items: "وجبة صدر دجاج مشوي مع بطاطا مهروسة خفيفة", method: "delivery_jahez", total: "52.00" },
    { time: "2024-10-24 13:00", id: "#POS-2609", items: "كوب فاكهة استوائية مشكلة بدون إضافات سكرية", method: "card", total: "20.00" },
    { time: "2024-10-24 12:35", id: "#POS-2608", items: "برجر لحم صحي بدون دهون مع صوص خردل لايت", method: "card", total: "48.00" },
    { time: "2024-10-24 12:15", id: "#POS-2607", items: "شوربة بروكلي كريمية بحليب اللوز", method: "delivery_hunger", total: "27.00" },
  ],
  sultana: [
    { time: "2024-10-24 14:08", id: "#POS-1940", items: "وجبة كباب الدجاج الصحي المشوي على الفحم مع خضار", method: "card", total: "53.00" },
    { time: "2024-10-24 13:42", id: "#POS-1939", items: "سلطة خضراء عضوية بصلصة خل البلسمك", method: "cash", total: "28.00" },
    { time: "2024-10-24 13:17", id: "#POS-1938", items: "وجبة سمك هامور دايت مطهو على البخار مع جزر وبروكلي", method: "delivery_jahez", total: "74.00" },
    { time: "2024-10-24 12:50", id: "#POS-1937", items: "سموذي المانجو وبذور الشيا الطبيعي", method: "card", total: "25.00" },
    { time: "2024-10-24 12:28", id: "#POS-1936", items: "وجبة تندرلوين ستيك دايت 150 جرام مع فطر سوتيه", method: "card", total: "79.00" },
    { time: "2024-10-24 12:05", id: "#POS-1935", items: "شطيرة جبن قريش وزعتر بالخبز الصحي", method: "delivery_hunger", total: "26.00" },
  ],
};

export default function SalesPage() {
  const [period, setPeriod] = useState("today");
  const [selectValue, setSelectValue] = useState("all");
  const [activeKey, setActiveKey] = useState("tahlia");
  const [label, setLabel] = useState("فرع التحلية - الرياض");
  const [spinning, setSpinning] = useState(false);

  function handleRowClick(row) {
    setActiveKey(row.key);
    setLabel(row.name);
    setSelectValue(row.key);
  }

  function handleSelectChange(e) {
    const val = e.target.value;
    setSelectValue(val);
    if (val === "all") {
      setActiveKey("tahlia");
      setLabel("فرع التحلية - الرياض (الأعلى مبيعاً)");
    } else {
      setActiveKey(val);
      setLabel(e.target.options[e.target.selectedIndex].text);
    }
  }

  function handleRefresh() {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 800);
  }

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="flex flex-col gap-space-lg mb-space-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-sm">
              <span className="w-2.5 h-7 rounded-full bg-primary-container"></span>
              <h1 className="font-headline-xl text-headline-xl text-on-surface">المبيعات</h1>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant pr-space-md mt-space-xs">
              متابعة وإدارة مبيعات فروع دايت كينج وتحليل طرق الدفع والعمليات المباشرة
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-sm w-full sm:w-auto">
            <button className="flex-1 sm:flex-initial flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors font-label-lg text-label-lg shadow-sm" id="btn-export" type="button">
              <span className="material-symbols-outlined text-[18px] text-primary">download</span>
              <span>تصدير تقرير المبيعات</span>
            </button>
            <button className="flex-1 sm:flex-initial flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary-container hover:bg-primary-container/90 transition-all font-label-lg text-label-lg shadow-sm" id="btn-refresh" onClick={handleRefresh} type="button">
              <span className={spinning ? "material-symbols-outlined text-[18px] animate-spin" : "material-symbols-outlined text-[18px]"} id="refresh-icon">sync</span>
              <span>تحديث فوري</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl">
          <div className="flex items-center bg-surface-container-lowest p-space-xs rounded-lg overflow-x-auto no-scrollbar w-full sm:w-auto">
            <button className={period === "today" ? TAB_ON : TAB_OFF} onClick={() => setPeriod("today")} type="button">
              اليوم
            </button>
            <button className={period === "week" ? TAB_ON : TAB_OFF} onClick={() => setPeriod("week")} type="button">
              هذا الأسبوع
            </button>
            <button className={period === "month" ? TAB_ON : TAB_OFF} onClick={() => setPeriod("month")} type="button">
              هذا الشهر
            </button>
            <button className={period === "custom" ? TAB_CUSTOM_ON : TAB_CUSTOM_OFF} onClick={() => setPeriod("custom")} type="button">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              <span>فترة مخصصة</span>
            </button>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-space-sm w-full sm:w-auto sm:min-w-[260px]">
            <label className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap" htmlFor="branch-select">الفرع المختار:</label>
            <div className="relative flex-1 sm:flex-initial">
              <select className="w-full sm:w-auto bg-surface-container-lowest text-on-surface font-body-md text-body-md py-space-xs px-space-md pr-space-md pl-space-xl rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container appearance-none cursor-pointer" id="branch-select" value={selectValue} onChange={handleSelectChange}>
                <option value="all">كل الفروع (9 فروع)</option>
                {BRANCHES.map(b => (
                  <option key={b.key} value={b.key}>{b.name}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md mb-space-lg">
        <div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-surface-container-high transition-colors">
          <div className="absolute -left-6 -top-6 w-20 h-20 rounded-full bg-primary-container/10 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-body-md text-body-md text-on-surface-variant">إجمالي المبيعات</span>
            <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface tracking-tight font-extrabold leading-none">
              148,950{" "}<span className="text-label-lg font-label-lg text-primary font-bold">ر.س</span>
            </span>
            <div className="flex items-center gap-space-xs mt-space-xs">
              <span className="inline-flex items-center gap-space-xs px-space-xs py-0.5 rounded bg-tertiary-container/20 text-tertiary text-label-sm font-label-sm font-bold">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                +12.4%
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">مقارنة بالأمس</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between shadow-sm hover:bg-surface-container-high transition-colors">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-body-md text-body-md text-on-surface-variant">عدد العمليات</span>
            <div className="w-8 h-8 rounded-full bg-secondary-container/20 text-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface tracking-tight font-extrabold leading-none">
              1,842{" "}<span className="text-label-lg font-label-lg text-secondary font-bold">عملية</span>
            </span>
            <div className="flex items-center gap-space-xs mt-space-xs">
              <span className="inline-flex items-center px-space-xs py-0.5 rounded bg-surface-container-highest text-on-surface text-label-sm font-label-sm font-semibold">
                متوسط السلة: 80.8 ر.س
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between shadow-sm hover:bg-surface-container-high transition-colors">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-body-md text-body-md text-on-surface-variant">إجمالي الكاش</span>
            <div className="w-8 h-8 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface tracking-tight font-extrabold leading-none">
              34,250{" "}<span className="text-label-lg font-label-lg text-on-surface-variant">ر.س</span>
            </span>
            <div className="flex items-center justify-between mt-space-xs text-body-sm font-body-sm">
              <span className="text-on-surface-variant">حصة المبيعات:</span>
              <span className="text-tertiary font-bold font-label-md text-label-md">23.0%</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between shadow-sm hover:bg-surface-container-high transition-colors">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-body-md text-body-md text-on-surface-variant">إجمالي الفيزا ومدى</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">credit_card</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface tracking-tight font-extrabold leading-none">
              82,400{" "}<span className="text-label-lg font-label-lg text-on-surface-variant">ر.س</span>
            </span>
            <div className="flex items-center justify-between mt-space-xs text-body-sm font-body-sm">
              <span className="text-on-surface-variant">حصة المبيعات:</span>
              <span className="text-primary font-bold font-label-md text-label-md">55.3%</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container p-space-md rounded-xl flex flex-col justify-between shadow-sm hover:bg-surface-container-high transition-colors">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-body-md text-body-md text-on-surface-variant">إجمالي التوصيل</span>
            <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">two_wheeler</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs">
            <span className="font-display-lg text-display-lg text-on-surface tracking-tight font-extrabold leading-none">
              32,300{" "}<span className="text-label-lg font-label-lg text-on-surface-variant">ر.س</span>
            </span>
            <div className="flex items-center justify-between mt-space-xs text-body-sm font-body-sm">
              <span className="text-on-surface-variant">حصة المبيعات:</span>
              <span className="text-secondary font-bold font-label-md text-label-md">21.7%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container p-space-lg rounded-xl mb-space-lg shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary-container text-[22px]">bar_chart</span>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">مقارنة مبيعات الفروع اليومية</h2>
              <span className="font-body-sm text-body-sm text-on-surface-variant">توزيع العوائد المالية الحالية بحسب الفروع الـ 9 المسجلة</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-lg">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">الأعلى مبيعاً:</span>
              <span className="font-label-md text-label-md text-primary font-bold">فرع التحلية (28,450 ر.س)</span>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-lg">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">الأسرع نمواً:</span>
              <span className="font-label-md text-label-md text-tertiary font-bold">فرع الياسمين (+18.2%)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-space-sm">
          {BARS.map(row => (
            <div key={row.name} className="flex items-center gap-space-sm sm:gap-space-md group">
              <div className="w-28 sm:w-44 text-right truncate shrink-0">
                <span className="font-label-md text-xs sm:text-label-md text-on-surface group-hover:text-primary transition-colors">{row.name}</span>
              </div>
              <div className="flex-1 bg-surface-container-lowest h-6 rounded-md overflow-hidden relative flex items-center min-w-[50px]">
                <div className={row.bar} style={{ width: row.width }}></div>
                <span className="absolute left-space-sm text-label-sm font-label-sm text-on-surface-variant font-mono">{row.pct}</span>
              </div>
              <div className="w-20 sm:w-28 text-left shrink-0">
                <span className="font-label-md text-xs sm:text-label-md text-on-surface font-bold">{row.amount} <span className="text-label-sm text-on-surface-variant">ر.س</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-container rounded-xl shadow-sm mb-space-lg overflow-hidden">
        <div className="p-space-lg flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[22px]">storefront</span>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">جدول مبيعات الفروع</h2>
              <span className="font-body-sm text-body-sm text-on-surface-variant">تفصيل الإيرادات حسب وسيلة الدفع لكل فرع نشط</span>
            </div>
          </div>
          <span className="font-label-md text-label-md px-space-md py-space-xs rounded-full bg-surface-container-high text-on-surface-variant">
            9 فروع مشمولة
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                <th className="py-space-md px-space-lg">اسم الفرع</th>
                <th className="py-space-md px-space-md text-left">إجمالي المبيعات</th>
                <th className="py-space-md px-space-md text-center">عدد العمليات</th>
                <th className="py-space-md px-space-md text-left">كاش</th>
                <th className="py-space-md px-space-md text-left">فيزا ومَدى</th>
                <th className="py-space-md px-space-md text-left">تطبيقات التوصيل</th>
                <th className="py-space-md px-space-lg text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y-0 text-on-surface font-body-md text-body-md" id="branch-table-body">
              {BRANCHES.map(row => (
                <tr key={row.key} className={activeKey === row.key ? ROW_ON : ROW_OFF} onClick={() => handleRowClick(row)}>
                  <td className="py-space-md px-space-lg">
                    <div className="flex items-center gap-space-sm">
                      <span className={activeKey === row.key ? DOT_ON : DOT_OFF}></span>
                      <div className="flex flex-col">
                        <span className={row.key === "tahlia" ? "font-bold text-on-surface" : "font-semibold text-on-surface"}>{row.name}</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">{row.region}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-space-md px-space-md text-left font-bold text-primary font-mono">{row.total}</td>
                  <td className="py-space-md px-space-md text-center font-mono">{row.ops}</td>
                  <td className="py-space-md px-space-md text-left text-tertiary font-mono">{row.cash}</td>
                  <td className="py-space-md px-space-md text-left text-on-surface font-mono">{row.card}</td>
                  <td className="py-space-md px-space-md text-left text-secondary font-mono">{row.delivery}</td>
                  <td className="py-space-md px-space-lg text-center">
                    <button className={activeKey === row.key ? BTN_ON : BTN_OFF} type="button">
                      عرض العمليات
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-surface-container rounded-xl shadow-sm overflow-hidden">
        <div className="p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm bg-surface-container-high/40">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[22px]">receipt</span>
            <div className="flex items-center gap-space-xs flex-wrap">
              <h2 className="font-headline-md text-headline-md text-on-surface">تفاصيل مبيعات الفرع:</h2>
              <span className="font-headline-md text-headline-md text-primary font-bold" id="selected-branch-label">{label}</span>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-primary-container/20 text-primary-container font-semibold">محدد</span>
            </div>
          </div>
          <span className="font-label-md text-label-md px-space-md py-space-xs rounded-full bg-surface-container-lowest text-on-surface-variant">
            عرض أحدث 6 عمليات
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[650px]">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                <th className="py-space-md px-space-lg">التاريخ والوقت</th>
                <th className="py-space-md px-space-md">رقم العملية</th>
                <th className="py-space-md px-space-lg">المنتجات</th>
                <th className="py-space-md px-space-md text-center">طريقة الدفع</th>
                <th className="py-space-md px-space-lg text-left">إجمالي العملية</th>
              </tr>
            </thead>
            <tbody className="divide-y-0 text-on-surface font-body-md text-body-md" id="transactions-body">
              {TRANSACTIONS[activeKey].map(row => (
                <tr key={row.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-space-md px-space-lg font-mono text-on-surface-variant text-body-sm">
                    {row.time}
                  </td>
                  <td className="py-space-md px-space-md font-mono font-bold text-primary">
                    {row.id}
                  </td>
                  <td className="py-space-md px-space-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[16px]">restaurant</span>
                      <span className="font-medium text-on-surface">{row.items}</span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-md text-center">
                    <span className={PAY[row.method].box}>
                      <span className={PAY[row.method].iconClass}>{PAY[row.method].icon}</span>
                      {PAY[row.method].label}
                    </span>
                  </td>
                  <td className="py-space-md px-space-lg text-left font-mono font-bold text-on-surface">
                    {row.total}{" "}<span className="text-on-surface-variant text-label-sm">ر.س</span>
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
