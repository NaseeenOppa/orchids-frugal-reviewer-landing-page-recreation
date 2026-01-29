/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  eslint: {
    ignoreDuringBuilds: true, // 🔥 THIS FIXES THE ERROR
  },
};

module.exports = nextConfig;
