"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		console.log("Searching for:", searchQuery);
		// Implement search functionality
	};

	return (
		<motion.form
			onSubmit={handleSearch}
			className="relative w-full max-w-sm"
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Input
				type="search"
				placeholder="Search"
				className="pr-10"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<button
				type="submit"
				className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
			>
				<Search className="h-4 w-4" />
			</button>
		</motion.form>
	);
}
