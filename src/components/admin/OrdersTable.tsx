"use client";
import { useEffect, useState } from "react";
import {api} from "@/lib/api";

interface Order {
  id: string;
  total: number;
  status: string;
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>رقم الطلب</th>
          <th>المجموع</th>
          <th>الحالة</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(o => (
          <tr key={o.id}>
            <td>{o.id}</td>
            <td>{o.total}</td>
            <td>{o.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
