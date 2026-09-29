"use client";

export default function Topbar() {
  return (
    <header className="fixed top-0 right-64 left-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)] z-40 flex items-center justify-between px-space-lg">
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md bg-surface-container-high px-space-sm py-space-xs rounded-lg">
          <span className="material-symbols-outlined text-[16px] text-primary">domain</span>
          <span>الفرع الرئيسي - الرياض</span>
        </div>
      </div>
      <div className="flex items-center gap-space-md">
        <button className="p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button">
          <span className="material-symbols-outlined text-[20px]">dark_mode</span>
        </button>
        <button className="relative p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" type="button">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-container"></span>
        </button>
        <div className="h-4 w-px bg-surface-container-highest"></div>
        <div className="flex items-center gap-space-sm">
          <div className="flex flex-col text-left">
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
