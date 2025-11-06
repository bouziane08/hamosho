"use client";

import NewsBar from "@/components/home/NewsBar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Deals from "@/components/home/Deals";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import Brands from "@/components/home/Brands";
import Newsletter from "@/components/home/Newsletter";
import Guarantees from "@/components/home/Guarantees";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ✅ شريط إخباري */}
      <NewsBar />

      {/* ✅ السلايدر الرئيسي */}
      <Hero />

      {/* ✅ الأقسام */}
      <Categories />

      {/* ✅ عروض اليوم */}
      <Deals />

      {/* ✅ منتجات مختارة */}
      <FeaturedProducts />

      {/* ✅ الأكثر مبيعًا */}
      <BestSellers />

      {/* ✅ آراء العملاء */}
      <Testimonials />

      {/* ✅ شركاؤنا */}
      <Brands />

      {/* ✅ دعوة لاتخاذ إجراء */}
      <CTA />

      {/* ✅ ضمانات */}
      <Guarantees />

      {/* ✅ النشرة البريدية */}
      <Newsletter />
    </div>
  );
}
