import type { NextConfig } from "next";

type RemotePatterns = NonNullable<NonNullable<NextConfig['images']>['remotePatterns']>;

/**
 * Hosts that next/image may optimise. The API/uploads host is derived from the environment so staging and
 * production work without code changes; Cloudinary is the configured media provider.
 */
function remoteImagePatterns(): RemotePatterns {
  const patterns: RemotePatterns = [{ protocol: 'https', hostname: 'res.cloudinary.com' }];
  for (const raw of [process.env.NEXT_PUBLIC_API_URL, process.env.NEXT_PUBLIC_SITE_URL]) {
    if (!raw) continue;
    try {
      const url = new URL(raw);
      patterns.push({
        protocol: url.protocol === 'http:' ? 'http' : 'https',
        hostname: url.hostname,
        ...(url.port ? { port: url.port } : {}),
      });
    } catch {
      /* ignore malformed env value */
    }
  }
  return patterns;
}

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: remoteImagePatterns(),
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
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/((?!api|admin|_next/static|_next/image|favicon.ico).*)',
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
