// src/components/CartContext.tsx
// src/components/CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  nameKey: string; // المفتاح المستخدم للترجمة
  price: number;
  quantity: number;
  image: string;
  color?: string; // اختياري
  size?: string;  // اختياري
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeFromCart: (id: number, color?: string, size?: string) => void;
  increaseQty: (id: number, color?: string, size?: string) => void;
  decreaseQty: (id: number, color?: string, size?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number, color?: string, size?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.color === color &&
            item.size === size
          )
      )
    );
  };

  const increaseQty = (id: number, color?: string, size?: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: number, color?: string, size?: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
