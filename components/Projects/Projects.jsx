"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import baricade from "@/public/images/projects/baricade.png";

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};
const fadeInLeft = {
	initial: { opacity: 0, x: -60 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};
const fadeInRight = {
	initial: { opacity: 0, x: 60 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};
const scaleIn = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	transition: { duration: 0.6, ease: "easeOut" },
};
const staggerContainer = {
	initial: {},
	animate: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
	initial: { opacity: 0, y: 40 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5, ease: "easeOut" },
};
const numberAnimation = {
        initial: { opacity: 0, scale: 0.5, rotate: -10 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
};

const getEmbedUrl = (url) => {
        if (!url) return "";
        const match = url.match(
                /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
        );
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export default function ProjectList() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, []);

	useEffect(() => {
		fetch("/api/project")
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					const sortedProjects = data.sort((a, b) => a.number - b.number);
					setProjects(sortedProjects);
				}
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, []);

        const handleSubscribe = async (e) => {
                e.preventDefault();
                if (!email) return;

                setIsLoading(true);
                setShowSuccess(false);

                try {
                        const res = await fetch("/api/subscribers", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ email }),
                        });
                        if (res.ok) {
                                setShowSuccess(true);
                                setEmail("");
                                setTimeout(() => setShowSuccess(false), 2000);
                        }
                } catch (err) {
                        console.error("Subscription failed:", err);
                } finally {
                        setIsLoading(false);
                }
        };

	if (loading) {
		return (
			<div className="flex justify-center items-center h-[60vh]">
				<motion.div
					className="w-12 h-12 border-4 border-[#097362] border-t-transparent rounded-full"
					animate={{ rotate: 360 }}
					transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
					style={{ borderStyle: "solid" }}
				/>
			</div>
		);
	}

	return (
		<div className={`${outfit.className} w-full max-w-full px-4`}>
			{projects.map((project, index) => {
				const isEven = project.number % 2 === 0;
				const isLast = index === projects.length - 1;
				const portfolioImages = Array.isArray(project.portfolioImages)
					? project.portfolioImages
					: [];

				return (
					<div key={project._id}>
						<motion.div
							className={`max-w-7xl mx-auto ${
								isEven ? "bg-gray-100 p-4 rounded-2xl my-6" : "py-3"
							} my-6`}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
						>
							<motion.div
								className={`flex flex-col ${
									isEven ? "lg:flex-row-reverse" : "lg:flex-row"
								} items-start gap-8 mb-12`}
								initial="initial"
								whileInView="animate"
								viewport={{ once: true, amount: 0.3 }}
							>
								<motion.div
									className="flex-1"
									variants={isEven ? fadeInRight : fadeInLeft}
								>
									<div className="flex items-center gap-6 mb-6">
										<motion.div
											className="flex-shrink-0"
											variants={numberAnimation}
										>
											<h1 className="text-[100px] md:text-[150px] lg:text-[200px] font-bold bg-gradient-to-b from-[#097362] to-[#ffffff] bg-clip-text text-transparent leading-none">
												{project.number}
											</h1>
										</motion.div>
										<motion.div
											className="flex-1 w-full max-w-lg"
											variants={fadeInUp}
										>
											<h2 className="text-2xl md:text-4xl font-semibold text-black">
												{project.title}
											</h2>
										</motion.div>
									</div>
									<motion.div
										className="pl-6 w-full max-w-xl"
										variants={fadeInUp}
									>
										<p className="text-gray-600 md:text-xl leading-relaxed">
											{project.description}
										</p>
									</motion.div>
								</motion.div>

        <motion.div className="flex-shrink-0" variants={scaleIn}>
                <motion.div
                        className="border-2 border-[#097362]/20 p-2 rounded-2xl bg-white shadow-lg"
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                >
                        {project.videoLink ? (
                                <div className="lg:w-[90vh] w-full rounded-xl overflow-hidden">
                                        <div className="relative w-full h-0 pb-[56.25%]">
                                                <iframe
                                                        src={getEmbedUrl(project.videoLink)}
                                                        title={project.title}
                                                        allowFullScreen
                                                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                                                />
                                        </div>
                                </div>
                        ) : (
                                <Image
                                        src={project.mainImage}
                                        alt={project.title}
                                        width={700}
                                        height={500}
                                        className="lg:w-[90vh] rounded-xl object-cover"
                                        priority
                                />
                        )}
                </motion.div>
        </motion.div>
							</motion.div>

							<motion.div
								className="flex flex-col md:flex-row gap-4"
								variants={staggerContainer}
								initial="initial"
								whileInView="animate"
								viewport={{ once: true, amount: 0.3 }}
							>
								{portfolioImages.map((img, i) => (
									<motion.div
										key={i}
										className="rounded-2xl overflow-hidden"
										variants={staggerItem}
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.3 }}
									>
										<Image
											src={img}
											alt={`Project ${project.number} image ${i + 1}`}
											width={500}
											height={300}
											className="w-full h-[200px] md:h-[250px] md:w-[50vw] object-cover"
										/>
									</motion.div>
								))}
							</motion.div>
						</motion.div>

						{/* Conditional Divider */}
						{!isLast && (
							<motion.div
								className="border border-[#097362] my-6"
								initial={{ scaleX: 0 }}
								whileInView={{ scaleX: 0.95 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, ease: "easeOut" }}
							/>
						)}
					</div>
				);
			})}

			{/* Newsletter Section */}
			<motion.div
				className="relative z-40 mt-16 mb-10 flex"
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<div className="max-w-4xl mx-auto px-4 w-full">
					<motion.div
						className="bg-[#097367] rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-visible"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.3 }}
					>
						<motion.div
							className="hidden lg:block absolute left-0 bottom-3 w-[350px] h-[120%] pointer-events-none z-20"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, ease: "easeOut" }}
						>
							<Image
								src={baricade}
								alt="Safety baricade"
								className="w-full h-full object-cover"
							/>
						</motion.div>

						<div className="relative z-10 lg:ml-80">
							<motion.div
								className="flex flex-col gap-6"
								initial="initial"
								whileInView="animate"
								viewport={{ once: true }}
								variants={staggerContainer}
							>
								<motion.div
									className="max-w-lg text-center lg:text-left mx-auto lg:mx-0"
									variants={staggerItem}
								>
									<h3 className="text-lg md:text-3xl font-bold text-white mb-3 leading-tight">
										Subscribe to our newsletter for the latest updates and
										insights.
									</h3>
									<p className="text-white/80 text-sm md:text-base leading-relaxed">
										Stay ahead with the latest updates, insights, and events
										from Meqaul Magazine.
									</p>
								</motion.div>

								<motion.div
									className="w-full max-w-md mx-auto lg:mx-0"
									variants={staggerItem}
								>
									<form onSubmit={handleSubscribe} className="relative">
										<motion.div
											className="relative"
											whileHover={{ scale: 1.02 }}
											transition={{ duration: 0.2 }}
										>
											<motion.div
												className="relative w-full h-12 rounded-full bg-black backdrop-blur-sm overflow-hidden"
												layout
											>
												{/* Loading */}
												<motion.div
													className="absolute inset-0 flex items-center justify-center"
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{
														opacity: isLoading ? 1 : 0,
														scale: isLoading ? 1 : 0.8,
													}}
													transition={{ duration: 0.3 }}
												>
													<motion.div
														className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
														animate={{ rotate: 360 }}
														transition={{
															duration: 1,
															repeat: Infinity,
															ease: "linear",
														}}
													/>
												</motion.div>

												{/* Success */}
												<motion.div
													className="absolute inset-0 flex items-center justify-center"
													initial={{ opacity: 0, scale: 0.5 }}
													animate={{
														opacity: showSuccess ? 1 : 0,
														scale: showSuccess ? 1 : 0.5,
													}}
													transition={{
														duration: 0.4,
														type: "spring",
														stiffness: 200,
													}}
												>
													<motion.div
														className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
														initial={{ scale: 0, rotate: -180 }}
														animate={{
															scale: showSuccess ? 1 : 0,
															rotate: showSuccess ? 0 : -180,
														}}
														transition={{
															duration: 0.5,
															type: "spring",
															stiffness: 300,
														}}
													>
														<motion.svg
															className="w-5 h-5 text-white"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															initial={{ pathLength: 0 }}
															animate={{ pathLength: showSuccess ? 1 : 0 }}
															transition={{ duration: 0.6, delay: 0.2 }}
														>
															<motion.path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M5 13l4 4L19 7"
															/>
														</motion.svg>
													</motion.div>
												</motion.div>

												{/* Input */}
												<motion.div
													className="absolute inset-0"
													initial={{ opacity: 1 }}
													animate={{
														opacity: isLoading || showSuccess ? 0 : 1,
														scale: isLoading || showSuccess ? 0.9 : 1,
													}}
													transition={{ duration: 0.3 }}
												>
													<span className="absolute md:text-3xl text-2xl md:left-4 left-3 top-1/2 transform -translate-y-1/2 text-white">
														@
													</span>
													<input
														type="email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														placeholder="Enter your email"
														className="w-full h-full md:pl-12 pl-8 pr-28 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white rounded-full"
														required
														disabled={isLoading || showSuccess}
													/>
													<motion.button
														type="submit"
														className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-white text-[#2D5A52] font-semibold rounded-full hover:bg-white/90 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
														whileHover={{
															scale: isLoading || showSuccess ? 1 : 1.05,
														}}
														whileTap={{
															scale: isLoading || showSuccess ? 1 : 0.95,
														}}
														disabled={isLoading || showSuccess}
													>
														{isLoading ? "Loading..." : "Subscribe"}
													</motion.button>
												</motion.div>
											</motion.div>
										</motion.div>
									</form>
								</motion.div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
