// "use client";

import { Suspense } from "react";
import ProductFilters from "@/components/PreviousUsedComponent/Solutions/ProductFilters.jsx";
import ProductGrid from "@/components/PreviousUsedComponent/Solutions/ProductGrid.jsx";
import CategoryNav from "@/components/PreviousUsedComponent/Solutions/CategoryNav.jsx";
import MainNav from "@/components/PreviousUsedComponent/Solutions/MainNav.jsx";
import SearchBar from "@/components/PreviousUsedComponent/Solutions/SearchBar.jsx";
import CategoryBanner from "@/components/PreviousUsedComponent/Solutions/CategoryBanner.jsx";
import TopSellingProduct from "@/components/PreviousUsedComponent/Solutions/TopSellingProduct.jsx";
import { ProductSkeleton } from "@/components/PreviousUsedComponent/Solutions/ProductSkeleton.jsx";
import InquiryForm from "@/components/PreviousUsedComponent/Solutions/InquiryForm.jsx";

export const metadata = {
	title: "Safety Solutions | First Aid Kit Box",
	description:
		"Browse our range of safety equipment and solutions for all your needs",
};

export default function SolutionsPage() {
	return (
		<>
			<div className="min-h-screen bg-gray-50">
				<header className="sticky top-0 z-40 w-full bg-white shadow-sm">
					<div className="container mx-auto px-4 py-3 flex items-center justify-between">
						<MainNav />
						<SearchBar />
					</div>
				</header>

				<main className="container mx-auto px-10">
					<div className="py-8">
						<CategoryBanner />
					</div>

					<div className="mb-8">
						<TopSellingProduct />
					</div>

					<div className="mb-8">
						<CategoryNav />
					</div>

					<div className="flex flex-col md:flex-row gap-6 relative">
						<aside
							className="md:w-[300px] md:flex-shrink-0 transition-all duration-300 ease-in-out"
							id="filters-sidebar"
						>
							<ProductFilters />
						</aside>

						<div className="flex-grow md:sticky md:top-24 md:h-[calc(100vh-6rem)] md:overflow-auto pb-8">
							<Suspense fallback={<ProductSkeleton />}>
								<ProductGrid />
							</Suspense>
						</div>
					</div>
				</main>
			</div>
			<InquiryForm />
		</>
	);
}
