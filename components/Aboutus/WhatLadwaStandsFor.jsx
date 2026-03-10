"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import img from "../../public/images/aboutus/WhatLadwaImage.png";

const ladwaItems = [
	{ letter: "L", meaning: "Leadership in safety innovation" },
	{ letter: "A", meaning: "Assurance of quality and compliance" },
	{ letter: "D", meaning: "Dependability in every solution" },
	{ letter: "W", meaning: "Worldwide reach with Indian roots" },
	{ letter: "A", meaning: "Accountability to people and planet" },
];

const WhatLadwaStandsFor = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const goToNext = () => {
		setActiveIndex((prev) => (prev + 1) % ladwaItems.length);
	};

	const goToPrevious = () => {
		setActiveIndex(
			(prev) => (prev - 1 + ladwaItems.length) % ladwaItems.length
		);
	};

	useEffect(() => {
		const interval = setInterval(goToNext, 2000);
		return () => clearInterval(interval);
	}, []);

	return (
		<motion.div
			className="w-full max-w-full mx-auto bg-gray-100  px-4"
			id="ladwa"
		>
			<div className="flex flex-col lg:flex-row justify-between w-full max-w-7xl mx-auto items-start gap-8">
				{/* Left side*/}
				<div className="flex-1 p-4 ] lg:p-8 mx-auto">
					<div className="mb-4 text-center lg:text-left">
						<h2 className="text-[28px] md:text-5xl font-bold mb-3">
							What{" "}
							<span
								className="text-transparent"
								style={{ WebkitTextStroke: "2px #097362 " }}
							>
								LADWA
							</span>{" "}
							Stands For
						</h2>
					</div>
					<div className=" rounded-3xl md:p-4 ">
						<Image
							src={img}
							alt="Manufacturing facility"
							className="w-full lg:h-full object-cover rounded-2xl"
						/>
					</div>
				</div>

				{/* Right side */}
				<div className="flex-1 p-2 lg:p-8 gap-10  w-full relative">
					<div className="absolute right-0 lg:top-8 -top-12 hidden md-block">
						<button
							onClick={goToPrevious}
							className="p-2 rounded-full bg-[#097362] text-white hover:bg-teal-700 transition-colors"
						>
							<ChevronUp size={40} />
						</button>
					</div>

					<div className="flex flex-col gap-2 lg:mt-12">
						{ladwaItems.map((item, index) => (
							<div key={index}>
								<div className="flex items-center gap-12">
									{/* Letter */}
									<div
										className={`w-12 lg:text-7xl ml-3 text-3xl font-thin ${
											activeIndex === index ? "text-[#097362]" : "text-gray-400"
										}`}
									>
										{item.letter}
									</div>

									<div className="flex-1 flex items-center">
										<AnimatePresence mode="wait">
											{activeIndex === index ? (
												<motion.div
													key={index}
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -10 }}
													transition={{ duration: 0.4 }}
													className="lg:text-3xl text-xl md:ml-2 font-thin text-[#097362]"
												>
													{item.meaning}
												</motion.div>
											) : (
												<div className="lg:text-3xl md:ml-3 text-xl font-thin text-gray-400">
													{item.meaning}
												</div>
											)}
										</AnimatePresence>
									</div>
								</div>

								<div className="flex gap-6 mt-3">
									<div className="w-20">
										<hr className="border-t border-gray-300" />
									</div>
									<div className="flex-1">
										<hr className="border-t border-gray-300" />
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="absolute right-0 -bottom-18 hidden md:block">
						<button
							onClick={goToNext}
							className="p-2 rounded-full bg-[#097362] text-white hover:bg-teal-700 transition-colors"
						>
							<ChevronDown size={40} />
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default WhatLadwaStandsFor;
