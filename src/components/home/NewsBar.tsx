// shamosho/src/components/home/NewsBar.tsx
"use client";

import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { X, Bell, Tag, Info } from "lucide-react";
import axios from "axios";

interface NewsItem {
  id: string;
  message: string;
  roles: ("user" | "admin" | "all")[];
  type: "alert" | "promo" | "info";
  url?: string; // رابط اختياري عند الضغط على الخبر
  expiresAt?: string;
}

export default function NewsBar() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [visible, setVisible] = useState(true);
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : "user";

  useEffect(() => {
    const hidden = localStorage.getItem("newsBarHidden");
    if (hidden === "true") setVisible(false);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get<NewsItem[]>("http://localhost:3001/news");
        const now = new Date();
        const filtered = res.data.filter(
          (item) =>
            item.roles.includes(role as any) &&
            (!item.expiresAt || new Date(item.expiresAt) > now)
        );
        setNews(filtered);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };
    fetchNews();
  }, [role]);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("newsBarHidden", "true");
  };

  if (!visible || news.length === 0) return null;

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "alert":
        return { bg: "bg-red-600", icon: <Bell size={16} className="text-white animate-bounce" /> };
      case "promo":
        return { bg: "bg-yellow-500", icon: <Tag size={16} className="text-white animate-pulse" /> };
      case "info":
      default:
        return { bg: "bg-blue-600", icon: <Info size={16} className="text-white animate-spin-slow" /> };
    }
  };

  return (
    <div className={`relative ${getTypeStyle(news[0].type).bg} text-white py-2 text-sm font-medium shadow-md`}>
      <Marquee gradient={false} speed={50} pauseOnHover>
        {news.map((item) => {
          const style = getTypeStyle(item.type);
          return (
            <a
              key={item.id}
              href={item.url ?? "#"}
              target={item.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 mx-6 hover:underline cursor-pointer"
            >
              {style.icon}
              <span>{item.message}</span>
            </a>
          );
        })}
      </Marquee>

      <button
        onClick={handleClose}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/30 transition"
        aria-label="Close news bar"
      >
        <X size={16} />
      </button>
    </div>
  );
}
