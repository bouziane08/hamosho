"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: "ar" | "en" | "fr") => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["ar", "en", "fr"].includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push("/" + segments.join("/"));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Globe size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
          <button
            onClick={() => switchLocale("ar")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            🇩🇿 العربية
          </button>
          <button
            onClick={() => switchLocale("en")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => switchLocale("fr")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            🇫🇷 Français
          </button>
        </div>
      )}
    </div>
  );
}
