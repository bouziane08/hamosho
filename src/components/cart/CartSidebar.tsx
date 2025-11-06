// src/components/cart/CartSidebar.tsx
"use client";

import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useCart } from "@/components/CartContext";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const t = useTranslations("cart");
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (id: number) => {
    removeFromCart(id);
    toast.success(t("remove"));
  };

  const handleClear = () => {
    clearCart();
    toast(t("clear"), { icon: "🗑️" });
  };

  return (
    <>
      <Toaster position="top-right" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 right-0 w-96 h-full bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("title")}</h2>
              <button onClick={onClose} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 py-3 items-center">
                    <img src={item.image} alt={t(`items.${item.nameKey}`)} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{t(`items.${item.nameKey}`)}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price} × {item.quantity} = ${item.price * item.quantity}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700">-</button>
                        <span className="px-2 py-1 border rounded">{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)} className="px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700">+</button>
                        <button onClick={() => handleRemove(item.id)} className="p-1 rounded hover:bg-red-200 dark:hover:bg-red-700 ml-auto">
                          <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">{t("empty")}</p>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t dark:border-gray-700">
                <div className="flex justify-between font-semibold text-gray-900 dark:text-white mb-4">
                  <span>{t("total")}</span>
                  <span>${totalPrice}</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 rounded font-semibold transition">
                  {t("checkout")}
                </button>
                <button onClick={handleClear} className="w-full mt-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  {t("clear")}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
