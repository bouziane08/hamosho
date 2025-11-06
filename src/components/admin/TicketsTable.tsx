"use client";
import { useEffect, useState } from "react";
import {api} from "@/lib/api";

interface Ticket {
  id: string;
  subject: string;
  status: string;
}

export default function TicketsTable() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => { api.get("/tickets").then(res => setTickets(res.data)); }, []);

  return (
    <table className="w-full border">
      <thead>
        <tr><th>الموضوع</th><th>الحالة</th></tr>
      </thead>
      <tbody>
        {tickets.map(t => (
          <tr key={t.id}><td>{t.subject}</td><td>{t.status}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
