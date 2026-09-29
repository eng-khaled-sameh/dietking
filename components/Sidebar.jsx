"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../lib/config";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
      <div className="px-space-lg mb-space-lg flex items-center gap-space-sm">
        <img alt="دايت كينج" className="h-8 w-auto object-contain" src="/assets/images/logo.png" />
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight">دايت كينج</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">نظام إدارة المطاعم</span>
        </div>
      </div>
      <nav className="flex-1 px-space-sm flex flex-col gap-space-xs">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-space-sm px-space-md py-space-sm transition-colors ${
                isActive 
                  ? "bg-primary-container text-on-primary-container font-label-lg rounded-lg shadow-sm"
                  : "rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-md text-body-md"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
