"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, MapPin } from "lucide-react";
import axios from "axios";

interface Address {
  id: string;
  label: string;
  details: string;
  phone: string;
}

interface AddressesProps {
  addresses: Address[];
  token: string | null;
  setAddresses: (addresses: Address[]) => void;
}

export default function Addresses({ addresses, token, setAddresses }: AddressesProps) {
  const addAddress = async () => {
    if (!token) return;
    const newAddress = { label: "عنوان جديد", details: "تفاصيل", phone: "+213 000 000 000" };
    const res = await axios.post("http://localhost:3001/addresses", newAddress, { headers: { Authorization: `Bearer ${token}` } });
    setAddresses([...addresses, res.data.address]);
  };

  const editAddress = async (id: string) => {
    if (!token) return;
    const updated = { label: "تم التعديل", details: "تم تعديل التفاصيل", phone: "+213 111 111 111" };
    const res = await axios.put(`http://localhost:3001/addresses/${id}`, updated, { headers: { Authorization: `Bearer ${token}` } });
    setAddresses(addresses.map(addr => (addr.id === id ? res.data.address : addr)));
  };

  const deleteAddress = async (id: string) => {
    if (!token) return;
    await axios.delete(`http://localhost:3001/addresses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="space-y-3">
      <Button onClick={addAddress} className="mb-2"><Plus /> إضافة عنوان</Button>
      {addresses.map(addr => (
        <div key={addr.id} className="border rounded-lg p-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <MapPin /> 
            <div>
              <p>{addr.label}</p>
              <p>{addr.details}</p>
              <p>{addr.phone}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => editAddress(addr.id)}><Edit2 /> تعديل</Button>
            <Button variant="destructive" onClick={() => deleteAddress(addr.id)}><Trash2 /></Button>
          </div>
        </div>
      ))}
    </div>
  );
}
