"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WPImg1 from "@/public/images/home/WPImg1.png";
import WPImg2 from "@/public/images/home/WPImg2.png";
import WPImg3 from "@/public/images/home/WPImg3.png";

export default function WorkProcessCircularSection() {
	const processSteps = {
		step1: {
			number: "01",
			title: "PRE SALES",
			description:
				"Get the BOQ / Requirements from the clients and understand their needs for safety equipment.",
			icon: WPImg1.src,
			delay: 0.1,
		},
		step2: {
			number: "02",
			title: "POST SALE ACTIVITIES",
			description:
				"Do a survey of the work site and give a report / suggestions of making their premises more safer.",
			icon: WPImg2.src,
			delay: 0.2,
		},
		step3: {
			number: "03",
			title: "PROJECT EXECUTION",
			description:
				"Meet with clients & Projects consultant to give inputs based on our experience and implement solutions.",
			icon: WPImg3.src,
			delay: 0.3,
		},
	};

	return (
		<section className="pt-16 bg-white">
			<div className="container mx-auto px-10">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-4xl font-bold mb-2">
						Our Work <span className="text-teal-600">Process</span>
					</h2>
					<p className="text-gray-600">
						This outlines our Pre-sales, <br />
						Post Sales and Project Execution methodology.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Step 1 */}
					<motion.div
						key={processSteps.step1.number}
						className="text-center relative max-w-[230px] mx-auto"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: processSteps.step1.delay }}
					>
						<div className="mb-6">
							{/* Step Title */}
							<h3 className="text-xl font-bold mb-2 relative z-10">
								{processSteps.step1.title}
							</h3>
							{/* Step Description */}
							<p className="text-gray-600">{processSteps.step1.description}</p>
						</div>

						{/* Step Icon */}
						<div className="relative z-10 mb-6">
							{processSteps.step1.number === "01" ? (
                                                                <div className="bg-teal-600 rounded-b-full h-32 w-32 mx-auto flex items-center justify-center custom-shadow">
                                                                        <img src={processSteps.step1.icon} alt={processSteps.step1.title} className="w-16 h-16 text-white" />
								</div>
							) : (
                                                                <div className="border-2 border-teal-600 rounded-b-full h-32 w-32 mx-auto flex items-center justify-center custom-shadow">
                                                                        <img src={processSteps.step1.icon} alt={processSteps.step1.title} className="w-16 h-16 text-teal-600" />
								</div>
							)}
						</div>

						{/* Step Number */}
						<div className=" text-teal-500 text-5xl font-bold opacity-20 mb-4">
							{processSteps.step1.number}
						</div>
					</motion.div>

					{/* Step 2 */}
					<motion.div
						key={processSteps.step2.number}
						className="text-center relative max-w-[230px] mx-auto"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: processSteps.step1.delay }}
					>
						{/* Step Number */}
						<div className=" text-teal-500 text-5xl font-bold opacity-20 mb-4">
							{processSteps.step2.number}
						</div>

						{/* Step Icon */}
						<div className="relative z-10 mb-6">
							{processSteps.step2.number === "01" ? (
                                                                <div className="bg-teal-600 rounded-b-full h-32 w-32 mx-auto flex items-center justify-center custom-shadow">
                                                                        <img src={processSteps.step2.icon} alt={processSteps.step2.title} className="w-16 h-16 text-white" />
								</div>
							) : (
                                                                <div className="border-4 border-transparent shadow-lg border-b-teal-600 rounded-t-full h-32 w-32 mx-auto flex items-center justify-center custom-shadow">
                                                                        <img src={processSteps.step2.icon} alt={processSteps.step2.title} className="w-16 h-16 text-teal-600" />
								</div>
							)}
						</div>

						<div className="mb-6">
							{/* Step Title */}
							<h3 className="text-xl font-bold mb-2 relative z-10">
								{processSteps.step2.title}
							</h3>
							{/* Step Description */}
							<p className="text-gray-600">{processSteps.step2.description}</p>
						</div>
					</motion.div>

					{/* Step 3 */}
					<motion.div
						key={processSteps.step3.number}
						className="text-center relative max-w-[230px] mx-auto"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: processSteps.step3.delay }}
					>
						<div className="mb-6">
							{/* Step Title */}
							<h3 className="text-xl font-bold mb-2 relative z-10">
								{processSteps.step3.title}
							</h3>
							{/* Step Description */}
							<p className="text-gray-600">{processSteps.step3.description}</p>
						</div>

						{/* Step Icon */}
						<div className="relative z-10 mb-6">
							{processSteps.step1.number === "03" ? (
                                                                <div className="bg-teal-600 rounded-b-full h-32 w-32 mx-auto flex items-center justify-center custom-shadow">
                                                                        <img src={processSteps.step3.icon} alt={processSteps.step3.title} className="w-16 h-16 text-white" />
								</div>
							) : (
                                                                <div className="border-4 border-transparent shadow-lg border-t-teal-600 rounded-b-full h-32 w-32 mx-auto flex items-center justify-center custom-shadow">
                                                                        <img src={processSteps.step3.icon} alt={processSteps.step3.title} className="w-16 h-16 text-teal-600" />
								</div>
							)}
						</div>

						{/* Step Number */}
						<div className=" text-teal-500 text-5xl font-bold opacity-20 mb-4">
							{processSteps.step3.number}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
