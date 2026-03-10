"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, HardHat, Navigation } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Lazy load components for better performance
const HeroSection = dynamic(
	() => import("@/components/Solutions/HeroSection.jsx"),
	{
		loading: () => <div className="h-96 bg-gray-200 animate-pulse"></div>,
	}
);

const SolutionSection = dynamic(
	() => import("@/components/Solutions/SolutionSection.jsx"),
	{
		loading: () => (
			<div className="h-64 bg-gray-100 animate-pulse rounded-lg mb-8"></div>
		),
	}
);

const InquiryForm = dynamic(
	() => import("@/components/Solutions/InquiryForm.jsx"),
	{
		ssr: true,
	}
);

const SolutionsPage = () => {
        const navigate = useRouter();
        const solutions = [
		{
			id: "road-traffic-safety",
			title: "Road Traffic Safety",
			icon: Shield,
			description:
				"Comprehensive traffic safety solutions to protect roads and highways",
			gradient: "from-blue-500 to-blue-700",
			products: [
				{
					id: 1,
					name: "Reflective Safety Vest",
					description:
						"High-visibility safety vest with reflective strips for maximum visibility in low light conditions",
					price: 850,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 2,
					name: "Traffic Safety Cones",
					description:
						"Durable traffic cones with reflective bands for effective traffic management and road safety",
					price: 1200,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 3,
					name: "Road Safety Barriers",
					description:
						"Heavy-duty safety barriers for road construction and traffic control applications",
					price: 3500,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 4,
					name: "Speed Breakers",
					description:
						"Modular speed breakers designed to reduce vehicle speed and enhance road safety",
					price: 2800,
					image: "/placeholder.svg?height=300&width=400",
				},
			],
		},
		{
			id: "fire-safety",
			title: "Fire Safety",
			icon: AlertTriangle,
			description:
				"Advanced fire safety equipment and solutions for comprehensive protection",
			gradient: "from-red-500 to-red-700",
			products: [
				{
					id: 5,
					name: "Fire Extinguisher",
					description:
						"Multi-purpose fire extinguisher suitable for Class A, B, and C fires with easy operation",
					price: 2500,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 6,
					name: "Fire Blanket",
					description:
						"Emergency fire blanket made from fire-resistant materials for quick fire suppression",
					price: 1800,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 7,
					name: "Smoke Detector",
					description:
						"Advanced smoke detection system with early warning capabilities and battery backup",
					price: 3200,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 8,
					name: "Fire Hose Reel",
					description:
						"Professional-grade fire hose reel system for industrial and commercial applications",
					price: 8500,
					image: "/placeholder.svg?height=300&width=400",
				},
			],
		},
		{
			id: "industrial-safety",
			title: "Industrial Safety",
			icon: HardHat,
			description:
				"Complete industrial safety solutions for workplace protection and compliance",
			gradient: "from-orange-500 to-orange-700",
			products: [
				{
					id: 9,
					name: "Safety Helmets",
					description:
						"Industrial-grade safety helmets with adjustable straps and ventilation system",
					price: 950,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 10,
					name: "Safety Gloves",
					description:
						"Cut-resistant safety gloves with enhanced grip and durability for industrial use",
					price: 650,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 11,
					name: "Safety Goggles",
					description:
						"Anti-fog safety goggles with UV protection and comfortable fit for extended use",
					price: 1100,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 12,
					name: "Safety Harness",
					description:
						"Full-body safety harness with multiple attachment points for fall protection",
					price: 4200,
					image: "/placeholder.svg?height=300&width=400",
				},
			],
		},
		{
			id: "road-signs",
			title: "Road Signs",
			icon: Navigation,
			description:
				"Regulatory and informational road signs for traffic management and safety",
			gradient: "from-green-500 to-green-700",
			products: [
				{
					id: 13,
					name: "Stop Sign",
					description:
						"Octagonal stop sign with reflective coating for enhanced visibility day and night",
					price: 1500,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 14,
					name: "Speed Limit Sign",
					description:
						"Regulatory speed limit signs with clear numbering and weather-resistant materials",
					price: 1200,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 15,
					name: "Warning Signs",
					description:
						"Triangular warning signs for various road hazards with bright reflective surface",
					price: 1350,
					image: "/placeholder.svg?height=300&width=400",
				},
				{
					id: 16,
					name: "Directional Signs",
					description:
						"Arrow-shaped directional signs for clear navigation and traffic flow management",
					price: 1800,
					image: "/placeholder.svg?height=300&width=400",
				},
			],
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
			<Suspense
				fallback={<div className="h-96 bg-gray-200 animate-pulse"></div>}
			>
				<HeroSection />
			</Suspense>

			{/* Solutions Sections */}
			<div className="py-16">
				<div className="container mx-auto px-10">
					{solutions.map((solution, sectionIndex) => (
						<Suspense
							key={solution.id}
							fallback={
								<div className="h-64 bg-gray-100 animate-pulse rounded-lg mb-8"></div>
							}
						>
							<SolutionSection
								solution={solution}
								sectionIndex={sectionIndex}
							/>
						</Suspense>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<motion.section
				className="py-16 bg-gradient-to-r from-teal-600 to-emerald-600"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				<div className="container mx-auto px-4 text-center">
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
							Need Custom Solutions?
						</h2>
						<p className="text-teal-100 mb-8 max-w-2xl mx-auto">
							Our team of experts can design and implement custom safety
							solutions tailored to your specific requirements and industry
							needs.
						</p>
                                                <Button
                                                        size="lg"
                                                        onClick={() => navigate.push('/contact-us')}
                                                        className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                                >
							Contact Our Experts
						</Button>
					</motion.div>
				</div>
			</motion.section>

			<Suspense fallback={null}>
				<InquiryForm />
			</Suspense>
		</div>
	);
};

export default SolutionsPage;
