"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

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

const fadeInRight = {
        initial: { opacity: 0, x: 60 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
};

const scaleIn = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
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

const contactInfoStagger = {
        initial: {},
        animate: {
                transition: {
                        staggerChildren: 0.2,
                },
        },
};

const contactInfoItem = {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
};

export default function ContactUsContent() {
        const [formData, setFormData] = useState({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: "",
        });

        const [isSubmitting, setIsSubmitting] = useState(false);
        const [showSuccess, setShowSuccess] = useState(false);
        const [focusedField, setFocusedField] = useState(null);

        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                setIsSubmitting(true);

                try {
                        await fetch("/api/contacts", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(formData),
                        });
                        setShowSuccess(true);
                        setFormData({
                                firstName: "",
                                lastName: "",
                                email: "",
                                phone: "",
                                message: "",
                        });
                } catch (err) {
                        console.error("Failed to submit form", err);
                } finally {
                        setIsSubmitting(false);
                        setTimeout(() => setShowSuccess(false), 3000);
                }
        };

        const handleFocus = (fieldName) => {
                setFocusedField(fieldName);
        };

        const handleBlur = () => {
                setFocusedField(null);
        };

        return (
                <div className="flex flex-col min-h-screen">
                        <div className="container mx-auto py-8 px-10">
                                {/* Header Section */}
                                <motion.div
                                        className="text-center mb-8"
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                        <motion.h1
                                                className="text-3xl md:text-5xl font-bold mb-2"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                        >
                                                Contact LADWA Safety Experts
                                        </motion.h1>
                                        <motion.p
                                                className="text-gray-600 md:text-base text-sm"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                        >
                                                Our specialists are ready to help you choose the right safety solution for your workplace.
                                        </motion.p>
                                </motion.div>

                                {/* Main Contact Container */}
                                <motion.div
                                        className="max-w-4xl mx-auto border-2 border-[#097362] p-2 bg-white rounded-2xl shadow-md overflow-hidden"
                                        variants={scaleIn}
                                        initial="initial"
                                        animate="animate"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                >
                                        <div className="flex flex-col md:flex-row">
                                                {/* Contact Information */}
                                                <motion.div
                                                        className="bg-gradient-to-b from-[#097362] to-[#0FA78E] rounded-2xl text-white p-8 md:w-2/5"
                                                        variants={fadeInLeft}
                                                        initial="initial"
                                                        animate="animate"
                                                >
                                                        <motion.div
                                                                className="space-y-6"
                                                                variants={contactInfoStagger}
                                                                initial="initial"
                                                                animate="animate"
                                                        >
                                                                <motion.div variants={contactInfoItem}>
                                                                        <h2 className="text-2xl font-semibold mb-2">Let's Work Together</h2>
                                                                        <p className="text-teal-100 text-sm">
                                                                                Reach out to discuss custom safety strategies, pricing, or enterprise partnerships.
                                                                        </p>
                                                                </motion.div>

                                                                <motion.div variants={contactInfoItem} className="space-y-4">
                                                                        <div className="flex items-center gap-3">
                                                                                <Phone className="h-5 w-5" />
                                                                                <div>
                                                                                        <p className="font-medium">Phone</p>
                                                                                        <a href="tel:+919999999999" className="text-teal-100 text-sm">
                                                                                                +91 99999 99999
                                                                                        </a>
                                                                                </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                                <Mail className="h-5 w-5" />
                                                                                <div>
                                                                                        <p className="font-medium">Email</p>
                                                                                        <a href="mailto:info@ladwa.com" className="text-teal-100 text-sm">
                                                                                                info@ladwa.com
                                                                                        </a>
                                                                                </div>
                                                                        </div>
                                                                        <div className="flex items-start gap-3">
                                                                                <MapPin className="h-5 w-5 mt-1" />
                                                                                <div>
                                                                                        <p className="font-medium">Head Office</p>
                                                                                        <p className="text-teal-100 text-sm">
                                                                                                LADWA House, Plot 12, Industrial Innovation Park, Gurugram, Haryana 122001
                                                                                        </p>
                                                                                </div>
                                                                        </div>
                                                                </motion.div>

                                                                <motion.div variants={contactInfoItem}>
                                                                        <p className="text-sm text-teal-100">
                                                                                Available Monday to Saturday, 9:00 AM – 6:00 PM IST for consultations and support.
                                                                        </p>
                                                                </motion.div>
                                                        </motion.div>
                                                </motion.div>

                                                {/* Contact Form */}
                                                <motion.div
                                                        className="p-6 md:w-3/5"
                                                        variants={fadeInRight}
                                                        initial="initial"
                                                        animate="animate"
                                                >
                                                        <form onSubmit={handleSubmit} className="space-y-4">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div>
                                                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                                                                                        First Name *
                                                                                </label>
                                                                                <Input
                                                                                        id="firstName"
                                                                                        name="firstName"
                                                                                        value={formData.firstName}
                                                                                        onChange={handleChange}
                                                                                        onFocus={() => handleFocus("firstName")}
                                                                                        onBlur={handleBlur}
                                                                                        required
                                                                                        className={`w-full ${focusedField === "firstName" ? "ring-2 ring-[#0FA78E]" : ""}`}
                                                                                />
                                                                        </div>
                                                                        <div>
                                                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                                                                                        Last Name
                                                                                </label>
                                                                                <Input
                                                                                        id="lastName"
                                                                                        name="lastName"
                                                                                        value={formData.lastName}
                                                                                        onChange={handleChange}
                                                                                        onFocus={() => handleFocus("lastName")}
                                                                                        onBlur={handleBlur}
                                                                                        className={`w-full ${focusedField === "lastName" ? "ring-2 ring-[#0FA78E]" : ""}`}
                                                                                />
                                                                        </div>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div>
                                                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                                                                        Work Email *
                                                                                </label>
                                                                                <Input
                                                                                        id="email"
                                                                                        type="email"
                                                                                        name="email"
                                                                                        value={formData.email}
                                                                                        onChange={handleChange}
                                                                                        onFocus={() => handleFocus("email")}
                                                                                        onBlur={handleBlur}
                                                                                        required
                                                                                        className={`w-full ${focusedField === "email" ? "ring-2 ring-[#0FA78E]" : ""}`}
                                                                                />
                                                                        </div>
                                                                        <div>
                                                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                                                                                        Phone Number *
                                                                                </label>
                                                                                <Input
                                                                                        id="phone"
                                                                                        name="phone"
                                                                                        value={formData.phone}
                                                                                        onChange={handleChange}
                                                                                        onFocus={() => handleFocus("phone")}
                                                                                        onBlur={handleBlur}
                                                                                        required
                                                                                        className={`w-full ${focusedField === "phone" ? "ring-2 ring-[#0FA78E]" : ""}`}
                                                                                />
                                                                        </div>
                                                                </div>
                                                                <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                                                                                How can we help? *
                                                                        </label>
                                                                        <Textarea
                                                                                id="message"
                                                                                name="message"
                                                                                rows={4}
                                                                                value={formData.message}
                                                                                onChange={handleChange}
                                                                                onFocus={() => handleFocus("message")}
                                                                                onBlur={handleBlur}
                                                                                required
                                                                                className={`w-full ${focusedField === "message" ? "ring-2 ring-[#0FA78E]" : ""}`}
                                                                        />
                                                                </div>
                                                                <Button
                                                                        type="submit"
                                                                        disabled={isSubmitting}
                                                                        className="w-full bg-[#097362] hover:bg-[#0FA78E] text-white"
                                                                >
                                                                        {isSubmitting ? "Sending..." : "Submit Inquiry"}
                                                                </Button>

                                                                {showSuccess && (
                                                                        <motion.p
                                                                                className="text-sm text-green-600 text-center"
                                                                                initial={{ opacity: 0 }}
                                                                                animate={{ opacity: 1 }}
                                                                        >
                                                                                Thank you! Our team will respond within one business day.
                                                                        </motion.p>
                                                                )}
                                                        </form>
                                                </motion.div>
                                        </div>
                                </motion.div>
                        </div>
                </div>
        );
}
