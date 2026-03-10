"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import img1 from "../../public/images/aboutus/RoadSafety.svg";
import img2 from "../../public/images/aboutus/firesafety.svg";
import img3 from "../../public/images/aboutus/industry.svg";
import img4 from "../../public/images/aboutus/traffic.svg";
import img5 from "../../public/images/aboutus/sos.svg";
import img6 from "../../public/images/aboutus/homesafety.svg";

import { Manrope, Exo } from "next/font/google";
import Presence from "./Presence&Impact";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});
const exo = Exo({
	variable: "--font-exo",
	subsets: ["latin"],
});

const KeyOfferings = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [animatedItems, setAnimatedItems] = useState(new Set());
	const sectionRef = useRef(null);

	const offerings = [
		{
			id: "01",
			title: "Road Safety Equipment",
			icon: img1,
			position: "top-left",
		},
		{
			id: "02",
			title: "Fire Safety Solutions",
			icon: img2,
			position: "top-center",
			featured: true,
		},
		{
			id: "03",
			title: "Industrial Safety Gear",
			icon: img3,
			position: "top-right",
		},
		{
			id: "04",
			title: "Traffic Management & Smart Safety Systems",
			icon: img4,
			position: "bottom-left",
		},
		{
			id: "05",
			title: "PPE Kits & Emergency Response Products",
			icon: img5,
			position: "bottom-center",
		},
		{
			id: "06",
			title: "Home Safety & Emergency Kits",
			icon: img6,
			position: "bottom-right",
			featured: true,
		},
	];

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: "0px 0px -50px 0px",
			}
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (isVisible) {
			const animateItems = () => {
				offerings.forEach((_, index) => {
					setTimeout(() => {
						setAnimatedItems((prev) => new Set([...prev, index]));
					}, index * 200);
				});
			};
			animateItems();
		}
	}, [isVisible]);

	const getAnimationClass = (index) => {
		if (animatedItems.has(index)) {
			return "animate-fade-in-up";
		}
		return "opacity-0 translate-y-8";
	};

	return (
		<div className="w-full max-w-7xl mx-auto my-12 border-4 border-[#0E8D791A] rounded-[30px] px-4 sm:px-6 lg:px-4 py-8 sm:py-10 lg:py-12 bg-gray-50" id="offerings">
			<style jsx>{`
				@keyframes fade-in-up {
					from {
						opacity: 0;
						transform: translateY(2rem);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fade-in-up {
					animation: fade-in-up 0.6s ease-out forwards;
				}
			`}</style>

			<div className="text-center mb-8 sm:mb-10 lg:mb-12">
				<h2 className="text-3xl  md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4">
					Key Offerings
				</h2>
				<p
					className={`text-gray-600 max-w-5xl mx-auto text-xs md:text-base px-2 sm:px-0 ${manrope.className}`}
				>
					At LADWA, we deliver a comprehensive suite of safety solutions
					designed to protect lives, assets, and environments across industries.
				</p>
			</div>

			<div className="relative" ref={sectionRef}>
				<div className="hidden lg:grid grid-cols-3 gap-8 mb-20">
					{/* Top Row */}
					<div
						className={`flex flex-col items-center gap-12 transition-all duration-600 ${getAnimationClass(
							0
						)}`}
					>
						<h3
							className={`text-lg lg:text-[26px] ${manrope.className} font-bold text-[#222D39]  text-center mb-2`}
						>
							Road Safety
							<br /> Equipment
						</h3>
						<div className="w-[15vw] h-[25vh]  bg-white shadow-lg border-[#097362] rounded-b-full border-t-6 flex items-center justify-center ">
							<Image src={img1} alt="Road Safety Equipment" width={80} />
						</div>
						<span
							className={`${manrope.className} text-4xl md:text-[60px] font-bold text-gray-400`}
						>
							01
						</span>
					</div>

					<div
						className={`flex flex-col items-center gap-5 transition-all duration-600 ${getAnimationClass(
							1
						)}`}
					>
						<span
							className={`${manrope.className} text-4xl md:text-[60px] font-bold text-gray-400`}
						>
							02
						</span>
						<div className="w-[15vw] h-[25vh]   flex items-center justify-center mb-4 bg-white shadow-lg border-[#097362] rounded-t-full border-b-6">
							<Image src={img2} alt="Fire Safety Solutions" width={80} />
						</div>
						<h3
							className={`text-lg lg:text-[26px] ${manrope.className} font-bold text-[#222D39]  text-center mb-2`}
						>
							Fire Safety
							<br /> Solutions
						</h3>
					</div>

					<div
						className={`flex flex-col items-center gap-5 transition-all duration-600 ${getAnimationClass(
							2
						)}`}
					>
						<h3
							className={`text-lg lg:text-[26px] ${manrope.className} font-bold text-center text-[#222D39]  mb-2`}
						>
							Industrial Safety <br />
							Gear
						</h3>
						<div className="w-[15vw] h-[25vh] bg-white shadow-lg border-t-6 border-[#097362] rounded-b-full flex items-center justify-center mb-4">
							<Image src={img3} alt="Industrial Safety Gear" width={80} />
						</div>
						<span
							className={`${manrope.className} text-4xl md:text-[60px] font-bold text-gray-400`}
						>
							03
						</span>
					</div>
				</div>

				{/* Bottom Row */}
				<div className="hidden lg:grid grid-cols-3 gap-8 ">
					<div
						className={`flex flex-col items-center gap-5 mt-6 transition-all duration-600 ${getAnimationClass(
							3
						)}`}
					>
						<span
							className={`${manrope.className} text-4xl md:text-[60px] font-bold text-gray-400`}
						>
							04
						</span>
						<div className="w-[15vw] h-[25vh] bg-white shadow-lg border-b-6 border-[#097362] rounded-t-full flex items-center justify-center mb-4">
							<Image src={img4} alt="Traffic Management" width={80} />
						</div>
						<h3
							className={`text-lg lg:text-[26px] ${manrope.className} font-bold text-center text-[#222D39]  mb-2`}
						>
							Traffic Management &<br /> Smart Safety Systems
						</h3>
					</div>

					<div
						className={`flex flex-col items-center gap-5 transition-all duration-600 ${getAnimationClass(
							4
						)}`}
					>
						<h3
							className={`text-lg lg:text-[26px] ${manrope.className} font-bold text-center text-[#222D39]  mb-2`}
						>
							PPE Kits & Emergency Response Products
						</h3>
						<div className="w-[15vw] h-[25vh] bg-white rounded-b-full shadow-lg border-t-6 border-[#097362] flex items-center justify-center mb-4">
							<Image src={img5} alt="PPE Kits" width={80} />
						</div>
						<span
							className={`${manrope.className} text-4xl md:text-[60px] font-bold text-gray-400`}
						>
							05
						</span>
					</div>

					<div
						className={`flex flex-col items-center relative gap-5 transition-all duration-600 ${getAnimationClass(
							5
						)}`}
					>
						<span
							className={`${manrope.className} text-4xl md:text-[60px] font-bold text-gray-400`}
						>
							06
						</span>
						<div className="w-[15vw] h-[25vh] bg-white shadow-lg rounded-t-full border-b-6 border-[#097362] flex items-center justify-center mb-4 relative">
							<Image src={img6} alt="Home Safety" width={80} />
						</div>
						<h3
							className={`text-lg lg:text-[26px] ${manrope.className} font-bold text-[#222D39] text-center mb-2`}
						>
							Home Safety &<br /> Emergency Kits
						</h3>
					</div>
				</div>

				{/* Mobile Layout */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 sm:gap-6">
					{offerings.map((offering, index) => (
						<div
							key={offering.id}
							className={`flex flex-col items-center py-4 sm:py-5 px-3 sm:px-4 gap-2 sm:gap-3 bg-white rounded-2xl sm:rounded-full shadow-lg shadow-[#097362]/40 transition-all duration-600 ${getAnimationClass(
								index
							)}`}
						>
							<span
								className={`text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-300 ${manrope.className}`}
							>
								{offering.id}
							</span>
							<div
								className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-2 sm:mb-4 relative`}
							>
								<Image
									src={offering.icon}
									alt={offering.title}
									width={60}
									className="sm:w-[80px]"
								/>
							</div>
							<h3
								className={`text-sm sm:text-lg lg:text-3xl font-semibold text-[#222D39] text-center mb-2 ${manrope.className} leading-tight`}
							>
								{offering.title}
							</h3>
						</div>
					))}
				</div>

				{/* View All Button */}
				{/* <div className="flex justify-center mt-6 sm:mt-8">
          <button onClick={() => {navigate.push('/contact-us')}} className="bg-gradient-to-b from-[#097362] to-[#0FA78E] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-lg h-10 sm:h-12 font-medium hover:bg-[#0a5a4f] transition-colors">
            View All
          </button>
        </div> */}
			</div>
			<Presence />
		</div>
	);
};

export default KeyOfferings;
