"use client";

export default function Topbar({ onMenuToggle }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:right-64 h-16 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)] z-40 flex items-center justify-between px-3 sm:px-space-lg">
      <div className="flex items-center gap-1.5 sm:gap-space-sm">
        {/* Hamburger – mobile only */}
        <button
          className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors shrink-0"
          onClick={onMenuToggle}
          type="button"
          aria-label="فتح القائمة"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md bg-surface-container-high px-2 sm:px-space-sm py-1 sm:py-space-xs rounded-lg">
          <span className="material-symbols-outlined text-[16px] text-primary">domain</span>
          <span className="hidden sm:inline">الفرع الرئيسي - الرياض</span>
          <span className="sm:hidden text-xs">الرياض</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-space-md">
        <button className="p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button">
          <span className="material-symbols-outlined text-[20px]">dark_mode</span>
        </button>
        <button className="relative p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-container"></span>
        </button>
        <div className="h-4 w-px bg-surface-container-highest hidden sm:block"></div>
        <div className="flex items-center gap-space-sm">
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-label-md text-label-md text-on-surface font-semibold">سمير عاشور</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">مدير النظام</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
