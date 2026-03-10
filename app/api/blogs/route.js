import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import Blog from "@/Models/Blog.js";
import { requireAdmin } from "@/lib/auth.js";

export async function GET(req) {
	await dbConnect();
	const url = new URL(req.url);
	const status = url.searchParams.get("status");
	const category = url.searchParams.get("category");
	const slug = url.searchParams.get("slug");
	const page = Number.parseInt(url.searchParams.get("page")) || 1;
	const limit = Number.parseInt(url.searchParams.get("limit")) || 10;

	const filter = {};
	if (status) filter.status = status;
	if (category) filter.category = category;
	if (slug) filter.slug = slug;

	try {
		if (slug) {
			const blog = await Blog.findOne(filter);
			return NextResponse.json(blog);
		}

		const skip = (page - 1) * limit;
		const blogs = await Blog.find(filter)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		const total = await Blog.countDocuments(filter);

		return NextResponse.json({
			blogs,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching blogs", error: error.message },
			{ status: 500 }
		);
	}
}

export async function POST(req) {
	if (!requireAdmin()) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	await dbConnect();

	try {
		const body = await req.json();
		const blog = await Blog.create(body);
		return NextResponse.json(blog, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Error creating blog", error: error.message },
			{ status: 500 }
		);
	}
}
