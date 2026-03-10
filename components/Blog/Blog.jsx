"use client";

import {
        useState,
        useEffect,
        useMemo,
        useCallback,
        useRef,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
        Search,
        RefreshCw,
        ArrowRight,
        Sparkles,
} from "lucide-react";
import BlogCard from "@/components/Blog/BlogCard.jsx";
import LoadingSpinner from "@/components/Admin/Blogs/LoadingSpinner.jsx";
import BannerImg from "@/public/images/blog/banner.png";

const HERO_ORBS = [
        { top: "-18%", left: "-8%", size: "28rem", opacity: 0.28, duration: 24 },
        { bottom: "-26%", right: "-12%", size: "32rem", opacity: 0.22, duration: 28 },
        { top: "22%", right: "14%", size: "18rem", opacity: 0.3, duration: 20 },
];

const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
                opacity: 1,
                transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3,
                },
        },
};

const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
};

const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
        });
};

const truncateText = (text = "", maxLength = 160) =>
        text.length <= maxLength ? text : `${text.slice(0, maxLength)}…`;

const PLACEHOLDER_IMAGE = "/placeholder.svg?height=800&width=1200";

const Blogs = () => {
        const [selectedCategory, setSelectedCategory] = useState("All");
        const [searchTerm, setSearchTerm] = useState("");
        const [blogs, setBlogs] = useState([]);
        const [loading, setLoading] = useState(true);
        const [loadingMore, setLoadingMore] = useState(false);
        const [page, setPage] = useState(1);
        const [hasMore, setHasMore] = useState(true);
        const [categories, setCategories] = useState(["All"]);
        const [stats, setStats] = useState({ total: 0, published: 0 });
        const articlesRef = useRef(null);

        const scrollToArticles = useCallback(() => {
                articlesRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                });
        }, []);

        const fetchBlogs = useCallback(
                async (pageNum = 1, reset = false) => {
                        try {
                                if (pageNum === 1 || reset) setLoading(true);
                                else setLoadingMore(true);

                                const params = new URLSearchParams();
                                params.append("status", "published");
                                params.append("page", pageNum.toString());
                                params.append("limit", "6");

                                if (selectedCategory !== "All") {
                                        params.append("category", selectedCategory);
                                }

                                const res = await fetch(`/api/blogs?${params.toString()}`);
                                const data = await res.json();

                                if (res.ok) {
                                        const fetchedBlogs = data.blogs || [];
                                        const hasPagination =
                                                typeof data.pagination?.pages === "number" &&
                                                typeof data.pagination?.page === "number";
                                        const moreAvailable = hasPagination
                                                ? data.pagination.page < data.pagination.pages
                                                : fetchedBlogs.length >= 6;

                                        setHasMore(moreAvailable);
                                        setPage(pageNum);
                                        setStats({
                                                total: data.pagination?.total || fetchedBlogs.length,
                                                published: data.pagination?.total || fetchedBlogs.length,
                                        });

                                        setBlogs((prevBlogs) => {
                                                const shouldReset = reset || pageNum === 1;
                                                const updatedBlogs = shouldReset
                                                        ? fetchedBlogs
                                                        : [...prevBlogs, ...fetchedBlogs];

                                                const uniqueCategories = [
                                                        "All",
                                                        ...new Set(
                                                                updatedBlogs
                                                                        .map((blog) => blog.category)
                                                                        .filter(Boolean)
                                                        ),
                                                ];
                                                setCategories(uniqueCategories);

                                                return updatedBlogs;
                                        });
                                }
                        } catch (error) {
                                console.error("Failed to fetch blogs:", error);
                        } finally {
                                setLoading(false);
                                setLoadingMore(false);
                        }
                },
                [selectedCategory]
        );

        useEffect(() => {
                        fetchBlogs(1, true);
        }, [fetchBlogs]);

        const filteredBlogs = useMemo(() => {
                const search = searchTerm.toLowerCase();
                return blogs.filter((blog) => {
                        const title = blog.title?.toLowerCase() || "";
                        const excerpt = blog.excerpt?.toLowerCase() || "";
                        const author = blog.author?.toLowerCase() || "";
                        const tags = Array.isArray(blog.tags)
                                ? blog.tags.map((tag) => tag.toLowerCase())
                                : [];

                        return (
                                title.includes(search) ||
                                excerpt.includes(search) ||
                                author.includes(search) ||
                                tags.some((tag) => tag.includes(search))
                        );
                });
        }, [blogs, searchTerm]);

        const featuredBlog = filteredBlogs[0];
        const otherBlogs = featuredBlog ? filteredBlogs.slice(1) : filteredBlogs;

        const highlightedTags = useMemo(() => {
                const counts = new Map();
                blogs.forEach((blog) => {
                        (blog.tags || []).forEach((tag) => {
                                if (!tag) return;
                                const normalised = tag.trim();
                                if (!normalised) return;
                                counts.set(
                                        normalised,
                                        (counts.get(normalised) || 0) + 1
                                );
                        });
                });
                return Array.from(counts.entries())
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 8)
                        .map(([tag]) => tag);
        }, [blogs]);

        const trendingCategories = useMemo(() => {
                const counts = new Map();
                blogs.forEach((blog) => {
                        if (!blog.category) return;
                        counts.set(
                                blog.category,
                                (counts.get(blog.category) || 0) + 1
                        );
                });

                if (counts.size === 0) {
                        return categories
                                .filter((category) => category !== "All")
                                .slice(0, 4)
                                .map((name) => ({ name, count: 0 }));
                }

                return Array.from(counts.entries())
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 4)
                        .map(([name, count]) => ({ name, count }));
        }, [blogs, categories]);

        const averageReadTime = useMemo(() => {
                if (blogs.length === 0) return 0;
                const total = blogs.reduce(
                        (acc, blog) => acc + (Number.parseInt(blog.readTime, 10) || 5),
                        0
                );
                return Math.max(1, Math.round(total / blogs.length));
        }, [blogs]);

        const heroStats = useMemo(
                () => [
                        {
                                label: "Published articles",
                                value: stats.published,
                                description: "Curated insights from LADWA experts",
                        },
                        {
                                label: "Categories to explore",
                                value: Math.max(categories.length - 1, 0),
                                description: "Covering safety, innovation & more",
                        },
                        {
                                label: "Avg. reading time",
                                value: averageReadTime ? `${averageReadTime} min` : "—",
                                description: "Digestible stories tailored for you",
                        },
                ],
                [stats.published, categories.length, averageReadTime]
        );

        const handleLoadMore = () => {
                if (!loadingMore && hasMore) {
                        fetchBlogs(page + 1, false);
                }
        };

        const handleRefresh = () => {
                setPage(1);
                fetchBlogs(1, true);
        };

        const handleCategoryChange = (category) => {
                setSelectedCategory(category);
                setPage(1);
                setSearchTerm("");
                scrollToArticles();
        };

        const handleTagClick = useCallback(
                (tag) => {
                        setSelectedCategory("All");
                        setSearchTerm(tag);
                        scrollToArticles();
                },
                [scrollToArticles]
        );

        const featuredImage =
                featuredBlog?.featuredImage ||
                featuredBlog?.image ||
                PLACEHOLDER_IMAGE;

        return (
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
                        {/* Hero Section */}
                        <motion.section
                                className="relative overflow-hidden py-28"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                        >
                                <div className="absolute inset-0">
                                        <Image
                                                src={BannerImg || PLACEHOLDER_IMAGE}
                                                alt="LADWA Safety Insights"
                                                className="h-full w-full object-cover"
                                                priority
                                                fill
                                        />
                                </div>

                                <div className="absolute inset-0 bg-[#04110E]/75" />

                                {HERO_ORBS.map((orb, index) => (
                                        <motion.div
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={index}
                                                className="absolute rounded-full bg-gradient-to-br from-teal-400/30 via-emerald-400/25 to-teal-200/30 blur-3xl"
                                                style={{
                                                        top: orb.top,
                                                        left: orb.left,
                                                        right: orb.right,
                                                        bottom: orb.bottom,
                                                        width: orb.size,
                                                        height: orb.size,
                                                        opacity: orb.opacity,
                                                }}
                                                animate={{
                                                        scale: [1, 1.08, 1],
                                                        opacity: [orb.opacity, orb.opacity + 0.05, orb.opacity],
                                                }}
                                                transition={{
                                                        duration: orb.duration,
                                                        repeat: Number.POSITIVE_INFINITY,
                                                        ease: "easeInOut",
                                                }}
                                        />
                                ))}

                                <div className="relative z-20">
                                        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 text-white">
                                                <motion.div
                                                        variants={containerVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        className="max-w-4xl"
                                                >
                                                        <motion.div
                                                                variants={itemVariants}
                                                                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-white/70 backdrop-blur"
                                                        >
                                                                <Sparkles className="h-4 w-4 text-teal-200" />
                                                                Knowledge Hub
                                                        </motion.div>
                                                        <motion.h1
                                                                variants={itemVariants}
                                                                className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl"
                                                        >
                                                                Stories that Illuminate Safer Possibilities
                                                        </motion.h1>
                                                        <motion.p
                                                                variants={itemVariants}
                                                                className="mt-4 text-lg text-white/80 md:text-xl"
                                                        >
                                                                Discover expert perspectives, best practices, and emerging trends
                                                                shaping the future of safety, technology, and innovation at LADWA.
                                                        </motion.p>
                                                </motion.div>

                                                <motion.div
                                                        className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.7, delay: 0.2 }}
                                                >
                                                        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                                                                <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                                                                        Search our stories
                                                                </label>
                                                                <div className="relative mt-4">
                                                                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                                                                        <input
                                                                                type="text"
                                                                                placeholder="Search by topic, author, or keyword"
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                                className="w-full rounded-2xl border border-white/20 bg-white/95 px-12 py-4 text-base text-gray-900 shadow-xl placeholder:text-gray-500 focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-300/60"
                                                                        />
                                                                </div>
                                                                {highlightedTags.length > 0 && (
                                                                        <div className="mt-5 flex flex-wrap gap-2">
                                                                                {highlightedTags.map((tag) => (
                                                                                        <button
                                                                                                key={tag}
                                                                                                type="button"
                                                                                                onClick={() => handleTagClick(tag)}
                                                                                                className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/25"
                                                                                        >
                                                                                                #{tag}
                                                                                        </button>
                                                                                ))}
                                                                        </div>
                                                                )}
                                                                <p className="mt-6 text-sm text-white/70">
                                                                        Tip: choose a tag above to jump directly to curated stories.
                                                                </p>
                                                        </div>

                                                        <div className="grid gap-4 sm:grid-cols-2">
                                                                {heroStats.map((stat) => (
                                                                        <motion.div
                                                                                key={stat.label}
                                                                                whileHover={{ y: -6 }}
                                                                                className="rounded-3xl border border-white/15 bg-white/10 p-6 text-white shadow-[0_25px_60px_-30px_rgba(10,140,120,0.8)] backdrop-blur-xl"
                                                                        >
                                                                                <p className="text-[0.7rem] uppercase tracking-[0.4em] text-white/50">
                                                                                        {stat.label}
                                                                                </p>
                                                                                <p className="mt-3 text-3xl font-semibold text-white">
                                                                                        {stat.value}
                                                                                </p>
                                                                                <p className="mt-2 text-sm text-white/70">{stat.description}</p>
                                                                        </motion.div>
                                                                ))}
                                                        </div>
                                                </motion.div>

                                                <motion.div
                                                        className="flex flex-wrap items-center gap-3"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.6, delay: 0.4 }}
                                                >
                                                        <Button
                                                                onClick={scrollToArticles}
                                                                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50"
                                                        >
                                                                Explore articles
                                                        </Button>
                                                        <Button
                                                                variant="outline"
                                                                onClick={handleRefresh}
                                                                disabled={loading}
                                                                className="rounded-full border-white/40 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/20"
                                                        >
                                                                <RefreshCw
                                                                        className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                                                                />
                                                                Refresh feed
                                                        </Button>
                                                </motion.div>
                                        </div>
                                </div>
                        </motion.section>

                        {/* Category Filter */}
                        <motion.section
                                ref={articlesRef}
                                className="px-6 pb-12"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                        >
                                <div className="mx-auto max-w-6xl">
                                        <div className="rounded-3xl border border-gray-200/70 bg-white/80 p-6 shadow-[0_30px_80px_-50px_rgba(9,115,98,0.6)] backdrop-blur">
                                                <div className="flex flex-wrap justify-center gap-3">
                                                        {categories.map((category, index) => (
                                                                <motion.button
                                                                        key={category}
                                                                        onClick={() => handleCategoryChange(category)}
                                                                        className={`relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                                                                                selectedCategory === category
                                                                                        ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-200/70"
                                                                                        : "border border-gray-200 bg-white text-gray-700 hover:border-teal-400/60 hover:text-teal-600"
                                                                        }`}
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        initial={{ opacity: 0, y: 10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: index * 0.05 }}
                                                                        disabled={loading}
                                                                >
                                                                        {category}
                                                                </motion.button>
                                                        ))}
                                                </div>
                                        </div>
                                </div>
                        </motion.section>

                        {/* Articles & Featured */}
                        <motion.section
                                className="px-6 pb-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                        >
                                <div className="mx-auto max-w-6xl">
                                        {loading ? (
                                                <div className="flex flex-col items-center justify-center rounded-3xl border border-teal-100/60 bg-white/80 py-24 shadow-[0_30px_90px_-60px_rgba(9,115,98,0.55)] backdrop-blur">
                                                        <LoadingSpinner size="lg" className="mb-6" />
                                                        <motion.p
                                                                className="text-lg text-gray-600"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                        >
                                                                Curating our latest insights for you...
                                                        </motion.p>
                                                </div>
                                        ) : filteredBlogs.length === 0 ? (
                                                <motion.div
                                                        className="rounded-3xl border border-dashed border-teal-200 bg-white/90 p-16 text-center shadow-[0_30px_80px_-65px_rgba(9,115,98,0.6)]"
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                >
                                                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-teal-50 text-teal-500">
                                                                <Search className="h-10 w-10" />
                                                        </div>
                                                        <h3 className="text-2xl font-bold text-gray-800">No articles found</h3>
                                                        <p className="mt-3 text-gray-600">
                                                                {searchTerm
                                                                        ? `We couldn't find "${searchTerm}". Try a different keyword or explore popular categories.`
                                                                        : "We're shaping fresh stories for you. Check back soon for more insights."}
                                                        </p>
                                                        {searchTerm && (
                                                                <Button
                                                                        onClick={() => setSearchTerm("")}
                                                                        className="mt-6 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-3 text-white"
                                                                >
                                                                        Clear search
                                                                </Button>
                                                        )}
                                                </motion.div>
                                        ) : (
                                                <div className="space-y-12">
                                                        {featuredBlog && (
                                                                <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                                                                        <Link
                                                                                href={`/blog/${featuredBlog.slug}`}
                                                                                className="group relative block h-full"
                                                                        >
                                                                                <motion.article
                                                                                        whileHover={{ y: -6 }}
                                                                                        className="relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-teal-100/60 bg-gray-900 text-white shadow-[0_40px_90px_-50px_rgba(4,65,57,0.8)]"
                                                                                >
                                                                                        <Image
                                                                                                src={featuredImage}
                                                                                                alt={featuredBlog.title}
                                                                                                fill
                                                                                                className="object-cover"
                                                                                                sizes="(min-width: 1024px) 60vw, 100vw"
                                                                                        />
                                                                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/55 to-teal-900/45" />
                                                                                        <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
                                                                                                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-teal-200">
                                                                                                        {featuredBlog.category && (
                                                                                                                <span className="rounded-full bg-white/15 px-3 py-1 text-white">
                                                                                                                        {featuredBlog.category}
                                                                                                                </span>
                                                                                                        )}
                                                                                                        <span className="text-white/70">
                                                                                                                {formatDate(
                                                                                                                        featuredBlog.publishedAt ||
                                                                                                                                featuredBlog.createdAt ||
                                                                                                                                featuredBlog.date
                                                                                                                )}
                                                                                                        </span>
                                                                                                </div>
                                                                                                <div>
                                                                                                        <h2 className="text-3xl font-semibold leading-tight transition-transform duration-300 group-hover:translate-x-1 md:text-4xl">
                                                                                                                {featuredBlog.title}
                                                                                                        </h2>
                                                                                                        <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
                                                                                                                {truncateText(
                                                                                                                        featuredBlog.excerpt || featuredBlog.description,
                                                                                                                        220
                                                                                                                )}
                                                                                                        </p>
                                                                                                </div>
                                                                                                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-[0.35em] text-teal-100">
                                                                                                        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 transition group-hover:bg-white/25">
                                                                                                                Read story
                                                                                                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                                                                        </span>
                                                                                                        <span className="text-white/70">
                                                                                                                {featuredBlog.author || "Admin"} • {featuredBlog.readTime || 5} min read
                                                                                                        </span>
                                                                                                </div>
                                                                                        </div>
                                                                                </motion.article>
                                                                        </Link>
                                                                        <div className="space-y-6">
                                                                                <div className="rounded-3xl border border-teal-100/60 bg-white/80 p-6 shadow-[0_30px_80px_-60px_rgba(9,115,98,0.55)]">
                                                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                                                                Trending categories
                                                                                        </h3>
                                                                                        <p className="mt-1 text-sm text-gray-600">
                                                                                                Discover what our readers explore the most this week.
                                                                                        </p>
                                                                                        <div className="mt-5 space-y-4">
                                                                                                {trendingCategories.map((item, index) => {
                                                                                                        const percentage = stats.total
                                                                                                                ? Math.min(
                                                                                                                          100,
                                                                                                                          Math.round(
                                                                                                                                  (item.count / stats.total) *
                                                                                                                                          100
                                                                                                                          )
                                                                                                                  )
                                                                                                                : item.count > 0
                                                                                                                        ? 100
                                                                                                                        : 20;
                                                                                                        return (
                                                                                                                <div
                                                                                                                        key={item.name || index}
                                                                                                                        className="relative overflow-hidden rounded-2xl border border-teal-100/70 bg-white/90 p-4"
                                                                                                                >
                                                                                                                        <div className="flex items-center justify-between">
                                                                                                                                <div>
                                                                                                                                        <p className="text-xs uppercase tracking-[0.35em] text-teal-500">
                                                                                                                                                Category
                                                                                                                                        </p>
                                                                                                                                        <p className="mt-1 text-lg font-semibold text-gray-800">
                                                                                                                                                {item.name || "—"}
                                                                                                                                        </p>
                                                                                                                                </div>
                                                                                                                                <span className="text-2xl font-bold text-teal-500">
                                                                                                                                        {item.count}
                                                                                                                                </span>
                                                                                                                        </div>
                                                                                                                        <div className="mt-3 h-2 rounded-full bg-teal-100/60">
                                                                                                                                <div
                                                                                                                                        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
                                                                                                                                        style={{ width: `${Math.max(12, percentage)}%` }}
                                                                                                                                />
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                        );
                                                                                                })}
                                                                                        </div>
                                                                                </div>
                                                                                {highlightedTags.length > 0 && (
                                                                                        <div className="rounded-3xl border border-teal-100/60 bg-white/80 p-6 shadow-[0_30px_80px_-60px_rgba(9,115,98,0.55)]">
                                                                                                <h3 className="text-lg font-semibold text-gray-900">
                                                                                                        Popular tags
                                                                                                </h3>
                                                                                                <p className="mt-1 text-sm text-gray-600">
                                                                                                        Jump straight into the conversations that matter most.
                                                                                                </p>
                                                                                                <div className="mt-4 flex flex-wrap gap-2">
                                                                                                        {highlightedTags.map((tag) => (
                                                                                                                <button
                                                                                                                        key={`sidebar-${tag}`}
                                                                                                                        type="button"
                                                                                                                        onClick={() => handleTagClick(tag)}
                                                                                                                        className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700 transition hover:bg-teal-100"
                                                                                                                >
                                                                                                                        #{tag}
                                                                                                                </button>
                                                                                                        ))}
                                                                                                </div>
                                                                                        </div>
                                                                                )}
                                                                        </div>
                                                                </div>
                                                        )}

                                                        {otherBlogs.length > 0 && (
                                                                <motion.div
                                                                        className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
                                                                        variants={containerVariants}
                                                                        initial="hidden"
                                                                        animate="visible"
                                                                >
                                                                        {otherBlogs.map((blog, index) => (
                                                                                <BlogCard
                                                                                        key={blog._id || blog.id || `${blog.slug}-${index}`}
                                                                                        blog={blog}
                                                                                        index={index}
                                                                                />
                                                                        ))}
                                                                </motion.div>
                                                        )}
                                                </div>
                                        )}

                                        {!loading && filteredBlogs.length > 0 && hasMore && !searchTerm && (
                                                <motion.div
                                                        className="mt-14 text-center"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.6, delay: 0.2 }}
                                                >
                                                        <Button
                                                                onClick={handleLoadMore}
                                                                disabled={loadingMore}
                                                                size="lg"
                                                                className="rounded-full bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 px-10 py-4 text-lg font-semibold text-white shadow-lg hover:from-teal-700 hover:via-emerald-600 hover:to-teal-700"
                                                        >
                                                                {loadingMore ? (
                                                                        <>
                                                                                <LoadingSpinner size="sm" className="mr-3" />
                                                                                Loading more stories...
                                                                        </>
                                                                ) : (
                                                                        "Load more stories"
                                                                )}
                                                        </Button>
                                                </motion.div>
                                        )}

                                        {!loading && (
                                                <motion.div
                                                        className="mt-10 text-center text-sm text-gray-600"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                >
                                                        {searchTerm && (
                                                                <p>
                                                                        Showing {filteredBlogs.length} result
                                                                        {filteredBlogs.length !== 1 ? "s" : ""} for "{searchTerm}"
                                                                </p>
                                                        )}
                                                        {selectedCategory !== "All" && !searchTerm && (
                                                                <p>
                                                                        Showing {filteredBlogs.length} article
                                                                        {filteredBlogs.length !== 1 ? "s" : ""} in {selectedCategory}
                                                                </p>
                                                        )}
                                                </motion.div>
                                        )}
                                </div>
                        </motion.section>

                        {/* Newsletter Section */}
                        <motion.section
                                className="px-6 pb-24"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                        >
                                <div className="mx-auto max-w-5xl">
                                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-500 p-10 text-white shadow-[0_35px_90px_-55px_rgba(7,115,98,0.75)]">
                                                <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
                                                <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                                                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
                                                        <div>
                                                                <h2 className="text-3xl font-bold md:text-4xl">
                                                                        Stay ahead with insider updates
                                                                </h2>
                                                                <p className="mt-3 text-teal-100">
                                                                        Subscribe to receive expert tips, safety best practices, and product news straight to your inbox.
                                                                </p>
                                                        </div>
                                                        <form className="flex flex-col gap-4 sm:flex-row">
                                                                <input
                                                                        type="email"
                                                                        placeholder="Enter your email"
                                                                        className="w-full rounded-full border border-white/30 bg-white/15 px-6 py-3 text-white placeholder:text-teal-100/80 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                                                                />
                                                                <Button className="rounded-full bg-white px-6 py-3 text-base font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50">
                                                                        Subscribe
                                                                </Button>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </motion.section>
                </div>
        );
};

export default Blogs;
