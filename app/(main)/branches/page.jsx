const BRANCHES = [
  { id: 1, name: "فرع التحلية", city: "الرياض", phone: "0114567890", active: true },
  { id: 2, name: "فرع العليا", city: "الرياض", phone: "0112345678", active: true },
  { id: 3, name: "فرع طريق الملك", city: "جدة", phone: "0126789012", active: true },
  { id: 4, name: "فرع الخبر الكورنيش", city: "الخبر", phone: "0138901234", active: true },
  { id: 5, name: "فرع الشاطئ", city: "الدمام", phone: "0138765432", active: true },
  { id: 6, name: "فرع السليمانية", city: "الرياض", phone: "0113456789", active: false },
]

export default function BranchesPage() {
  return (
    <div className="flex flex-col w-full py-space-lg">
      <div className="flex items-center justify-between mb-space-lg">
        <div className="flex flex-col gap-space-xs">
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">الفروع</h1>
          <span className="font-body-sm text-body-sm text-on-surface-variant">إدارة مواقع ومنافذ تقديم وجبات دايت كينج</span>
        </div>
        <button className="inline-flex items-center gap-space-xs bg-primary-container hover:bg-inverse-primary text-on-primary font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-colors shadow-sm cursor-pointer" type="button">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>إضافة فرع</span>
        </button>
      </div>
      <div className="w-full bg-surface-container rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-surface-container-high">
                <th className="py-space-md px-space-lg font-label-md text-label-md text-on-surface-variant font-bold" scope="col">اسم الفرع</th>
                <th className="py-space-md px-space-lg font-label-md text-label-md text-on-surface-variant font-bold" scope="col">المدينة</th>
                <th className="py-space-md px-space-lg font-label-md text-label-md text-on-surface-variant font-bold" scope="col">رقم الهاتف</th>
                <th className="py-space-md px-space-lg font-label-md text-label-md text-on-surface-variant font-bold text-center" scope="col">الحالة</th>
                <th className="py-space-md px-space-lg font-label-md text-label-md text-on-surface-variant font-bold text-center" scope="col">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest/20 font-body-md text-body-md text-on-surface">
              {BRANCHES.map(branch => (
                <tr key={branch.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-space-md px-space-lg">
                    <div className="flex items-center gap-space-sm">
                      <span className={`w-2 h-2 rounded-full ${branch.active ? "bg-primary" : "bg-surface-container-highest"}`}></span>
                      <span className={`font-body-lg text-body-lg font-semibold ${branch.active ? "text-on-surface" : "text-on-surface-variant"}`}>{branch.name}</span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-lg text-on-surface-variant font-body-md text-body-md">{branch.city}</td>
                  <td className={`py-space-md px-space-lg font-body-md text-body-md ${branch.active ? "text-on-surface" : "text-on-surface-variant"} dir-ltr text-right`}>{branch.phone}</td>
                  <td className="py-space-md px-space-lg text-center">
                    <span className={`inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full ${branch.active ? "bg-tertiary-container/15 text-tertiary" : "bg-error-container/20 text-error"} font-label-sm text-label-sm`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${branch.active ? "bg-tertiary" : "bg-error"}`}></span>
                      {branch.active ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                  <td className="py-space-md px-space-lg text-center">
                    <div className="inline-flex items-center justify-center gap-space-sm">
                      <button className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md cursor-pointer" type="button">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        <span>تعديل</span>
                      </button>
                      <span className="text-surface-container-highest">|</span>
                      <button className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-error transition-colors font-label-md text-label-md cursor-pointer" type="button">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
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
  )
}
