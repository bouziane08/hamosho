// src/components/HeaderSearch.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface Product {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export default function HeaderSearch() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // البحث عند كتابة المستخدم
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        const data: Product[] = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [query]);

  // إغلاق قائمة النتائج عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    router.push(`/${locale}/products/${slug}`);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={t("search")}
        className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.map(product => (
            <div
              key={product.id}
              onClick={() => handleSelect(product.slug)}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {product.image && <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />}
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
