import Herosection from "@/components/Aboutus/Herosection";
import OurVision from "@/components/Aboutus/OurVision";
import WhatLadwaStandsFor from "@/components/Aboutus/WhatLadwaStandsFor";
import CoreValues from "@/components/Aboutus/CoreValues";
import KeyOfferings from "@/components/Aboutus/KeyOfferings";
import TopManagement from "@/components/Aboutus/TopManagement";

export const metadata = {
        title: "About LADWA | Visionary Safety Innovators",
        description:
                "Learn about LADWA's mission, leadership, and values powering our innovative safety technologies, turnkey implementations, and trusted partnerships worldwide.",
        alternates: { canonical: "/about" },
};

export default function AboutPage() {
        return (
                <div>
                        <Herosection />
                        <OurVision />
                        <WhatLadwaStandsFor />
                        <CoreValues />
                        <KeyOfferings />
                        <TopManagement />
                </div>
        );
}
