"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../lib/config";

export default function PlaceholderPage() {
  const pathname = usePathname();
  const currentItem = NAV_ITEMS.find((item) => item.path === pathname) || { label: "الصفحة", icon: "widgets" };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-space-lg">
      <span className="material-symbols-outlined text-[80px] text-surface-container-highest mb-space-md">
        {currentItem.icon}
      </span>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
        {currentItem.label}
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant">
        هذه الصفحة قريباً
      </p>
    </div>
  );
}
