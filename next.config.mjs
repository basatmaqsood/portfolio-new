/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
    unoptimized: true,
  },
  // Add performance optimizations
  swcMinify: true,
  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production',
  },
  // Removed the experimental.optimizeCss option that was causing the error
};

export default nextConfig;
