"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Deals() {
  const t = useTranslations("home.deals");

  const deals = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 1199,
      oldPrice: 1399,
      image: "/images/iphone15.jpg",
      href: "/products/iphone-15-pro",
    },
    {
      id: 2,
      name: "Gaming Laptop",
      price: 999,
      oldPrice: 1299,
      image: "/images/laptop.jpg",
      href: "/products/gaming-laptop",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 199,
      oldPrice: 299,
      image: "/images/watch.jpg",
      href: "/products/smart-watch",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      price: 149,
      oldPrice: 249,
      image: "/images/headphones.jpg",
      href: "/products/headphones",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t("title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {deals.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain rounded"
              />
            </div>
            <h3 className="font-medium text-lg mb-2">{item.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold">${item.price}</span>
              <span className="text-gray-400 line-through text-sm">${item.oldPrice}</span>
            </div>
            <span className="mt-2 inline-block text-sm bg-red-500 text-white px-2 py-1 rounded">
              {t("discount")}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
