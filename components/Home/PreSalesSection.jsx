"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PreSalesImg1 from "@/public/images/home/PreSalesIm1.png";
import PreSalesImg2 from "@/public/images/home/PreSalesIm2.png";
import PreSalesImg3 from "@/public/images/home/PreSalesIm3.png";

export default function PreSalesSection() {
	return (
		<section className="py-16 bg-white">
			<div className="px-10">
				<motion.div
					className="mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-5xl font-bold mb-20 text-center">
						<span className="text-black">PRE </span>
						<span className="text-teal-600">SALES</span>
					</h2>

					<div className="space-y-16">
						{/* Step 1 - Right image with dotted circle and line */}
						<motion.div
							className="relative"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							<div className="flex flex-col md:flex-row">
								{/* Left content with number and text */}
								<div className="w-full h-[160px] md:w-1/2 pr-4 relative rounded-l-full border-2 border-dashed border-teal-600 sm:border-r-transparent">
									<div className="h-full flex items-center">
										{/* Dotted circle with number */}
										<div className="relative">
											<div className="w-28 h-28 flex items-center justify-center">
												<span className="text-5xl font-bold text-teal-600">
													01
												</span>
											</div>
										</div>

										{/* Text below the line */}
										<div className="sm:pl-20 mt-3">
											<p className="text-gray-700 text-xl font-bold">
												Get the BOQ / Requirements from the clients
											</p>
										</div>
									</div>
								</div>

								{/* Right image */}
								<div className="w-full md:w-1/2 mt-6 md:mt-0">
									<div className="rounded-lg overflow-hidden">
										<Image
											src={PreSalesImg1.src}
											width={600}
											height={300}
											alt="Step 1"
											className="w-full h-40 object-cover"
										/>
									</div>
								</div>
							</div>

							{/* Vertical dotted line connector */}
							{/* <div className="border-l-2 border-dashed border-teal-600 absolute left-14 top-full h-16 z-0 hidden md:block"></div> */}
						</motion.div>

						{/* Step 2 - Left image with green background and white text */}
						<motion.div
							className="relative"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<div className="flex flex-col-reverse md:flex-row">
								{/* Left image */}
								<div className="w-full md:w-1/2 mt-6 md:mt-0">
									<div className="rounded-lg overflow-hidden">
										<Image
											src={PreSalesImg2.src}
											width={600}
											height={300}
											alt="Step 1"
											className="w-full h-40 object-cover"
										/>
									</div>
								</div>

								{/* Right content with green background */}
								<div className="w-full md:w-1/2 h-[160px]">
									<div className="h-full bg-teal-600 text-white py-6 px-10 rounded-r-full rounded-l-3xl flex items-center">
										<span className="text-5xl font-bold mr-6">02</span>
										<p className="text-lg">
											Do a survey of the work site and give a report /
											suggestions of making their premises more safer
										</p>
									</div>
								</div>
							</div>

							{/* Vertical dotted line connector */}
							{/* <div className="border-l-2 border-dashed border-teal-600 absolute right-[calc(50%+6rem)] top-full h-16 z-0 hidden md:block"></div> */}
						</motion.div>

						{/* Step 3 - Right image with dotted circle and line */}
						<motion.div
							className="relative"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<div className="flex flex-col items-center md:flex-row">
								{/* Left content with number and text */}
								<div className="w-full h-[160px] md:w-1/2 pr-4 relative rounded-l-full border-2 border-dashed border-teal-600 sm:border-r-transparent">
									<div className="h-full flex items-center">
										{/* Dotted circle with number */}
										<div className="relative">
											<div className="w-28 h-28 flex items-center justify-center">
												<span className="text-5xl font-bold text-teal-600">
													03
												</span>
											</div>
										</div>

										{/* Text below the line */}
										<div className="sm:pl-12 mt-3">
											<p className="text-gray-700 text-xl font-bold">
												Meet with clients & Projects consultant to give inputs
												based on our experience.
											</p>
										</div>
									</div>
								</div>

								{/* Right image */}
								<div className="w-full md:w-1/2 mt-6 md:mt-0">
									<div className="rounded-lg overflow-hidden">
										<Image
											src={PreSalesImg3.src}
											width={600}
											height={300}
											alt="Step 1"
											className="w-full h-40 object-cover"
										/>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>

				<div className="flex justify-center mt-12">
					<Button onClick={() => {navigate.push('/contact-us')}} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded">
						View all
					</Button>
				</div>
			</div>
		</section>
	);
}
