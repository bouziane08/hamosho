"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Users, ShoppingBag, Package, Ticket, Percent } from "lucide-react";

const menuItems = [
  { href: "/dashboard", label: "لوحة التحكم", icon: <Package size={18} /> },
  { href: "/dashboard/users", label: "المستخدمون", icon: <Users size={18} /> },
  { href: "/dashboard/products", label: "المنتجات", icon: <ShoppingBag size={18} /> },
  { href: "/dashboard/orders", label: "الطلبات", icon: <Package size={18} /> },
  { href: "/dashboard/tickets", label: "الدعم", icon: <Ticket size={18} /> },
  { href: "/dashboard/coupons", label: "الكوبونات", icon: <Percent size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">⚡ Admin</h2>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 p-2 rounded-md transition ${
                pathname === item.href ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-red-100 text-red-600">
          <LogOut size={18} /> تسجيل الخروج
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
