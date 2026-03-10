"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw } from "lucide-react";
import BlogCard from "@/components/Admin/Blogs/BlogCard.jsx";
import BlogForm from "@/components/Admin/Blogs/BlogForm.jsx";
import ConfirmDialog from "@/components/Admin/Blogs/ConfirmDialog.jsx";
import LoadingSpinner from "@/components/Admin/Blogs/LoadingSpinner.jsx";

const categories = [
	"All",
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

const statuses = ["All", "draft", "published"];

export default function BlogDashboard() {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [showForm, setShowForm] = useState(false);
	const [editingBlog, setEditingBlog] = useState(null);
	const [deleteDialog, setDeleteDialog] = useState({ show: false, blog: null });
	const [stats, setStats] = useState({
		total: 0,
		published: 0,
		drafts: 0,
	});

	const fetchBlogs = async () => {
		setLoading(true);
		try {
			const params = new URLSearchParams();
			if (selectedStatus !== "All") params.append("status", selectedStatus);
			if (selectedCategory !== "All")
				params.append("category", selectedCategory);

			const res = await fetch(`/api/blogs?${params}`);
			const data = await res.json();
			setBlogs(data.blogs || []);

			// Calculate stats
			const total = data.blogs?.length || 0;
			const published =
				data.blogs?.filter((b) => b.status === "published").length || 0;
			const drafts =
				data.blogs?.filter((b) => b.status === "draft").length || 0;
			setStats({ total, published, drafts });
		} catch (error) {
			console.error("Failed to fetch blogs:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, [selectedCategory, selectedStatus]);

	const filteredBlogs = blogs.filter(
		(blog) =>
			blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
			blog.author.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleCreateBlog = () => {
		setEditingBlog(null);
		setShowForm(true);
	};

	const handleEditBlog = (blog) => {
		setEditingBlog(blog);
		setShowForm(true);
	};

	const handleDeleteBlog = (blog) => {
		setDeleteDialog({ show: true, blog });
	};

	const confirmDelete = async () => {
		if (!deleteDialog.blog) return;

		try {
			const res = await fetch(`/api/blogs/${deleteDialog.blog._id}`, {
				method: "DELETE",
			});

			if (res.ok) {
				await fetchBlogs();
				setDeleteDialog({ show: false, blog: null });
			}
		} catch (error) {
			console.error("Failed to delete blog:", error);
		}
	};

	const handleSaveBlog = async () => {
		await fetchBlogs();
	};

	const handleViewBlog = (blog) => {
		// Open blog in new tab
		window.open(`/blog/${blog.slug}`, "_blank");
	};

	return (
		<div className="max-w-7xl mx-auto p-6">
			{/* Header */}
			<motion.div
				className="mb-8"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Blog Dashboard
						</h1>
						<p className="text-gray-600">Manage your blog posts and content</p>
					</div>
					<Button
						onClick={handleCreateBlog}
						className="bg-gradient-to-r from-[#097362] to-[#0FA78E] text-white mt-4 md:mt-0"
					>
						<Plus className="h-4 w-4 mr-2" />
						Create New Blog
					</Button>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<motion.div
						className="bg-white border-2 border-[#097362] rounded-xl p-4"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
					>
						<div className="text-2xl font-bold text-[#097362]">
							{stats.total}
						</div>
						<div className="text-sm text-gray-600">Total Blogs</div>
					</motion.div>
					<motion.div
						className="bg-white border-2 border-green-500 rounded-xl p-4"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
					>
						<div className="text-2xl font-bold text-green-600">
							{stats.published}
						</div>
						<div className="text-sm text-gray-600">Published</div>
					</motion.div>
					<motion.div
						className="bg-white border-2 border-yellow-500 rounded-xl p-4"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
					>
						<div className="text-2xl font-bold text-yellow-600">
							{stats.drafts}
						</div>
						<div className="text-sm text-gray-600">Drafts</div>
					</motion.div>
				</div>

				{/* Filters */}
				<div className="bg-white border-2 border-gray-100 rounded-xl p-4">
					<div className="flex flex-col md:flex-row gap-4">
						{/* Search */}
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								placeholder="Search blogs..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>

						{/* Category Filter */}
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#097362] focus:border-transparent"
						>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>

						{/* Status Filter */}
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#097362] focus:border-transparent"
						>
							{statuses.map((status) => (
								<option key={status} value={status}>
									{status === "All"
										? "All Status"
										: status.charAt(0).toUpperCase() + status.slice(1)}
								</option>
							))}
						</select>

						{/* Refresh Button */}
						<Button variant="outline" onClick={fetchBlogs} disabled={loading}>
							<RefreshCw
								className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
							/>
						</Button>
					</div>
				</div>
			</motion.div>

			{/* Blog Grid */}
			{loading ? (
				<div className="flex justify-center items-center py-12">
					<LoadingSpinner size="lg" />
				</div>
			) : filteredBlogs.length === 0 ? (
				<motion.div
					className="text-center py-12"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
				>
					<div className="text-gray-400 mb-4">
						<Search className="h-16 w-16 mx-auto mb-4" />
					</div>
					<h3 className="text-xl font-semibold text-gray-600 mb-2">
						No blogs found
					</h3>
					<p className="text-gray-500 mb-6">
						{searchTerm ||
						selectedCategory !== "All" ||
						selectedStatus !== "All"
							? "Try adjusting your search or filters"
							: "Create your first blog post to get started"}
					</p>
					{!searchTerm &&
						selectedCategory === "All" &&
						selectedStatus === "All" && (
							<Button
								onClick={handleCreateBlog}
								className="bg-gradient-to-r from-[#097362] to-[#0FA78E] text-white"
							>
								<Plus className="h-4 w-4 mr-2" />
								Create Your First Blog
							</Button>
						)}
				</motion.div>
			) : (
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
				>
					<AnimatePresence>
						{filteredBlogs.map((blog) => (
							<BlogCard
								key={blog._id}
								blog={blog}
								onEdit={handleEditBlog}
								onDelete={handleDeleteBlog}
								onView={handleViewBlog}
							/>
						))}
					</AnimatePresence>
				</motion.div>
			)}

			{/* Blog Form Modal */}
			<AnimatePresence>
				{showForm && (
					<BlogForm
						blog={editingBlog}
						onClose={() => setShowForm(false)}
						onSave={handleSaveBlog}
					/>
				)}
			</AnimatePresence>

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				isOpen={deleteDialog.show}
				onClose={() => setDeleteDialog({ show: false, blog: null })}
				onConfirm={confirmDelete}
				title="Delete Blog Post"
				message={`Are you sure you want to delete "${deleteDialog.blog?.title}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				type="danger"
			/>
		</div>
	);
}
