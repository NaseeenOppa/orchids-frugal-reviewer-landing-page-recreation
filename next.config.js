/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // ✅ Forces static export
  images: {
    unoptimized: true        // ✅ Required for static sites
  },
  trailingSlash: true        // ✅ Prevents routing issues on Vercel
};

module.exports = nextConfig;
