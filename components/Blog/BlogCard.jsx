"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Calendar,
	MessageCircle,
	ArrowRight,
	User,
	Clock,
	Tag,
} from "lucide-react";

const BlogCard = ({ blog, index }) => {
	const [isHovered, setIsHovered] = useState(false);

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const truncateText = (text, maxLength = 150) => {
		if (!text) return "";
		if (text.length <= maxLength) return text;
		return text.substr(0, maxLength) + "...";
	};

	const handleReadMore = () => {
		// Navigate to individual blog page
		window.location.href = `/blog/${blog.slug}`;
	};

	// Handle both database blogs and static blogs
	const blogData = {
		id: blog._id || blog.id,
		title: blog.title,
		description: blog.excerpt || blog.description,
		image:
			blog.featuredImage ||
			blog.image ||
			"/placeholder.svg?height=300&width=400",
		category: blog.category,
		date: blog.publishedAt || blog.createdAt || blog.date,
		comments: blog.comments || 0,
		author: blog.author || "Admin",
		readTime: blog.readTime || 5,
		tags: blog.tags || [],
		slug: blog.slug,
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
                        className="group cursor-pointer"
                >
                        <Card className="relative h-full overflow-hidden rounded-3xl border border-teal-100/70 bg-white/90 p-0 shadow-[0_25px_70px_-45px_rgba(9,115,98,0.45)] backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_35px_90px_-40px_rgba(9,115,98,0.6)]">
                                <div className="relative overflow-hidden">
                                        <motion.img
                                                src={blogData.image}
						alt={blogData.title}
						className="w-full h-64 object-cover"
						animate={{
							scale: isHovered ? 1.1 : 1,
						}}
						transition={{ duration: 0.6, ease: "easeOut" }}
					/>
					<motion.div
						className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
						animate={{
							opacity: isHovered ? 0.8 : 0.3,
						}}
						transition={{ duration: 0.3 }}
					/>
					<motion.div
						className="absolute top-4 left-4"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2 }}
					>
						<span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
							{blogData.category}
						</span>
					</motion.div>

					{/* Read Time Badge */}
					<motion.div
						className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.3 }}
					>
						<Clock className="h-3 w-3 text-teal-600 mr-1" />
						<span className="text-xs font-medium text-teal-600">
							{blogData.readTime} min
						</span>
					</motion.div>
				</div>

				<CardContent className="p-6 flex flex-col flex-grow">
					{/* Author and Date */}
					<motion.div
						className="flex items-center text-sm text-gray-500 mb-3 space-x-4"
						animate={{
							x: isHovered ? 5 : 0,
						}}
						transition={{ duration: 0.3 }}
					>
						<div className="flex items-center">
							<User className="h-4 w-4 mr-1" />
							<span>{blogData.author}</span>
						</div>
						<div className="flex items-center">
							<Calendar className="h-4 w-4 mr-1" />
							<span>{formatDate(blogData.date)}</span>
						</div>
					</motion.div>

					<motion.h3
						className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300 flex-grow"
						animate={{
							x: isHovered ? 5 : 0,
						}}
						transition={{ duration: 0.3 }}
					>
						{blogData.title}
					</motion.h3>

					<motion.p
						className="text-gray-600 mb-2 leading-relaxed flex-grow"
						animate={{
							x: isHovered ? 5 : 0,
						}}
						transition={{ duration: 0.3, delay: 0.05 }}
					>
						{truncateText(blogData.description)}
					</motion.p>

					{/* Tags */}
					{blogData.tags && blogData.tags.length > 0 && (
						<motion.div
							className="flex flex-wrap gap-2 mb-4"
							animate={{
								x: isHovered ? 5 : 0,
							}}
							transition={{ duration: 0.3, delay: 0.1 }}
						>
							{blogData.tags.slice(0, 3).map((tag, tagIndex) => (
								<span
									key={tagIndex}
									className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-teal-100 hover:text-teal-700 transition-colors duration-200"
								>
									<Tag className="h-3 w-3 mr-1" />
									{tag}
								</span>
							))}
							{blogData.tags.length > 3 && (
								<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
									+{blogData.tags.length - 3} more
								</span>
							)}
						</motion.div>
					)}

					<motion.div
						animate={{
							x: isHovered ? 5 : 0,
						}}
						transition={{ duration: 0.3, delay: 0.1 }}
					>
						<Button
							onClick={handleReadMore}
							variant="ghost"
							className="p-0 h-auto font-semibold text-teal-600 hover:text-teal-700 group/btn"
						>
							Read More
							<motion.div
								animate={{
									x: isHovered ? 5 : 0,
								}}
								transition={{ duration: 0.3 }}
							>
								<ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
							</motion.div>
						</Button>
					</motion.div>

					<motion.div
						className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100"
						animate={{
							y: isHovered ? -2 : 0,
						}}
						transition={{ duration: 0.3 }}
					>
						<div className="flex items-center text-gray-500 text-sm">
							<Calendar className="h-4 w-4 mr-2" />
							{formatDate(blogData.date)}
						</div>
						<div className="flex items-center text-gray-500 text-sm">
							<MessageCircle className="h-4 w-4 mr-2" />
							{blogData.comments} Comments
						</div>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default BlogCard;
