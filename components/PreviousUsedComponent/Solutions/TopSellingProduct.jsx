"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInquiryStore } from "@/lib/store";
import TopSellingImg from "@/public/images/solutions/TopSellingImg.png";

export default function TopSellingProduct() {
	const { openInquiry } = useInquiryStore();

	const handleInquiry = () => {
		openInquiry({
			id: "top-product",
			name: "First Aid Kit - Premium",
			description: "Essential medical supplies for emergency situations.",
			price: 5000,
			image: TopSellingImg.src,
		});
	};

	return (
		<motion.section
			className="rounded-xl bg-gray-100 overflow-hidden"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 items-center">
				<div className="p-8 md:p-12">
					<div className="text-sm font-medium text-teal-700 mb-2">
						Top Selling Product in Safety
					</div>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
						First Aid Kit - YOUR FIRST <br /> LINE OF DEFENSE
					</h2>
					<p className="text-gray-600 mb-6 max-w-md">
						If you're talking about safety at a "job" (home) or "work" (office),
						this could ensure preparedness, emergency procedures, or broader
						safety focus.
					</p>
					<div className="flex items-center gap-4">
						<Button
							className="bg-teal-700 hover:bg-teal-800"
							onClick={handleInquiry}
						>
							Add to Inquiry <ArrowRight className="ml-2 h-4 w-4" />
						</Button>
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full h-8 w-8"
							>
								<ArrowRight className="h-4 w-4 rotate-180" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full h-8 w-8"
							>
								<ArrowRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
				<div className="relative h-64 md:h-full">
					<Image
						src={TopSellingImg.src}
						alt="First Aid Kit"
						fill
						className="object-contain p-8"
					/>
				</div>
			</div>
		</motion.section>
	);
}
