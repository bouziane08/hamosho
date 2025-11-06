"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (!token || role?.toUpperCase() !== "ADMIN") {
      router.push(`/${locale}/login`);
    } else {
      setLoading(false);
    }
  }, [router, locale]);

  if (loading) return <div className="text-center mt-20">جار التحقق من الصلاحيات...</div>;

  return <>{children}</>;
}
