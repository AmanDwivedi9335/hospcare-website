"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ products }) {
  const [sortOption, setSortOption] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const sorted = [...products].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return (a.price || 0) - (b.price || 0);
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">A - Z</option>
          <option value="price">Price: Low to High</option>
        </select>
        <button
          onClick={() =>
            setViewMode(viewMode === "grid" ? "list" : "grid")
          }
          className="border rounded px-3 py-2"
        >
          {viewMode === "grid" ? "List View" : "Grid View"}
        </button>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sorted.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md flex flex-col"
            >
              <a href={`/product/${p.slug}`} className="flex flex-col flex-grow p-4">
                <div className="relative w-full h-40 mb-2 bg-gray-50">
                  {p.image && (
                    <Image src={p.image} alt={p.name} fill className="object-contain" />
                  )}
                </div>
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
                  {p.description}
                </p>
              </a>
              <div className="p-4 pt-0">
                <a
                  href={`/product/${p.slug}`}
                  className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white py-2 rounded"
                >
                  Add to Cart
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((p) => (
            <div
              key={p._id}
              className="flex border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md"
            >
              <div className="relative w-32 h-32 bg-gray-50 flex-shrink-0">
                {p.image && (
                  <Image src={p.image} alt={p.name} fill className="object-contain" />
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <p className="text-sm text-gray-600 flex-grow">{p.description}</p>
                <div className="mt-2">
                  <a
                    href={`/product/${p.slug}`}
                    className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

