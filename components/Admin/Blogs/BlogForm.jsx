"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HtmlEditor from "@/components/Admin/Blogs/HtmlEditor.jsx";
import { X, Save } from "lucide-react";
import LoadingSpinner from "@/components/Admin/Blogs/LoadingSpinner.jsx";
import RichTextEditor from "@/components/Admin/Blogs/DynamicRichTextEditor.jsx";

const categories = [
	"Safety Equipment",
	"Road Safety",
	"Traffic Management",
	"Technology",
	"Safety Culture",
	"Safety",
	"Industry News",
	"Product Updates",
	"Case Studies",
	"Tutorials",
	"Company News",
];

export default function BlogForm({ blog = null, onClose, onSave }) {
	const [form, setForm] = useState({
		title: "",
		slug: "",
		excerpt: "",
		content: "",
		featuredImage: "",
		author: "Admin",
		status: "draft",
		tags: "",
		category: "",
		readTime: 5,
	});

	const [uploading, setUploading] = useState(false);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (blog) {
			setForm({
				title: blog.title || "",
				slug: blog.slug || "",
				excerpt: blog.excerpt || "",
				content: blog.content || "",
				featuredImage: blog.featuredImage || "",
				author: blog.author || "Admin",
				status: blog.status || "draft",
				tags: (blog.tags || []).join(", "),
				category: blog.category || "",
				readTime: blog.readTime || 5,
			});
		}
	}, [blog]);

	const generateSlug = (title) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
	};

	const handleTitleChange = (e) => {
		const title = e.target.value;
		setForm((prev) => ({
			...prev,
			title,
			slug: prev.slug || generateSlug(title),
		}));
	};

	const uploadFile = async (file) => {
		const fd = new FormData();
		fd.append("file", file);
		const res = await fetch("/api/upload", { method: "POST", body: fd });
		const data = await res.json();
		return data.url;
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		try {
			const url = await uploadFile(file);
			if (url) setForm((prev) => ({ ...prev, featuredImage: url }));
		} catch (error) {
			console.error("Upload failed:", error);
		} finally {
			setUploading(false);
		}
	};

	const handleContentChange = (content) => {
		setForm((prev) => ({ ...prev, content }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);

		try {
			const blogData = {
				...form,
				tags: form.tags
					.split(",")
					.map((tag) => tag.trim())
					.filter(Boolean),
			};

			const method = blog ? "PUT" : "POST";
			const url = blog ? `/api/blogs/${blog._id}` : "/api/blogs";

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(blogData),
			});

			if (res.ok) {
				const savedBlog = await res.json();
				onSave(savedBlog);
				onClose();
			}
		} catch (error) {
			console.error("Save failed:", error);
		} finally {
			setSaving(false);
		}
	};

	return (
		<motion.div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			>
				{/* Header */}
				<div className="bg-gradient-to-r from-[#097362] to-[#0FA78E] p-6 text-white">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold">
							{blog ? "Edit Blog" : "Create New Blog"}
						</h2>
						<button
							onClick={onClose}
							className="text-white/80 hover:text-white transition-colors"
						>
							<X className="h-6 w-6" />
						</button>
					</div>
				</div>

				{/* Form */}
				<div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Title and Slug */}
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<Label htmlFor="title" className="text-[#097362] font-medium">
									Title *
								</Label>
								<Input
									id="title"
									value={form.title}
									onChange={handleTitleChange}
									placeholder="Enter blog title"
									required
									className="mt-1 px-3 py-2"
								/>
							</div>
							<div>
								<Label htmlFor="slug" className="text-[#097362] font-medium">
									Slug *
								</Label>
								<Input
									id="slug"
									value={form.slug}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, slug: e.target.value }))
									}
									placeholder="blog-url-slug"
									required
									className="mt-1 px-3 py-2"
								/>
							</div>
						</div>

						{/* Category and Status */}
						<div className="grid md:grid-cols-3 gap-4">
							<div>
								<Label
									htmlFor="category"
									className="text-[#097362] font-medium"
								>
									Category *
								</Label>
								<select
									id="category"
									value={form.category}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, category: e.target.value }))
									}
									className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#097362] focus:border-transparent"
									required
								>
									<option value="">Select Category</option>
									{categories.map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</div>
							<div>
								<Label htmlFor="status" className="text-[#097362] font-medium">
									Status
								</Label>
								<select
									id="status"
									value={form.status}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, status: e.target.value }))
									}
									className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#097362] focus:border-transparent"
								>
									<option value="draft">Draft</option>
									<option value="published">Published</option>
								</select>
							</div>
							<div>
								<Label
									htmlFor="readTime"
									className="text-[#097362] font-medium"
								>
									Read Time (min)
								</Label>
								<Input
									id="readTime"
									type="number"
									value={form.readTime}
									onChange={(e) =>
										setForm((prev) => ({
											...prev,
											readTime: Number.parseInt(e.target.value) || 5,
										}))
									}
									min="1"
									className="mt-1 px-3 py-2"
								/>
							</div>
						</div>

						{/* Author and Tags */}
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<Label htmlFor="author" className="text-[#097362] font-medium">
									Author
								</Label>
								<Input
									id="author"
									value={form.author}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, author: e.target.value }))
									}
									placeholder="Author name"
									className="mt-1 px-3 py-2"
								/>
							</div>
							<div>
								<Label htmlFor="tags" className="text-[#097362] font-medium">
									Tags (comma separated)
								</Label>
								<Input
									id="tags"
									value={form.tags}
									onChange={(e) =>
										setForm((prev) => ({ ...prev, tags: e.target.value }))
									}
									placeholder="tag1, tag2, tag3"
									className="mt-1 px-3 py-2"
								/>
							</div>
						</div>

						{/* Featured Image */}
						<div>
							<Label
								htmlFor="featuredImage"
								className="text-[#097362] font-medium"
							>
								Featured Image
							</Label>
							<div className="mt-1 space-y-2">
								<Input
									id="featuredImage"
									type="file"
									accept="image/*"
									onChange={handleImageUpload}
									disabled={uploading}
									className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#097362] focus:border-transparent"
								/>
								{uploading && (
									<div className="flex items-center text-sm text-gray-500">
										<LoadingSpinner size="sm" className="mr-2" />
										Uploading...
									</div>
								)}
                                                                {form.featuredImage && (
                                                                        <div className="relative">
                                                                                <img src={form.featuredImage || "/placeholder.svg"} alt="Featured" className="w-32 h-20 object-cover rounded-lg border" />
                                                                        </div>
                                                                )}
							</div>
						</div>

						{/* Excerpt - short description */}
						<div>
							<Label htmlFor="excerpt" className="text-[#097362] font-medium">
								Excerpt *
							</Label>
							<Textarea
								id="excerpt"
								value={form.excerpt}
								onChange={(e) =>
									setForm((prev) => ({ ...prev, excerpt: e.target.value }))
								}
								placeholder="Brief description of the blog post (max 300 characters)"
								maxLength={300}
								rows={3}
								required
								className="mt-1"
							/>
							<div className="text-sm text-gray-500 mt-1">
								{form.excerpt.length}/300 characters
							</div>
						</div>

						{/* Rich Text Content Editor */}
						<div>
							<Label
								htmlFor="content"
								className="text-[#097362] font-medium mb-2 block"
							>
								Content *
							</Label>
							<RichTextEditor
								value={form.content}
								onChange={handleContentChange}
								placeholder="Write your blog content here..."
							/>
						</div>

						{/* Actions */}
						<div className="flex gap-3 justify-end pt-4 border-t">
							<Button
								type="button"
								variant="outline"
								onClick={onClose}
								disabled={saving}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="bg-gradient-to-r from-[#097362] to-[#0FA78E] text-white"
								disabled={saving}
							>
								{saving ? (
									<>
										<LoadingSpinner size="sm" className="mr-2" />
										Saving...
									</>
								) : (
									<>
										<Save className="h-4 w-4 mr-2" />
										{blog ? "Update" : "Create"} Blog
									</>
								)}
							</Button>
						</div>
					</form>
				</div>
			</motion.div>
		</motion.div>
	);
}
