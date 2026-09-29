"use client";
import { useState } from "react";

const TYPE_BADGES = {
  "إيجار": { box: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-950/80 text-indigo-300", dot: "w-1.5 h-1.5 rounded-full bg-indigo-400" },
  "رواتب": { box: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 text-emerald-300", dot: "w-1.5 h-1.5 rounded-full bg-emerald-400" },
  "كهرباء ومياه": { box: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-950/80 text-cyan-300", dot: "w-1.5 h-1.5 rounded-full bg-cyan-400" },
  "صيانة": { box: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-orange-950/80 text-orange-300", dot: "w-1.5 h-1.5 rounded-full bg-orange-400" },
  "نقل": { box: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-950/80 text-amber-300", dot: "w-1.5 h-1.5 rounded-full bg-amber-400" },
  "مشتريات أخرى": { box: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-surface-variant text-on-surface-variant", dot: "w-1.5 h-1.5 rounded-full bg-outline" },
  "أخرى": { box: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-950/80 text-rose-300", dot: "w-1.5 h-1.5 rounded-full bg-rose-400" },
};

const BRANCHES = [
  "فرع التحلية - الرياض",
  "فرع العليا - الرياض",
  "فرع الياسمين - الرياض",
  "فرع طريق الملك - جدة",
  "فرع الروضة - جدة",
  "فرع الشاطئ - الدمام",
  "فرع الخبر الشمالية",
  "فرع العزيزية - مكة",
  "فرع سلطانة - المدينة المنورة",
];

const TYPES = ["إيجار", "كهرباء ومياه", "رواتب", "صيانة", "نقل", "مشتريات أخرى", "أخرى"];

const INITIAL_EXPENSES = [
  { id: 1, date: "2024-10-24", branch: "فرع التحلية - الرياض", type: "إيجار", desc: "إيجار مقر الفرع للربع الأخير", amount: "25,000 ر.س" },
  { id: 2, date: "2024-10-23", branch: "فرع التحلية - الرياض", type: "رواتب", desc: "رواتب طهاة فرع التحلية", amount: "18,500 ر.س" },
  { id: 3, date: "2024-10-22", branch: "فرع العليا - الرياض", type: "كهرباء ومياه", desc: "فاتورة كهرباء شهر أكتوبر للمطبخ المركزي", amount: "4,200 ر.س" },
  { id: 4, date: "2024-10-21", branch: "فرع طريق الملك - جدة", type: "صيانة", desc: "صيانة دورية لثلاجات التبريد", amount: "1,350 ر.س" },
  { id: 5, date: "2024-10-20", branch: "فرع الشاطئ - الدمام", type: "نقل", desc: "وقود وتوصيل مركبات النقل المبردة", amount: "850 ر.س" },
  { id: 6, date: "2024-10-19", branch: "فرع الياسمين - الرياض", type: "مشتريات أخرى", desc: "أدوات تغليف ورقية وتجهيزات تقديم صحية", amount: "3,120 ر.س" },
  { id: 7, date: "2024-10-18", branch: "فرع العزيزية - مكة", type: "أخرى", desc: "رسوم تجديد التراخيص البلدية والشهادات الصحية", amount: "1,830 ر.س" },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBranch, setModalBranch] = useState("");
  const [modalType, setModalType] = useState("");
  const [modalAmount, setModalAmount] = useState("");
  const [modalDate, setModalDate] = useState("2024-10-24");
  const [modalDescription, setModalDescription] = useState("");
  const [modalNotes, setModalNotes] = useState("");
  const [nextId, setNextId] = useState(8);

  const query = search.toLowerCase().trim();
  const visible = expenses.filter((r) => {
    const matchesBranch = !branchFilter || r.branch === branchFilter;
    const matchesType = !typeFilter || r.type === typeFilter;
    const matchesSearch = !query || r.desc.toLowerCase().includes(query) || r.branch.toLowerCase().includes(query);
    return matchesBranch && matchesType && matchesSearch;
  });

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalBranch("");
    setModalType("");
    setModalAmount("");
    setModalDate("2024-10-24");
    setModalDescription("");
    setModalNotes("");
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  function handleDelete(id) {
    if (window.confirm("هل أنت متأكد من حذف هذا المصروف؟")) {
      setExpenses(expenses.filter((r) => r.id !== id));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newRow = {
      id: nextId,
      date: modalDate,
      branch: modalBranch,
      type: modalType,
      desc: modalDescription,
      amount: Number(modalAmount).toLocaleString("en-US") + " ر.س",
    };
    setExpenses([newRow, ...expenses]);
    setNextId(nextId + 1);
    closeModal();
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shadow-sm">
            <span className="material-symbols-outlined text-2xl">receipt_long</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">المصروفات</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">إدارة وتسجيل وتتبع مصروفات فروع دايت كينج التشغيلية والرأسمالية</p>
          </div>
        </div>
        <div>
          <button className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-primary-container hover:bg-inverse-primary text-on-primary font-label-lg text-label-lg transition-all shadow-sm active:scale-95 cursor-pointer" id="openAddModalBtn" onClick={openModal} type="button">
            <span className="material-symbols-outlined text-lg leading-none">add</span>
            <span>إضافة مصروف</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-lg">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant">إجمالي المصروفات</span>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-display-lg text-display-lg text-on-surface tracking-tight">64,850</span>
                <span className="font-label-md text-label-md text-primary font-bold">ر.س</span>
              </div>
              <span className="font-body-sm text-body-sm text-tertiary mt-space-xs flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm">trending_down</span>
                <span>معدل ضبط الميزانية -4.2% مقارنة بالشهر السابق</span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant">عدد المصروفات</span>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-display-lg text-display-lg text-secondary tracking-tight">48</span>
                <span className="font-label-md text-label-md text-on-surface-variant">عملية مسجلة</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm">event_repeat</span>
                <span>محدثة لجميع الفروع النشطة حتى اليوم</span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl">receipt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="rounded-xl bg-surface-container-low p-space-md mb-space-md shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
          <div className="md:col-span-5 relative">
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            <input
              className="w-full bg-surface text-on-surface font-body-md text-body-md pl-space-md pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container transition-all placeholder:text-on-surface-variant/60"
              id="searchInput"
              placeholder="بحث في الوصف أو الفرع..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="md:col-span-4 relative">
            <select
              className="w-full bg-surface text-on-surface font-body-md text-body-md px-space-md py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer"
              id="branchFilter"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="">كل الفروع (9 فروع)</option>
              <option value="فرع التحلية - الرياض">فرع التحلية - الرياض</option>
              <option value="فرع العليا - الرياض">فرع العليا - الرياض</option>
              <option value="فرع الياسمين - الرياض">فرع الياسمين - الرياض</option>
              <option value="فرع طريق الملك - جدة">فرع طريق الملك - جدة</option>
              <option value="فرع الروضة - جدة">فرع الروضة - جدة</option>
              <option value="فرع الشاطئ - الدمام">فرع الشاطئ - الدمام</option>
              <option value="فرع الخبر الشمالية">فرع الخبر الشمالية</option>
              <option value="فرع العزيزية - مكة">فرع العزيزية - مكة</option>
              <option value="فرع سلطانة - المدينة المنورة">فرع سلطانة - المدينة المنورة</option>
            </select>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-base">expand_more</span>
          </div>
          <div className="md:col-span-3 relative">
            <select
              className="w-full bg-surface text-on-surface font-body-md text-body-md px-space-md py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer"
              id="typeFilter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">جميع أنواع المصروفات</option>
              <option value="إيجار">إيجار</option>
              <option value="كهرباء ومياه">كهرباء ومياه</option>
              <option value="رواتب">رواتب</option>
              <option value="صيانة">صيانة</option>
              <option value="نقل">نقل</option>
              <option value="مشتريات أخرى">مشتريات أخرى</option>
              <option value="أخرى">أخرى</option>
            </select>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-base">expand_more</span>
          </div>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="rounded-xl bg-surface-container-low shadow-sm overflow-hidden mb-space-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse" id="expensesTable">
            <thead>
              <tr className="bg-surface-container font-label-md text-label-md text-on-surface-variant">
                <th className="py-3 px-space-md text-right">التاريخ</th>
                <th className="py-3 px-space-md text-right">الفرع</th>
                <th className="py-3 px-space-md text-right">نوع المصروف</th>
                <th className="py-3 px-space-md text-right">الوصف</th>
                <th className="py-3 px-space-md text-left">القيمة</th>
                <th className="py-3 px-space-md text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest/20 font-body-md text-body-md text-on-surface">
              {visible.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container/60 transition-colors expense-row">
                  <td className="py-3.5 px-space-md whitespace-nowrap text-on-surface-variant font-label-md">{row.date}</td>
                  <td className="py-3.5 px-space-md font-label-lg whitespace-nowrap">{row.branch}</td>
                  <td className="py-3.5 px-space-md whitespace-nowrap">
                    <span className={TYPE_BADGES[row.type]?.box || "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-surface-variant text-on-surface-variant"}>
                      <span className={TYPE_BADGES[row.type]?.dot || "w-1.5 h-1.5 rounded-full bg-outline"}></span>
                      {row.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-space-md min-w-[240px]">{row.desc}</td>
                  <td className="py-3.5 px-space-md text-left font-bold text-on-surface whitespace-nowrap">{row.amount}</td>
                  <td className="py-3.5 px-space-md whitespace-nowrap text-center">
                    <div className="inline-flex items-center gap-space-xs">
                      <button aria-label="تعديل" className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button aria-label="حذف" className="delete-btn w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-surface-container transition-colors" onClick={() => handleDelete(row.id)} type="button">
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between p-space-md bg-surface-container-low font-body-sm text-body-sm text-on-surface-variant gap-space-sm">
          <div id="tableCountText">عرض {visible.length} من أصل 48 مصروف</div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded bg-surface text-on-surface-variant/40 cursor-not-allowed" disabled type="button">السابق</button>
            <button className="px-3 py-1 rounded bg-primary-container text-on-primary font-bold" type="button">1</button>
            <button className="px-3 py-1 rounded hover:bg-surface text-on-surface transition-colors" type="button">2</button>
            <button className="px-3 py-1 rounded hover:bg-surface text-on-surface transition-colors" type="button">3</button>
            <button className="px-2.5 py-1 rounded hover:bg-surface text-on-surface transition-colors" type="button">التالي</button>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-space-md" id="addExpenseModal" onClick={handleBackdropClick}>
          <div className="relative w-full max-w-2xl bg-surface-container-low rounded-xl shadow-xl overflow-hidden">
            <div className="h-14 px-space-lg bg-surface-container flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-on-surface">
                <span className="material-symbols-outlined text-primary-container">receipt_long</span>
                <h2 className="font-headline-sm text-headline-sm">إضافة مصروف جديد</h2>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors" id="closeModalCross" onClick={closeModal} type="button">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <form className="p-space-lg flex flex-col gap-space-md" id="addExpenseForm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant">اختيار الفرع <span className="text-error">*</span></label>
                  <div className="relative">
                    <select className="w-full bg-surface text-on-surface font-body-md text-body-md px-space-md py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer" id="modalBranch" required value={modalBranch} onChange={(e) => setModalBranch(e.target.value)}>
                      <option disabled value="">حدد الفرع التابع له المصروف</option>
                      {BRANCHES.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-base">expand_more</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant">نوع المصروف <span className="text-error">*</span></label>
                  <div className="relative">
                    <select className="w-full bg-surface text-on-surface font-body-md text-body-md px-space-md py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none cursor-pointer" id="modalType" required value={modalType} onChange={(e) => setModalType(e.target.value)}>
                      <option disabled value="">حدد تصنيف المصروف</option>
                      {TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-base">expand_more</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant">قيمة المصروف (ر.س) <span className="text-error">*</span></label>
                  <div className="relative">
                    <input className="w-full bg-surface text-on-surface font-body-md text-body-md px-space-md py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container" id="modalAmount" min="0" placeholder="0.00" required step="0.01" type="number" value={modalAmount} onChange={(e) => setModalAmount(e.target.value)} />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant">ر.س</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant">التاريخ <span className="text-error">*</span></label>
                  <input className="w-full bg-surface text-on-surface font-body-md text-body-md px-space-md py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container" id="modalDate" required type="date" value={modalDate} onChange={(e) => setModalDate(e.target.value)} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">وصف المصروف <span className="text-error">*</span></label>
                <input className="w-full bg-surface text-on-surface font-body-md text-body-md px-space-md py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container" id="modalDescription" placeholder="مثال: فاتورة صيانة أجهزة التبريد للمطبخ" required type="text" value={modalDescription} onChange={(e) => setModalDescription(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">ملاحظات إضافية</label>
                <textarea className="w-full bg-surface text-on-surface font-body-md text-body-md p-space-md rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container resize-none" id="modalNotes" placeholder="أدخل أية تفاصيل تعاقدية، رقم سند، أو إيصال هنا..." rows={3} value={modalNotes} onChange={(e) => setModalNotes(e.target.value)}></textarea>
              </div>
              <div className="flex items-center justify-end gap-space-sm pt-space-sm mt-space-xs">
                <button className="px-space-md py-2 rounded-lg bg-surface hover:bg-surface-variant text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors cursor-pointer" id="closeModalBtn" onClick={closeModal} type="button">
                  إلغاء
                </button>
                <button className="px-space-lg py-2 rounded-lg bg-primary-container hover:bg-inverse-primary text-on-primary font-label-md text-label-md transition-all shadow-sm active:scale-95 cursor-pointer" type="submit">
                  حفظ المصروف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
