"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const usePrevNextButtons = (emblaApi, onButtonClick) => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
		if (onButtonClick) onButtonClick(emblaApi);
	}, [emblaApi, onButtonClick]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
		if (onButtonClick) onButtonClick(emblaApi);
	}, [emblaApi, onButtonClick]);

	const onSelect = useCallback((emblaApi) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on("reInit", onSelect).on("select", onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

export const PrevButton = (props) => {
	const { children, disabled, ...restProps } = props;

	return (
		<button
			className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
				disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
			}`}
			type="button"
			disabled={disabled}
			{...restProps}
		>
			<ChevronLeft className="w-6 h-6 text-gray-700" />
			{children}
		</button>
	);
};

export const NextButton = (props) => {
	const { children, disabled, ...restProps } = props;

	return (
		<button
			className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
				disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
			}`}
			type="button"
			disabled={disabled}
			{...restProps}
		>
			<ChevronRight className="w-6 h-6 text-gray-700" />
			{children}
		</button>
	);
};
