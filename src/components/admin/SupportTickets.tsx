"use client";
import { useEffect, useState } from "react";
import {api} from "@/lib/api";

export default function SupportTicketsTable() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    api.get("/support").then(res => setTickets(res.data)).catch(console.error);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>المستخدم</th>
          <th>الموضوع</th>
          <th>الحالة</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(t => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.user?.name}</td>
            <td>{t.subject}</td>
            <td>{t.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
