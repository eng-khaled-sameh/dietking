const BADGE = {
  tertiary: { box: "inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full text-label-sm font-label-sm bg-tertiary-container/20 text-tertiary", dot: "w-1.5 h-1.5 rounded-full bg-tertiary" },
  secondary: { box: "inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container/20 text-secondary", dot: "w-1.5 h-1.5 rounded-full bg-secondary" },
  primary: { box: "inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full text-label-sm font-label-sm bg-primary/20 text-primary", dot: "w-1.5 h-1.5 rounded-full bg-primary" },
  container: { box: "inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full text-label-sm font-label-sm bg-primary-container/20 text-primary-container", dot: "w-1.5 h-1.5 rounded-full bg-primary-container" },
  error: { box: "inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full text-label-sm font-label-sm bg-error-container/40 text-error", dot: "w-1.5 h-1.5 rounded-full bg-error" },
  neutral: { box: "inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-on-surface-variant", dot: null },
  pulse: { box: "inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-on-surface-variant", dot: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" },
};

const ICON_TONES = {
  primary: "w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary",
  secondary: "w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary",
  error: "w-8 h-8 rounded bg-surface-container flex items-center justify-center text-error",
};

const QTY_TONES = {
  normal: "py-space-sm px-space-md text-left font-body-lg text-body-lg text-on-surface font-mono font-bold",
  secondary: "py-space-sm px-space-md text-left font-body-lg text-body-lg text-secondary font-mono font-bold",
  error: "py-space-sm px-space-md text-left font-body-lg text-body-lg text-error font-mono font-bold",
};

const STOCK = [
  { code: "RAW-CHK-01", name: "صدور دجاج متبلة ومجمدة", icon: "egg_alt", iconTone: "primary", qty: "4,500", qtyTone: "normal", unit: "كجم", tone: "tertiary", label: "متوفر بكفاية", updated: "اليوم - 11:30 ص" },
  { code: "RAW-BEEF-02", name: "لحم عجل بلدي قليل الدهن", icon: "set_meal", iconTone: "primary", qty: "2,850", qtyTone: "normal", unit: "كجم", tone: "tertiary", label: "متوفر بكفاية", updated: "اليوم - 09:15 ص" },
  { code: "RAW-SLM-03", name: "فيليه سلمون نرويجي طازج", icon: "phishing", iconTone: "secondary", qty: "420", qtyTone: "secondary", unit: "كجم", tone: "secondary", label: "منخفض", updated: "اليوم - 10:45 ص" },
  { code: "CAR-RICE-01", name: "أرز بسمتي صحي طويل الحبة", icon: "grain", iconTone: "primary", qty: "3,600", qtyTone: "normal", unit: "كيس", tone: "tertiary", label: "متوفر بكفاية", updated: "أمس - 04:20 م" },
  { code: "OIL-OLV-01", name: "زيت زيتون بكر ممتاز عضوي", icon: "water_drop", iconTone: "primary", qty: "1,400", qtyTone: "normal", unit: "لتر", tone: "tertiary", label: "متوفر بكفاية", updated: "أمس - 01:10 م" },
  { code: "SAU-BBQ-04", name: "صوص الباربكيو دايت (خالٍ من السكر)", icon: "liquor", iconTone: "error", qty: "95", qtyTone: "error", unit: "عبوة", tone: "error", label: "شارف على النفاد", updated: "اليوم - 08:00 ص" },
  { code: "BEV-KNZ-01", name: "عبوات كينزا دايت خالية السكر", icon: "local_cafe", iconTone: "primary", qty: "1,250", qtyTone: "normal", unit: "كرتون", tone: "tertiary", label: "متوفر بكفاية", updated: "اليوم - 11:00 ص" },
];

const TRANSFERS = [
  { no: "TR-KT-104", material: "صدور دجاج متبلة (خط الوجبات)", qty: "250 كجم", time: "اليوم - 07:30 ص", tone: "tertiary", icon: "check_circle", label: "تم الاستلام بالمطبخ" },
  { no: "TR-KT-105", material: "فيليه سلمون طازج (وجبات الكيتو)", qty: "80 كجم", time: "اليوم - 08:45 ص", tone: "secondary", icon: "local_shipping", label: "قيد التسليم للمطبخ" },
  { no: "TR-KT-106", material: "أرز بني عضوي ومطحون", qty: "150 كيس", time: "اليوم - 09:20 ص", tone: "tertiary", icon: "check_circle", label: "تم الاستلام بالمطبخ" },
  { no: "TR-KT-107", material: "خضار مشكل طازج (بروكلي، جزر، فاصوليا)", qty: "190 كجم", time: "اليوم - 11:15 ص", tone: "neutral", icon: "output", label: "تم الصرف من المخزن" },
];

const FINISHED = [
  { name: "وجبة ستيك تندرلوين دايت مع بطاطا مهروسة", icon: "lunch_dining", iconTone: "primary", qty: "450 وجبة", produced: "اليوم - 06:00 ص", shelf: "3 أيام (ثلاجة)", tone: "tertiary", label: "جاهز للتوزيع للفروع" },
  { name: "وجبة سلمون نرويجي مشوي مع أرز بني", icon: "dinner_dining", iconTone: "secondary", qty: "320 وجبة", produced: "اليوم - 07:15 ص", shelf: "يومان (ثلاجة)", tone: "tertiary", label: "جاهز للتوزيع للفروع" },
  { name: "سلطة كينوا بالأفوكادو وصدر دجاج مشوي", icon: "eco", iconTone: "primary", qty: "280 عبوة", produced: "اليوم - 08:00 ص", shelf: "يومان (مبرد)", tone: "secondary", label: "في ثلاجات الحفظ" },
  { name: "كفتة مشوية دايت مع بطاطا حلوة متبلة", icon: "kebab_dining", iconTone: "primary", qty: "410 وجبات", produced: "اليوم - 09:30 ص", shelf: "3 أيام (ثلاجة)", tone: "pulse", label: "قيد التجهيز النهائي" },
  { name: "بروتين كوكيز شوفان خالي السكر (معبأ)", icon: "bakery_dining", iconTone: "primary", qty: "500 كيس", produced: "أمس - 04:00 م", shelf: "14 يوماً (جاف)", tone: "tertiary", label: "جاهز للتوزيع للفروع" },
];

const ORDERS = [
  { no: "ORD-BR-201", branch: "فرع التحلية - الرياض", item: "وجبة ستيك تندرلوين دايت", qty: "120 وجبة", date: "اليوم - 10:15 ص", tone: "secondary", label: "قيد الانتظار" },
  { no: "ORD-BR-202", branch: "فرع العليا - الرياض", item: "عبوات كينزا دايت خالية السكر", qty: "50 كرتون", date: "اليوم - 09:40 ص", tone: "primary", label: "تمت الموافقة" },
  { no: "ORD-BR-203", branch: "فرع طريق الملك - جدة", item: "وجبة سلمون نرويجي مشوي", qty: "85 وجبة", date: "اليوم - 08:30 ص", tone: "container", label: "تم التجهيز" },
  { no: "ORD-BR-204", branch: "فرع الياسمين - الرياض", item: "سلطة كينوا بالأفوكادو", qty: "60 عبوة", date: "اليوم - 07:15 ص", tone: "tertiary", label: "تم التسليم" },
  { no: "ORD-BR-205", branch: "فرع الشاطئ - الدمام", item: "بروتين كوكيز شوفان", qty: "100 كيس", date: "اليوم - 09:00 ص", tone: "secondary", label: "قيد الانتظار" },
];

export default function InventoryPage() {
  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md py-space-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">المخزون</h1>
            <span className="inline-flex items-center px-space-sm py-0.5 rounded-full text-label-sm font-label-sm bg-primary/10 text-primary">
              نظام المزامنة الحية
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            إدارة رصيد المستودع المركزي، تدفق التوريد للمطبخ المركزي، المنتجات التامة، وطلبات الفروع التسعة
          </p>
        </div>
        <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-sm rounded-xl">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[18px]">warehouse</span>
            <span className="font-label-md text-label-md">المستودع الرئيسي</span>
          </div>
          <span className="material-symbols-outlined text-outline-variant text-[16px]">arrow_back</span>
          <div className="flex items-center gap-1.5 text-secondary">
            <span className="material-symbols-outlined text-[18px]">skillet</span>
            <span className="font-label-md text-label-md">المطبخ المركزي</span>
          </div>
          <span className="material-symbols-outlined text-outline-variant text-[16px]">arrow_back</span>
          <div className="flex items-center gap-1.5 text-tertiary">
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            <span className="font-label-md text-label-md">الفروع الـ 9</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
        <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors shadow-sm">
          <div className="absolute -left-3 -top-3 w-20 h-20 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="font-body-md text-body-md text-on-surface-variant font-medium">منتجات المخزون الرئيسي</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-extrabold text-on-surface tracking-tight">48</span>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">صنفاً</span>
            </div>
            <div className="mt-space-sm flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant bg-surface-container-lowest/50 px-space-sm py-1 rounded">
              <span>الرصيد الكلي المقدر:</span>
              <span className="text-on-surface font-semibold">52,400 كجم / وحدة</span>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors shadow-sm">
          <div className="absolute -left-3 -top-3 w-20 h-20 bg-secondary/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="font-body-md text-body-md text-on-surface-variant font-medium">المورد للمطبخ المركزي</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">soup_kitchen</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-extrabold text-on-surface tracking-tight">18</span>
              <span className="font-headline-sm text-headline-sm text-secondary font-bold">عملية توريد</span>
            </div>
            <div className="mt-space-sm flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant bg-surface-container-lowest/50 px-space-sm py-1 rounded">
              <span>المواد المحولة للمطبخ:</span>
              <span className="text-secondary font-semibold">1,850 كجم مواد خام</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors shadow-sm">
          <div className="absolute -left-3 -top-3 w-20 h-20 bg-tertiary/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="font-body-md text-body-md text-on-surface-variant font-medium">المنتجات التامة بالمطبخ</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">restaurant</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-extrabold text-on-surface tracking-tight">26</span>
              <span className="font-headline-sm text-headline-sm text-tertiary font-bold">وجبة وصنف</span>
            </div>
            <div className="mt-space-sm flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant bg-surface-container-lowest/50 px-space-sm py-1 rounded">
              <span>الجاهز للشحن والتوزيع:</span>
              <span className="text-tertiary font-semibold">3,420 عبوة ووجبة</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-colors shadow-sm">
          <div className="absolute -left-3 -top-3 w-20 h-20 bg-primary-container/20 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-space-md">
            <span className="font-body-md text-body-md text-on-surface-variant font-medium">طلبات الفروع المعلقة</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">pending_actions</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-extrabold text-on-surface tracking-tight">7</span>
              <span className="font-headline-sm text-headline-sm text-primary-container font-bold">طلبات معلقة</span>
            </div>
            <div className="mt-space-sm flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant bg-surface-container-lowest/50 px-space-sm py-1 rounded">
              <span>حالة التشغيل:</span>
              <span className="text-primary-container font-semibold">بانتظار الموافقة والتجهيز</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-space-xl">
        <section className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-2.5 h-6 bg-primary rounded-full"></div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">1. منتجات المخزون الرئيسي</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">رصيد المواد الأولية ومستلزمات الإنتاج بالمستودع المركزي</p>
              </div>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 rounded-lg text-label-md font-label-md text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">filter_list</span>
              <span>إجمالي الأصناف: 7 معروضة من 48</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md">
                  <th className="py-space-sm px-space-md rounded-r-lg">اسم المنتج وكود الصنف</th>
                  <th className="py-space-sm px-space-md text-left">الكمية الحالية</th>
                  <th className="py-space-sm px-space-md text-center">الوحدة</th>
                  <th className="py-space-sm px-space-md text-center">حالة المخزون</th>
                  <th className="py-space-sm px-space-md rounded-l-lg text-left">آخر تحديث</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {STOCK.map(row => (
                  <tr key={row.code} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="py-space-sm px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div className={ICON_TONES[row.iconTone]}>
                          <span className="material-symbols-outlined text-[18px]">{row.icon}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-body-md text-body-md text-on-surface font-semibold">{row.name}</span>
                          <span className="font-label-sm text-label-sm text-outline tracking-wider font-mono">{row.code}</span>
                        </div>
                      </div>
                    </td>
                    <td className={QTY_TONES[row.qtyTone]}>{row.qty}</td>
                    <td className="py-space-sm px-space-md text-center font-body-sm text-body-sm text-on-surface-variant">{row.unit}</td>
                    <td className="py-space-sm px-space-md text-center">
                      <span className={BADGE[row.tone].box}>
                        {BADGE[row.tone].dot && <span className={BADGE[row.tone].dot}></span>}
                        {row.label}
                      </span>
                    </td>
                    <td className="py-space-sm px-space-md text-left font-label-sm text-label-sm text-on-surface-variant">{row.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-2.5 h-6 bg-secondary rounded-full"></div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">2. المنتجات الموردة للمطبخ المركزي</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">عمليات تحويل المواد الخام من المخزن الرئيسي لخطوط الإعداد والطهي</p>
              </div>
            </div>
            <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md bg-secondary/10 px-space-sm py-1 rounded-lg">
              <span className="material-symbols-outlined text-[16px]">conveyor_belt</span>
              <span>توريد اليوم النشط</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md">
                  <th className="py-space-sm px-space-md rounded-r-lg">رقم التحويل</th>
                  <th className="py-space-sm px-space-md">المادة الخام المحولة</th>
                  <th className="py-space-sm px-space-md text-left">الكمية المحولة</th>
                  <th className="py-space-sm px-space-md text-center">وقت التحويل</th>
                  <th className="py-space-sm px-space-md rounded-l-lg text-center">حالة التوريد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {TRANSFERS.map(row => (
                  <tr key={row.no} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="py-space-sm px-space-md font-mono text-primary font-bold text-label-lg">{row.no}</td>
                    <td className="py-space-sm px-space-md">
                      <span className="font-body-md text-body-md text-on-surface font-medium">{row.material}</span>
                    </td>
                    <td className="py-space-sm px-space-md text-left font-body-md text-body-md text-on-surface font-mono font-semibold">{row.qty}</td>
                    <td className="py-space-sm px-space-md text-center font-label-sm text-label-sm text-on-surface-variant">{row.time}</td>
                    <td className="py-space-sm px-space-md text-center">
                      <span className={BADGE[row.tone].box}>
                        <span className="material-symbols-outlined text-[14px]">{row.icon}</span>
                        {row.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-2.5 h-6 bg-tertiary rounded-full"></div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">3. المنتجات التامة من المطبخ</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">الوجبات المطهوة والمعلبات المجهزة بالمطبخ المركزي والجاهزة للتوزيع</p>
              </div>
            </div>
            <span className="text-tertiary font-label-md text-label-md bg-tertiary/10 px-space-sm py-1 rounded-lg">
              مراقبة الجودة والصلاحية النشطة
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md">
                  <th className="py-space-sm px-space-md rounded-r-lg">اسم المنتج / الوجبة التامة</th>
                  <th className="py-space-sm px-space-md text-left">الكمية الجاهزة</th>
                  <th className="py-space-sm px-space-md text-center">تاريخ وساعة الإنتاج</th>
                  <th className="py-space-sm px-space-md text-center">الصلاحية</th>
                  <th className="py-space-sm px-space-md rounded-l-lg text-center">حالة الجاهزية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {FINISHED.map(row => (
                  <tr key={row.name} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="py-space-sm px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div className={ICON_TONES[row.iconTone]}>
                          <span className="material-symbols-outlined text-[18px]">{row.icon}</span>
                        </div>
                        <span className="font-body-md text-body-md text-on-surface font-semibold">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-md text-left font-body-lg text-body-lg text-on-surface font-mono font-bold">{row.qty}</td>
                    <td className="py-space-sm px-space-md text-center font-label-sm text-label-sm text-on-surface-variant">{row.produced}</td>
                    <td className="py-space-sm px-space-md text-center font-label-sm text-label-sm text-on-surface-variant">{row.shelf}</td>
                    <td className="py-space-sm px-space-md text-center">
                      <span className={BADGE[row.tone].box}>
                        {BADGE[row.tone].dot && <span className={BADGE[row.tone].dot}></span>}
                        {row.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-2.5 h-6 bg-primary-container rounded-full"></div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">4. طلبات الفروع للمخزن</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">سجل احتياج وتوريد الفروع التسعة من الوجبات التامة والمواد المباشرة</p>
              </div>
            </div>
            <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant bg-surface-container px-space-sm py-1 rounded-lg">
              <span className="material-symbols-outlined text-[16px] text-primary">store</span>
              <span>شبكة الفروع الـ 9 المترابطة</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md">
                  <th className="py-space-sm px-space-md rounded-r-lg">رقم الطلب</th>
                  <th className="py-space-sm px-space-md">الفرع الطالب</th>
                  <th className="py-space-sm px-space-md">المنتج / الصنف المطلوب</th>
                  <th className="py-space-sm px-space-md text-left">الكمية المطلوبة</th>
                  <th className="py-space-sm px-space-md text-center">تاريخ الطلب</th>
                  <th className="py-space-sm px-space-md rounded-l-lg text-center">حالة الطلب</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {ORDERS.map(row => (
                  <tr key={row.no} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="py-space-sm px-space-md font-mono text-primary font-bold text-label-lg">{row.no}</td>
                    <td className="py-space-sm px-space-md">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">{row.branch}</span>
                    </td>
                    <td className="py-space-sm px-space-md text-body-md text-body-md text-on-surface">{row.item}</td>
                    <td className="py-space-sm px-space-md text-left font-body-md text-body-md text-on-surface font-mono font-bold">{row.qty}</td>
                    <td className="py-space-sm px-space-md text-center font-label-sm text-label-sm text-on-surface-variant">{row.date}</td>
                    <td className="py-space-sm px-space-md text-center">
                      <span className={BADGE[row.tone].box}>
                        {BADGE[row.tone].dot && <span className={BADGE[row.tone].dot}></span>}
                        {row.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
