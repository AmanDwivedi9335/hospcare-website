import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { getBaseUrl } from '@/lib/baseUrl';
import ProductCard from '@/components/ProductListCard.jsx';
import InquiryForm from '@/components/Solutions/InquiryForm.jsx';

async function getData(slug) {
  const baseUrl = getBaseUrl();
  const resCat = await fetch(
    `${baseUrl}/api/categories?slug=${encodeURIComponent(slug)}`,
    { cache: 'no-store' }
  );

  const category = resCat.ok && resCat.headers.get('content-type')?.includes('application/json') ? await resCat.json() : null;
  if (!category) return null;
  const resProd = await fetch(`${baseUrl}/api/products?category=${category._id}`, { cache: 'no-store' });
  const products = resProd.ok && resProd.headers.get('content-type')?.includes('application/json') ? await resProd.json() : [];
  return { category, products };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) {
    return {
      title: 'Category Not Found',
      description: 'The requested LADWA category could not be located.',
    };
  }
  const { category } = data;
  return {
    title: `${category.name} Safety Products`,
    description: category.description || `Explore LADWA's curated selection of ${category.name} equipment and compliance-ready safety gear.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return <div className="p-10">Category not found</div>;
  const { category, products } = data;
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <nav className="text-sm mb-2 text-gray-600">
          <Link href="/">Home</Link> / {category.name}
        </nav>
        {category.image && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image src={category.image} alt={category.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{category.name}</h1>
            </div>
          </div>
        )}
        <p className="mt-4 text-gray-700 text-center md:text-left">{category.description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ gridAutoRows: '1fr' }}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      <InquiryForm />
    </div>
  );
}
