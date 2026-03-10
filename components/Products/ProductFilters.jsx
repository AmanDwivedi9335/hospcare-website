"use client";

import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProductFilters({ products, onChange }) {
  const categoryMap = new Map();
  products.forEach((p) => {
    const id = p.category?._id || p.category;
    const name = p.category?.name || "Unknown";
    categoryMap.set(id, name);
  });
  const categories = Array.from(categoryMap.entries());

  const prices = products.map((p) => parseFloat(p.yourPriceInr) || 0);
  const minPrice = Math.min(...prices, 0);
  const maxPrice = Math.max(...prices, 0);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    onChange({ categories: selectedCategories, price: priceRange });
  }, [selectedCategories, priceRange, onChange]);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="space-y-2">
          {categories.map(([id, name]) => (
            <div key={id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${id}`}
                checked={selectedCategories.includes(id)}
                onCheckedChange={() => toggleCategory(id)}
              />
              <label htmlFor={`cat-${id}`} className="text-sm font-medium">
                {name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Price</h2>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={minPrice}
          max={maxPrice}
          step={1}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
