"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { APP_CONFIG } from "../../lib/config";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-margin">
      <main className="w-full max-w-md mx-auto">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden rounded-xl bg-surface-container-low shadow-xl p-space-lg sm:p-space-xl">
            <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary-container/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-secondary-container/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-space-md flex h-24 w-24 items-center justify-center rounded-xl bg-surface-container-lowest p-space-xs shadow-md">
                <img alt={APP_CONFIG.name} className="h-20 w-20 object-contain drop-shadow" src="/assets/images/logo.png" />
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                تسجيل الدخول
              </h1>
              <p className="mt-space-xs font-body-sm text-body-sm text-outline">
                {APP_CONFIG.subtitle}
              </p>
            </div>
            <form className="relative z-10 mt-space-lg flex flex-col gap-space-md" onSubmit={handleLogin}>
              <div className="flex flex-col gap-space-xs text-right">
                <label className="font-label-md text-label-md text-on-surface-variant flex items-center justify-between" htmlFor="username">
                  <span>اسم المستخدم</span>
                  <span className="font-label-sm text-label-sm text-outline">معرّف الموظف</span>
                </label>
                <div className="relative flex items-center">
                  <input className="w-full rounded-lg bg-surface-container-lowest px-space-md py-space-sm pr-10 text-right font-body-md text-body-md text-on-surface placeholder:text-outline/60 shadow-inner focus:outline-none focus:bg-surface-container-highest transition-colors" dir="rtl" id="username" placeholder="أدخل اسم المستخدم أو المعرف" required type="text" />
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 text-outline text-[20px]">
                    badge
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs text-right">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">
                    كلمة المرور
                  </label>
                  <a className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors" href="#">
                    نسيت كلمة المرور؟
                  </a>
                </div>
                <div className="relative flex items-center">
                  <input className="w-full rounded-lg bg-surface-container-lowest px-space-md py-space-sm pr-10 pl-10 text-right font-body-md text-body-md text-on-surface placeholder:text-outline/60 shadow-inner focus:outline-none focus:bg-surface-container-highest transition-colors" dir="rtl" id="password" placeholder="••••••••" required type={showPassword ? "text" : "password"} />
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 text-outline text-[20px]">
                    lock
                  </span>
                  <button aria-label="إظهار كلمة المرور" className="absolute left-3 flex items-center justify-center text-outline hover:text-on-surface transition-colors focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="mt-space-xs flex items-center justify-between">
                <label className="flex items-center gap-space-xs cursor-pointer select-none">
                  <input className="h-4 w-4 rounded bg-surface-container-lowest accent-primary-container cursor-pointer focus:outline-none" id="rememberMe" type="checkbox" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant">تذكر بيانات الجلسة</span>
                </label>
                <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-highest px-2 py-0.5 font-label-sm text-label-sm text-tertiary">
                  <span className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse"></span>
                  الخادم نشط
                </span>
              </div>
              <button className="mt-space-sm flex w-full items-center justify-center gap-space-xs rounded-lg bg-primary-container py-space-sm px-space-md font-headline-sm text-headline-sm text-on-primary-fixed shadow-md hover:bg-secondary-container active:scale-[0.99] transition-all group" type="submit">
                <span>تسجيل الدخول</span>
                <span className="material-symbols-outlined text-[22px] transition-transform group-hover:-translate-x-1">
                  arrow_back
                </span>
              </button>
            </form>
            <div className="relative z-10 mt-space-xl flex flex-col items-center gap-space-xs pt-space-md text-center">
              <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                <span>بيئة تشغيل آمنة للبيانات والعمليات التشغيلية</span>
              </div>
              <div className="flex items-center gap-space-sm text-outline font-body-sm text-body-sm opacity-60">
                <span>{APP_CONFIG.name} {APP_CONFIG.version}</span>
                <span>•</span>
                <span>{APP_CONFIG.tagline}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
