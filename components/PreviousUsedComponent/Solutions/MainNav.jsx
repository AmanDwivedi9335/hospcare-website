"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/lib/store";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

const components = [
	{
		title: "First Aid Kit",
		href: "/products/first-aid-kit",
		description: "Essential medical supplies for emergency situations.",
		category: "first-aid",
	},
	{
		title: "Life Jacket",
		href: "/products/life-jacket",
		description:
			"Personal flotation device designed to keep a person afloat in water.",
		category: "first-aid",
	},
	{
		title: "Snake Bite Kit",
		href: "/products/snake-bite-kit",
		description: "Emergency supplies for treating snake bites.",
		category: "first-aid",
	},
	{
		title: "Traffic Cone",
		href: "/products/traffic-cone",
		description:
			"Cone-shaped markers used to redirect traffic in a safe manner.",
		category: "road-safety",
	},
	{
		title: "Quick Heal",
		href: "/products/quick-heal",
		description: "Fast-acting medical supplies for minor injuries.",
		category: "first-aid",
	},
	{
		title: "Shop Safety",
		href: "/products/shop-safety",
		description: "Safety equipment for workshops and industrial environments.",
		category: "industrial-safety",
	},
];

export default function MainNav() {
	const { setActiveCategory } = useProductStore();
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
		setMobileMenuOpen(false);
	};

	return (
		<>
			{/* Desktop Navigation */}
			<div className="hidden md:block">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger
								className="bg-transparent"
								onClick={() => handleCategoryClick("first-aid")}
							>
								First Aid Kit Box
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{components
										.filter((c) => c.category === "first-aid")
										.map((component) => (
											<ListItem
												key={component.title}
												title={component.title}
												href={component.href}
											>
												{component.description}
											</ListItem>
										))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger
								className="bg-transparent"
								onClick={() => handleCategoryClick("road-safety")}
							>
								Road Safety Equipment
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{components
										.filter((c) => c.category === "road-safety")
										.map((component) => (
											<ListItem
												key={component.title}
												title={component.title}
												href={component.href}
											>
												{component.description}
											</ListItem>
										))}
									<ListItem
										title="Barrier & Barricades"
										href="/road-safety/barriers"
									>
										Barriers used to control traffic flow and protect work zones
									</ListItem>
									<ListItem
										title="Car/Wheel Stoppers"
										href="/road-safety/wheel-stoppers"
									>
										Devices used to prevent vehicles from moving beyond a
										certain point
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger
								className="bg-transparent"
								onClick={() => handleCategoryClick("road-signs")}
							>
								Road Signs
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									<ListItem title="Warning Signs" href="/road-signs/warning">
										Signs that warn of hazards ahead
									</ListItem>
									<ListItem
										title="Regulatory Signs"
										href="/road-signs/regulatory"
									>
										Signs that inform of traffic laws or regulations
									</ListItem>
									<ListItem title="Guide Signs" href="/road-signs/guide">
										Signs that provide directional and navigational information
									</ListItem>
									<ListItem
										title="Construction Signs"
										href="/road-signs/construction"
									>
										Signs used in construction zones
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger
								className="bg-transparent"
								onClick={() => handleCategoryClick("fire-safety")}
							>
								Fire Safety
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									<ListItem
										title="Fire Extinguishers"
										href="/fire-safety/extinguishers"
									>
										Portable devices to put out small fires
									</ListItem>
									<ListItem title="Fire Blankets" href="/fire-safety/blankets">
										Blankets designed to extinguish small fires
									</ListItem>
									<ListItem
										title="Smoke Detectors"
										href="/fire-safety/detectors"
									>
										Devices that detect smoke and alert occupants
									</ListItem>
									<ListItem title="Fire Alarms" href="/fire-safety/alarms">
										Systems designed to detect fires and alert occupants
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger
								className="bg-transparent"
								onClick={() => handleCategoryClick("industrial-safety")}
							>
								Industrial Safety
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									<ListItem
										title="Personal Protective Equipment"
										href="/industrial-safety/ppe"
									>
										Equipment worn to minimize exposure to hazards
									</ListItem>
									<ListItem
										title="Safety Signs"
										href="/industrial-safety/signs"
									>
										Signs that provide information about hazards
									</ListItem>
									<ListItem
										title="Lockout/Tagout"
										href="/industrial-safety/lockout-tagout"
									>
										Procedures to ensure dangerous machines are properly shut
										off
									</ListItem>
									<ListItem
										title="Fall Protection"
										href="/industrial-safety/fall-protection"
									>
										Equipment designed to protect workers from falls
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			{/* Mobile Menu Button */}
			<div className="md:hidden">
				<button
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					className="text-gray-700 hover:text-teal-700 focus:outline-none"
				>
					{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="fixed inset-0 z-50 bg-white md:hidden">
					<div className="flex justify-between items-center p-4 border-b">
						<h2 className="text-lg font-semibold">Menu</h2>
						<button
							onClick={() => setMobileMenuOpen(false)}
							className="text-gray-700 hover:text-teal-700 focus:outline-none"
						>
							<X size={24} />
						</button>
					</div>
					<nav className="p-4">
						<ul className="space-y-4">
							<li>
								<button
									onClick={() => handleCategoryClick("first-aid")}
									className="text-left w-full py-2 px-4 hover:bg-gray-100 rounded-md"
								>
									First Aid Kit Box
								</button>
							</li>
							<li>
								<button
									onClick={() => handleCategoryClick("road-safety")}
									className="text-left w-full py-2 px-4 hover:bg-gray-100 rounded-md"
								>
									Road Safety Equipment
								</button>
							</li>
							<li>
								<button
									onClick={() => handleCategoryClick("road-signs")}
									className="text-left w-full py-2 px-4 hover:bg-gray-100 rounded-md"
								>
									Road Signs
								</button>
							</li>
							<li>
								<button
									onClick={() => handleCategoryClick("fire-safety")}
									className="text-left w-full py-2 px-4 hover:bg-gray-100 rounded-md"
								>
									Fire Safety
								</button>
							</li>
							<li>
								<button
									onClick={() => handleCategoryClick("industrial-safety")}
									className="text-left w-full py-2 px-4 hover:bg-gray-100 rounded-md"
								>
									Industrial Safety
								</button>
							</li>
						</ul>
					</nav>
				</div>
			)}
		</>
	);
}

const ListItem = React.forwardRef(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						{...props}
					>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
							{children}
						</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = "ListItem";
