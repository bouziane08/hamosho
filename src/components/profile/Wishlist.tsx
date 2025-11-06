"use client";

interface WishlistProps {
  wishlist: any[];
}

export default function Wishlist({ wishlist }: WishlistProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {wishlist.map(item => (
        <div key={item.id} className="border rounded-lg p-3 flex items-center gap-3">
          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
          <div>
            <p className="font-medium">{item.name}</p>
            <p>{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
