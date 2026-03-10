"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LoadingSpinner from "@/components/HomeNew/LoadingSpinner.jsx";
import LadwaLogo from "@/public/images/Ladwa_Logo.png";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";


const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export default function Navbar() {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [categories, setCategories] = useState([]);
        const [loading, setLoading] = useState(true);
        const pathname = usePathname();
        const navigate = useRouter();
	// Close mobile menu when changing route
        useEffect(() => {
                setIsMenuOpen(false);
        }, [pathname]);

        useEffect(() => {
                setLoading(true);
                fetch('/api/categories')
                        .then((res) => (res.ok ? res.json() : []))
                        .then((data) => {
                                setCategories(data);
                                setLoading(false);
                        })
                        .catch(() => setLoading(false));
        }, []);



	// Function to determine if a link is active
	const isActive = (path) => {
		return pathname === path
			? "text-black font-semibold"
			: "text-gray-600 hover:text-teal-700";
	};

	return (
		<header className="sticky top-0  z-50 w-full  bg-white px-4 md:px-10">
			<div className={`${outfit.className} flex h-16 items-center mx-auto max-w-7xl w-full justify-between`}>
				<div className="flex items-center">
					<Link href="/" className="flex items-center">
						{/* <span className="text-xl font-bold text-black">LADWA</span> */}
						<Image
							src={LadwaLogo.src}
							alt="Ladwa Logo"
							width={150}
							height={150}
						/>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6">
					<Link href="/" className={`text-sm font-medium ${isActive("/")} cursor-pointer`}>
						Home
					</Link>
                                        <Link
                                                href="/projects"
                                                className={`text-sm font-medium ${isActive("/projects")} cursor-pointer`}
                                        >
                                                Projects
                                        </Link>
                                        {/* <div className="relative group">
										<button className="text-sm font-medium text-gray-600 hover:text-teal-700">
											Product Categories
										</button>
									<div
										className="absolute left-0 z-50 top-full min-w-70 bg-white shadow rounded transform transition-all duration-300 opacity-0 translate-y-1 invisible pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto"
									>
									<Link href="/products" className="block px-4 py-2 outline hover:bg-gray-100">All Products</Link>
									{loading ? (
									<div className="py-2">
										<LoadingSpinner />
									</div>
									) : (
									categories.map((c) => (
										<Link key={c._id} href={`/category/${c.slug}`} className="block outline px-4 py-2 hover:bg-gray-100">
										{c.name}
										</Link>
									))
									)}
								</div>
								</div> */}

                                        {/* <Link
                                                href="/solutions"
                                                className={`text-sm font-medium ${isActive("/solutions")}`}
                                        >
                                                Solutions
					</Link> */}
					<Link
						href="/about"
						className={`text-sm font-medium ${isActive("/about")} cursor-pointer`}
					>
						About
					</Link>
                                </nav>

                                {/* Desktop Auth Controls */}
                                <div className="hidden md:flex items-center gap-4">
					{/* <Link
						href="/login"
						className={`text-sm font-medium ${isActive("/login")}`}
					>
						Log in
					</Link> */}
                                        <Button  onClick={() => {navigate.push('/contact-us')}} className="cursor-pointer bg-gradient-to-b from-[#097362] to-[#0FA78E] rounded-full hover:bg-teal-800">Contact Us</Button>
                                </div>

				{/* Mobile Menu Button */}
				<button
					className="flex md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Toggle menu"
				>
					{isMenuOpen ? (
						<X className="h-6 w-6 text-gray-700" />
					) : (
						<Menu className="h-6 w-6 text-gray-700" />
					)}
				</button>
			</div>

			{/* Mobile Menu Dropdown */}
			{isMenuOpen && (
				<div className="md:hidden bg-white py-4 px-4 ">
					<nav className="flex flex-col space-y-4">
						<Link href="/" className={`text-sm font-medium ${isActive("/")}`}>
							Home
						</Link>
                                               <Link
                                                        href="/projects"
                                                        className={`text-sm font-medium ${isActive("/projects")}`}
                                                >
                                                        Projects
                                                </Link>
                                                <details>
                                                        {/* <summary className="list-none text-sm font-medium text-gray-600 hover:text-teal-700">Product Categories</summary>/ */}
                                                        <div className="pl-4 flex flex-col space-y-2 mt-2">
                                                                <Link href="/products" className="text-sm text-gray-600 hover:text-teal-700">All Products</Link>
                                                                {loading ? (
                                                                        <div className="py-2">
                                                                                <LoadingSpinner />
                                                                        </div>
                                                                ) : (
                                                                        categories.map((c) => (
                                                                                <Link key={c._id} href={`/category/${c.slug}`} className="text-sm text-gray-600 hover:text-teal-700">
                                                                                        {c.name}
                                                                                </Link>
                                                                        ))
                                                                )}
                                                        </div>
                                                </details>
						{/* <Link
							href="/solutions"
							className={`text-sm font-medium ${isActive("/solutions")}`}
						>
							Solutions
						</Link> */}
						<Link
							href="/about"
							className={`text-sm font-medium ${isActive("/about")}`}
						>
							About
						</Link>
                                                {/* Auth links for mobile */}
                                                <div className="pt-4  flex flex-col space-y-4">
							{/* <Link
								href="/login"
								className={`text-sm font-medium ${isActive("/login")}`}
							>
								Log in
							</Link> */}
                                                        <Button onClick={() => {navigate.push('/contact-us')}} className="rounded-full bg-gradient-to-b from-[#097362] to-[#0FA78E] hover:bg-teal-800 w-full">
                                                                Contact Us
                                                        </Button>
                                                </div>
					</nav>
				</div>
			)}
		</header>
	);
}
