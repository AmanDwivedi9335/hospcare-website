import Image from "next/image";
import PayNowButton from "@/components/PayNowButton";
import { getBaseUrl } from "@/lib/baseUrl";

export const dynamic = "force-dynamic";

export const metadata = {
        title: "LADWA Order Summary | Secure Checkout Overview",
        description:
                "Review your selected LADWA safety product, quantity, and pricing before completing a secure payment or inquiry submission.",
        alternates: { canonical: "/order-summary" },
};

async function getProduct(slug) {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(
      `${baseUrl}/api/products?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.headers.get("content-type")?.includes("application/json")) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch product", err);
    return null;
  }
}

export default async function OrderSummary({ searchParams }) {
  const { slug, qty } = await searchParams;
  const product = await getProduct(slug);
  const quantity = Number(qty) || 1;
  if (!product) return <div className="p-10">Product not found</div>;

  const price = parseFloat(product.yourPriceInr || "0");
  const total = price * quantity;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      <div className="flex items-center gap-4 mb-6">
        {product.image && (
          <div className="relative w-24 h-24">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h2 className="font-semibold">{product.name}</h2>
          <p>Quantity: {quantity}</p>
          <p>Price: ₹{price.toFixed(2)}</p>
          <p className="font-semibold">Total: ₹{total.toFixed(2)}</p>
        </div>
      </div>
      <PayNowButton amount={total} productName={product.name} />
    </div>
  );
}
