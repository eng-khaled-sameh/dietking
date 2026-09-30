"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      } else {
        setError("حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة لاحقاً");
      }
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8 dir-rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-on-surface font-headline-lg">
          دايت كينج
        </h2>
        <p className="mt-2 text-center text-sm text-on-surface-variant font-body-md">
          تسجيل الدخول للنظام
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-container py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-on-surface font-label-md">
                البريد الإلكتروني
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-surface-container-highest rounded-md shadow-sm placeholder-on-surface-variant bg-surface-container-high focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-on-surface dir-ltr"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-on-surface font-label-md">
                كلمة المرور
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-surface-container-highest rounded-md shadow-sm placeholder-on-surface-variant bg-surface-container-high focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-on-surface dir-ltr"
                />
              </div>
            </div>
            
            {error && (
              <div className="text-error font-body-sm bg-error-container/20 p-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-on-primary bg-primary hover:bg-inverse-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 cursor-pointer"
              >
                {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
