"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash2, CreditCard, Wallet } from "lucide-react";
import axios from "axios";

interface Payment {
  id: string;
  type: string;
  last4?: string;
  email?: string;
}

interface PaymentsProps {
  payments: Payment[];
  token: string | null;
  setPayments: (payments: Payment[]) => void;
}

export default function Payments({ payments, token, setPayments }: PaymentsProps) {
  const addPayment = async () => {
    if (!token) return;
    const newPay = { type: "Visa", last4: "1234", expiry: "12/26" };
    const res = await axios.post("http://localhost:3001/payments", newPay, { headers: { Authorization: `Bearer ${token}` } });
    setPayments([...payments, res.data.payment]);
  };

  const deletePayment = async (id: string) => {
    if (!token) return;
    await axios.delete(`http://localhost:3001/payments/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setPayments(payments.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-3">
      <Button onClick={addPayment}><Plus /> إضافة وسيلة دفع</Button>
      {payments.map(p => (
        <div key={p.id} className="border rounded-lg p-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {p.type === "PayPal" ? <Wallet /> : <CreditCard />}
            <div>{p.type} {p.last4 && `•••• ${p.last4}`}</div>
          </div>
          <Button variant="destructive" onClick={() => deletePayment(p.id)}><Trash2 /></Button>
        </div>
      ))}
    </div>
  );
}
