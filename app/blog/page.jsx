import Blogs from "@/components/Blog/Blog.jsx";

export const metadata = {
        title: "LADWA Blog | Safety Insights & Industry News",
        description:
                "Stay updated with expert commentary on workplace safety, regulatory changes, and innovation from LADWA's thought leaders.",
        keywords: "blog, industry news, safety, technology, innovation, LADWA",
        alternates: { canonical: "/blog" },
};

const BlogPage = () => {
        return (
                <div className="min-h-screen">
                        <Blogs />
                </div>
        );
};

export default BlogPage;
