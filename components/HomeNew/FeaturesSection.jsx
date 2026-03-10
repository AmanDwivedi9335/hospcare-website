"use client";

import { motion } from "framer-motion";
import { Logo1, Logo2, Logo3, Logo4, Logo5 } from "@/public/images/NewHome";
import { Inter, Manrope } from "next/font/google";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const features = [
	{
		icon: Logo1,
		title: "Innovation-Driven Safety",
		description: "Proprietary tech in PPE, road & industrial safety gear",
	},
	{
		icon: Logo2,
		title: "Global-Quality Standards",
		description: "ISO, CE, ANSI, and OSHA certified products",
	},
	{
		icon: Logo3,
		title: "Eco-Friendly Solutions",
		description: "Recycled, biodegradable, and sustainable product lines",
	},
	{
		icon: Logo4,
		title: "Pan-India to Global Reach",
		description: "Serving 20+ countries with growing export networks",
	},
	{
		icon: Logo5,
		title: "Thought Leadership",
		description: "Safety white papers, case studies, and training academies",
	},
];

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

export default function FeaturesSection() {
	return (
		<section className="w-full max-w-7xl mx-auto rounded-[30px] p-1 bg-gradient-to-b from-[#A2FFF0] to-white">
			<div className="lg:p-10 p-5 bg-gradient-to-b from-[#BAFFF4] to-[#FFFFFF] rounded-[30px]">
				<div className="text-center md:mb-16 mb-5">
					<h2 className="md:text-5xl  text-3xl font-bold text-black mb-4">
						What Sets LADWA Apart
					</h2>
					<p className="lg:text-base text-xs text-gray-600 max-w-3xl mx-auto">
						LADWA stands apart with its innovative, end-to-end EHS solutions that combine global standards with deep local expertise. Our unwavering focus on quality, sustainability, and customer success redefines safety across industries and communities.
					</p>
				</div>

				<motion.div
					className={`${inter.className} grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-4 md:mb-16 mb-8`}
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					{features.slice(0, 3).map((feature, index) => (
						<motion.div
							key={index}
							variants={cardVariants}
							className="bg-gradient-to-b from-[#A2FFF0] to-white p-1 rounded-3xl w-full max-w-screen"
						>
							<div className="flex justify-center items-center gap-5 bg-gradient-to-r from-[#fff] to-[#9FFFF0] md:p-4 p-4 rounded-2xl">
                                                                <img src={feature.icon.src} alt={feature.title} className="w-16 h-16 object-cover" />
								<div>
									<h3 className="lg:text-xl text-lg font-medium text-gray-900">
										{feature.title}
									</h3>
									<p className="text-gray-600 text-xs md:text-[16px]">
										{feature.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					className="grid md:grid-cols-2 md:gap-8 gap-4 max-w-4xl mx-auto"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					{features.slice(3).map((feature, index) => (
						<motion.div
							key={index}
							variants={cardVariants}
							className="bg-gradient-to-b from-[#A2FFF0] to-white p-1 rounded-3xl w-full"
						>
							<div className="flex justify-center items-center md:gap-5 gap-5 bg-gradient-to-r from-[#fff] to-[#9FFFF0] md:p-4 p-4 rounded-2xl">
                                                                <img src={feature.icon.src} alt={feature.title} className="w-12 h-12 object-cover" />
								<div>
									<h3 className="text-xl font-bold text-gray-900">
										{feature.title}
									</h3>
									<p className="text-gray-600">{feature.description}</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
