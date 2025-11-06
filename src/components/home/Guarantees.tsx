"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Laptop, Shirt, Watch, ShoppingBag, Heart } from "lucide-react";

export default function Categories() {
  const t = useTranslations("home.categories");

  const categories = [
    { id: "electronics", name: t("electronics"), icon: <Laptop size={32} />, href: "/products?cat=electronics" },
    { id: "fashion", name: t("fashion"), icon: <Shirt size={32} />, href: "/products?cat=fashion" },
    { id: "beauty", name: t("beauty"), icon: <Heart size={32} />, href: "/products?cat=beauty" },
    { id: "accessories", name: t("accessories"), icon: <Watch size={32} />, href: "/products?cat=accessories" },
    { id: "more", name: t("more"), icon: <ShoppingBag size={32} />, href: "/categories" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t("title")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-blue-600 dark:text-blue-400 mb-3">{cat.icon}</div>
            <span className="font-medium">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
