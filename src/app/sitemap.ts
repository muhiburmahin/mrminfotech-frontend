import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mrminfotech.com';

  const routes = [
    '',
    '/about',
    '/team',
    '/careers',
    '/products',
    '/products/edumanage-bd',
    '/products/medisheba-bd',
    '/products/multi-institution-platform',
    '/services',
    '/projects',
    '/blog',
    '/contact',
    '/start-project',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/products') ? 0.9 : 0.8,
  }));
}
