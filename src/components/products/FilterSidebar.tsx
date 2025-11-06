"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";

interface FilterSidebarProps {
  categories: string[];
  colors: string[];
  sizes: string[];
  onFilterChange: (filters: { categories: string[]; colors: string[]; sizes: string[] }) => void;
}

export default function FilterSidebar({ categories, colors, sizes, onFilterChange }: FilterSidebarProps) {
  const t = useTranslations("products");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      colors: selectedColors,
      sizes: selectedSizes,
    });
  }, [selectedCategories, selectedColors, selectedSizes, onFilterChange]);

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: Dispatch<SetStateAction<string[]>>
  ) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  return (
    <aside className="w-64 p-4 border-r">
      <h3 className="font-semibold mb-4">{t("filterTitle")}</h3>

      {/* الفئات */}
      <div className="mb-6">
        <p className="font-medium mb-2">{t("filters.categories")}</p>
        {categories.map(cat => (
          <label key={cat} className="block cursor-pointer mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleSelection(cat, selectedCategories, setSelectedCategories)}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* الألوان */}
      <div className="mb-6">
        <p className="font-medium mb-2">{t("filters.colors")}</p>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color}
              type="button"
              className={`w-6 h-6 rounded-full border-2 ${selectedColors.includes(color) ? "border-black" : "border-gray-300"}`}
              style={{ backgroundColor: color }}
              onClick={() => toggleSelection(color, selectedColors, setSelectedColors)}
            />
          ))}
        </div>
      </div>

      {/* الأحجام */}
      <div className="mb-6">
        <p className="font-medium mb-2">{t("filters.sizes")}</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              type="button"
              className={`px-2 py-1 border rounded ${selectedSizes.includes(size) ? "bg-blue-600 text-white" : "bg-white text-black border-gray-300"}`}
              onClick={() => toggleSelection(size, selectedSizes, setSelectedSizes)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
//shamosho/src/components/products/SortDropdown.tsx