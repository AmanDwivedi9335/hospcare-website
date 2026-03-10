// import Image from "next/image";
// import Link from "next/link";
// import { Card } from "@/components/ui/card";

// export default function SolutionCard({
// 	title,
// 	description,
// 	image,
// 	delay = 0.1,
// }) {
// 	return (
// 		<div className="overflow-hidden bg-white rounded-lg shadow-md h-full w-full">
// 			<div className="h-24 sm:h-28 md:h-32 relative">
// 				<Image
// 					src={image?.src || "/placeholder.svg"}
// 					alt={title || "Solution"}
// 					fill
// 					className="object-cover"
// 				/>
// 			</div>
// 			<div className="p-3 sm:p-4">
// 				<h3 className="text-sm sm:text-md font-bold mb-1 sm:mb-2">{title}</h3>
// 				<p className="text-xs text-gray-600 mb-2 line-clamp-2 sm:line-clamp-3">
// 					{description}
// 				</p>
// 				<Link
// 					href="/solutions"
// 					className="text-teal-700 text-xs font-medium hover:underline mt-auto block"
// 				>
// 					VIEW MORE
// 				</Link>
// 			</div>
// 		</div>
// 	);
// }

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function SolutionCard({
	title,
	description,
	image,
	delay = 0.1,
}) {
	return (
		<div className="overflow-hidden bg-white rounded-lg shadow-md h-full w-full transition-all duration-300 transform md:origin-center md:scale-80 md:hover:scale-100 md:hover:shadow-xl md:hover:z-20 group">
			<div className="h-24 sm:h-28 md:h-32 relative">
				<Image
					src={image?.src || "/placeholder.svg"}
					alt={title || "Solution"}
					fill
					className="object-cover"
				/>
			</div>
			<div className="p-3 sm:p-4">
				<h3 className="text-sm sm:text-md font-bold mb-1 sm:mb-2">{title}</h3>
				<p className="text-xs text-gray-600 mb-2 line-clamp-2 md:group-hover:opacity-100 md:group-hover:line-clamp-none transition-opacity duration-300">
					{description}
				</p>
				<Link
					href="/solutions"
					className="text-teal-700 text-xs font-medium hover:underline mt-auto block md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
				>
					VIEW MORE
				</Link>
			</div>
		</div>
	);
}
