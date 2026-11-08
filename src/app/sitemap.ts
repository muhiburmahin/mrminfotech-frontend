import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mrminfotech.com';

  const routes: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }> = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/edumanage-bd', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/medisheba-bd', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/products/multi-institution-platform', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/web-development', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/services/custom-software-development', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/services/cloud-devops', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/services/ui-ux-design', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/projects', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/projects/edumanage-bd-campus-cloud', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/projects/medisheba-bd-hospital-core', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.85, changeFrequency: 'daily' },
    { path: '/blog/architecting-multi-tenant-cloud-saas', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/building-resilient-microservices-nestjs', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/team', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/start-project', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/security', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/cookie-policy', priority: 0.5, changeFrequency: 'monthly' },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
