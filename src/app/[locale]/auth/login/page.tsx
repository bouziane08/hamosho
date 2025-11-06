// src/app/[locale]/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const t = useTranslations("login");
  const router = useRouter();
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || t("loginFailed"));
      } else {
        if (res?.ok) {
          // جلب جلسة المستخدم من NextAuth
          const session = await fetch("/api/auth/session").then(r => r.json());
          const access_token = (session.user as any)?.access_token ?? "";
          const role = (session.user as any)?.role ?? "user";

          // تخزين الـ token والدور
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("role", role);

          // إعادة التوجيه حسب الدور
          if (role === "admin") router.push(`/${locale}/dashboard`);
          else router.push(`/${locale}/products`);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || t("loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t("login")}</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">{t("email")}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">{t("password")}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition disabled:opacity-50"
          >
            {loading ? t("loading") : t("login")}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          {t("noAccount")}{" "}
          <a href={`/${locale}/register`} className="text-blue-600 hover:underline">
            {t("register")}
          </a>
        </p>
      </div>
    </div>
  );
}
