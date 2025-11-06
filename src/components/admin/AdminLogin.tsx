"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {api} from "@/lib/api";
import { toast } from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      toast.success("تم تسجيل الدخول بنجاح!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "خطأ في تسجيل الدخول");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 border rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">تسجيل دخول Admin</h1>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded">
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}
