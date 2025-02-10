/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: false,
  async headers() {
    return [
      {
        source: '/api/:path*',  // Match all API routes
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ]
  },
  experimental: {
    // Disable fetch caching
    fetchCache: false,
  },
};

export default nextConfig;
