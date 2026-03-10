import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		excerpt: {
			type: String,
			required: true,
			maxLength: 300,
		},
		content: {
			type: String,
			required: true,
		},
		featuredImage: {
			type: String,
			default: "",
		},
		author: {
			type: String,
			required: true,
			default: "Admin",
		},
		status: {
			type: String,
			enum: ["draft", "published"],
			default: "draft",
		},
		tags: [
			{
				type: String,
				trim: true,
			},
		],
		category: {
			type: String,
			required: true,
		},
		readTime: {
			type: Number,
			default: 5,
		},
		publishedAt: {
			type: Date,
			default: null,
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

// Auto-generate slug from title if not provided
BlogSchema.pre("save", function (next) {
	if (!this.slug && this.title) {
		this.slug = this.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
	}

	// Set publishedAt when status changes to published
	if (this.status === "published" && !this.publishedAt) {
		this.publishedAt = new Date();
	}

	next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
