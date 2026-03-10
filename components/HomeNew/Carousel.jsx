// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// import ball from "@/public/images/NewHome/3d ball.png";
// import img1 from "@/public/images/NewHome/Picture2.png";
// import img2 from "@/public/images/NewHome/Picture3.png";
// import img3 from "@/public/images/NewHome/Picture4.png";
// import img4 from "@/public/images/NewHome/Picture5.png";
// import img5 from "@/public/images/NewHome/Picture6.png";

// const images = [img1, img2, img3, img4, img5];

// const Carousel = () => {
// 	const [focusedIndex, setFocusedIndex] = useState(2);
// 	const [direction, setDirection] = useState(1);
// 	const imageCount = images.length;

// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setDirection(1);
// 			setFocusedIndex((prev) => (prev + 1) % imageCount);
// 		}, 3000);
// 		return () => clearInterval(interval);
// 	}, []);

// 	const getDisplayImages = () => {
// 		const result = [];
// 		for (let i = -2; i <= 2; i++) {
// 			const index = (focusedIndex + i + imageCount) % imageCount;
// 			result.push(images[index]);
// 		}
// 		return result;
// 	};

// 	const displayedImages = getDisplayImages();

// 	return (
// 		<motion.div
// 			initial="hidden"
// 			whileInView="visible"
// 			viewport={{ once: true, amount: 0.3 }}
// 			className="relative w-full max-w-screen mx-auto bg-white overflow-hidden"
// 		>
// 			<div className="relative py-8 px-4">
// 				<div className="relative flex items-center justify-center gap-5 lg:gap-12 lg:min-h-[450px] transition-all duration-300">
// 					{displayedImages.map((img, index) => {
// 						const isCenter = index === 2;

// 						const sizeClass = isCenter
// 							? "w-36 h-44 sm:w-44 sm:h-52 md:w-52 md:h-60 lg:w-[28vw] lg:h-[75vh]"
// 							: "w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-[25vw] lg:h-[70vh]";

// 						const grayscale = isCenter ? "" : "grayscale";

// 						return (
// 							<motion.div
// 								key={`${img.src}-${focusedIndex}-${index}`}
// 								className={`transition-transform duration-500 ease-in-out transform ${
// 									isCenter ? "scale-105 z-20" : "scale-95 z-10"
// 								}`}
// 							>
// 								{isCenter ? (
// 									<AnimatePresence mode="wait">
// 										<motion.div
// 											key={img.src}
// 											initial={{ opacity: 0, y: 40 }}
// 											animate={{ opacity: 1, y: 0 }}
// 											exit={{ opacity: 0, y: -40 }}
// 											transition={{ duration: 0.6, ease: "easeInOut" }}
// 											className={`p-[4px] rounded-[30px] bg-gradient-to-b from-[#097362] to-white ${sizeClass}`}
// 										>
// 											<div className="w-full h-full rounded-[26px] overflow-hidden bg-white">
// 												<Image
// 													src={img}
// 													alt={`Gallery ${index + 1}`}
// 													className="w-full h-full object-cover rounded-[26px]"
// 												/>
// 											</div>
// 										</motion.div>
// 									</AnimatePresence>
// 								) : (
// 									<div
// 										className={`${sizeClass} rounded-[30px] overflow-hidden`}
// 									>
// 										<Image
// 											src={img}
// 											alt={`Gallery ${index + 1}`}
// 											className={`w-full h-full object-cover rounded-[30px] ${grayscale}`}
// 										/>
// 									</div>
// 								)}
// 							</motion.div>
// 						);
// 					})}
// 				</div>

// 				{/* Ball at Bottom */}
// 				<div className="absolute -bottom-10 lg:-bottom-22 left-1/2 transform -translate-x-1/2 z-0">
// 					<div className="w-[20vw] h-[20vh] md:w-[40vw] md:h-[40vh]">
// 						<Image
// 							src={ball}
// 							alt="3D Ball"
// 							className="w-full h-full object-contain"
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</motion.div>
// 	);
// };

// export default Carousel;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import ball from "@/public/images/NewHome/3d ball.png";
import img1 from "@/public/images/NewHome/Picture2.png";
import img2 from "@/public/images/NewHome/Picture3.png";
import img3 from "@/public/images/NewHome/Picture4.png";
import img4 from "@/public/images/NewHome/Picture5.png";
import img5 from "@/public/images/NewHome/Picture6.png";

const images = [img1, img2, img3, img4, img5];

const Carousel = () => {
	const [focusedIndex, setFocusedIndex] = useState(2);
	const imageCount = images.length;

	useEffect(() => {
		const interval = setInterval(() => {
			setFocusedIndex((prev) => (prev + 1) % imageCount);
		}, 3000);
		return () => clearInterval(interval);
	}, [imageCount]);

	const getDisplayImages = () => {
		const result = [];
		for (let i = -2; i <= 2; i++) {
			const index = (focusedIndex + i + imageCount) % imageCount;
			result.push(images[index]);
		}
		return result;
	};

	const displayedImages = getDisplayImages();

	const getTransitionProps = (index) => {
		const isCenter = index === 2;
		const distance = Math.abs(index - 2);

		// Calculate opacity based on distance from center
		const opacity = isCenter ? 1 : Math.max(0.4, 1 - distance * 0.3);

		// Calculate scale based on distance from center
		const scale = isCenter ? 1.05 : Math.max(0.85, 1 - distance * 0.1);

		return {
			opacity,
			scale,
			zIndex: isCenter ? 20 : 10 - distance,
		};
	};

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			className="relative w-full max-w-screen mx-auto bg-white overflow-hidden md:pb-14"
		>
			<div className="relative p-8 px-4">
				<div className="relative flex items-center justify-center gap-5 lg:gap-4 lg:mt-0 -mt-7 ">
					{displayedImages.map((img, index) => {
						const isCenter = index === 2;
						const transitionProps = getTransitionProps(index);

						const sizeClass = isCenter
							? "w-36 h-44 sm:w-44 sm:h-52 md:w-52 md:h-60 lg:w-[28vw] lg:h-[75vh]"
							: "w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-[25vw] lg:h-[70vh]";

						return (
							<motion.div
								key={`${img.src}-${focusedIndex}-${index}`}
								className="relative"
								style={{ zIndex: transitionProps.zIndex }}
								animate={{
									opacity: transitionProps.opacity,
									scale: transitionProps.scale,
								}}
								transition={{
									duration: 0.6,
									ease: "easeInOut",
								}}
							>
								{isCenter ? (
									<AnimatePresence mode="wait">
										<motion.div
											key={img.src}
											initial={{ opacity: 0, y: 40 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -40 }}
											transition={{ duration: 0.6, ease: "easeInOut" }}
											className={`p-[4px] rounded-[30px] bg-gradient-to-b from-[#097362] to-white ${sizeClass}`}
										>
											<div className="w-full h-full rounded-[26px] overflow-hidden bg-white">
												<Image
													src={img}
													alt={`Gallery ${index + 1}`}
													className="w-full h-full object-cover rounded-[26px]"
												/>
											</div>
										</motion.div>
									</AnimatePresence>
								) : (
									<div
										className={`${sizeClass} rounded-[30px] overflow-hidden`}
									>
										<Image
											src={img}
											alt={`Gallery ${index + 1}`}
											className="w-full h-full object-cover rounded-[30px] grayscale"
										/>
									</div>
								)}
							</motion.div>
						);
					})}
				</div>

				{/* Ball at Bottom */}
				<div className="absolute -bottom-11 lg:-bottom-22 left-1/2 transform -translate-x-1/2 z-0">
					<div className="w-[20vw] h-[20vh] md:w-[40vw] md:h-[40vh]">
						<Image
							src={ball}
							alt="3D Ball"
							className="w-full h-full object-contain"
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Carousel;
