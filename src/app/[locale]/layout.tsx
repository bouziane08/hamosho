import "../globals.css";
import { notFound } from "next/navigation";
import messages from "@messages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { CartProvider } from "@/components/CartContext";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: "ar" | "en" | "fr" }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params; // ✅ يجب انتظار params هنا

  // تحقق من وجود الترجمة
  if (!messages[locale]) {
    notFound();
  }

  console.log(
    "available messages keys for locale",
    locale,
    Object.keys(messages[locale] || {})
  );

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Providers locale={locale} messages={messages[locale]}>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
