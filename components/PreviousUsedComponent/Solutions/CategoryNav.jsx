"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/lib/store";

const categories = [
	{ id: "all", name: "All" },
	{ id: "barrier", name: "Barrier & Barricades" },
	{ id: "car", name: "Car/Wheel Stoppers" },
	{ id: "convex", name: "Convex Mirrors" },
	{ id: "floor", name: "Floor Marking Tapes" },
	{ id: "pillar", name: "Pillar Guards" },
	{ id: "posts", name: "Posts and Bollards" },
];

export default function CategoryNav() {
	const { activeCategory, setActiveCategory } = useProductStore();

	const handleCategoryChange = (categoryId) => {
		setActiveCategory(categoryId);
	};

	const toggleFilters = () => {
		const sidebar = document.getElementById("filters-sidebar");
		if (sidebar) {
			const isCollapsed =
				sidebar.style.width === "60px" || sidebar.style.width === "0px";
			sidebar.style.width = isCollapsed ? "300px" : "60px";

			// Find the filter toggle button inside the sidebar and simulate a click
			const filterToggleBtn = sidebar.querySelector("button");
			if (filterToggleBtn) {
				filterToggleBtn.click();
			}
		}
	};

	return (
		<motion.div
			className="w-full overflow-x-auto pb-2 flex justify-between items-center"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="flex space-x-2 min-w-max overflow-x-auto pb-2">
				{categories.map((category) => (
					<Button
						key={category.id}
						variant="outline"
						className={cn(
							"rounded-md border",
							activeCategory === category.id &&
								"bg-teal-700 text-white hover:bg-teal-800 border-teal-700"
						)}
						onClick={() => handleCategoryChange(category.id)}
					>
						{category.name}
					</Button>
				))}
				<Link
					href="/categories"
					className="flex items-center text-sm font-medium text-teal-700 hover:text-teal-800"
				>
					View all <ChevronRight className="h-4 w-4 ml-1" />
				</Link>
			</div>

			<Button
				variant="outline"
				size="icon"
				className="flex-shrink-0 ml-2"
				onClick={toggleFilters}
			>
				<SlidersHorizontal className="h-4 w-4" />
			</Button>
		</motion.div>
	);
}
