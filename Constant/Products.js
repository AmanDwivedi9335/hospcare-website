import FirstAidKit from "@/public/images/solutions/products/FirstAidKit.png";
import SnakeBitKit from "@/public/images/solutions/products/SnakeBitKit.png";
import BarrierAhead from "@/public/images/solutions/products/BarrierAhead.png";
import LifeJacket from "@/public/images/solutions/products/LifeJacket.png";
import QuickHeal from "@/public/images/solutions/products/QuickHeal.png";
import TrafficCone from "@/public/images/solutions/products/TrafficCone.png";

const products = [
	{
		id: "1",
		name: "First Aid Kit",
		description: "Essential medical supplies for emergency situations.",
		longDescription:
			"This comprehensive First Aid Kit contains all the essential medical supplies needed for emergency situations. It's designed to provide immediate care for injuries and medical emergencies, making it an essential item for homes, offices, and vehicles. The kit includes bandages, antiseptics, pain relievers, and other critical supplies.",
		price: 5000,
		image: FirstAidKit.src,
		category: "first-aid",
		inStock: true,
		features: [
			{
				title: "Comprehensive Contents",
				description:
					"This kit includes 50+ high-quality medical supplies for treating various injuries and emergencies.",
			},
			{
				title: "Durable Case",
				description:
					"Designed for superior protection, these kits come in a sturdy case that's resistant to damage in demanding environments.",
			},
			{
				title: "ISO Certified",
				description:
					"Each medical supply meets Indian Standards and international certifications, ensuring adherence to safety and quality standards.",
			},
			{
				title: "Compact Design",
				description:
					"The bright red color enhances visibility, making it easier for workers to locate in low light or busy work areas, thereby improving overall safety.",
			},
		],
		gallery: [FirstAidKit.src, QuickHeal.src, SnakeBitKit.src],
		relatedProducts: ["2", "3", "5"],
	},
	{
		id: "2",
		name: "Life Jacket",
		description:
			"Personal flotation device designed to keep a person afloat in water.",
		longDescription:
			"Our Life Jackets are designed to provide maximum safety and comfort in water. Made with high-quality materials, these jackets offer excellent buoyancy and are suitable for various water activities. They feature adjustable straps for a secure fit and reflective elements for high visibility.",
		price: 6000,
		image: LifeJacket.src,
		category: "life-jacket",
		inStock: true,
		features: [
			{
				title: "High Buoyancy",
				description:
					"Provides excellent flotation to keep the wearer's head above water even in rough conditions.",
			},
			{
				title: "Adjustable Straps",
				description:
					"Fully adjustable straps ensure a secure and comfortable fit for users of different sizes.",
			},
			{
				title: "Reflective Elements",
				description:
					"High-visibility reflective strips make it easier to spot the wearer in low-light conditions.",
			},
			{
				title: "Durable Construction",
				description:
					"Made from tear-resistant materials that can withstand harsh marine environments.",
			},
		],
		gallery: [LifeJacket.src, LifeJacket.src, LifeJacket.src],
		relatedProducts: ["1", "3", "4"],
	},
	{
		id: "3",
		name: "Snake Bit Kit",
		description:
			"Specialized kit for prompt and effective snake bite treatment.",
		longDescription:
			"This specialized Snake Bit Kit is designed for rapid response to snake bite incidents, particularly in outdoor, rural, and high-risk environments. It contains essential tools and supplies to mitigate the effects of venom and stabilize the victim before professional medical care is available. Ideal for hikers, forest workers, farmers, and emergency responders.",
		price: 4500,
		image: SnakeBitKit.src,
		category: "snake-bite",
		inStock: true,
		features: [
			{
				title: "Essential Snake Bite Tools",
				description:
					"Includes a high-suction venom extractor pump, antiseptics, tourniquet, and sterile dressings specifically curated for treating venomous snake bites.",
			},
			{
				title: "Rugged & Portable Case",
				description:
					"Encased in a durable, weather-resistant box for reliable performance in outdoor and remote environments.",
			},
			{
				title: "User-Friendly Guide",
				description:
					"Comes with a clearly illustrated, step-by-step instruction manual for administering first aid to snake bite victims efficiently.",
			},
			{
				title: "Certified and Safe",
				description:
					"All components meet medical safety standards and are recommended by wilderness survival experts and emergency responders.",
			},
		],
		gallery: [SnakeBitKit.src, SnakeBitKit.src, SnakeBitKit.src],
		relatedProducts: ["1", "2", "4"],
	},
	{
		id: "4",
		name: "Traffic Cone",
		description:
			"Cone-shaped markers used to redirect traffic in a safe manner.",
		longDescription:
			"Our Traffic Cones are essential for road safety and traffic management. Made from durable PVC material with a sturdy base, these cones are designed to withstand various weather conditions and provide high visibility. They are perfect for construction sites, parking lots, and roadwork areas to guide traffic and mark hazards.",
		price: 3000,
		image: TrafficCone.src,
		category: "traffic",
		inStock: true,
		features: [
			{
				title: "High Visibility",
				description:
					"Bright orange color with reflective collars ensures maximum visibility in all lighting conditions.",
			},
			{
				title: "Durable Construction",
				description:
					"Made from high-quality PVC material that resists cracking, fading, and breaking.",
			},
			{
				title: "Stable Base",
				description:
					"Heavy base design prevents tipping over in windy conditions or when brushed by vehicles.",
			},
			{
				title: "Stackable Design",
				description:
					"Cones can be stacked for easy storage and transportation when not in use.",
			},
		],
		gallery: [TrafficCone.src, LifeJacket.src, FirstAidKit.src],
		relatedProducts: ["6", "3", "5"],
	},
	{
		id: "5",
		name: "Quick Heal",
		description: "Fast-acting medical supplies for minor injuries.",
		longDescription:
			"Quick Heal is a comprehensive first aid solution designed for rapid response to minor injuries. This kit contains essential medical supplies that are easy to use and effective for treating cuts, burns, sprains, and other common injuries. The compact design makes it perfect for carrying in vehicles, backpacks, or storing in small spaces.",
		price: 2500,
		image: QuickHeal.src,
		category: "quick-heal",
		inStock: true,
		features: [
			{
				title: "Rapid Response",
				description:
					"Specially designed for quick and effective treatment of minor injuries.",
			},
			{
				title: "Compact Design",
				description:
					"Small, lightweight case that's easy to carry and store in limited spaces.",
			},
			{
				title: "Essential Supplies",
				description:
					"Contains bandages, antiseptics, pain relievers, and other necessary items for first aid.",
			},
			{
				title: "Clear Instructions",
				description:
					"Includes easy-to-follow guidelines for proper use of all included medical supplies.",
			},
		],
		gallery: [QuickHeal.src, FirstAidKit.src, SnakeBitKit.src],
		relatedProducts: ["1", "2", "3"],
	},
	{
		id: "6",
		name: "Barrier Ahead Cautionary",
		description:
			"Road safety refers to the measures and practices used to prevent road accidents and minimize the impact of road users.",
		longDescription:
			"The Barrier Ahead Cautionary sign is an essential road safety product designed to alert drivers of upcoming barriers or obstructions. Made from durable materials with reflective surfaces, these signs provide clear visibility both day and night. They are crucial for construction zones, road works, and temporary hazards to ensure the safety of both workers and road users.",
		price: 4500,
		image: BarrierAhead.src,
		category: "barrier",
		inStock: true,
		features: [
			{
				title: "High Visibility",
				description:
					"Reflective surface ensures the sign is visible in all lighting conditions, including darkness.",
			},
			{
				title: "Weather Resistant",
				description:
					"Made from materials that can withstand various weather conditions without degrading.",
			},
			{
				title: "Durable Construction",
				description:
					"Sturdy build quality ensures long-lasting performance even in harsh environments.",
			},
			{
				title: "Easy Installation",
				description:
					"Designed for quick setup and removal, making it ideal for temporary road works.",
			},
		],
		gallery: [
			BarrierAhead.src,
			FirstAidKit.src,
			SnakeBitKit.src,
			LifeJacket.src,
		],
		relatedProducts: ["4", "3", "1"],
	},
	{
		id: "7",
		name: "Fire Safety - YOUR FIRST LINE OF DEFENSE",
		description:
			"If you're talking about safety at a 'job' (home) or 'work' (office), this could ensure surveillance, emergency procedures, or broader safety focus.",
		longDescription:
			"Our Fire Safety equipment is designed to be your first line of defense against fire hazards. This comprehensive set includes essential tools and devices to help prevent, detect, and combat fires in various settings. From fire extinguishers to smoke detectors, our products are built to the highest safety standards to protect lives and property.",
		price: 5000,
		image: FirstAidKit.src,
		category: "fire-safety",
		inStock: true,
		features: [
			{
				title: "Complete Protection",
				description:
					"This set includes high-quality fire safety equipment for ensuring you have a ready supply for various projects.",
			},
			{
				title: "Heavy Duty Protection",
				description:
					"Designed for superior fire protection, these products provide reliable safety in demanding indoor work environments.",
			},
			{
				title: "ISI Mark Certified",
				description:
					"Each product meets Indian Standards and international certifications, ensuring adherence to safety and quality standards.",
			},
			{
				title: "High Visibility",
				description:
					"The bright red color enhances visibility, making it easier for workers to locate in low light or busy work areas, thereby improving overall safety.",
			},
		],
		gallery: [FirstAidKit.src, LifeJacket.src],
		relatedProducts: ["1", "4", "6"],
	},
];

export default products;
