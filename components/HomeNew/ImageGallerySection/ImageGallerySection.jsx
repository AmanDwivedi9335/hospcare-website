"use client";

import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
	NextButton,
	PrevButton,
	usePrevNextButtons,
} from "@/components/HomeNew/ImageGallerySection/ArrowButtons.jsx";
import {
	DotButton,
	useDotButton,
} from "@/components/HomeNew/ImageGallerySection/DotButtons.jsx";

const TWEEN_FACTOR_BASE = 0.52;
const SCALE_FACTOR = 1.25;

const numberWithinRange = (number, min, max) =>
	Math.min(Math.max(number, min), max);

export default function ImageGallerySection({ images = [] }) {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "center",
			containScroll: "trimSnaps",
		},
		[Autoplay({ delay: 3000, stopOnInteraction: false })]
	);

	const tweenFactor = useRef(0);

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	const setTweenFactor = useCallback((emblaApi) => {
		tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
	}, []);

	const tweenScale = useCallback((emblaApi, eventName) => {
		const engine = emblaApi.internalEngine();
		const scrollProgress = emblaApi.scrollProgress();
		const slidesInView = emblaApi.slidesInView();
		const isScrollEvent = eventName === "scroll";

		emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			let diffToTarget = scrollSnap - scrollProgress;
			const slidesInSnap = engine.slideRegistry[snapIndex];

			slidesInSnap.forEach((slideIndex) => {
				if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach((loopItem) => {
						const target = loopItem.target();

						if (slideIndex === loopItem.index && target !== 0) {
							const sign = Math.sign(target);

							if (sign === -1) {
								diffToTarget = scrollSnap - (1 + scrollProgress);
							}
							if (sign === 1) {
								diffToTarget = scrollSnap + (1 - scrollProgress);
							}
						}
					});
				}

				const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
				const scale = numberWithinRange(tweenValue, 0.8, SCALE_FACTOR);
				const opacity = numberWithinRange(tweenValue, 0.4, 1);

				const slideNode = emblaApi.slideNodes()[slideIndex];
				const imgNode = slideNode.querySelector(".gallery-image");

				if (imgNode) {
					imgNode.style.transform = `scale(${scale})`;
					imgNode.style.opacity = opacity.toString();
				}
			});
		});
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		setTweenFactor(emblaApi);
		tweenScale(emblaApi);
		emblaApi
			.on("reInit", setTweenFactor)
			.on("reInit", tweenScale)
			.on("scroll", tweenScale)
			.on("slideFocus", tweenScale);
	}, [emblaApi, tweenScale]);

	// Default images if none provided
	const defaultImages = [
		{
			src: "/images/gallery-sample.png",
			alt: "Safety Equipment Gallery",
			title: "Professional Safety Gear",
		},
		{
			src: "/placeholder.svg?height=400&width=600",
			alt: "Industrial Safety",
			title: "Industrial Safety Solutions",
		},
		{
			src: "/placeholder.svg?height=400&width=600",
			alt: "Fire Safety",
			title: "Fire Safety Equipment",
		},
		{
			src: "/placeholder.svg?height=400&width=600",
			alt: "PPE Equipment",
			title: "Personal Protective Equipment",
		},
		{
			src: "/placeholder.svg?height=400&width=600",
			alt: "Road Safety",
			title: "Road Safety Solutions",
		},
	];

	const galleryImages = images.length > 0 ? images : defaultImages;

	return (
		<section className="py-10 bg-gradient-to-br from-gray-50 to-white">
			<div className="px-10">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Our Safety Solutions Gallery
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Explore our comprehensive range of safety equipment and solutions
						designed to protect lives and ensure workplace safety across various
						industries.
					</p>
				</motion.div>

				<div className="relative">
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex">
							{galleryImages.map((image, index) => (
								<div
									key={index}
									className="flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_40%] px-4"
								>
									<div className="relative">
                                                                                <img className="gallery-image w-full h-[300px] md:h-[400px] object-cover rounded-2xl shadow-lg transition-all duration-500 ease-out" src={image.src.src} alt={image.alt || `Gallery image ${index + 1}`} />

										{/* Overlay with title */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl">
											<div className="absolute bottom-6 left-6 right-6">
												<h3 className="text-white text-xl font-bold mb-2">
													{image.title || `Safety Solution ${index + 1}`}
												</h3>
												{image.description && (
													<p className="text-white/90 text-sm">
														{image.description}
													</p>
												)}
											</div>
										</div>

										{/* Center highlight indicator */}
										<div className="absolute top-4 right-4">
											<div className="w-3 h-3 bg-teal-500 rounded-full opacity-0 transition-opacity duration-300 center-indicator"></div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Arrows */}
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>

				{/* Dots Navigation */}
				<div className="flex justify-center mt-8 space-x-2">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={`${
								index === selectedIndex
									? "bg-teal-600 w-8"
									: "bg-gray-300 hover:bg-gray-400"
							}`}
						/>
					))}
				</div>
			</div>

			<style jsx>{`
				.gallery-image {
					transform-origin: center;
				}

				/* Show center indicator for scaled images */
				.gallery-image[style*="scale(1.25)"] ~ div .center-indicator {
					opacity: 1;
				}
			`}</style>
		</section>
	);
}
