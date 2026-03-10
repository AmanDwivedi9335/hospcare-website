"use client";

import { motion } from "framer-motion";

export function ProductSkeleton() {
	return (
		<div className="space-y-8">
			<div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array(6)
					.fill(0)
					.map((_, i) => (
						<motion.div
							key={i}
							className="bg-white rounded-lg overflow-hidden shadow-sm border"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: i * 0.1 }}
						>
							<div className="h-48 bg-gray-200 animate-pulse" />
							<div className="p-4 space-y-3">
								<div className="h-6 bg-gray-200 rounded animate-pulse" />
								<div className="h-4 bg-gray-200 rounded animate-pulse" />
								<div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
								<div className="flex items-center justify-between pt-2">
									<div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
									<div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
								</div>
							</div>
						</motion.div>
					))}
			</div>

			<div className="flex items-center justify-center gap-2 mt-8">
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"
						/>
					))}
			</div>
		</div>
	);
}
