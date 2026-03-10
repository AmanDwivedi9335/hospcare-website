"use client";

import { motion } from "framer-motion";
import { useProductStore } from "@/lib/store";
import FirstAidBanner from "@/public/images/solutions/FirstAidBanner.png";
import RoadSafetyBanner from "@/public/images/solutions/RoadSafetyBanner.png";
import RoadSignsBanner from "@/public/images/solutions/RoadSignsBanner.png";
import HeroImg from "@/public/images/aboutus/AboutUsHeroImg.jpg";

export default function CategoryBanner() {
	const { activeCategory } = useProductStore();

	const categories = {
		all: {
			title: "First Aid Kit Box",
			description:
				"At Cones Solutions, we offer a wide range of high-quality products across various safety and infrastructure categories. Our offerings are designed to meet the highest standards, providing reliable protection, durability, and performance for homes, businesses, and industries.",
				//  Whether you're looking for safety equipment, road safety products, or other specialized solutions, our products are tailored to meet your specific needs. Browse our selection and find the perfect solution to enhance safety and efficiency.",
		},
		"first-aid": {
			title: "First Aid Kit Box",
			description:
				"Our comprehensive range of first aid kits provides essential medical supplies for emergency situations. Each kit is carefully curated to ensure you have everything needed to respond effectively to injuries and medical emergencies.",
		},
		"road-safety": {
			title: "Road Safety Equipment",
			description:
				"Our road safety equipment is designed to protect workers and the public in traffic zones. From cones to barriers, we offer durable solutions that enhance visibility and direct traffic safely around hazards.",
		},
		"road-signs": {
			title: "Road Signs",
			description:
				"Clear communication is essential for road safety. Our road signs are manufactured to the highest standards, ensuring visibility and durability in all weather conditions to effectively guide and warn road users.",
		},
		"fire-safety": {
			title: "Fire Safety - YOUR FIRST LINE OF DEFENSE",
			description:
				"If you're talking about safety at a 'job' (home) or 'work' (office), this could ensure surveillance, emergency procedures, or broader safety focus. Our fire safety equipment provides reliable protection when you need it most.",
		},
		"industrial-safety": {
			title: "Industrial Safety",
			description:
				"Protect your workforce with our comprehensive range of industrial safety equipment. From personal protective gear to safety signage, we provide solutions that help maintain compliance and prevent workplace accidents.",
		},
	};

	const content = categories[activeCategory] || categories.all;

	return (
		<motion.div
			className="relative rounded-xl overflow-hidden"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="absolute inset-0 bg-black/60 z-10"></div>
			<div
				className="h-[300px] bg-cover bg-center"
				style={{
					backgroundImage: `url(${
						activeCategory === "first-aid"
							? FirstAidBanner.src
							: activeCategory === "road-safety"
							? RoadSafetyBanner.src
							: activeCategory === "road-signs"
							? RoadSignsBanner.src
							: HeroImg.src
					})`,
				}}
			></div>
			<div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6">
				<motion.h2
					className="text-3xl md:text-4xl font-bold text-white mb-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{content.title}
				</motion.h2>
				<motion.p
					className="text-white max-w-3xl"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					{content.description}
				</motion.p>
			</div>
		</motion.div>
	);
}
