"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
	const stats = [
		{ value: "10+", label: "Brands" },
		{ value: "1000+", label: "SKU" },
		{ value: "100%", label: "Compliant" },
		{ value: "100+", label: "Strong channel partners" },
	];

	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<section className="bg-linear-to-b from-teal-700 to-black text-white py-12">
			<div className="px-10">
				<motion.div
					className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							variants={fadeIn}
							className="flex flex-col items-center"
						>
							<div className="text-4xl font-bold mb-2">{stat.value}</div>
							<div className="text-sm">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
