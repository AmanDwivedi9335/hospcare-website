"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Logo1, Logo2, Logo3, Logo4, Logo5 } from "@/public/images/NewHome";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const benefits = [
	{
		icon: Logo2,
		title: "Wide Export Portfolio",
		description:
			"Road safety, industrial safety, PPE, emergency kits, smart traffic systems, and more.",
	},
	{
		icon: Logo3,
		title: "Custom Manufacturing",
		description:
			"Private labeling, bespoke and packaging to meet local compliance standards.",
	},
	{
		icon: Logo4,
		title: "Efficient Logistics",
		description:
			"Streamlined supply chain, global shipments, full export documentation, and distributor support.",
	},
	{
		icon: Logo5,
		title: "Sustainability Focus",
		description:
			"Eco-friendly manufacturing, compliance and biodegradable goods — aligned with modern procurement goals.",
	},
];

// Motion variants
const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

export default function GlobalBuyersSection() {
	const navigate = useRouter();

	return (
		<section className="bg-white mx-auto relative md:my-10 my-5 ">
			<div className="absolute inset-0 md:flex items-center hidden justify-center">
				<div className="w-[90%] h-[115%] bg-gradient-to-b from-[#009D84] to-white rounded-full opacity-30"></div>
			</div>
			<div className="absolute inset-0 md:flex hidden items-center justify-center">
				<div className="w-[75%] h-[95%] bg-gradient-to-b from-[#009D84] to-white border-6 border-white rounded-full opacity-40"></div>
			</div>

			<div className="md:p-10 p-5 relative">
				<motion.div
					className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					{/* Left Card */}
					<motion.div variants={itemVariants} className="col-span-1">
						<div
							className={`flex flex-col mx-3 mt-3 bg-white justify-center items-center border-2 border-teal-200 p-8 rounded-2xl ${inter.className}`}
						>
                                                        <img src={Logo1.src} className="w-28 h-28 text-white object-cover" alt="Certifications" />
							<h3 className="md:text-2xl text-xl text-center font-medium text-black mb-4">
								International Certifications
							</h3>
							<p className="text-gray-600 mb-6 md:text-md text-sm text-center">
								CE, ISO, ANSI, and OSHA compliance ensures global market
								readiness, seamless integration, and trust.
							</p>
							<Button
								onClick={() => {
									navigate.push("/certifications");
								}}
								className="bg-gradient-to-b from-[#097362] to-[#029981] hover:bg-teal-700 text-white rounded-full cursor-pointer"
							>
								Know More
							</Button>
						</div>
					</motion.div>

					{/* Right Benefits List */}
					<motion.div
						variants={itemVariants}
						className="col-span-1 lg:col-span-2"
					>
						<h2 className="md:text-5xl text-3xl md:text-left text-center font-bold text-black mb-8">
							Why Global Buyers Choose LADWA
						</h2>

						<motion.div
							className={`${inter.className} grid grid-cols-1 md:grid-cols-2 gap-2`}
							variants={containerVariants}
						>
							{benefits.map((benefit, index) => (
								<motion.div key={index} variants={itemVariants}>
									<div className="bg-gradient-to-b from-[#A2FFF0] to-white p-1 rounded-3xl w-full h-full">
										<div className="flex items-center justify-center md:space-x-5 md:p-3 p-3 space-x-4 h-full bg-gradient-to-r from-white to-teal-200 rounded-3xl">
                                                                                        <img src={benefit.icon.src} alt={benefit.title} className="w-12 h-12 text-teal-600" />
											<div>
												<h4 className="font-medium text-xl md:text-2xl text-gray-900 mb-2">
													{benefit.title}
												</h4>
												<p className="text-gray-600 md:text-sm text-xs">
													{benefit.description}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
