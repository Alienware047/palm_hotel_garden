/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // for static HTML export
  reactStrictMode: true,
  images: {
    unoptimized: true, // <-- disables Next.js image optimization
  },
   typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
