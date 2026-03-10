"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
	Logo6,
	Logo7,
	Logo8,
	Logo9,
	Logo10,
	Logo11,
	Logo12,
} from "@/public/images/NewHome";
import ball from "@/public/images/NewHome/3d ball.png";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export default function SectorsSection() {
	const navigate = useRouter();
	const sectors = [
		{ icon: Logo8, title: "Road Safety Equipment" },
		{ icon: Logo9, title: "Industrial Safety Gear" },
		{ icon: Logo10, title: "Fire Safety Solutions" },
		{ icon: Logo11, title: "Personal Protective Equipment (PPE)" },
		{ icon: Logo12, title: "Traffic Management & Smart Safety Systems" },
		{
			icon: Logo8,
			title: "Emergency & Safety Kits – for homes, offices, hospitals, schools",
		},
	];

	const features = [
		{
			title: "Client-Centric Experience",
			description: [
				"Dedicated after-sales service teams",
				"Global feedback loop for continuous innovation",
				"Custom safety solutions based on local..",
			],
		},
		{
			title: "Certifications & Awards We Pursue",
			description: [
				"Red Dot Design Award (Product Excellence)",
				"Export Excellence Award",
				"Sustainability & Innovation Awards",
			],
		},
		{
			title: "Our Presence",
			description: [
				"Offices and warehousing across major Indian cities",
				"Export operations in 20+ countries",
			],
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	const handleNavigate = (section) => {
		navigate.push(`/about#${section}`);
	};

	return (
		<section
			className={`relative p-1 w-full  max-w-7xl mx-auto rounded-3xl bg-gradient-to-b z-10 from-[#CAFFF9] to-white`}
		>
			<div className="md:p-10 p-5 bg-gradient-to-b from-[#E3FFFB] to-[#C7EBFF]/80 backdrop-blur  rounded-3xl z-10 relative">
				<motion.div
					className="text-center md:mb-16 mb-5 relative z-10"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="md:text-5xl text-3xl font-bold text-gray-900 md:mb-8">
						Sectors we cater
					</h2>
				</motion.div>

				<motion.div
					className={`${inter.className} mb-16 relative z-10 border p-4 border-cyan-200 rounded-2xl `}
					variants={containerVariants}
					initial="visible"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{/* First row - 3 items */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
						{sectors.slice(0, 3).map((sector, index) => (
							<div
								key={index}
								className="bg-gradient-to-b from-[#A2FFF0] to-white p-1 rounded-3xl w-full"
							>
								<motion.div
									className="bg-gradient-to-r from-white to-[#9FFFF0] p-4 rounded-3xl"
									variants={cardVariants}
								>
									<div className="flex items-center space-x-4">
										<motion.div className="flex items-center justify-center">
											<img
												src={sector.icon.src}
												className="w-12 h-12 text-teal-600"
											/>
										</motion.div>
										<h3 className="font-semibold text-sm md:text-base text-black">
											{sector.title}
										</h3>
									</div>
								</motion.div>
							</div>
						))}
					</div>

					{/* Second row - 2 items centered */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 max-w-4xl mx-auto">
						{sectors.slice(3, 5).map((sector, index) => (
							<div
								key={index + 3}
								className="bg-gradient-to-b from-[#A2FFF0] to-white p-1 rounded-3xl w-full"
							>
								<motion.div
									className="bg-gradient-to-r from-white to-[#9FFFF0] p-4 rounded-3xl"
									variants={cardVariants}
								>
									<div className="flex items-center space-x-4">
										<motion.div className="flex items-center justify-center">
											<img
												src={sector.icon.src}
												className="w-12 h-12 text-teal-600"
											/>
										</motion.div>
										<h3 className="font-semibold text-sm md:text-base text-black">
											{sector.title}
										</h3>
									</div>
								</motion.div>
							</div>
						))}
					</div>

					{/* Third row - 1 item centered */}
					<div className="flex justify-center">
						<div className="w-full max-w-md">
							{sectors.slice(5, 6).map((sector, index) => (
								<div
									key={index + 5}
									className="bg-gradient-to-b from-[#A2FFF0] to-white p-1 rounded-3xl w-full"
								>
									<motion.div
										className="bg-gradient-to-r from-white to-[#9FFFF0] p-4 rounded-3xl"
										variants={cardVariants}
									>
										<div className="flex items-center space-x-4">
											<motion.div className="flex items-center justify-center">
												<img
													src={sector.icon.src}
													className="w-12 h-12 text-teal-600"
												/>
											</motion.div>
											<h3 className="font-semibold text-sm md:text-base text-black">
												{sector.title}
											</h3>
										</div>
									</motion.div>
								</div>
							))}
						</div>
					</div>
				</motion.div>

				<motion.div
					className="grid lg:grid-cols-2 gap-12 relative z-10"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<motion.div
						className="bg-white/60 p-8 border-2 border-teal-200 rounded-2xl shadow-sm"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
					>
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Global Strategy & Partnerships
						</h3>
						<p className="text-gray-600 text-sm font-semibold mb-6">
							LADWA is actively expanding its global footprint through:
						</p>
						<div className="space-y-2 text-black mb-6">
							<p className="w-fit font-semibold md:p-3 text-sm md:text-lg p-5 bg-[#097362]/10 border-b-2 border-cyan-200 rounded-full">
								International distributor partnerships
							</p>
							<p className="w-fit font-semibold md:p-3 text-sm md:text-lg p-5 bg-[#097362]/10 border-b-2 border-cyan-200 rounded-full">
								Participation in top global expos (A+A, Intersec, NSC)
							</p>
						</div>
						<div className="flex justify-between">
							<Button
								onClick={() => handleNavigate("offerings")}
								className="bg-gradient-to-b from-[#097362] to-[#0FA78E] hover:bg-teal-700 text-white rounded-full cursor-pointer"
							>
								Know More
							</Button>
							<img src={Logo6.src} />
						</div>
					</motion.div>

					<motion.div
						className="flex flex-col items-center justify-center bg-white/60 border-2 border-teal-200 p-8 rounded-2xl shadow-sm"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
					>
						<img src={Logo7.src} />
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Partner With LADWA
						</h3>
						<p className="text-gray-600 text-sm  font-semibold mb-6">
							Whether you're an importer, distributor, EPC contractor, or
							government procurement agency — LADWA is your strategic ally for
							compliant, innovative, and scalable EHS products.
						</p>
						<Button
							onClick={() => {
								navigate.push("/contact-us");
							}}
							className="bg-gradient-to-b from-[#097362] to-[#0FA78E] hover:bg-teal-700 text-white rounded-full cursor-pointer"
						>
							Know More
						</Button>
					</motion.div>
				</motion.div>

				{/* Features cards section */}
				<motion.div
					className="md:py-10 py-5 grid grid-cols-1 lg:grid-cols-3 gap-12"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="bg-white/60 p-6 border-2 border-teal-200 rounded-xl shadow-sm"
							variants={cardVariants}
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.2 }}
						>
							<h3 className="text-xl  font-bold text-gray-900 mb-4">
								{feature.title}
							</h3>
							<ul className="space-y-2">
								{feature.description.map((description, descIndex) => (
									<li
										key={descIndex}
										className="text-gray-600 md:text-base text-sm flex"
									>
										{description}
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</motion.div>

				{/* Centered button */}
				<div className="flex justify-center relative z-10">
					<Button
						onClick={() => handleNavigate("presence")}
						size="sm"
						className="bg-gradient-to-b from-[#097362] to-[#0FA78E] hover:bg-teal-700 text-white rounded-full cursor-pointer"
					>
						Know More
					</Button>
				</div>
			</div>

			{/* 3D Ball - positioned at bottom center behind the blue container */}
			<div className="absolute hidden lg:block -bottom-5 lg:-bottom-32 left-1/2 transform -translate-x-1/2 z-0">
				<div className="w-[20vw] h-[20vh] md:w-[40vw] md:h-[40vh]">
					<Image
						src={ball}
						alt="3D Ball"
						className="w-full h-full object-contain"
					/>
				</div>
			</div>
		</section>
	);
}