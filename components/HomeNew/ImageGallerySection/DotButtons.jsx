"use client";

import { useCallback, useEffect, useState } from "react";

export const useDotButton = (emblaApi, onButtonClick) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);

	const onDotButtonClick = useCallback(
		(index) => {
			if (!emblaApi) return;
			emblaApi.scrollTo(index);
			if (onButtonClick) onButtonClick(emblaApi);
		},
		[emblaApi, onButtonClick]
	);

	const onInit = useCallback((emblaApi) => {
		setScrollSnaps(emblaApi.scrollSnapList());
	}, []);

	const onSelect = useCallback((emblaApi) => {
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onInit(emblaApi);
		onSelect(emblaApi);

		emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
	}, [emblaApi, onInit, onSelect]);

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	};
};

export const DotButton = (props) => {
	const { children, className, ...restProps } = props;

	return (
		<button
			className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${className}`}
			type="button"
			{...restProps}
		>
			{children}
		</button>
	);
};
