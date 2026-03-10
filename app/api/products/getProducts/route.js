import { NextResponse } from "next/server";
import Product from '@/Models/Product';
import ProductCategory from '@/Models/ProductCategory';
import dbConnect from "@/lib/db";

export async function GET(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const searchRaw = url.searchParams.get("search") || "";
    const search = searchRaw.trim();
    const category = url.searchParams.get("category");

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate({
        path: "category",
        model: ProductCategory,
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("[PRODUCTS_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
