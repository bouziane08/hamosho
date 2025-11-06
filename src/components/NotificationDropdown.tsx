"use client";

import { Bell, CheckCheck, Trash2, Tag, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface Notification {
  id: number;
  type: "new" | "order" | "offer";
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationDropdown() {
  const t = useTranslations("header");
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: "new", message: t("notif.newProduct"), time: t("notif.ago5min"), read: false },
    { id: 2, type: "order", message: t("notif.orderProcessing"), time: t("notif.ago1h"), read: false },
    { id: 3, type: "offer", message: t("notif.discount"), time: t("notif.today"), read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const clearAll = () => setNotifications([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "new": return <Sparkles size={18} className="text-yellow-500" />;
      case "order": return <Package size={18} className="text-green-600" />;
      case "offer": return <Tag size={18} className="text-blue-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* زر الجرس */}
      <button
        aria-label={t("notifications")}
        onClick={() => setShow(!show)}
        className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Bell size={22} className="text-gray-800 dark:text-gray-200" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown مع أنيميشن */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-xl z-50"
          >
            {/* العنوان + الإجراءات */}
            <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-50 dark:bg-gray-700 rounded-t-xl">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{t("notifications")}</span>
              {notifications.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={markAllAsRead}
                    className="p-1 text-gray-500 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
                    aria-label={t("markAll")}
                  >
                    <CheckCheck size={18} />
                  </button>
                  <button
                    onClick={clearAll}
                    className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
                    aria-label={t("clearAll")}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* قائمة الإشعارات */}
            <ul className="max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <li
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex justify-between items-start cursor-pointer ${
                      !n.read ? "bg-blue-50 dark:bg-blue-900" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {getIcon(n.type)}
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{n.message}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{n.time}</span>
                      </div>
                    </div>
                    {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>}
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  {t("noNotifications")}
                </li>
              )}
            </ul>

            {/* زر عرض الكل */}
            {notifications.length > 0 && (
              <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/notifications"
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                  onClick={() => setShow(false)}
                >
                  {t("viewAll")}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
