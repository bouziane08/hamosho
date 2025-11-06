// src/components/products/ProductQuickView.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface ProductQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    key: string;
    price: number;
    image: string;
    images?: string[];
    colors?: string[];
    sizes?: string[];
    rating?: number;
  } | null;
  onAddToCart: (options?: { color?: string; size?: string; quantity?: number }) => void;
}

export default function ProductQuickView({ isOpen, onClose, product, onAddToCart }: ProductQuickViewProps) {
  const t = useTranslations("products");
  const [selectedImage, setSelectedImage] = useState<string | undefined>(product?.image);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const images = product.images ? [product.image, ...product.images] : [product.image];

  const handleAdd = () => {
    onAddToCart({ color: selectedColor, size: selectedSize, quantity });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-lg overflow-hidden shadow-xl relative"
          >
            {/* Close */}
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* الصور */}
              <div className="md:w-1/2 p-4">
                <img src={selectedImage} alt={t(`items.${product.key}`)} className="w-full h-64 object-cover mb-2 rounded" />
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border ${selectedImage === img ? "border-blue-600" : "border-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              {/* المعلومات */}
              <div className="md:w-1/2 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{t(`items.${product.key}`)}</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">${product.price}</p>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < Math.round(product.rating ?? 0) ? "★" : "☆"}</span>
                    ))}
                  </div>

                  {/* اختيار اللون */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-1">{t("selectColor")}</h4>
                      <div className="flex gap-2">
                        {product.colors.map((c) => (
                          <button
                            key={c}
                            style={{ backgroundColor: c }}
                            onClick={() => setSelectedColor(c)}
                            className={`w-8 h-8 rounded-full border ${selectedColor === c ? "border-black" : "border-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* اختيار الحجم */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-1">{t("selectSize")}</h4>
                      <div className="flex gap-2">
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={`px-3 py-1 border rounded ${selectedSize === s ? "border-black" : "border-gray-300"}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* كمية */}
                  <div className="mb-4 flex items-center gap-2">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 border rounded">-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 border rounded">+</button>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
                >
                  {t("addToCart")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
