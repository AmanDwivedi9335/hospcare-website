import ProductsClient from "@/components/Products/ProductsClient.jsx";

export const dynamic = "force-dynamic";

export const metadata = {
        title: "LADWA Product Catalogue | Industrial Safety Gear",
        description:
                "Filter and explore LADWA's full portfolio of certified industrial safety equipment, PPE, and hazard mitigation products tailored for every sector.",
        alternates: { canonical: "/products" },
};

import { getBaseUrl } from "@/lib/baseUrl";

async function getProducts() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch products", err);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsClient products={products} />;
}
