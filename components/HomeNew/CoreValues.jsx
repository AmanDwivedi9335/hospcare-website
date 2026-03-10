"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Manrope, Outfit } from "next/font/google";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

export default function CoreValues() {
	const navigate = useRouter();
	const [hoveredCard, setHoveredCard] = useState(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const values = [
		{
			number: "01",
			title: "Innovation",
			description:
				"We embrace forward-thinking ideas to develop cutting-edge EHS solutions. Innovation drives us to stay ahead in a dynamic world.",
		},
		{
			number: "02",
			title: "Reliability",
			description:
				"Our clients trust us for consistent performance and dependable products. We deliver on our promises — every time.",
		},
		{
			number: "03",
			title: "Customer",
			description:
				"Customers are at the heart of our business. We listen, adapt, and serve with unmatched dedication. Our goal is to exceed expectations and build lasting relationships.",
		},
		{
			number: "04",
			title: "Integrity",
			description:
				"We operate with honesty, transparency, and ethical responsibility. Integrity defines our relationships and reputation.",
		},
		{
			number: "05",
			title: "Quality First",
			description:
				"We prioritize quality in every detail to ensure long-lasting safety. Excellence is not a goal - it's our standard.",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0 },
	};

	const handleNavigate = (section) => {
		navigate.push(`/about#${section}`);
	};

	return (
		<section className="py-10 bg-gray-50">
			<div className="md:px-10 px-5">
				<div className="text-left md:mb-16 mb-8">
					<h2 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4">
						Our Core Values
					</h2>
					<p
						className={`${manrope.className} md:text-base text-sm text-gray-600 max-w-3xl`}
					>
						At LADWA, our core values shape who we are and how we work. They
						drive our decisions, inspire innovation, and ensure we deliver
						excellence and trust at every step.
					</p>
				</div>

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8 md:mb-12 mb-6"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{values.map((value, index) => (
						<motion.div
							key={index}
							className={`bg-gradient-to-b from-[#EEFFFD] to-[#fff] p-6 lg:p-8 rounded-2xl border-2 border-teal-200 cursor-pointer transition-all duration-500 min-h-[220px] lg:min-h-[350px] flex flex-col ${
								hoveredCard === index
									? "col-span-1 sm:col-span-2 lg:col-span-1"
									: "col-span-1"
							}`}
							variants={cardVariants}
							onHoverStart={!isMobile ? () => setHoveredCard(index) : undefined}
							onHoverEnd={!isMobile ? () => setHoveredCard(null) : undefined}
							animate={{
								scale: hoveredCard !== null && hoveredCard !== index ? 0.95 : 1,
								opacity:
									hoveredCard !== null && hoveredCard !== index ? 0.7 : 1,
							}}
							transition={{ duration: 0.3 }}
						>
							{!isMobile && hoveredCard !== index && (
								<div
									className={`${outfit.className} flex flex-col items-center justify-center h-full text-center`}
								>
									<motion.div
										className="text-[32px] lg:text-[48px] font-bold text-black mb-4"
										initial={{ scale: 1, opacity: 1 }}
									>
										{value.number}
									</motion.div>
									<motion.h3
										className="text-[1.5rem] sm:text-[2rem] lg:text-[2.25rem] font-bold text-black/30"
										style={{
											writingMode: "vertical-rl",
											textOrientation: "mixed",
										}}
										initial={{ rotate: 0 }}
									>
										{value.title}
									</motion.h3>
								</div>
							)}

							{(isMobile || hoveredCard === index) && (
								<motion.div
									className="flex flex-col h-full"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<div
										className={`${outfit.className} flex items-center justify-center gap-4 md:mb-6 mb-3`}
									>
										<motion.div
											className="text-4xl font-bold text-[#1F9885]"
											initial={{ scale: 1 }}
											animate={{ scale: 0.8 }}
											transition={{ duration: 0.2 }}
										>
											{value.number}
										</motion.div>
										<motion.h3
											className="text-lg md:text-4xl font-bold text-teal-600"
											initial={{ fontSize: "2.25rem" }}
											animate={{ fontSize: "1.125rem" }}
											transition={{ duration: 0.2 }}
										>
											{value.title}
										</motion.h3>
									</div>

									<motion.div
										className="flex-1 flex flex-col justify-between"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: 0.1 }}
									>
										<p
											className={`${manrope.className} text-gray-600 md:mb-4 text-sm text-center leading-relaxed`}
										>
											{value.description}
										</p>
										{/* <Button
											size="sm"
											onClick={() => {
												navigate.push("/contact-us");
											}}
											className="bg-gradient-to-b from-[#097362] to-[#0FA78E] hover:bg-teal-700 text-white rounded-full self-start"
										>
											Know More
										</Button> */}
									</motion.div>
								</motion.div>
							)}
						</motion.div>
					))}
				</motion.div>

				<motion.div
					className="text-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<Button
						onClick={() => handleNavigate("values")}
						className="bg-gradient-to-b from-[#097362] to-[#0FA78E] hover:bg-teal-700 text-white px-8 py-3 rounded-full cursor-pointer"
					>
						Know More
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
