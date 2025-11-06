"use client";
import AdminProtected from "./AdminProtected";
import UsersTable from "./UsersTable";
import ProductsTable from "./ProductsTable";
import OrdersTable from "./OrdersTable";
import AdsTable from "./AdsTable";
import TicketsTable from "./TicketsTable";
import CouponsTable from "./CouponsTable";
import Charts from "./Charts";

export default function AdminDashboard() {
  return (
    <AdminProtected>
      <div className="p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        </header>

        {/* Charts & Stats */}
        <Charts />

        {/* Tables */}
        <section className="my-6">
          <h2 className="text-2xl mb-2">المستخدمون</h2>
          <UsersTable />
        </section>

        <section className="my-6">
          <h2 className="text-2xl mb-2">المنتجات</h2>
          <ProductsTable />
        </section>

        <section className="my-6">
          <h2 className="text-2xl mb-2">الطلبات</h2>
          <OrdersTable />
        </section>

        <section className="my-6">
          <h2 className="text-2xl mb-2">الإعلانات</h2>
          <AdsTable />
        </section>

        <section className="my-6">
          <h2 className="text-2xl mb-2">الدعم</h2>
          <TicketsTable />
        </section>

        <section className="my-6">
          <h2 className="text-2xl mb-2">الكوبونات</h2>
          <CouponsTable />
        </section>
      </div>
    </AdminProtected>
  );
}
