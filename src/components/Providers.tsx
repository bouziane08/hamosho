// shamosho/src/components/Providers.tsx
"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "./CartContext"; // ✅ استيراد مزود السلة

interface Props {
  children: ReactNode;
  locale: "ar" | "en" | "fr";
  messages: Record<string, any>;
}

export default function Providers({ children, locale, messages }: Props) {
  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="Africa/Algiers">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider> {/* ✅ إحاطة كل التطبيق بمزود السلة */}
            {children}
          </CartProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
