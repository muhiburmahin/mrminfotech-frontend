import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/case-studies/:slug',
        destination: '/projects/:slug',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const backend = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api/v1').replace(/\/api\/v1\/?$/, '');
    return [
      {
        source: '/uploads/:path*',
        destination: `${backend}/uploads/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination: `${backend}/api/v1/:path*`,
      },
      {
        source: '/api/auth/:path*',
        destination: `${backend}/api/v1/auth/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${backend}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(favicon.ico|favicon-32x32.png|logo.png|logo-icon.png|logo.svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
