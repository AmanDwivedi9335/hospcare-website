"use client";

import { motion } from "framer-motion";
import { ScrollText, Shield, FileText, Eye } from "lucide-react";

// Animation variants
const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInLeft = {
        initial: { opacity: 0, x: -60 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
        initial: {},
        animate: {
                transition: {
                        staggerChildren: 0.1,
                },
        },
};

const staggerItem = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
};

export default function TermsPrivacyContent() {
        return (
                <div className="flex flex-col min-h-screen">
                        <div className="container mx-auto py-8 px-10">
                                {/* Header Section */}
                                <motion.div
                                        className="text-center mb-12"
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                        <motion.h1
                                                className="text-3xl md:text-5xl font-bold mb-4"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                        >
                                                LADWA Terms & Privacy Commitment
                                        </motion.h1>
                                        <motion.p
                                                className="text-gray-600 md:text-base text-sm max-w-2xl mx-auto"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                        >
                                                Understand how LADWA operates, safeguards your information, and upholds compliance across all safety services and solutions.
                                        </motion.p>
                                </motion.div>

                                {/* Navigation Cards */}
                                <motion.div
                                        className="grid md:grid-cols-2 gap-6 mb-12"
                                        variants={staggerContainer}
                                        initial="initial"
                                        animate="animate"
                                >
                                        <motion.div
                                                variants={staggerItem}
                                                className="bg-gradient-to-br from-[#097362] to-[#0FA78E] rounded-2xl p-6 text-white cursor-pointer"
                                                whileHover={{ scale: 1.02, y: -5 }}
                                                transition={{ duration: 0.3 }}
                                                onClick={() =>
                                                        document
                                                                .getElementById("terms")
                                                                .scrollIntoView({ behavior: "smooth" })
                                                }
                                        >
                                                <div className="flex items-center mb-4">
                                                        <ScrollText className="h-8 w-8 mr-3" />
                                                        <h3 className="text-xl font-bold">Terms & Conditions</h3>
                                                </div>
                                                <p className="text-teal-100">
                                                        Learn about our service terms, user responsibilities, and legal agreements.
                                                </p>
                                        </motion.div>

                                        <motion.div
                                                variants={staggerItem}
                                                className="bg-gradient-to-br from-[#097362] to-[#0FA78E] rounded-2xl p-6 text-white cursor-pointer"
                                                whileHover={{ scale: 1.02, y: -5 }}
                                                transition={{ duration: 0.3 }}
                                                onClick={() =>
                                                        document
                                                                .getElementById("privacy")
                                                                .scrollIntoView({ behavior: "smooth" })
                                                }
                                        >
                                                <div className="flex items-center mb-4">
                                                        <Shield className="h-8 w-8 mr-3" />
                                                        <h3 className="text-xl font-bold">Privacy Policy</h3>
                                                </div>
                                                <p className="text-teal-100">
                                                        Understand how we collect, use, and protect your personal information.
                                                </p>
                                        </motion.div>
                                </motion.div>

                                {/* Terms & Conditions Section */}
                                <motion.section
                                        id="terms"
                                        className="mb-16"
                                        variants={fadeInUp}
                                        initial="initial"
                                        animate="animate"
                                >
                                        <div className="max-w-4xl mx-auto border-2 border-[#097362] rounded-2xl overflow-hidden">
                                                <div className="bg-gradient-to-r from-[#097362] to-[#0FA78E] p-6">
                                                        <div className="flex items-center text-white">
                                                                <FileText className="h-6 w-6 mr-3" />
                                                                <h2 className="text-2xl md:text-3xl font-bold">
                                                                        Terms & Conditions
                                                                </h2>
                                                        </div>
                                                </div>

                                                <div className="p-8 bg-white">
                                                        <motion.div
                                                                className="space-y-6"
                                                                variants={staggerContainer}
                                                                initial="initial"
                                                                animate="animate"
                                                        >
                                                                <motion.div variants={staggerItem}>
                                                                        <h3 className="text-xl font-semibold mb-3 text-[#097362]">
                                                                                1. Acceptance of Terms
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed">
                                                                                By accessing and using LADWA's services, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users, and organisations who access or use our services.
                                                                        </p>
                                                                </motion.div>

                                                                <motion.div variants={staggerItem}>
                                                                        <h3 className="text-xl font-semibold mb-3 text-[#097362]">
                                                                                2. Use License
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed mb-3">
                                                                                Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                                                        </p>
                                                                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                                                                <li>Modify or copy the materials for resale without written consent.</li>
                                                                                <li>Use the materials for any commercial purpose beyond agreed service contracts.</li>
                                                                                <li>Attempt to decompile or reverse engineer any software provided by LADWA.</li>
                                                                                <li>Transfer the materials to another person or mirror the materials on any other server.</li>
                                                                        </ul>
                                                                </motion.div>

                                                                <motion.div variants={staggerItem}>
                                                                        <h3 className="text-xl font-semibold mb-3 text-[#097362]">
                                                                                3. Service Delivery
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed">
                                                                                LADWA delivers safety consulting, equipment supply, and implementation services following international compliance standards. Engagement timelines and deliverables are defined in project agreements shared with each client.
                                                                        </p>
                                                                </motion.div>

                                                                <motion.div variants={staggerItem}>
                                                                        <h3 className="text-xl font-semibold mb-3 text-[#097362]">
                                                                                4. Limitations
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed">
                                                                                In no event shall LADWA be liable for any damages arising out of the use or inability to use the materials or services provided, even if an authorised representative has been notified orally or in writing of the possibility of such damage.
                                                                        </p>
                                                                </motion.div>
                                                        </motion.div>
                                                </div>
                                        </div>
                                </motion.section>

                                {/* Privacy Policy Section */}
                                <motion.section
                                        id="privacy"
                                        className="mb-16"
                                        variants={fadeInUp}
                                        initial="initial"
                                        animate="animate"
                                >
                                        <div className="max-w-4xl mx-auto border-2 border-[#097362] rounded-2xl overflow-hidden">
                                                <div className="bg-gradient-to-r from-[#097362] to-[#0FA78E] p-6">
                                                        <div className="flex items-center text-white">
                                                                <Eye className="h-6 w-6 mr-3" />
                                                                <h2 className="text-2xl md:text-3xl font-bold">
                                                                        Privacy Policy
                                                                </h2>
                                                        </div>
                                                </div>

                                                <div className="p-8 bg-white">
                                                        <motion.div
                                                                className="space-y-6"
                                                                variants={staggerContainer}
                                                                initial="initial"
                                                                animate="animate"
                                                        >
                                                                <motion.div variants={staggerItem}>
                                                                        <h3 className="text-xl font-semibold mb-3 text-[#097362]">
                                                                                1. Information Collection
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed">
                                                                                We collect personal and business information strictly for providing safety consultations, sending product updates, and improving customer experience. Data is stored securely within encrypted systems.
                                                                        </p>
                                                                </motion.div>

                                                                <motion.div variants={staggerItem}>
                                                                        <h3 className="text-xl font-semibold mb-3 text-[#097362]">
                                                                                2. Data Usage
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed">
                                                                                Information collected may be used to personalise solutions, deliver contracted services, communicate maintenance schedules, and comply with regulatory requirements.
                                                                        </p>
                                                                </motion.div>

                                                                <motion.div variants={staggerItem}>
                                                                        <h3 className="text-xl font-semibold mb-3 text-[#097362]">
                                                                                3. Data Protection
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed">
                                                                                LADWA implements strict administrative, technical, and physical safeguards to protect data against unauthorised access, alteration, disclosure, or destruction.
                                                                        </p>
                                                                </motion.div>

                                                                <motion.div variants={staggerItem}>
                                                                        <h3 className="text-xl font-semibold mb-3 text-[#097362]">
                                                                                4. Third-Party Sharing
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed">
                                                                                We do not sell personal information. Data may be shared with trusted partners solely to deliver contracted safety services under confidentiality agreements.
                                                                        </p>
                                                                </motion.div>

                                                                <motion.div variants={staggerItem}>
                                                                        <h3 className="text-xl font-semibold mb-3 text-[#097362]">
                                                                                5. Your Rights
                                                                        </h3>
                                                                        <p className="text-gray-700 leading-relaxed">
                                                                                Clients may request access, correction, or deletion of their stored information at any time by contacting privacy@ladwa.com. We respond to all verified requests within 14 working days.
                                                                        </p>
                                                                </motion.div>
                                                        </motion.div>
                                                </div>
                                        </div>
                                </motion.section>
                        </div>
                </div>
        );
}
