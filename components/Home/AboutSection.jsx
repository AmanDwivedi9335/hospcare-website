"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutSection({ ladwaExpImg }) {
	return (
		<section className="py-16 bg-gray-50">
			<div className=" lg:max-w-[90%] mx-auto px-10">
				<div className="flex flex-col md:flex-row gap-12 items-center">
					<motion.div
						className="md:w-1/2 relative"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="relative">
							<Image
								src={ladwaExpImg.src || "/placeholder.svg"}
								alt="25 years of experience"
								width={500}
								height={400}
								className="rounded-lg"
							/>
							<div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-lg shadow-lg">
								<div className="text-teal-700 font-bold text-4xl">25</div>
								<div className="text-gray-700 font-medium">
									YEARS OF
									<br />
									EXPERIENCE
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						className="md:w-1/2"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="text-teal-700 font-medium mb-2">
							LADWA SOLUTIONS INC
						</div>
						<h2 className="text-3xl font-bold mb-6">
							ONE OF THE WORLD&apos;S LEADING ROAD SAFETY PRODUCTS
							MANUFACTURER&apos;S
						</h2>
						<p className="text-gray-600 mb-4">
							Ladwa Solutions Inc, is a pioneer in the Road Safety Products
							Manufacturer, supplier and exporter of Safety Equipment,
							Industrial Safety Equipment, Security Equipment, Barrication &
							Retro reflective signages.
						</p>
						<p className="text-gray-600 mb-6">
							Incorporated in the year 1999, Ladwa Solutions Inc. We have
							expertise in meeting the Occupational Safety, Traffic Management,
							Health and Environmental needs by offering need based and
							regulatory compliance.
						</p>
						<Button onClick={() => {navigate.push('/contact-us')}} className="bg-teal-700 hover:bg-teal-800">Read More</Button>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
