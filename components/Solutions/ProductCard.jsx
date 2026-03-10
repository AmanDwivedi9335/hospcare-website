"use client";

import React, { useState } from "react";
import { DEFAULT_PRODUCT_DESCRIPTION } from "@/lib/defaults";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useInquiryStore } from "@/components/Solutions/Inquiry.js";

const ProductCard = ({ product, variants }) => {
	const [store, setStore] = useState(useInquiryStore.getState());

	React.useEffect(() => {
		const unsubscribe = useInquiryStore.subscribe(setStore);
		return unsubscribe;
	}, []);

	const handleInquiry = (e) => {
		e.stopPropagation();
		useInquiryStore.openInquiry(product);
	};

	const handleCardClick = () => {
		console.log("Navigating to product detail page:", product.id);
	};

	return (
		<motion.div
			className="bg-white rounded-lg overflow-hidden shadow-sm border cursor-pointer transition-transform hover:shadow-md hover:-translate-y-1"
			variants={variants}
			onClick={handleCardClick}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<div className="relative h-48 bg-gray-100 overflow-hidden">
                                <img src={product.image || "/placeholder.svg?height=300&width=400"} alt={product.name} className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
			</div>
			<div className="p-4">
				<h3 className="font-semibold text-lg text-gray-900 mb-2">
					{product.name}
				</h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                                        {product.description || DEFAULT_PRODUCT_DESCRIPTION}
                                </p>
				<div className="flex items-center justify-between">
					<span className="font-bold text-teal-600 text-lg">
						₹ {product.price.toLocaleString()}
					</span>
					<Button
						size="sm"
						className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
						onClick={handleInquiry}
					>
						<ShoppingCart className="h-4 w-4 mr-2" />
						Add to Inquiry
					</Button>
				</div>
			</div>
		</motion.div>
	);
};

export default ProductCard;
