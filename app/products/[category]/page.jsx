import { Suspense } from "react";
import ProductFilters from "@/components/PreviousUsedComponent/Solutions/ProductFilters.jsx";
import ProductGrid from "@/components/PreviousUsedComponent/Solutions/ProductGrid.jsx";

export const dynamic = 'force-dynamic';
import MainNav from "@/components/PreviousUsedComponent/Solutions/MainNav.jsx";
import SearchBar from "@/components/PreviousUsedComponent/Solutions/SearchBar.jsx";
import { ProductSkeleton } from "@/components/PreviousUsedComponent/Solutions/ProductSkeleton.jsx";
import { notFound } from "next/navigation";

const CATEGORY_MAP = {
        "first-aid-kit": "First Aid Kit",
        "life-jacket": "Life Jacket",
        "snake-bite-kit": "Snake Bite Kit",
        "traffic-cone": "Traffic Cone",
        "quick-heal": "Quick Heal",
        "shop-safety": "Shop Safety",
};

export async function generateMetadata({ params }) {
        const { category: categorySlug } = await params;
        const category = CATEGORY_MAP[categorySlug];

        if (!category) {
                return {
                        title: "Category Not Found",
                        description: "The requested LADWA safety product category could not be located.",
                };
        }

        return {
                title: `${category} Safety Products`,
                description: `Compare LADWA's ${category.toLowerCase()} range featuring certified materials, compliance markings, and enterprise-ready safety kits.`,
                alternates: { canonical: `/products/${categorySlug}` },
        };
}

export default async function CategoryPage({ params }) {
        const { category: categorySlug } = await params;

        if (!Object.keys(CATEGORY_MAP).includes(categorySlug)) {
                notFound();
        }

        const heading = categorySlug
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

        return (
                <div className="min-h-screen bg-gray-50">
                        <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
                                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                                <h1 className="text-teal-700 font-semibold">LADWA Safety Categories</h1>
                                                <MainNav />
                                        </div>
                                        <SearchBar />
                                </div>
                        </header>

                        <main className="container mx-auto px-4 py-8">
                                <h2 className="text-3xl font-bold mb-8">{heading}</h2>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        <aside className="md:col-span-1 md:sticky md:top-24 md:h-[calc(100vh-6rem)] md:overflow-auto">
                                                <ProductFilters />
                                        </aside>

                                        <div className="md:col-span-3 md:sticky md:top-24 md:h-[calc(100vh-6rem)] md:overflow-auto">
                                                <Suspense fallback={<ProductSkeleton />}>
                                                        <ProductGrid />
                                                </Suspense>
                                        </div>
                                </div>
                        </main>
                </div>
        );
}
