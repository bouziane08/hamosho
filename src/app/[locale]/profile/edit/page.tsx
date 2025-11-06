"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const locale = useLocale();

  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [preview, setPreview] = useState<string | null>(session?.user?.image || null);
  const [loading, setLoading] = useState(false);

  // اختيار صورة جديدة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setImage(file as any); // نخليها تروح للباك
    }
  };

  // حفظ التعديلات
  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image instanceof File) {
        formData.append("image", image);
      }

      const res = await fetch("http://localhost:3001/users/update-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();

      // تحديث السيشن (حتى يبان في الهيدر مباشرة)
      await update({
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          image: data.image,
        },
      });

      router.push(`/${locale}/profile`);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء تحديث البروفايل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-6">
      <h1 className="text-xl font-bold mb-4">تعديل الملف الشخصي</h1>

      {/* صورة البروفايل */}
      <div className="flex items-center gap-4 mb-4">
        {preview ? (
          <Image
            src={preview}
            alt="Avatar"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">No Image</span>
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {/* الاسم */}
      <div className="mb-4">
        <label className="block text-sm mb-1">الاسم</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 dark:bg-gray-800"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
      </button>
    </div>
  );
}
