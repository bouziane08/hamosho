"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Hero() {
  const t = useTranslations("home.hero");

  const slides = [
    {
      id: 1,
      title: t("slide1.title"),
      subtitle: t("slide1.subtitle"),
      image: "/images/banner1.jpg",
    },
    {
      id: 2,
      title: t("slide2.title"),
      subtitle: t("slide2.subtitle"),
      image: "/images/banner2.jpg",
    },
    {
      id: 3,
      title: t("slide3.title"),
      subtitle: t("slide3.subtitle"),
      image: "/images/banner3.jpg",
    },
  ];

  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full w-full bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black/50 p-6 rounded-lg text-center max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
