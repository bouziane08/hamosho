"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProducts() {
  const t = useTranslations("home.featured");

  const products = [
    {
      id: 1,
      name: "MacBook Air M3",
      price: 1299,
      image: "/images/featured/macbook.jpg",
      href: "/products/macbook-air-m3",
    },
    {
      id: 2,
      name: "Sony 4K Camera",
      price: 899,
      image: "/images/featured/camera.jpg",
      href: "/products/sony-camera",
    },
    {
      id: 3,
      name: "Smart Refrigerator",
      price: 1499,
      image: "/images/featured/fridge.jpg",
      href: "/products/smart-fridge",
    },
    {
      id: 4,
      name: "Fitness Treadmill",
      price: 799,
      image: "/images/featured/treadmill.jpg",
      href: "/products/treadmill",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">{t("title")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={product.href}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600">
                {product.name}
              </h3>
              <span className="text-blue-600 font-bold mt-2 block">${product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
