"use client";
import { useEffect, useState } from "react";
import {api} from "@/lib/api";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  used: boolean;
}

export default function CouponsTable() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => { api.get("/coupons").then(res => setCoupons(res.data)); }, []);

  return (
    <table className="w-full border">
      <thead>
        <tr><th>الكود</th><th>الخصم</th><th>تم الاستخدام</th></tr>
      </thead>
      <tbody>
        {coupons.map(c => (
          <tr key={c.id}>
            <td>{c.code}</td>
            <td>{c.discount}</td>
            <td>{c.used ? "✅" : "❌"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
