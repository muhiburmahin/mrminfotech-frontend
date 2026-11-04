const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.INTERNAL_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api/v1';

const APP_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'http://localhost:3000';

async function fetchBackend<T>(
  endpoint: string,
  fallback: T,
  options: RequestInit = {}
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${normalizedEndpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        Origin: APP_ORIGIN,
        ...(options.headers || {}),
      },
      next: { revalidate: 30 },
    });

    if (!res.ok) return fallback;
    const json = await res.json();

    // Unwrap if wrapped in { success: true, data: ... } or { items: [...] } or { data: [...] }
    const unwrapped =
      json && typeof json === 'object' && 'success' in json && 'data' in json
        ? json.data
        : json;

    if (Array.isArray(fallback)) {
      if (Array.isArray(unwrapped)) return unwrapped as unknown as T;
      if (unwrapped && typeof unwrapped === 'object') {
        const obj = unwrapped as Record<string, unknown>;
        if (Array.isArray(obj.items)) return obj.items as unknown as T;
        if (Array.isArray(obj.data)) return obj.data as unknown as T;
        if (Array.isArray(obj.projects)) return obj.projects as unknown as T;
        if (Array.isArray(obj.services)) return obj.services as unknown as T;
        if (Array.isArray(obj.products)) return obj.products as unknown as T;
        if (Array.isArray(obj.posts)) return obj.posts as unknown as T;
        if (Array.isArray(obj.members)) return obj.members as unknown as T;
        if (Array.isArray(obj.jobs)) return obj.jobs as unknown as T;
      }
      return fallback;
    }

    return (unwrapped ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export const PublicApiService = {
  getProducts(locale = 'en') {
    return fetchBackend<Array<Record<string, unknown>>>(`/products?locale=${locale}`, []);
  },
  getProductBySlug(slug: string, locale = 'en') {
    return fetchBackend<Record<string, unknown> | null>(`/products/${encodeURIComponent(slug)}?locale=${locale}`, null);
  },
  getServices(locale = 'en') {
    return fetchBackend<Array<Record<string, unknown>>>(`/services?locale=${locale}`, []);
  },
  getServiceBySlug(slug: string, locale = 'en') {
    return fetchBackend<Record<string, unknown> | null>(`/services/${encodeURIComponent(slug)}?locale=${locale}`, null);
  },
  getProjects(locale = 'en') {
    return fetchBackend<Array<Record<string, unknown>>>(`/projects?locale=${locale}`, []);
  },
  getProjectBySlug(slug: string, locale = 'en') {
    return fetchBackend<Record<string, unknown> | null>(`/projects/${encodeURIComponent(slug)}?locale=${locale}`, null);
  },
  getCaseStudies(locale = 'en') {
    return fetchBackend<Array<Record<string, unknown>>>(`/case-studies?locale=${locale}`, []);
  },
  getCaseStudyBySlug(slug: string, locale = 'en') {
    return fetchBackend<Record<string, unknown> | null>(`/case-studies/${encodeURIComponent(slug)}?locale=${locale}`, null);
  },
  getTeamMembers(locale = 'en') {
    return fetchBackend<Array<Record<string, unknown>>>(`/team?locale=${locale}`, []);
  },
  getCareers(locale = 'en') {
    return fetchBackend<Array<Record<string, unknown>>>(`/careers?locale=${locale}`, []);
  },
  getCareerBySlug(slug: string, locale = 'en') {
    return fetchBackend<Record<string, unknown> | null>(`/careers/${encodeURIComponent(slug)}?locale=${locale}`, null);
  },
  getBlogPosts(locale = 'en') {
    return fetchBackend<Array<Record<string, unknown>>>(`/blog?locale=${locale}`, []);
  },
  getBlogPostBySlug(slug: string, locale = 'en') {
    return fetchBackend<Record<string, unknown> | null>(`/blog/${encodeURIComponent(slug)}?locale=${locale}`, null);
  },
  getBlogCategories() {
    return fetchBackend<Array<Record<string, unknown>>>('/blog/categories', []);
  },
  getTestimonials() {
    return fetchBackend<Array<Record<string, unknown>>>('/testimonials', []);
  },
  getFaqs() {
    return fetchBackend<Array<Record<string, unknown>>>('/faqs', []);
  },
  getCompanyProfile() {
    return fetchBackend<Record<string, unknown> | null>('/company', null);
  },
  getSiteSettings() {
    return fetchBackend<Record<string, unknown> | null>('/site-settings', null);
  },
  getNavigation(key: string) {
    return fetchBackend<Record<string, unknown> | null>(`/navigation/${encodeURIComponent(key)}`, null);
  },
};
