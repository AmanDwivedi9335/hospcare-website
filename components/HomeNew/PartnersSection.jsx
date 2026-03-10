"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Logos
import logo1 from "@/public/images/NewHome/partner1.png";
import logo2 from "@/public/images/NewHome/partner2.png";
import logo3 from "@/public/images/NewHome/partner3.png";
import logo4 from "@/public/images/NewHome/partner4.png";
import logo5 from "@/public/images/NewHome/partner5.png";
import logo6 from "@/public/images/NewHome/partner6.png";
import logo7 from "@/public/images/NewHome/partner7.png";
import logo8 from "@/public/images/NewHome/partner8.png";
import logo9 from "@/public/images/logos/ikea.png";

const partnerLogos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
];

export default function PartnersSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="lg:py-6 bg-white"
    >
      <motion.div variants={fadeInUp} className="">
        <h2 className="text-center text-3xl font-semibold text-gray-800 -mb-2 lg:mb-2">
          Our Partners
        </h2>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee min-w-[100%] whitespace-nowrap">
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div
                key={index}
                className="mx-8 flex items-center justify-center min-w-[80px]"
              >
                <Image
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  width={100}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
