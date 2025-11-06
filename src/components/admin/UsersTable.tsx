"use client";
import { useEffect, useState } from "react";
import {api} from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert("خطأ في تحميل المستخدمين");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("خطأ في الحذف");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>الاسم</th>
          <th>البريد الإلكتروني</th>
          <th>الدور</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                حذف
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
