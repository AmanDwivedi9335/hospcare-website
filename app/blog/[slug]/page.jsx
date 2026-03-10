import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Blog from "@/Models/Blog";
import "./blog-styles.css";

export const dynamic = "force-dynamic";

async function getBlog(slug) {
        try {
                await dbConnect();
                const blog = await Blog.findOne({ slug, status: "published" }).lean();
                if (!blog) {
                        return null;
                }

                return {
                        ...blog,
                        _id: blog._id?.toString(),
                        createdAt: blog.createdAt?.toISOString() ?? null,
                        updatedAt: blog.updatedAt?.toISOString() ?? null,
                        publishedAt: blog.publishedAt?.toISOString() ?? null,
                };
        } catch (err) {
                console.error("Failed to load blog", err);
                return null;
        }
}

export async function generateMetadata({ params }) {
        const { slug } = await params;
        const blog = await getBlog(slug);
        if (!blog) {
                return {
                        title: "Blog Post Not Found",
                        description: "The requested LADWA insight could not be located.",
                };
        }

        return {
                title: `${blog.title} | LADWA Insights`,
                description: blog.excerpt?.slice(0, 150) || blog.title,
                alternates: { canonical: `/blog/${blog.slug}` },
        };
}

export default async function BlogDetailsPage({ params }) {
        const { slug } = params;
        const blog = await getBlog(slug);

        if (!blog) {
                notFound();
        }

        const publishDate = new Date(
                blog.publishedAt || blog.createdAt
        ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
        });

        return (
                <div className="min-h-screen bg-gray-50">
                        {/* Hero Section */}
                        <div className="relative h-96 w-full bg-gradient-to-br from-teal-600 to-teal-800 overflow-hidden">
                                {blog.featuredImage && (
                                        <Image
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                fill
                                                className="object-cover opacity-30"
                                        />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
                                <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col items-start justify-end pb-12">
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                                {blog.title}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-4 text-teal-100">
                                                <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                                                        </svg>
                                                        <span className="text-sm font-medium">{publishDate}</span>
                                                </div>
                                                <span className="text-teal-300">•</span>
                                                <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                                        </svg>
                                                        <span className="text-sm font-medium">{blog.author}</span>
                                                </div>
                                                <span className="text-teal-300">•</span>
                                                <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                                        clipRule="evenodd"
                                                                />
                                                        </svg>
                                                        <span className="text-sm font-medium">
                                                                {blog.readTime} min read
                                                        </span>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Breadcrumb */}
                        <div className="bg-white border-b border-gray-200">
                                <div className="max-w-7xl mx-auto px-6 py-4">
                                        <nav className="flex items-center gap-2 text-sm text-gray-600">
                                                <Link
                                                        href="/blog"
                                                        className="hover:text-teal-600 transition-colors"
                                                >
                                                        Blog
                                                </Link>
                                                <span>/</span>
                                                <span className="text-gray-900 font-medium">{blog.title}</span>
                                        </nav>
                                </div>
                        </div>

                        {/* Article Content */}
                        <article className="max-w-7xl mx-auto px-6 py-12">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
                                        <div
                                                className="blog-content"
                                                dangerouslySetInnerHTML={{ __html: blog.content }}
                                        />
                                </div>
                        </article>
                </div>
        );
}
