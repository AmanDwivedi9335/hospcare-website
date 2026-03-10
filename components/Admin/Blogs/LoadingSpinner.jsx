"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner({ size = "md", className = "" }) {
	const sizes = {
		sm: "h-4 w-4",
		md: "h-8 w-8",
		lg: "h-12 w-12",
	};

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<motion.div
				className={`${sizes[size]} border-2 border-teal-600 border-t-transparent rounded-full`}
				animate={{ rotate: 360 }}
				transition={{
					duration: 1,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
			/>
		</div>
	);
}
