"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInquiryStore } from "@/lib/store";
import Image from "next/image";
import { DEFAULT_PRODUCT_DESCRIPTION } from "@/lib/defaults";

export default function InquiryForm() {
	const { isOpen, product, closeInquiry } = useInquiryStore();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", { product, ...formData });
		// Submit form logic here
		closeInquiry();
		// Show success message
		alert("Your inquiry has been submitted successfully!");
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={closeInquiry}
				>
					<motion.div
						className="bg-white rounded-lg overflow-hidden max-w-4xl w-full"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="grid grid-cols-1 md:grid-cols-2">
							<div className="bg-teal-700 p-6 text-white">
								<h2 className="text-xl font-semibold mb-2">Product Enquiry</h2>
								{product && (
									<div className="space-y-4">
										<h3 className="font-medium">{product.name}</h3>
										<p className="text-sm text-teal-100">
                                                                              {product.description || DEFAULT_PRODUCT_DESCRIPTION}
										</p>
										<div className="relative h-48 bg-teal-800/50 rounded-lg">
											<Image
												src={product.image || "/placeholder.svg"}
												alt={product.name}
												fill
												className="object-contain p-4"
											/>
										</div>
									</div>
								)}
							</div>
							<div className="p-6 relative">
								<button
									onClick={closeInquiry}
									className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
								>
									<X size={20} />
								</button>
								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label
												htmlFor="firstName"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												First Name
											</label>
											<Input
												id="firstName"
												name="firstName"
												value={formData.firstName}
												onChange={handleChange}
												required
											/>
										</div>
										<div>
											<label
												htmlFor="lastName"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Last Name
											</label>
											<Input
												id="lastName"
												name="lastName"
												value={formData.lastName}
												onChange={handleChange}
												required
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Email
										</label>
										<Input
											id="email"
											name="email"
											type="email"
											value={formData.email}
											onChange={handleChange}
											required
										/>
									</div>
									<div>
										<label
											htmlFor="phone"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Phone Number
										</label>
										<Input
											id="phone"
											name="phone"
											type="tel"
											value={formData.phone}
											onChange={handleChange}
											required
										/>
									</div>
									<div>
										<label
											htmlFor="message"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Message
										</label>
										<Textarea
											id="message"
											name="message"
											rows={4}
											value={formData.message}
											onChange={handleChange}
										/>
									</div>
									<Button
										type="submit"
										className="w-full bg-teal-700 hover:bg-teal-800"
									>
										Submit
									</Button>
								</form>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
