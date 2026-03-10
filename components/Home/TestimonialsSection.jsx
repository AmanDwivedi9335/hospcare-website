"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/Home/TestimonialCard.jsx";

export default function TestimonialsSection() {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);

	const testimonials = [
		{
			id: 1,
			content:
				"Experience a payment app built on simplicity and transparency. No hidden fees, just a seamless user experience that makes every transaction easy and stress-free. Say goodbye to confusion and hello to straightforward payments.",
			author: "Ethan Williams",
			position: "Digital Marketing Specialist",
			rating: 5,
		},
		{
			id: 2,
			content:
				"Discover a payment app focused on transparency. Enjoy a seamless experience with no hidden fees, providing clarity and efficiency in every transaction. It's designed to put you in control of your payments.",
			author: "Daniel Thompson",
			position: "Product Designer",
			rating: 5,
		},
	];

	return (
		<section className="py-16 bg-teal-50">
			<div className="container mx-auto px-10">
				<motion.div
					className="max-w-2xl mx-auto text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<div className="text-sm font-medium text-teal-700 mb-2">
						TESTIMONIAL
					</div>
					<h2 className="text-3xl font-bold mb-4">What our Clients Says</h2>
					<p className="text-gray-600">
						Boost your credibility by featuring genuine testimonials from real
						users, showcasing their positive experiences and satisfaction with
						LADWA services.
					</p>
				</motion.div>

				<div className="relative">
					<div className="max-w-4xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={testimonial.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<TestimonialCard
										content={testimonial.content}
										author={testimonial.author}
										position={testimonial.position}
										rating={testimonial.rating}
									/>
								</motion.div>
							))}
						</div>

						<div className="flex justify-center mt-8">
							<button
								className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center mr-2"
								onClick={() =>
									setCurrentTestimonial((prev) =>
										prev === 0 ? testimonials.length - 1 : prev - 1
									)
								}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m15 18-6-6 6-6"></path>
								</svg>
							</button>
							<button
								className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center"
								onClick={() =>
									setCurrentTestimonial((prev) =>
										prev === testimonials.length - 1 ? 0 : prev + 1
									)
								}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m9 18 6-6-6-6"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
