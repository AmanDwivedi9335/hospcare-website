import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth";

// Force Node runtime
export const runtime = "nodejs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req) {
  console.log("➡️ Upload API called");

  try {
    // Verify Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error("❌ Missing Cloudinary configuration");
      return NextResponse.json({ error: "Missing Cloudinary configuration" }, { status: 500 });
    }
    console.log("✅ Cloudinary configuration verified");

    // Admin auth
    let admin;
    try {
      admin = await requireAdmin();
      if (!admin) throw new Error("Not authenticated");
      console.log("✅ Admin authenticated");
    } catch (authError) {
      console.error("❌ Auth error:", authError);
      return NextResponse.json({ error: "Authentication failed", details: authError.message }, { status: 401 });
    }

    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      console.error("❌ No file provided");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("📄 File details:", {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    });

    if (!file.type.startsWith("image/")) {
      console.error("❌ Invalid file type:", file.type);
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > 4 * 1024 * 1024) { // 4MB
      console.error(`❌ File too large: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    console.log("📤 Uploading to Cloudinary...");

    // Upload to Cloudinary
    let result;
    try {
      result = await cloudinary.uploader.upload(dataURI, {
        folder: "ladwa",
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
      });
      console.log("✅ Uploaded to Cloudinary:", result.secure_url);
    } catch (uploadError) {
      console.error("❌ Cloudinary upload failed:", uploadError);
      return NextResponse.json({ error: "Upload failed", details: uploadError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      size: result.bytes,
    });

  } catch (error) {
    console.error("❌ Unhandled error in POST:", error);
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}
