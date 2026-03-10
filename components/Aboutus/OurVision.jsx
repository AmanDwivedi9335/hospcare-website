"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import img from "@/public/images/aboutus/AboutUsImg.png";
import bulb from "../../public/images/aboutus/bulb.png";
import { Outfit } from "next/font/google";

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

const OurVision = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.3,
			},
		},
	};

	const imageVariants = {
		hidden: {
			opacity: 0,
			x: -50,
			scale: 0.9,
		},
		visible: {
			opacity: 1,
			x: 0,
			scale: 1,
			transition: {
				duration: 0.8,
				ease: "easeOut",
			},
		},
	};

	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 30,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	const iconVariants = {
		hidden: {
			opacity: 0,
			rotate: -45,
			scale: 0.8,
		},
		visible: {
			opacity: 1,
			rotate: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	const textVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	return (
		<div className="w-full max-w-full mx-auto">
			<motion.div
				className="flex justify-between flex-col md:flex-row max-w-7xl mx-auto gap-6 my-6 items-center w-full px-2 md:px-6 lg:px-1"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<motion.div
					className="xl:w-[40vw] w-full md:w-auto rounded-3xl"
					variants={imageVariants}
				>
					<Image
						src={img}
						alt="our vision image"
						className="rounded-3xl w-full h-auto"
					/>
				</motion.div>

				<motion.div
					className="flex flex-col w-full md:w-[48vw] justify-center items center gap-6 sm:gap-8 md:gap-12"
					variants={containerVariants}
				>
					<motion.div
						className="bg-gradient-to-b from-[#A2FFF0] to-white p-1 rounded-3xl w-full"
						variants={cardVariants}
						whileHover={{
							scale: 1.02,
							boxShadow: "0 10px 30px rgba(162, 255, 240, 0.3)",
						}}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-center w-full items-center md:py-2 gap-3 md:gap-6 bg-gradient-to-r from-white to-[#9FFFF0] rounded-3xl md:w-[48vw] px-1 md:px-4 flex-col sm:flex-row">
							<motion.div variants={iconVariants}>
								<Image
									src={bulb}
									alt="abulb icon"
									className="w-12 h-12  md:w-[12vw] md:h-[10vh] flex-shrink-0"
								/>
							</motion.div>
							<motion.div
								className="text-center sm:text-left"
								variants={textVariants}
							>
								<h1 className="text-lg md:text-2xl font-semibold mb-2">
									Our Vision
								</h1>
								<p className={`text-xs md:text-base`}>
									To be the leading Indian brand with a global footprint in
									Environment, Health, and Safety solutions—championing
									innovation, setting safety standards, and shaping a world
									where every workplace, road, and community is safer and more
									sustainable.
								</p>
							</motion.div>
						</div>
					</motion.div>

					<motion.div
						className="bg-gradient-to-b from-[#A2FFF0] to-white p-1 rounded-3xl"
						variants={cardVariants}
						whileHover={{
							scale: 1.02,
							boxShadow: "0 10px 30px rgba(162, 255, 240, 0.3)",
						}}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-center items-center w-full py-2 gap-3 sm:gap-4 md:gap-6 bg-gradient-to-r from-white to-[#9FFFF0] rounded-3xl md:w-[48vw] px-3 sm:px-4 md:px-5 flex-col sm:flex-row">
							<motion.div variants={iconVariants}>
								<Image
									src={bulb}
									alt="abulb icon"
									className="w-12 h-12 sm:w-16 sm:h-16 md:w-[12vw] md:h-[10vh] flex-shrink-0"
								/>
							</motion.div>
							<motion.div
								className="text-center sm:text-left"
								variants={textVariants}
							>
								<h1 className="text-lg sm:text-xl md:text-[24px] font-semibold mb-2">
									Our Mision
								</h1>
								<p className={`text-xs sm:text-sm md:text-base`}>
									LADWA is dedicated to delivering reliable, innovative, and
									affordable EHS solutions. We strive to safeguard lives through
									high-quality products, service excellence, and impactful
									awareness campaigns that foster a global culture of safety and
									responsibility.
								</p>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default OurVision;
