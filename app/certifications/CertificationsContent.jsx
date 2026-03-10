"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle, Globe, Shield } from "lucide-react";
import iso from "@/public/images/certificates/ISO.png"
import coa from "@/public/images/certificates/COA.png"
import cor from "@/public/images/certificates/COR.png"
import amazon from "@/public/images/certificates/amzon.jpg"
import amazon1 from "@/public/images/certificates/Amazon1.png"
import amazon2 from "@/public/images/certificates/Amazon2.png"
import amazon3 from "@/public/images/certificates/Amazon3.png"
import amazon4 from "@/public/images/certificates/Amazon4.png"


// Animation variants
const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const staggerItem = {
	initial: { opacity: 0, y: 30, scale: 0.9 },
	animate: { opacity: 1, y: 0, scale: 1 },
	transition: { duration: 0.5, ease: "easeOut" },
};

const scaleIn = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	transition: { duration: 0.6, ease: "easeOut" },
};

export default function CertificationsPage() {
	// Certificate data - replace with your actual certificate images
	const certificates = [
		{
			id: 1,
			title: "ISO 9001:2015",
			description: "Quality Management System",
			image: iso.src,
		},
		{
			id: 2,
			title: "COA",
			description: "Certificate of Achievement",
			image: coa.src,
		},
		{
			id: 3,
			title: "COR",
			description: "Certificate of Recognition",
			image: cor.src,
		},
		{
			id: 4,
			title: "Amazon",
			description: "Certificate of Achievement",
			image: amazon.src,
		},
		{
			id: 5,
			title: "Amazon",
			description: "Certificate of Achievement",
			image: amazon1.src,
		},
		{
			id: 6,
			title: "Amazon",
			description: "Certificate of Achievement",
			image: amazon2.src,
		},
		{
			id: 7,
			title: "Amazon",
			description: "Certificate of Achievement",
			image: amazon3.src,
		},
		{
			id: 8,
			title: "Amazon",
			description: "Certificate of Achievement",
			image: amazon4.src,
		},
	];

	return (
		<div className="flex flex-col min-h-screen">
			<div className="container mx-auto py-8 px-10">
				{/* Header Section */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				>
					<motion.div
						className="flex justify-center mb-6"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						<div className="bg-gradient-to-br from-[#097362] to-[#0FA78E] p-4 rounded-full">
							<Award className="h-12 w-12 text-white" />
						</div>
					</motion.div>

					<motion.h1
						className="text-3xl md:text-5xl font-bold mb-4"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						International Certifications
					</motion.h1>

					<motion.p
						className="text-gray-600 md:text-lg text-base max-w-3xl mx-auto leading-relaxed"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						CE, ISO, ANSI, and OSHA compliance ensures global market readiness,
						seamless integration, and trust. Our comprehensive certifications
						demonstrate our commitment to quality, safety, and international
						standards.
					</motion.p>
				</motion.div>

				{/* Key Benefits Section */}
				<motion.div
					className="grid md:grid-cols-3 gap-6 mb-16"
					variants={staggerContainer}
					initial="initial"
					animate="animate"
				>
					<motion.div
						variants={staggerItem}
						className="bg-white border-2 border-[#097362] rounded-2xl p-6 text-center"
						whileHover={{ scale: 1.05, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<div className="bg-gradient-to-br from-[#097362] to-[#0FA78E] p-3 rounded-full w-fit mx-auto mb-4">
							<Globe className="h-6 w-6 text-white" />
						</div>
						<h3 className="text-lg font-bold mb-2 text-[#097362]">
							Global Market Ready
						</h3>
						<p className="text-gray-600 text-sm">
							Our certifications ensure compliance with international standards
							for worldwide market access.
						</p>
					</motion.div>

					<motion.div
						variants={staggerItem}
						className="bg-white border-2 border-[#097362] rounded-2xl p-6 text-center"
						whileHover={{ scale: 1.05, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<div className="bg-gradient-to-br from-[#097362] to-[#0FA78E] p-3 rounded-full w-fit mx-auto mb-4">
							<Shield className="h-6 w-6 text-white" />
						</div>
						<h3 className="text-lg font-bold mb-2 text-[#097362]">
							Safety Assured
						</h3>
						<p className="text-gray-600 text-sm">
							OSHA and safety certifications guarantee the highest standards of
							workplace protection.
						</p>
					</motion.div>

					<motion.div
						variants={staggerItem}
						className="bg-white border-2 border-[#097362] rounded-2xl p-6 text-center"
						whileHover={{ scale: 1.05, y: -5 }}
						transition={{ duration: 0.3 }}
					>
						<div className="bg-gradient-to-br from-[#097362] to-[#0FA78E] p-3 rounded-full w-fit mx-auto mb-4">
							<CheckCircle className="h-6 w-6 text-white" />
						</div>
						<h3 className="text-lg font-bold mb-2 text-[#097362]">
							Quality Excellence
						</h3>
						<p className="text-gray-600 text-sm">
							ISO certifications demonstrate our commitment to continuous
							quality improvement.
						</p>
					</motion.div>
				</motion.div>

				{/* Certificates Grid */}
				<motion.div
					className="mb-8"
					variants={scaleIn}
					initial="initial"
					animate="animate"
				>
					<motion.h2
						className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#097362]"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						Our Certifications
					</motion.h2>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
						variants={staggerContainer}
						initial="initial"
						animate="animate"
					>
						{certificates.map((cert) => (
							<motion.div
								key={cert.id}
								variants={staggerItem}
								className="bg-white border-2 border-[#097362] rounded-2xl overflow-hidden shadow-lg"
								whileHover={{
									scale: 1.05,
									y: -10,
									boxShadow: "0 20px 40px rgba(9, 115, 98, 0.15)",
								}}
								transition={{ duration: 0.3 }}
							>
								<div className="relative overflow-hidden">
									<motion.img
										src={cert.image}
										alt={cert.title}
										className="w-full h-48 object-cover"
										whileHover={{ scale: 1.1 }}
										transition={{ duration: 0.4 }}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
								</div>

								<div className="p-4">
									<h3 className="font-bold text-lg mb-2 text-[#097362]">
										{cert.title}
									</h3>
									<p className="text-gray-600 text-sm">{cert.description}</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>

				{/* Call to Action */}
				<motion.div
					className="text-center"
					variants={fadeInUp}
					initial="initial"
					animate="animate"
				>
					<motion.div
						className="max-w-2xl mx-auto bg-gradient-to-br from-[#097362] to-[#0FA78E] rounded-2xl p-8 text-white"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.3 }}
					>
						<h3 className="text-xl md:text-2xl font-bold mb-4">
							Need More Information?
						</h3>
						<p className="mb-6 text-teal-100">
							Contact our team to learn more about our certifications and how
							they benefit your projects.
						</p>
						<motion.button
							className="bg-white text-[#097362] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => (window.location.href = "/contact-us")}
						>
							Contact Us
						</motion.button>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
