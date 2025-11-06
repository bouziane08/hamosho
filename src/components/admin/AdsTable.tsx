"use client";
import { useEffect, useState } from "react";
import {api} from "@/lib/api";

interface Ad {
  id: string;
  title: string;
  imageUrl: string;
  isActive: boolean;
}

export default function AdsTable() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    api.get("/ads").then(res => setAds(res.data));
  }, []);

  const deleteAd = async (id: string) => {
    if (!confirm("هل تريد حذف الإعلان؟")) return;
    await api.delete(`/ads/${id}`);
    setAds(ads.filter(a => a.id !== id));
  };

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>العنوان</th>
          <th>الصورة</th>
          <th>نشط</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {ads.map(a => (
          <tr key={a.id}>
            <td>{a.title}</td>
            <td><img src={a.imageUrl} className="w-16"/></td>
            <td>{a.isActive ? "✅" : "❌"}</td>
            <td>
              <button onClick={() => deleteAd(a.id)} className="bg-red-600 text-white px-2 py-1 rounded">حذف</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
