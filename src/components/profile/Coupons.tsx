"use client";

interface CouponsProps {
  coupons: any[];
}

export default function Coupons({ coupons }: CouponsProps) {
  return (
    <div className="space-y-3">
      {coupons.map(coupon => (
        <div key={coupon.id} className="border rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">{coupon.title}</p>
            <p>{coupon.description}</p>
          </div>
          <span className="px-2 py-1 bg-gray-100 rounded">{coupon.code}</span>
        </div>
      ))}
    </div>
  );
}
