import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useProductStore, useInquiryStore } from "@/lib/store";

function ProductCard({ product, variants, onClick }) {
	const { openInquiry } = useInquiryStore();

	const handleInquiry = (e) => {
		e.stopPropagation();
		openInquiry(product);
	};

	return (
		<motion.div
			className="bg-white rounded-lg overflow-hidden shadow-sm border cursor-pointer transition-transform hover:shadow-md hover:-translate-y-1"
			variants={variants}
			onClick={onClick}
		>
			<div className="relative h-48 bg-gray-100">
				<Image
					src={product.image || "/placeholder.svg"}
					alt={product.name}
					fill
					className="object-contain p-4"
				/>
			</div>
			<div className="p-4">
				<h3 className="font-semibold text-lg">{product.name}</h3>
				<p className="text-sm text-gray-500 mt-1 line-clamp-2">
					{product.description}
				</p>
				<div className="mt-4 flex items-center justify-between">
					<span className="font-semibold">
						₹ {product.price.toLocaleString()}
					</span>
					<Button
						size="sm"
						className="bg-teal-700 hover:bg-teal-800"
						onClick={handleInquiry}
					>
						<ShoppingCart className="h-4 w-4 mr-2" />
						Add to inquiry
					</Button>
				</div>
			</div>
		</motion.div>
	);
}

export default ProductCard;
