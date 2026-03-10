// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import SolutionCard from "@/components/Home/SolutionCard.jsx";

// export default function SolutionsSection({
// 	safetyProfessionalImg,
// 	roadSafetyImg,
// 	fireSafetyImg,
// 	industrialSafetyImg,
// 	reflectiveSignageImg,
// }) {
// 	const solutions = [
// 		{
// 			title: "Road Safety",
// 			description:
// 				"The entire range of Road Safety Product Manufacturer and parking products solutions.",
// 			image: roadSafetyImg,
// 			delay: 0.1,
// 		},
// 		{
// 			title: "Fire Safety",
// 			description:
// 				"The entire range of Road Safety Product Manufacturer and parking products solutions.",
// 			image: fireSafetyImg,
// 			delay: 0.2,
// 		},
// 		{
// 			title: "Industrial Safety",
// 			description:
// 				"The entire range of Road Safety Product Manufacturer and parking products solutions.",
// 			image: industrialSafetyImg,
// 			delay: 0.3,
// 		},
// 		{
// 			title: "Reflective Signage",
// 			description:
// 				"The entire range of Road Safety Product Manufacturer and parking products solutions.",
// 			image: reflectiveSignageImg,
// 			delay: 0.4,
// 		},
// 	];

// 	return (
// 		<section className="py-8 md:py-16 bg-gray-50 overflow-hidden">
// 			<div className="container mx-auto px-4">
// 				<motion.div
// 					className="text-center mb-8 md:mb-12"
// 					initial={{ opacity: 0, y: 20 }}
// 					whileInView={{ opacity: 1, y: 0 }}
// 					viewport={{ once: true }}
// 					transition={{ duration: 0.5 }}
// 				>
// 					<h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
// 						Our Solutions
// 					</h2>
// 					<p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
// 						We offer the best product solutions in the Road Safety equipments,
// 						Industrial Safety, Reflective signs, and Fire Safety Sectors.
// 					</p>
// 				</motion.div>

// 				{/* Mobile Layout */}
// 				<div className="md:hidden">
// 					<motion.div
// 						className="flex justify-center mb-8"
// 						initial={{ opacity: 0, scale: 0.8 }}
// 						whileInView={{ opacity: 1, scale: 1 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.6 }}
// 					>
// 						<div className="relative w-48 h-48 rounded-full bg-teal-50 flex items-center justify-center">
// 							<Image
// 								src={safetyProfessionalImg?.src || "/placeholder.svg"}
// 								alt="Safety Professional"
// 								width={150}
// 								height={150}
// 								className="rounded-full object-cover w-40 h-40"
// 							/>
// 						</div>
// 					</motion.div>

// 					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
// 						{solutions.map((solution, index) => (
// 							<motion.div
// 								key={index}
// 								initial={{ opacity: 0, y: 20 }}
// 								whileInView={{ opacity: 1, y: 0 }}
// 								viewport={{ once: true }}
// 								transition={{ duration: 0.5, delay: index * 0.1 }}
// 							>
// 								<SolutionCard
// 									title={solution.title}
// 									description={solution.description}
// 									image={solution.image}
// 								/>
// 							</motion.div>
// 						))}
// 					</div>
// 				</div>

// 				{/* Desktop Layout with Circular Positioning */}
// 				<div className="hidden md:block relative h-[550px] lg:h-[650px]">
// 					<motion.div
// 						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
// 						initial={{ opacity: 0, scale: 0.8 }}
// 						whileInView={{ opacity: 1, scale: 1 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.6 }}
// 					>
// 						<div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-teal-50 flex items-center justify-center">
// 							<Image
// 								src={safetyProfessionalImg?.src || "/placeholder.svg"}
// 								alt="Safety Professional"
// 								width={300}
// 								height={300}
// 								className="rounded-full object-cover w-56 h-56 lg:w-96 lg:h-96"
// 							/>
// 						</div>
// 					</motion.div>

// 					{/* Top Position */}
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.5, delay: 0.1 }}
// 						className="absolute w-48 lg:w-56 top-0 left-1/3 -translate-x-1/2"
// 					>
// 						<SolutionCard
// 							title={solutions[0].title}
// 							description={solutions[0].description}
// 							image={solutions[0].image}
// 						/>
// 					</motion.div>

// 					{/* Right Position */}
// 					<motion.div
// 						initial={{ opacity: 0, x: 20 }}
// 						whileInView={{ opacity: 1, x: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.5, delay: 0.2 }}
// 						className="absolute w-48 lg:w-56 right-0 lg:right-10 top-1/2 -translate-y-1/2"
// 					>
// 						<SolutionCard
// 							title={solutions[1].title}
// 							description={solutions[1].description}
// 							image={solutions[1].image}
// 						/>
// 					</motion.div>

// 					{/* Bottom Position */}
// 					<motion.div
// 						initial={{ opacity: 0, y: -20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.5, delay: 0.3 }}
// 						className="absolute w-48 lg:w-56 bottom-0 right-1/3 translate-x-1/2"
// 					>
// 						<SolutionCard
// 							title={solutions[2].title}
// 							description={solutions[2].description}
// 							image={solutions[2].image}
// 						/>
// 					</motion.div>

// 					{/* Left Position */}
// 					<motion.div
// 						initial={{ opacity: 0, x: -20 }}
// 						whileInView={{ opacity: 1, x: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.5, delay: 0.4 }}
// 						className="absolute w-48 lg:w-56 left-0 lg:left-10 top-1/2 -translate-y-1/2"
// 					>
// 						<SolutionCard
// 							title={solutions[3].title}
// 							description={solutions[3].description}
// 							image={solutions[3].image}
// 						/>
// 					</motion.div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SolutionCard from "@/components/Home/SolutionCard.jsx";

export default function SolutionsSection({
	safetyProfessionalImg,
	roadSafetyImg,
	fireSafetyImg,
	industrialSafetyImg,
	reflectiveSignageImg,
}) {
	const solutions = [
		{
			title: "Road Safety",
			description:
				"The entire range of Road Safety Product Manufacturer and parking products solutions.",
			image: roadSafetyImg,
			delay: 0.1,
		},
		{
			title: "Fire Safety",
			description:
				"The entire range of Road Safety Product Manufacturer and parking products solutions.",
			image: fireSafetyImg,
			delay: 0.2,
		},
		{
			title: "Industrial Safety",
			description:
				"The entire range of Road Safety Product Manufacturer and parking products solutions.",
			image: industrialSafetyImg,
			delay: 0.3,
		},
		{
			title: "Reflective Signage",
			description:
				"The entire range of Road Safety Product Manufacturer and parking products solutions.",
			image: reflectiveSignageImg,
			delay: 0.4,
		},
	];

	return (
		<section className="py-8 md:py-16 bg-gray-50 overflow-hidden">
			<div className="container mx-auto px-10">
				<motion.div
					className="text-center mb-8 md:mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
						Our Solutions
					</h2>
					<p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
						We offer the best product solutions in the Road Safety equipments,
						Industrial Safety, Reflective signs, and Fire Safety Sectors.
					</p>
				</motion.div>

				{/* Mobile Layout */}
				<div className="md:hidden">
					<motion.div
						className="flex justify-center mb-8"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="relative w-48 h-48 rounded-full bg-teal-50 flex items-center justify-center">
							<Image
								src={safetyProfessionalImg?.src || "/placeholder.svg"}
								alt="Safety Professional"
								width={150}
								height={150}
								className="rounded-full object-cover w-52 h-52"
							/>
						</div>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
						{solutions.map((solution, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<SolutionCard
									title={solution.title}
									description={solution.description}
									image={solution.image}
								/>
							</motion.div>
						))}
					</div>
				</div>

				{/* Desktop Layout with Circular Positioning */}
				<div className="hidden md:block relative h-[550px] lg:h-[650px]">
					<motion.div
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-teal-50 flex items-center justify-center">
							<Image
								src={safetyProfessionalImg?.src || "/placeholder.svg"}
								alt="Safety Professional"
								width={300}
								height={300}
								className="rounded-full object-cover w-56 h-56 lg:w-96 lg:h-96"
							/>
						</div>
					</motion.div>

					{/* Top Position */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="absolute w-48 lg:w-64 top-10 left-1/3 -translate-x-1/2"
					>
						<SolutionCard
							title={solutions[0].title}
							description={solutions[0].description}
							image={solutions[0].image}
						/>
					</motion.div>

					{/* Right Position */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="absolute w-48 lg:w-64 right-0 lg:right-1/4 top-1/3 translate-x-1/2  -translate-y-1/2"
					>
						<SolutionCard
							title={solutions[1].title}
							description={solutions[1].description}
							image={solutions[1].image}
						/>
					</motion.div>

					{/* Bottom Position */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="absolute w-48 lg:w-64 bottom-0 right-1/3 translate-x-1/2"
					>
						<SolutionCard
							title={solutions[2].title}
							description={solutions[2].description}
							image={solutions[2].image}
						/>
					</motion.div>

					{/* Left Position */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="absolute w-48 lg:w-64 left-0 lg:left-1/5 top-3/4 -translate-y-1/2"
					>
						<SolutionCard
							title={solutions[3].title}
							description={solutions[3].description}
							image={solutions[3].image}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
