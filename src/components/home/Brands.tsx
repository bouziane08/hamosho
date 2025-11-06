"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Brands() {
  const t = useTranslations("home.brands");

  const logos = [
    { id: 1, name: "Apple", src: "/images/brands/apple.png" },
    { id: 2, name: "Samsung", src: "/images/brands/samsung.png" },
    { id: 3, name: "Nike", src: "/images/brands/nike.png" },
    { id: 4, name: "Adidas", src: "/images/brands/adidas.png" },
    { id: 5, name: "Sony", src: "/images/brands/sony.png" },
    { id: 6, name: "LG", src: "/images/brands/lg.png" },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {t("title")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center">
          {logos.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={100}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
