import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
			<h1 className="text-6xl font-bold text-teal-700">404</h1>
			<h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
			<p className="text-gray-600 mt-2 text-center max-w-md">
				The page you are looking for doesn't exist or has been moved.
			</p>
			<Button asChild className="mt-8 bg-teal-700 hover:bg-teal-800">
				<Link href="/">Return Home</Link>
			</Button>
		</div>
	);
}
