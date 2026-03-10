import Home from "@/components/HomeNew/Home";

export const metadata = {
        title: "LADWA Safety Equipment & Workplace Protection",
        description:
                "Discover LADWA's comprehensive catalogue of industrial safety products, EHS consulting, and turnkey protection services engineered to keep teams safe and compliant.",
        alternates: { canonical: "/" },
};

export default function HomePage() {
        return (
                <>
                        <Home />
                </>
        );
}
