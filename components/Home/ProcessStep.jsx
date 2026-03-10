"use client";

import { motion } from "framer-motion";

export default function ProcessStep({
	number,
	title,
	description,
	icon,
	isActive = false,
	delay = 0.1,
}) {
	return (
		<motion.div
			className="text-center"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay }}
		>
			<div className="relative mb-4">
				<div
					className={`${
						isActive
							? "bg-teal-700 text-white"
							: "bg-white border-2 border-teal-700 text-teal-700"
					} w-24 h-24 rounded-b-full mx-auto flex items-center justify-center`}
				>
					{icon}
				</div>
				<div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-6xl font-bold text-gray-100">
					{number.toString().padStart(2, "0")}
				</div>
			</div>
			<h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
			<p className="text-gray-600">{description}</p>
		</motion.div>
	);
}
