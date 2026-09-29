"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      {/* Mobile backdrop overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pr-64">
        <Topbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <main className="relative pt-16 bg-surface w-full px-4 sm:px-6 lg:px-margin py-space-md">
          {children}
        </main>
      </div>
    </div>
  );
}
