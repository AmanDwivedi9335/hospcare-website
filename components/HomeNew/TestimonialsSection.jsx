"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialsSection() {
	const scrollRef = useRef(null);
	const cardRef = useRef(null); 

	const testimonials = [
		{
			name: "MV KRISHNA",
			role: "Head of Administration at Greenwood High International School",
			rating: 5,
			text: "LADWA has been a good vendor and service provider. We have been going back to them time and again for quality products and services",
			avatar: "/mnt/data/4b03ee6c-03eb-4ef9-9c8e-cb49e5d09748.jpg",
		},
		{
			name: "KUSHALA KUSH",
			role: "Contracts, Purchase, QS, Billing",
			rating: 5,
			text: "Experience working with LADWA has been good, and they are proficient in traffic safety products.",
			avatar: "/mnt/data/4b03ee6c-03eb-4ef9-9c8e-cb49e5d09748.jpg",
		},
		{
			name: "GIRISH PANDEY",
			role: "Assistant Manager in Godrej & Boyce",
			rating: 5,
			text: "Ladwa delivers good Quality and commitment to works. My experience with Ladwa has been good.",
			avatar: "/mnt/data/4b03ee6c-03eb-4ef9-9c8e-cb49e5d09748.jpg",
		},
	];

	const scroll = (direction) => {
		if (!scrollRef.current || !cardRef.current) return;
		const scrollAmount = cardRef.current.offsetWidth + 24; // 24px for gap-6
		scrollRef.current.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
	};

	return (
		<section className="my-5 overflow-hidden">
			<div className="container mx-auto px-4 lg:px-6">
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
					
					{/* Left Column */}
					<div className="lg:col-span-2 lg:sticky lg:top-8">
						<p className="text-black text-[16px] font-semibold mb-3 text-sm uppercase tracking-wider">
							TESTIMONIAL
						</p>
						<h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
							We've built trust with reviews from real users
						</h2>
						<p className="text-gray-600 mb-8 text-base">
							Each testimonial comes from genuine people who've experienced our service firsthand, sharing honest feedback about their journey.
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => scroll("left")}
								className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
								aria-label="Scroll left"
							>
								<ChevronLeft className="w-5 h-5 text-gray-600" />
							</button>
							<button
								onClick={() => scroll("right")}
								className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1D9481] to-[#029981] flex items-center justify-center hover:bg-teal-700 transition-all duration-200 shadow-sm"
								aria-label="Scroll right"
							>
								<ChevronRight className="w-5 h-5 text-white" />
							</button>
						</div>
					</div>

					{/* Right Column - Scrollable Testimonials */}
					<div className="lg:col-span-3">
						<div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
							<div className="flex gap-6 w-max pr-4">
								{testimonials.map((testimonial, index) => (
									<motion.div
										key={index}
										ref={index === 0 ? cardRef : null}
										className="min-w-[300px] lg:min-w-[33vw] bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100"
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.2 }}
										viewport={{ once: true }}
									>
										<div className="flex mb-4">
											{[...Array(testimonial.rating)].map((_, i) => (
												<Star
													key={i}
													className="w-5 h-5 text-yellow-400 fill-current"
												/>
											))}
										</div>
										<p className="mb-6 leading-relaxed text-gray-700 text-sm lg:text-base">
											{testimonial.text}
										</p>
										<div className="flex items-center gap-4">
											<Avatar className="w-12 h-12 border-2 border-gray-100">
												<AvatarImage
													src={testimonial.avatar}
													alt={`${testimonial.name} avatar`}
												/>
												<AvatarFallback className="bg-teal-100 text-teal-600 font-semibold">
													{testimonial.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div>
												<h4 className="font-semibold text-gray-900 text-sm lg:text-base">
													{testimonial.name}
												</h4>
												<p className="text-xs lg:text-sm text-gray-500">
													{testimonial.role}
												</p>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</section>
	);
}
