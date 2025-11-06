"use client";

import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t = useTranslations("home.newsletter");

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("title")}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t("subtitle")}
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder={t("placeholder")}
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {t("button")}
          </button>
        </form>
      </div>
    </section>
  );
}
