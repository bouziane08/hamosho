// src/app/[locale]/products/page.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import CartSidebar from "@/components/cart/CartSidebar";
import ProductQuickView from "@/components/products/ProductQuickView";
import FilterSidebar from "@/components/products/FilterSidebar";
import SortDropdown from "@/components/products/SortDropdown";
import { getProducts } from "@/lib/api";

interface Product {
  id: number;
  key: string;
  price: number;
  image: string;
  rating?: number;
  colors?: string[];
  sizes?: string[];
  category?: string;
}

export default function ProductsPage() {
  const t = useTranslations("products");
  const locale = useLocale();
  const { addItem } = useCart();

  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // الفلاتر
  const [filters, setFilters] = useState<{ categories: string[]; colors: string[]; sizes: string[] }>({
    categories: [],
    colors: [],
    sizes: [],
  });

  const [sort, setSort] = useState<"priceAsc" | "priceDesc" | "ratingDesc">();

  const products: Product[] = [
    { id: 1, key: "airpods", price: 299, image: "/images/airpods.jpg", colors: ["#000", "#FFF"], sizes: ["S", "M"], rating: 4.5, category: "electronics" },
    { id: 2, key: "macbook", price: 1999, image: "/images/laptop.jpg", rating: 4.8, category: "electronics" },
    { id: 3, key: "kindle", price: 129, image: "/images/kindle.jpg", rating: 4.2, category: "books" },
  ];

  const handleAddToCart = (product: Product, options?: { color?: string; size?: string }) => {
    addItem({ id: product.id, nameKey: product.key, price: product.price, image: product.image, quantity: 1, ...options });
    setCartOpen(true);
  };

  const removeFilter = (type: "categories" | "colors" | "sizes", value: string) => {
    setFilters(prev => ({ ...prev, [type]: prev[type].filter(v => v !== value) }));
  };

  // الفلاتر والفرز
  const filteredProducts = products
    .filter(p =>
      (filters.categories.length === 0 || filters.categories.includes(p.category ?? "")) &&
      (filters.colors.length === 0 || (p.colors ?? []).some(c => filters.colors.includes(c))) &&
      (filters.sizes.length === 0 || (p.sizes ?? []).some(s => filters.sizes.includes(s)))
    )
    .sort((a, b) => {
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      if (sort === "ratingDesc") return (b.rating ?? 0) - (a.rating ?? 0);
      return 0;
    });

  // جلب الفئات والأحجام من ملف الترجمة
  const categoryKeys = Object.keys(t("filters.categoriesList") || { electronics: "Electronics", books: "Books" });
  const sizeKeys = Object.keys(t("filters.sizesList") || { S: "S", M: "M" });

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      {/* الفلاتر الجانبية */}
      <div className="w-full md:w-1/4">
        <FilterSidebar
          categories={categoryKeys}
          colors={["#000", "#FFF"]}
          sizes={sizeKeys}
          onFilterChange={setFilters}
        />
      </div>

      {/* المنتجات والفرز */}
      <div className="flex-1">
        <SortDropdown
          onSortChange={value => {
            if (value === "price-asc") setSort("priceAsc");
            else if (value === "price-desc") setSort("priceDesc");
            else if (value === "rating") setSort("ratingDesc");
            else setSort(undefined);
          }}
        />

        {/* الفلاتر المختارة */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.categories.map(c => (
            <span key={c} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full cursor-pointer text-sm flex items-center gap-1" onClick={() => removeFilter("categories", c)}>
              {c} ✕
            </span>
          ))}
          {filters.colors.map(color => (
            <span key={color} className="w-6 h-6 rounded-full border-2 cursor-pointer" style={{ backgroundColor: color }} onClick={() => removeFilter("colors", color)} />
          ))}
          {filters.sizes.map(s => (
            <span key={s} className="bg-green-100 text-green-800 px-2 py-1 rounded-full cursor-pointer text-sm" onClick={() => removeFilter("sizes", s)}>
              {s} ✕
            </span>
          ))}
        </div>

        {/* قائمة المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition">
              <img src={product.image} alt={t(`items.${product.key}`)} className="w-40 h-40 object-cover mb-4 cursor-pointer" onClick={() => { setSelectedProduct(product); setQuickViewOpen(true); }} />
              <h3 className="text-lg font-semibold text-center mb-2">{t(`items.${product.key}`)}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">${product.price}</p>
              <div className="flex gap-1 mb-2">{Array.from({ length: 5 }, (_, i) => <span key={i}>{i < Math.round(product.rating ?? 0) ? "★" : "☆"}</span>)}</div>
              <button onClick={() => handleAddToCart(product)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                {t("addToCart")}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* سلة */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Quick View */}
      <ProductQuickView
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        product={selectedProduct}
        onAddToCart={options => selectedProduct && handleAddToCart(selectedProduct, options)}
      />
    </div>
  );
}
