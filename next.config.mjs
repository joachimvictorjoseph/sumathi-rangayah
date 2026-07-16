/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Seed data uses Unsplash cover photos. When Sanity is enabled, its CDN
    // (cdn.sanity.io) is also whitelisted so uploaded covers render.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
