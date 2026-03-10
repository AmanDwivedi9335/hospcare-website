"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AddToCartForm({ slug }) {
  const [qty, setQty] = useState(1);
  const router = useRouter();

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAdd = () => {
    router.push(`/order-summary?slug=${slug}&qty=${qty}`);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center border rounded">
        <button type="button" onClick={decrement} className="px-3 py-1">
          -
        </button>
        <span className="px-4" data-testid="quantity">
          {qty}
        </span>
        <button type="button" onClick={increment} className="px-3 py-1">
          +
        </button>
      </div>
      <Button
        onClick={handleAdd}
        className="bg-teal-600 hover:bg-teal-700 text-white"
      >
        Add to Cart
      </Button>
    </div>
  );
}
