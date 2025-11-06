"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const t = useTranslations("home.testimonials");

  const reviews = [
    {
      id: 1,
      name: "أحمد بن علي",
      comment: "خدمة رائعة وتوصيل سريع! أنصح الجميع بالشراء من هذا المتجر.",
      rating: 5,
      image: "/images/users/user1.jpg",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      comment: "Great quality products and excellent customer support.",
      rating: 4,
      image: "/images/users/user2.jpg",
    },
    {
      id: 3,
      name: "Jean Dupont",
      comment: "Livraison rapide et produits de très bonne qualité.",
      rating: 5,
      image: "/images/users/user3.jpg",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 relative mb-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {review.comment}
              </p>
              <div className="flex justify-center gap-1 mt-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
