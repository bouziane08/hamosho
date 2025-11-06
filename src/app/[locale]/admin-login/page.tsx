"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function AdminLogin() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res: any = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      // جلب الـ session بعد تسجيل الدخول للتأكد من role
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      if (sessionData?.user?.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        setError("ليس لديك صلاحية الدخول كـ Admin");
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme}`}>
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-96 dark:bg-gray-800 dark:text-white">
        <h1 className="text-2xl font-bold mb-4">تسجيل دخول Admin</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          تسجيل الدخول
        </button>

        {/* زر لتغيير الثيم */}
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-4 w-full p-2 border rounded"
        >
          تبديل الوضع {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </form>
    </div>
  );
}
