/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    // Disable Next.js image optimization for remote images
    // to avoid issues with domains not being properly resolved
    unoptimized: true,
  },
};

export default nextConfig;
