// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
  ShoppingCart,
  LayoutDashboard,
  User,
  Bell,
  Edit3,
  LogOut,
  Search,
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useSession, signOut } from "next-auth/react";

import LocaleSwitcher from "./LocaleSwitcher";
import CartSidebar from "./cart/CartSidebar";
import NewsBar from "./home/NewsBar";
import HeaderSearch from "./HeaderSearch";

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

let socket: Socket;

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // WebSocket
  useEffect(() => {
    if (!user) return;

    const s: Socket = io("http://localhost:3001", {
      auth: { token: session.user.id },
    });
    socket = s;

    s.on("connect", () => console.log("Connected to WebSocket"));
    s.on("cartUpdate", (data: { itemsCount: number }) =>
      setCartItemsCount(data.itemsCount)
    );
    s.on("notificationUpdate", (data: { notifications: Notification[] }) =>
      setNotifications(data.notifications)
    );

    return () => {
      if (s) s.disconnect();
    };
  }, [user, session]);

  // إغلاق dropdown عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node))
        setAccountMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { href: "", label: t("home") },
    { href: "products", label: t("products") },
    { href: "about", label: t("about") },
    { href: "contact", label: t("contact") },
  ];

  const dropdownBase =
    "absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 border rounded-md shadow-lg overflow-hidden z-50 transform transition-all duration-200 origin-top";

  return (
    <header className="sticky top-0 z-50">
      <NewsBar />

      <div className="bg-white dark:bg-gray-900 shadow-md transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-3">
          {/* شعار */}
          <Link
            href={`/${locale}`}
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            شامو شو
          </Link>

          {/* روابط التنقل */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link key={item.href} href={`/${locale}/${item.href}`}>
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href={`/${locale}/dashboard`}
                className="flex items-center gap-1"
              >
                <LayoutDashboard size={18} /> {t("dashboard")}
              </Link>
            )}
          </nav>

          {/* يمين الهيدر */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* بحث */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
              >
                <Search size={20} />
              </button>
              <div
                className={`${dropdownBase} ${
                  searchOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <HeaderSearch />
              </div>
            </div>

            {/* إشعارات */}
            {user && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 relative"
                >
                  <Bell size={20} />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>
                <div
                  className={`${dropdownBase} ${
                    notifMenuOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  } w-48`}
                >
                  {notifications.length === 0 ? (
                    <p className="p-2 text-sm text-gray-500">
                      {t("noNotifications")}
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <p
                        key={n.id}
                        className={`p-2 text-sm ${
                          n.read ? "text-gray-500" : "font-semibold"
                        }`}
                      >
                        {n.message}
                      </p>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* سلة */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* تبديل اللغة */}
            <LocaleSwitcher />

            {/* الوضع الداكن */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* حساب المستخدم */}
            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {/* صورة أو أيقونة */}
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-gray-500" />
                  )}

                  {/* اسم */}
                  <span className="hidden sm:inline font-medium">
                    {user.name || t("profile")}
                  </span>
                </button>

                {/* القائمة */}
                <div
                  className={`${dropdownBase} ${
                    accountMenuOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  } w-48`}
                >
                  <Link
                    href={`/${locale}/profile`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1"
                  >
                    <User size={16} /> {t("profile")}
                  </Link>
                  <Link
                    href={`/${locale}/profile/edit`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1"
                  >
                    <Edit3 size={16} /> {t("editProfile")}
                  </Link>
                  <Link
                    href={`/${locale}/orders`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1"
                  >
                    <LayoutDashboard size={16} /> {t("myOrders")}
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 flex items-center gap-1"
                  >
                    <LogOut size={16} /> {t("logout")}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href={`/${locale}/login`}
                className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t("login")}
              </Link>
            )}

            {/* زر الموبايل */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* قائمة الموبايل */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t">
            <nav className="flex flex-col p-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}/${item.href}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href={`/${locale}/dashboard`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("dashboard")}
                </Link>
              )}
              {user ? (
                <>
                  <Link
                    href={`/${locale}/profile`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("profile")}
                  </Link>
                  <Link
                    href={`/${locale}/profile/edit`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("editProfile")}
                  </Link>
                  <Link
                    href={`/${locale}/orders`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("myOrders")}
                  </Link>
                  <button
                    onClick={() =>
                      signOut({ callbackUrl: `/${locale}/login` })
                    }
                    className="text-red-600 text-left"
                  >
                    {t("logout")}
                  </button>
                </>
              ) : (
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("login")}
                </Link>
              )}
              <div className="mt-2">
                <HeaderSearch />
              </div>
            </nav>
          </div>
        )}

        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </header>
  );
}
