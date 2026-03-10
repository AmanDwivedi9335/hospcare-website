import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import map1 from "../../public/images/aboutus/map.png";
import globe from "../../public/images/aboutus/globe.png";
import trust from "../../public/images/aboutus/trust.png";
import map2 from "../../public/images/aboutus/map.png";

const Presence = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [animatedItems, setAnimatedItems] = useState(new Set());
	const sectionRef = useRef(null);

	const presenceData = [
		{
			id: 1,
			image: map1,
			alt: "PAN India distribution network",
			title: "PAN India distribution network",
		},
		{
			id: 2,
			image: globe,
			alt: "Global exports to over 20 countries",
			title: "Global exports to over 20 countries",
		},
		{
			id: 3,
			image: trust,
			alt: "Trusted by industries, governments & corporates",
			title: "Trusted by industries, governments & corporates",
		},
		{
			id: 4,
			image: map2,
			alt: "Proud contributor to India's Make in India initiative",
			title: 'Proud contributor to India\'s "Make in India" initiative',
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
			setTimeout(() => {
				setAnimatedItems((prev) => new Set([...prev, "title"]));
			}, 100);

			presenceData.forEach((_, index) => {
				setTimeout(() => {
					setAnimatedItems((prev) => new Set([...prev, index]));
				}, 300 + index * 200);
			});
		}
	}, [isVisible]);

	const getAnimationClass = (item) => {
		if (animatedItems.has(item)) {
			return "animate-fade-in-up";
		}
		return "opacity-0 translate-y-8";
	};

	return (
		<div
			className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12"
			ref={sectionRef}
			id="presence"
		>
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

			<h2
				className={`text-3xl md:text-5xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-600 ${getAnimationClass(
					"title"
				)}`}
			>
				Presence & Impact
			</h2>

			{/* Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
				<div
					className={`bg-gradient-to-b from-[#A2FFF0] md:h-[22vh] to-[#fffff] p-1 rounded-2xl transition-all duration-600 ${getAnimationClass(
						0
					)}`}
				>
					{/* Card 1*/}
					<div className="bg-gradient-to-r  from-[#ffffff] gap-4 to-[#9FFFF0]/20 rounded-2xl md:h-[20vh] items-center p-3 md:p-5 flex  space-y-4">
						<div className="w-10 h-10 md:w-12 md:h-13 flex-shrink-0">
							<Image
								src={map1}
								alt="PAN India distribution network"
								width={54}
								height={54}
								className="w-full h-full object-contain"
							/>
						</div>
						<h3 className="text-sm md:text-lg font-semibold text-gray-900 leading-tight">
							PAN India distribution network
						</h3>
					</div>
				</div>

				{/* Card 2 */}
				<div
					className={`bg-gradient-to-b from-[#A2FFF0] md:h-[22vh] to-[#fffff] p-1 rounded-2xl transition-all duration-600 ${getAnimationClass(
						1
					)}`}
				>
					<div className="bg-gradient-to-r  from-[#ffffff] gap-4 to-[#9FFFF0]/20 rounded-2xl p-3 md:p-5 md:h-[20vh] flex items-center  space-y-4">
						<div className="w-12 h-12 md:w-16 md:h-13 flex-shrink-0">
							<Image
								src={globe}
								alt="Global exports to over 20 countries"
								width={54}
								className="w-full h-full object-contain"
							/>
						</div>
						<h3 className="text-sm md:text-lg font-semibold text-gray-900 leading-tight">
							Global exports to over <br className="md:block hidden" />
							20 countries
						</h3>
					</div>
				</div>
				{/* Card 3  */}
				<div
					className={`bg-gradient-to-b from-[#A2FFF0] md:h-[22vh] to-[#fffff] p-1 rounded-2xl transition-all duration-600 ${getAnimationClass(
						2
					)}`}
				>
					<div className="bg-cyan-50 rounded-2xl p-6 md:p-5 md:h-[20vh] gap-4 items-center flex space-y-4">
						<div className="w-10 h-10 md:w-12 md:h-13 flex-shrink-0">
							<Image
								src={trust}
								alt="Trusted by industries, governments & corporates"
								width={54}
								className="w-full h-full object-contain"
							/>
						</div>
						<h3 className="text-sm md:text-lg font-semibold text-gray-900 leading-tight">
							Trusted by industries, governments & corporates
						</h3>
					</div>
				</div>

				{/* Card 4  */}
				<div
					className={`bg-gradient-to-b from-[#A2FFF0] md:h-[22vh] to-[#fffff] p-1 rounded-2xl md:col-span-2 lg:col-span-1 lg:col-start-2 transition-all duration-600 ${getAnimationClass(
						3
					)}`}
				>
					<div className="bg-cyan-50 rounded-2xl p-6 md:p-5 gap-4 md:h-[20vh] flex items-center space-y-4 md:col-span-2 lg:col-span-1 lg:col-start-2">
						<div className="w-10 h-10 md:w-12 md:h-13 flex-shrink-0">
							<Image
								src={map2}
								alt="Proud contributor to India's Make in India initiative"
								width={54}
								className="w-full h-full object-contain"
							/>
						</div>
						<h3 className="text-sm md:text-lg font-semibold text-gray-900 leading-tight">
							Proud contributor to India's "Make in India" initiative
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Presence;
