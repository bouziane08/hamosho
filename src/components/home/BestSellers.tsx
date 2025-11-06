"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

export default function BestSellers() {
  const t = useTranslations("home.bestSellers");

  const products = [
    {
      id: 1,
      name: "Samsung Galaxy S24",
      price: 899,
      image: "/images/s24.jpg",
      href: "/products/s24",
    },
    {
      id: 2,
      name: "AirPods Pro 2",
      price: 249,
      image: "/images/airpods.jpg",
      href: "/products/airpods-pro-2",
    },
    {
      id: 3,
      name: "4K Smart TV",
      price: 699,
      image: "/images/tv.jpg",
      href: "/products/smart-tv",
    },
    {
      id: 4,
      name: "PlayStation 5",
      price: 499,
      image: "/images/ps5.jpg",
      href: "/products/ps5",
    },
    {
      id: 5,
      name: "Kindle Paperwhite",
      price: 129,
      image: "/images/kindle.jpg",
      href: "/products/kindle",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">{t("title")}</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation
        autoplay={{ delay: 3500 }}
        loop={true}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              href={product.href}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center"
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium text-center">{product.name}</h3>
              <span className="text-red-600 font-bold mt-2">${product.price}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
