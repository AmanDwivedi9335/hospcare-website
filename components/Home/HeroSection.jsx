"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection({ videoImg }) {
	return (
		<section className="bg-gradient-to-b from-gray-50 to-white py-12">
			<div className="container mx-auto px-10">
				<div className="flex flex-col items-center text-center mb-12">
					<motion.div
						className="inline-block px-4 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Introducing Ladwa
					</motion.div>

					<motion.h1
						className="text-4xl md:text-6xl font-bold mb-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						Making The World <br />
						<span className="text-teal-700">Safer & Responsibility</span>
					</motion.h1>

					<motion.p
						className="text-gray-600 max-w-2xl mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Ladwa Solutions Inc, is a pioneer in the manufacture, supply and
						export of Road Safety products, Industrial Safety Equipment,
						Security Equipment, Barrication & Retro reflective signages.
					</motion.p>

					<motion.div
						className="flex gap-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<Button onClick={() => {navigate.push('/contact-us')}} className="bg-teal-700 hover:bg-teal-800">
							Get Started
						</Button>
						<Button
							variant="outline"
							onClick={() => {navigate.push('/contact-us')}}
							className="border-teal-700 text-teal-700 hover:bg-teal-50"
						>
							Sign Up
						</Button>
					</motion.div>
				</div>

				<motion.div
					className="relative rounded-xl overflow-hidden max-w-4xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<div className="relative">
						<Image
							src={videoImg.src || "/placeholder.svg"}
							alt="Safety workers"
							width={1000}
							height={600}
							className="object-contain w-full h-full"
						/>
						<div className="w-full h-full absolute inset-0 flex items-center justify-center">
							<div className="bg-teal-700 rounded-full p-3 cursor-pointer">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-white"
								>
									<polygon points="5 3 19 12 5 21 5 3"></polygon>
								</svg>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
