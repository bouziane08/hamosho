"use client";

import { useTranslations } from "next-intl";

interface SortDropdownProps {
  onSortChange: (sort: string) => void;
}

export default function SortDropdown({ onSortChange }: SortDropdownProps) {
  const t = useTranslations("products");

  return (
    <select
      onChange={(e) => onSortChange(e.target.value)}
      className="border rounded px-2 py-1"
    >
      <option value="default">{t("sort")}</option>
      <option value="priceAsc">{t("priceLowHigh")}</option>
      <option value="priceDesc">{t("priceHighLow")}</option>
      <option value="ratingDesc">{t("bestRating")}</option>
      <option value="newest">{t("newest")}</option>
    </select>
  );
}
