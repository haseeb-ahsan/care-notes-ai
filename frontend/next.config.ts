import type { NextConfig } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('check', BASE_URL);
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BASE_URL}/:path*`,
      },
    ];
  },
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
