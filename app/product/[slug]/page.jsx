import Image from 'next/image';
import Link from 'next/link';
import AddToCartForm from '@/components/AddToCartForm';

export const dynamic = 'force-dynamic';

import { getBaseUrl } from '@/lib/baseUrl';
import { DEFAULT_PRODUCT_DESCRIPTION } from '@/lib/defaults';

async function getProduct(slug) {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(
      `${baseUrl}/api/products?slug=${encodeURIComponent(slug)}`,
      { cache: 'no-store' }
    );
    if (!res.headers.get('content-type')?.includes('application/json')) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch product', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested LADWA safety product could not be located.',
    };
  }

  const description = product.description?.slice(0, 155) || DEFAULT_PRODUCT_DESCRIPTION;

  return {
    title: `${product.name} Specifications`,
    description,
    alternates: { canonical: `/product/${product.slug}` },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return <div className="p-10">Product not found</div>;

  const detailFields = [
    { key: 'productType', label: 'Product Type' },
    { key: 'sellerSku', label: 'Seller SKU' },
    { key: 'externalProductId', label: 'External Product ID' },
    { key: 'manufacturer', label: 'Manufacturer' },
    { key: 'modelName', label: 'Model Name' },
    { key: 'closureType', label: 'Closure Type' },
    { key: 'soleMaterial', label: 'Sole Material' },
    { key: 'heelType', label: 'Heel Type' },
    { key: 'heelHeight', label: 'Heel Height' },
    { key: 'outerMaterialType', label: 'Outer Material Type' },
    { key: 'heelHeightUnitOfMeasure', label: 'Heel Height Unit Of Measure' },
    { key: 'footwearSizeSystem', label: 'Footwear Size System' },
    { key: 'shoeSizeAgeGroup', label: 'Shoe Size Age Group' },
    { key: 'shoeSizeGender', label: 'Shoe Size Gender' },
    { key: 'shoeSizeClass', label: 'Shoe Size Class' },
    { key: 'shoeSizeWidth', label: 'Shoe Size Width' },
    { key: 'shoeSize', label: 'Shoe Size' },
    { key: 'style', label: 'Style' },
    { key: 'color', label: 'Color' },
    { key: 'size', label: 'Size' },
    { key: 'colourMap', label: 'Colour Map' },
    { key: 'manufacturerContact', label: 'Manufacturer Contact' },
    { key: 'sizeMap', label: 'Size Map' },
    { key: 'unitCountType', label: 'Unit Count Type' },
    { key: 'unitCount', label: 'Unit Count' },
    { key: 'itemLengthLongerEdge', label: 'Item Length Longer Edge' },
    { key: 'itemLengthUnit', label: 'Item Length Unit' },
    { key: 'itemWidthShorterEdge', label: 'Item Width Shorter Edge' },
    { key: 'itemWidthUnit', label: 'Item Width Unit' },
    { key: 'itemWeight', label: 'Item Weight' },
    { key: 'itemWeightUnit', label: 'Item Weight Unit' },
    { key: 'hoseLength', label: 'Hose Length' },
    { key: 'hoseLengthUnitOfMeasure', label: 'Hose Length Unit Of Measure' },
    { key: 'seatHeight', label: 'Seat Height' },
    { key: 'seatHeightUnitOfMeasure', label: 'Seat Height Unit Of Measure' },
    { key: 'shoeHeightMap', label: 'Shoe Height Map' },
    { key: 'packageHeightUnit', label: 'Package Height Unit' },
    { key: 'packageLength', label: 'Package Length' },
    { key: 'packageWidth', label: 'Package Width' },
    { key: 'packageWeightUnit', label: 'Package Weight Unit' },
    { key: 'packageHeight', label: 'Package Height' },
    { key: 'packageWidthUnit', label: 'Package Width Unit' },
    { key: 'packageLengthUnit', label: 'Package Length Unit' },
    { key: 'packageWeight', label: 'Package Weight' },
    { key: 'externalProductInformation', label: 'External Product Information' },
    { key: 'maximumRetailPrice', label: 'Maximum Retail Price' },
    { key: 'yourPriceInr', label: 'Your Price INR (IN)' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <nav className="text-sm mb-4 text-gray-600">
        <Link href="/">Home</Link> /{' '}
        <Link href={`/category/${product.category.slug}`}>{product.category.name}</Link> / {product.name}
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {product.image && (
            <div className="relative w-full h-64 mb-4">
              <Image src={product.image} alt={product.name} fill className="object-contain" />
            </div>
          )}
          <div className="grid grid-cols-3 gap-2">
            {product.gallery.map((img, i) => (
              <div key={i} className="relative h-20 border rounded">
                <Image src={img} alt={`${product.name}-${i + 1}`} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description || DEFAULT_PRODUCT_DESCRIPTION}</p>
          {product.keyFeatures.length > 0 && (
            <>
              <h2 className="font-semibold mb-1">Bullet Points</h2>
              <ul className="list-disc pl-5 mb-4">
                {product.keyFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}
          {product.additionalFeatures.length > 0 && (
            <>
              <h2 className="font-semibold mb-1">Additional Features</h2>
              <ul className="list-disc pl-5 mb-4">
                {product.additionalFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}
          <p className="mb-2">Weight: {product.weight}</p>
          <p className="mb-4">Dimension: {product.dimension}</p>
          <AddToCartForm slug={product.slug} />
          {product.specifications.length > 0 && (
            <table className="w-full text-sm mb-6 border">
              <tbody>
                {product.specifications.map((s, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 font-semibold w-1/3">{s.key}</td>
                    <td className="p-2">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {product.materialTypes?.length > 0 && (
            <>
              <h2 className="font-semibold mb-1">Material Type</h2>
              <ul className="list-disc pl-5 mb-4">
                {product.materialTypes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </>
          )}
          {product.materialFabricRegulations?.length > 0 && (
            <>
              <h2 className="font-semibold mb-1">Material/Fabric Regulations</h2>
              <ul className="list-disc pl-5 mb-4">
                {product.materialFabricRegulations.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </>
          )}
          <table className="w-full text-sm mb-6 border">
            <tbody>
              {detailFields.map(({ key, label }) =>
                product[key] ? (
                  <tr key={key} className="border-t">
                    <td className="p-2 font-semibold w-1/3">{label}</td>
                    <td className="p-2">{product[key]}</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
