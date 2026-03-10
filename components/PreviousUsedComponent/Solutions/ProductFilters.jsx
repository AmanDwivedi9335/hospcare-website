"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductFilters() {
	const [priceRange, setPriceRange] = useState([750, 7500]);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Initial check
		checkIfMobile();

		// Add event listener
		window.addEventListener("resize", checkIfMobile);

		// Clean up
		return () => window.removeEventListener("resize", checkIfMobile);
	}, []);

	const handlePriceChange = (value) => {
		setPriceRange(value);
	};

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);

		// Adjust the sidebar width when collapsing/expanding
		const sidebar = document.getElementById("filters-sidebar");
		if (sidebar) {
			if (isCollapsed) {
				sidebar.style.width = isMobile ? "auto" : "300px";
			} else {
				sidebar.style.width = isMobile ? "auto" : "30px";
			}
		}
	};

	return (
		<div className="space-y-6" id="filters-sidebar">
			<div className="flex items-center justify-between">
				<h2
					className={`text-xl font-semibold ${
						isCollapsed && !isMobile ? "hidden" : "block"
					}`}
				>
					Filters
				</h2>
				<button className="text-gray-500" onClick={toggleCollapse}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-sliders-horizontal"
					>
						<line x1="21" x2="14" y1="4" y2="4" />
						<line x1="10" x2="3" y1="4" y2="4" />
						<line x1="21" x2="12" y1="12" y2="12" />
						<line x1="8" x2="3" y1="12" y2="12" />
						<line x1="21" x2="16" y1="20" y2="20" />
						<line x1="12" x2="3" y1="20" y2="20" />
						<line x1="14" x2="14" y1="2" y2="6" />
						<line x1="8" x2="8" y1="10" y2="14" />
						<line x1="16" x2="16" y1="18" y2="22" />
					</svg>
				</button>
			</div>

			<AnimatePresence>
				{!isCollapsed && (
					<motion.div
						initial={{ opacity: 0, width: isMobile ? 0 : "60px" }}
						animate={{ opacity: 1, width: "auto" }}
						exit={{ opacity: 0, width: isMobile ? 0 : "60px" }}
						transition={{ duration: 0.3 }}
						className="overflow-hidden"
					>
						<div className="space-y-4">
							<div className="flex items-center space-x-2">
								<Checkbox id="all" checked />
								<label
									htmlFor="all"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									All (550)
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="life-jacket" />
								<label
									htmlFor="life-jacket"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Life Jacket (20)
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="snake-bite" />
								<label
									htmlFor="snake-bite"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Snake Bite Kit (20)
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="first-aid" />
								<label
									htmlFor="first-aid"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									First Aid Kit (90)
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="quick-heal" />
								<label
									htmlFor="quick-heal"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Quick Heal (80)
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="shop-safety" />
								<label
									htmlFor="shop-safety"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Shop Safety (70)
								</label>
							</div>
						</div>

						<Accordion type="single" collapsible className="w-full mt-4">
							<AccordionItem value="price">
								<AccordionTrigger>Price</AccordionTrigger>
								<AccordionContent>
									<div className="pt-4 pb-2">
										<Slider
											defaultValue={[750, 7500]}
											max={15000}
											min={0}
											step={100}
											value={priceRange}
											onValueChange={handlePriceChange}
										/>
										<div className="flex justify-between mt-2 text-sm text-gray-500">
											<span>₹{priceRange[0]}</span>
											<span>₹{priceRange[1]}</span>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="availability">
								<AccordionTrigger>Availability</AccordionTrigger>
								<AccordionContent>
									<div className="space-y-4 pt-2">
										<div className="flex items-center space-x-2">
											<Checkbox id="in-stock" checked />
											<label
												htmlFor="in-stock"
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												In Stock (350)
											</label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox id="out-of-stock" />
											<label
												htmlFor="out-of-stock"
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												Out of Stock (10)
											</label>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						<Button className="w-full bg-teal-700 hover:bg-teal-800 mt-6">
                                                        Apply Filter
                                                </Button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
