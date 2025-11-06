"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import axios from "axios";

import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Wishlist from "./Wishlist";
import Coupons from "./Coupons";
import Addresses from "./Addresses";
import Payments from "./Payments";
import Support from "./Support";

// أنواع البيانات
interface Address {
  id: string;
  label: string;
  details: string;
  phone: string;
}

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
}

interface Payment {
  id: string;
  type: string;
  last4?: string;
  expiry?: string;
  email?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface Coupon {
  id: number;
  title: string;
  description: string;
  code: string;
  expiry: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  date: string;
}

export default function ProfileContent() {
  const t = useTranslations("profile");
  const [activeTab, setActiveTab] = useState("dashboard");

  const [token, setToken] = useState<string | null>(null);

  // البيانات
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    setToken(savedToken);

    if (!savedToken) {
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [
          addressesRes,
          ordersRes,
          paymentsRes,
          wishlistRes,
          couponsRes,
          supportRes,
        ] = await Promise.all([
          axios.get("http://localhost:3001/addresses", { headers: { Authorization: `Bearer ${savedToken}` } }),
          axios.get("http://localhost:3001/orders", { headers: { Authorization: `Bearer ${savedToken}` } }),
          axios.get("http://localhost:3001/payments", { headers: { Authorization: `Bearer ${savedToken}` } }),
          axios.get("http://localhost:3001/wishlist", { headers: { Authorization: `Bearer ${savedToken}` } }),
          axios.get("http://localhost:3001/coupons", { headers: { Authorization: `Bearer ${savedToken}` } }),
          axios.get("http://localhost:3001/support", { headers: { Authorization: `Bearer ${savedToken}` } }),
        ]);

        setAddresses(addressesRes.data.addresses ?? addressesRes.data ?? []);
        setOrders(ordersRes.data.orders ?? ordersRes.data ?? []);
        setPayments(paymentsRes.data.payments ?? paymentsRes.data ?? []);
        setWishlist(wishlistRes.data.items ?? wishlistRes.data ?? []);
        setCoupons(couponsRes.data.coupons ?? couponsRes.data ?? []);
        setSupportTickets(supportRes.data.tickets ?? supportRes.data ?? []);
      } catch (err) {
        console.error("خطأ أثناء جلب البيانات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // التابات
  const tabs = [
    {
      key: "dashboard",
      label: t("dashboard"),
      icon: "📊",
      component: <Dashboard orders={orders} wishlist={wishlist} coupons={coupons} />,
    },
    {
      key: "orders",
      label: t("orders"),
      icon: "📦",
      component: <Orders orders={orders} />,
    },
    {
      key: "wishlist",
      label: t("wishlist"),
      icon: "❤️",
      component: <Wishlist wishlist={wishlist} />,
    },
    {
      key: "coupons",
      label: t("coupons"),
      icon: "🎟️",
      component: <Coupons coupons={coupons} />,
    },
    {
      key: "addresses",
      label: t("addresses"),
      icon: "📍",
      component: <Addresses addresses={addresses} token={token} setAddresses={setAddresses} />,
    },
    {
      key: "payments",
      label: t("payments"),
      icon: "💳",
      component: <Payments payments={payments} token={token} setPayments={setPayments} />,
    },
    {
      key: "support",
      label: t("support"),
      icon: "💬",
      component: <Support tickets={supportTickets} />,
    },
  ];

  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component;

  if (loading) return <p className="text-center mt-20">⏳ {t("loading")}</p>;

  return (
    <div className="max-w-7xl mx-auto flex gap-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 space-y-2 transition-colors">
        <nav className="space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <motion.div
        key={activeTab}
        className="flex-1 bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 transition-colors"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4 }}
      >
        {ActiveComponent}
      </motion.div>
    </div>
  );
}
