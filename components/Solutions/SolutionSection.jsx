"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load ProductCard for better performance
const ProductCard = dynamic(
	() => import("@/components/Solutions/ProductCard.jsx"),
	{
		loading: () => (
			<div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
		),
	}
);

const SolutionSection = ({ solution, sectionIndex }) => {
	const IconComponent = solution.icon;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.section
			className="mb-20"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
		>
			{/* Section Header */}
			<div className="text-center mb-12">
				<motion.div
					className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${solution.gradient} text-white mb-6`}
					whileHover={{ scale: 1.1, rotate: 360 }}
					transition={{ duration: 0.3 }}
				>
					<IconComponent className="w-8 h-8" />
				</motion.div>
				<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
					{solution.title}
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
					{solution.description}
				</p>
			</div>

			{/* Products Grid */}
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				{solution.products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						variants={cardVariants}
					/>
				))}
			</motion.div>
		</motion.section>
	);
};

export default SolutionSection;
