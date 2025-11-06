"use client";

interface OrdersProps {
  orders: any[];
}

export default function Orders({ orders }: OrdersProps) {
  return (
    <div className="space-y-3">
      {orders.map(order => (
        <div key={order.id} className="p-4 border rounded-lg flex justify-between">
          <div>
            <p className="font-medium">{order.id}</p>
            <p>{order.date}</p>
          </div>
          <div>
            <p>{order.total}</p>
            <p>{order.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
