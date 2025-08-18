/** @type {import('next').NextConfig} */
const nextConfig = {
  // SWC minification is now enabled by default in Next.js 15
  experimental: {
    // Enable modern features
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Ensure proper image optimization
  images: {
    unoptimized: false,
  },
  // Enable compression
  compress: true,
  // Ensure proper static generation
  trailingSlash: false,
};

module.exports = nextConfig;
