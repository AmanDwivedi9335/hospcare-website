import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/HomeNew/LoadingSpinner.jsx";
// import "./Home.css";

// Code splitting with dynamic imports
const HeroSection = dynamic(
	() => import("@/components/HomeNew/HeroSection.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);

const OurPartners = dynamic(
	() => import("@/components/HomeNew/PartnersSection.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);

const Carousel = dynamic(
	() =>
		import("@/components/HomeNew/Carousel.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);

const VisionMission = dynamic(
	() => import("@/components/HomeNew/VisionMission.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);

const FeaturesSection = dynamic(
	() => import("@/components/HomeNew/FeaturesSection.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);

const GlobalBuyersSection = dynamic(
	() => import("@/components/HomeNew/GlobalBuyersSection.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);

const CoreValues = dynamic(
	() => import("@/components/HomeNew/CoreValues.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);

const SectorsSection = dynamic(
	() => import("@/components/HomeNew/SectorsSection.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);

const NewsletterSection = dynamic(
	() => import("@/components/HomeNew/NewsletterSection.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);

const TestimonialsSection = dynamic(
	() => import("@/components/HomeNew/TestimonialsSection.jsx"),
	{
		loading: () => <LoadingSpinner />,
		ssr: true,
	}
);


export default function Home() {
	
	return (
		<main className="min-h-screen">
			<HeroSection />
			<OurPartners />
			<Carousel/>
			<VisionMission />
			<FeaturesSection />
			<GlobalBuyersSection />
			<CoreValues />
			<SectorsSection />
			<NewsletterSection />
			<TestimonialsSection />
		</main>
	);
}
