"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Calendar, User, Tag, Clock } from "lucide-react";

export default function BlogCard({ blog, onEdit, onDelete, onView }) {
	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const getStatusColor = (status) => {
		return status === "published"
			? "bg-green-100 text-green-800 border-green-200"
			: "bg-yellow-100 text-yellow-800 border-yellow-200";
	};

	return (
		<motion.div
			className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
			whileHover={{ y: -5, scale: 1.02 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			{/* Featured Image */}
                        {blog.featuredImage && (
                                <div className="relative h-48 overflow-hidden">
                                        <img src={blog.featuredImage || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
					<div className="absolute top-3 right-3">
						<span
							className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
								blog.status
							)}`}
						>
							{blog.status}
						</span>
					</div>
				</div>
			)}

			{/* Content */}
			<div className="p-6">
				{/* Category */}
				<div className="flex items-center mb-2">
					<Tag className="h-4 w-4 text-[#097362] mr-1" />
					<span className="text-sm font-medium text-[#097362]">
						{blog.category}
					</span>
				</div>

				{/* Title */}
				<h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
					{blog.title}
				</h3>

				{/* Excerpt */}
				<p className="text-gray-600 text-sm mb-4 line-clamp-3">
					{blog.excerpt}
				</p>

				{/* Meta Info */}
				<div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
					<div className="flex items-center">
						<User className="h-3 w-3 mr-1" />
						{blog.author}
					</div>
					<div className="flex items-center">
						<Calendar className="h-3 w-3 mr-1" />
						{formatDate(blog.createdAt)}
					</div>
					<div className="flex items-center">
						<Clock className="h-3 w-3 mr-1" />
						{blog.readTime} min read
					</div>
				</div>

				{/* Tags */}
				{blog.tags && blog.tags.length > 0 && (
					<div className="flex flex-wrap gap-1 mb-4">
						{blog.tags.slice(0, 3).map((tag, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
							>
								{tag}
							</span>
						))}
						{blog.tags.length > 3 && (
							<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
								+{blog.tags.length - 3} more
							</span>
						)}
					</div>
				)}

				{/* Actions */}
				<div className="flex gap-2">
					<Button
						size="sm"
						variant="outline"
						onClick={() => onView(blog)}
						className="flex-1"
					>
						<Eye className="h-4 w-4 mr-1" />
						View
					</Button>
					<Button
						size="sm"
						onClick={() => onEdit(blog)}
						className="flex-1 bg-[#097362] hover:bg-[#0FA78E]"
					>
						<Edit className="h-4 w-4 mr-1" />
						Edit
					</Button>
					<Button
						size="sm"
						variant="destructive"
						onClick={() => onDelete(blog)}
						className="flex-1"
					>
						<Trash2 className="h-4 w-4 mr-1" />
						Delete
					</Button>
				</div>
			</div>
		</motion.div>
	);
}
