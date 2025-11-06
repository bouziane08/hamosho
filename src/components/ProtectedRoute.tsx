"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push(`/${locale}/login`);
    } else {
      setLoading(false);
    }
  }, [router, locale]);

  if (loading) return <div className="text-center mt-20">جار التحميل...</div>;

  return <>{children}</>;
}
