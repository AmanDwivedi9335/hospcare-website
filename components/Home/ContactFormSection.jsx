"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ContactFormSection({ constructionImg }) {
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-10">
				<div className="max-w-5xl mx-auto">
					<motion.div
						className="bg-white shadow-xl rounded-lg overflow-hidden"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="flex flex-col md:flex-row">
							<div className="md:w-1/2 p-8">
								<h3 className="text-xl font-bold mb-4">
									Benefit of the socie where we operate.
								</h3>
								<p className="text-gray-600 mb-8">
									A success website obusly needs great design and functionality.
								</p>

								<form className="space-y-4">
									<div>
										<input
											type="text"
											placeholder="Your Name"
											className="w-full p-3 bg-gray-100 rounded-md"
										/>
									</div>
									<div>
										<input
											type="email"
											placeholder="Your Email"
											className="w-full p-3 bg-gray-100 rounded-md"
										/>
									</div>
									<div>
										<input
											type="text"
											placeholder="Your Subject"
											className="w-full p-3 bg-gray-100 rounded-md"
										/>
									</div>
									<Button onClick={() => {navigate.push('/contact-us')}} className="w-full bg-teal-700 hover:bg-teal-800">
										SUBMIT NOW
									</Button>
								</form>
							</div>
							<div className="md:w-1/2 relative">
								<Image
									src={constructionImg.src || "/placeholder.svg"}
									alt="Construction Equipment"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
