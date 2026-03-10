"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BannerImg from "@/public/images/blog/SolutionsBanner.png";

const HeroSection = () => {
	return (
		<motion.section
			className="relative py-24 overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			{/* Background Image */}
			<div className="absolute inset-0">
				<Image
					src={BannerImg.src}
					width={1000}
					height={500}
					alt="LADWA Safety Professional"
					className="w-full h-full object-cover"
					priority
				/>
			</div>

			<div className="absolute inset-0 bg-black/50"></div>

			{/* Animated background elements */}
			<div className="absolute z-10">
				{[...Array(5)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl"
						initial={{ scale: 0, opacity: 0 }}
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.3, 0.6, 0.3],
							x: [0, 100, 0],
							y: [0, -50, 0],
						}}
						transition={{
							duration: 10,
							repeat: Number.POSITIVE_INFINITY,
							delay: i * 1.5,
						}}
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
					/>
				))}
			</div>

			<div className="relative container mx-auto px-4 text-center">
				<motion.div
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-400 to-emerald-700 mb-6 leading-tight">
						SOLUTIONS
					</h1>
					<p className="text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
						Comprehensive safety solutions designed to protect lives and enhance
						workplace security across various industries
					</p>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default HeroSection;
