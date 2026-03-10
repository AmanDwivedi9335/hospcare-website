import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import Blog from "@/Models/Blog.js";
import { requireAdmin } from "@/lib/auth.js";
import { revalidatePath } from "next/cache";

export async function GET(req, { params }) {
	const { id } = await params;
	await dbConnect();

	try {
		const blog = await Blog.findById(id);
		if (!blog) {
			return NextResponse.json({ message: "Blog not found" }, { status: 404 });
		}
		return NextResponse.json(blog);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching blog", error: error.message },
			{ status: 500 }
		);
	}
}

export async function PUT(req, { params }) {
	const { id } = await params;

	if (!requireAdmin()) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	await dbConnect();

	try {
		const body = await req.json();
		const blog = await Blog.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});

		if (!blog) {
			return NextResponse.json({ message: "Blog not found" }, { status: 404 });
		}

		// Revalidate relevant paths
		revalidatePath(`/blog/${blog.slug}`);
		revalidatePath("/blogs");
		revalidatePath("/admin/blogs");

		return NextResponse.json(blog);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error updating blog", error: error.message },
			{ status: 500 }
		);
	}
}

export async function DELETE(req, { params }) {
	const { id } = await params;

	if (!requireAdmin()) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	await dbConnect();

	try {
		const blog = await Blog.findByIdAndDelete(id);
		if (!blog) {
			return NextResponse.json({ message: "Blog not found" }, { status: 404 });
		}

		// Revalidate relevant paths
		revalidatePath("/blogs");
		revalidatePath("/admin/blogs");

		return NextResponse.json({ message: "Blog deleted successfully" });
	} catch (error) {
		return NextResponse.json(
			{ message: "Error deleting blog", error: error.message },
			{ status: 500 }
		);
	}
}
