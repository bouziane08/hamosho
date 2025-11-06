"use client";

import { useTranslations } from "next-intl";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* ✅ القسم 1: شعار + وصف */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">شامو شو</h2>
          <p className="text-sm leading-6">
            {t("description") || "أفضل متجر إلكتروني يقدم منتجات مختارة بعناية بجودة عالية وخدمة سريعة."}
          </p>
        </div>

        {/* ✅ القسم 2: روابط سريعة */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">{t("quickLinks") || "روابط سريعة"}</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition">{t("home") || "الرئيسية"}</Link></li>
            <li><Link href="/products" className="hover:text-white transition">{t("products") || "المنتجات"}</Link></li>
            <li><Link href="/offers" className="hover:text-white transition">{t("offers") || "العروض"}</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">{t("contact") || "اتصل بنا"}</Link></li>
          </ul>
        </div>

        {/* ✅ القسم 3: النشرة البريدية */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">{t("newsletter") || "اشترك في النشرة"}</h3>
          <p className="text-sm mb-3">{t("newsletterDesc") || "احصل على آخر العروض والتخفيضات عبر بريدك الإلكتروني."}</p>
          <form className="flex">
            <input
              type="email"
              placeholder={t("yourEmail") || "بريدك الإلكتروني"}
              className="w-full px-3 py-2 rounded-l bg-gray-800 border border-gray-700 text-white focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-white">
              {t("subscribe") || "اشترك"}
            </button>
          </form>
        </div>

        {/* ✅ القسم 4: تواصل اجتماعي */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">{t("followUs") || "تابعنا"}</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-white transition"><Facebook size={22} /></a>
            <a href="#" className="hover:text-white transition"><Instagram size={22} /></a>
            <a href="#" className="hover:text-white transition"><Twitter size={22} /></a>
            <a href="#" className="hover:text-white transition"><Youtube size={22} /></a>
          </div>

          {/* ✅ أيقونات الدفع */}
          <div className="flex gap-3 mt-4">
            <img src="/images/payments/visa.png" alt="Visa" className="h-6" />
            <img src="/images/payments/mastercard.png" alt="MasterCard" className="h-6" />
            <img src="/images/payments/paypal.png" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>

      {/* ✅ الحقوق */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} شامو شو - {t("rights") || "جميع الحقوق محفوظة"}
      </div>
    </footer>
  );
}
