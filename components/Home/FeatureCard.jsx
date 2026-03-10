import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function FeatureCard({
	title,
	description,
	icon,
	bgColor = "bg-white",
	iconBgColor = "bg-teal-50",
	isReversed = false,
	className = "",
}) {
	return (
		<Card
			className={`w-full p-4 md:p-6 ${bgColor} h-full ${className} ${
				isReversed ? "border" : ""
			}`}
		>
			<div
				className={`flex flex-col ${
					isReversed
						? "md:flex-row-reverse md:items-start"
						: "md:flex-row md:items-start"
				} gap-3 md:gap-4 items-center`}
			>
				<div
					className={`w-16 h-16 md:w-20 md:h-20 ${iconBgColor} rounded-full flex items-center justify-center shrink-0`}
				>
					{icon && (
						<Image
							src={icon}
							alt={title || "Feature icon"}
							width={36}
							height={36}
							className="w-8 h-8 md:w-9 md:h-9"
						/>
					)}
				</div>
				<div className={isReversed ? "md:text-right" : ""}>
					<h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">
						{title}
					</h3>
					<p className="text-sm md:text-base text-gray-600">{description}</p>
					<div
						className={`mt-3 md:mt-4 h-1 w-12 md:w-16 bg-teal-700 ${
							isReversed ? "md:ml-auto" : ""
						}`}
					></div>
				</div>
			</div>
		</Card>
	);
}
