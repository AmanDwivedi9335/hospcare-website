"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useProductStore, useInquiryStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/PreviousUsedComponent/Solutions/ProductCard.jsx";

export default function ProductGrid() {
	const { products, currentPage, setCurrentPage } = useProductStore();
	const { openInquiry } = useInquiryStore();
	const router = useRouter();
	const totalPages = 5;

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleProductClick = (productId) => {
		router.push(`/products/product/${productId}`);
	};

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<div className="space-y-8">
			<h2 className="text-2xl font-bold">All Products</h2>

			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
				variants={container}
				initial="hidden"
				animate="show"
			>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						variants={item}
						onClick={() => handleProductClick(product.id)}
					/>
				))}
			</motion.div>

			<div className="flex items-center justify-center gap-2 mt-8">
				<Button
					variant="outline"
					size="icon"
					onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				{[1, 2, 3, 10].map((page) => (
					<Button
						key={page}
						variant={currentPage === page ? "default" : "outline"}
						size="icon"
						className={cn(
							"h-8 w-8 rounded-full",
							currentPage === page && "bg-teal-700 hover:bg-teal-800"
						)}
						onClick={() => handlePageChange(page)}
					>
						{page}
					</Button>
				))}

				<Button
					variant="outline"
					size="icon"
					onClick={() =>
						handlePageChange(Math.min(totalPages, currentPage + 1))
					}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
