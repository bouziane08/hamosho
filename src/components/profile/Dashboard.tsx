"use client";

interface DashboardProps {
  orders: any[];
  wishlist: any[];
  coupons: any[];
}

export default function Dashboard({ orders, wishlist, coupons }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h3 className="font-bold text-lg">Orders</h3>
        <p className="mt-2">{orders.length} طلبات</p>
      </div>
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h3 className="font-bold text-lg">Wishlist</h3>
        <p className="mt-2">{wishlist.length} عناصر</p>
      </div>
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h3 className="font-bold text-lg">Coupons</h3>
        <p className="mt-2">{coupons.length} كوبونات</p>
      </div>
    </div>
  );
}
