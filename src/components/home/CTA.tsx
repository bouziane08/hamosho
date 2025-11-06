"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("home.CTA"); // ربط الرسائل بمفتاح home.CTA في كل لغة

  return (
    <motion.section
      className="bg-blue-600 text-white py-12 px-6 rounded-lg text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
      <p className="mb-6">{t("subtitle")}</p>
      <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100">
        {t("button")}
      </button>
    </motion.section>
  );
}
