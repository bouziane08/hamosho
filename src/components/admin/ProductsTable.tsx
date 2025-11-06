"use client";
import { useEffect, useState } from "react";
import {api} from "@/lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: { url: string }[];
}

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      alert("خطأ في تحميل المنتجات");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("خطأ في الحذف");
    }
  };

  const uploadProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("اختر صورة أولاً");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProducts();
    } catch (err) {
      alert("خطأ في رفع الصورة");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <>
      <form onSubmit={uploadProduct} className="mb-4">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit" className="ml-2 bg-green-600 text-white px-2 py-1 rounded">
          رفع صورة
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>السعر</th>
            <th>المخزون</th>
            <th>الصورة</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                {p.images[0] && <img src={p.images[0].url} alt="" className="w-16" />}
              </td>
              <td>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
