/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.INTERNAL_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api/v1';

const APP_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'http://localhost:3000';

async function fetchBackend<T = any>(
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
        const obj = unwrapped as Record<string, any>;
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
  getProducts<T = any>(
    options?:
      | {
          locale?: string;
          placement?: 'homepage' | 'nav' | 'catalog';
          category?: string;
          search?: string;
        }
      | string
  ): Promise<T> {
    if (typeof options === 'string') {
      return fetchBackend<T>(`/products?locale=${options}`, [] as unknown as T);
    }
    const query = new URLSearchParams();
    query.set('locale', options?.locale || 'en');
    if (options?.placement) query.set('placement', options.placement);
    if (options?.category) query.set('category', options.category);
    if (options?.search) query.set('search', options.search);
    return fetchBackend<T>(`/products?${query.toString()}`, [] as unknown as T);
  },
  getProductCategories<T = any>(): Promise<T> {
    return fetchBackend<T>('/products/categories', [] as unknown as T);
  },
  getProductBySlug<T = any>(slug: string, locale = 'en', preview = false): Promise<T> {
    const previewParam = preview ? '&preview=true' : '';
    return fetchBackend<T>(
      `/products/${encodeURIComponent(slug)}?locale=${locale}${previewParam}`,
      null as unknown as T
    );
  },
  getServices<T = any>(
    options?:
      | {
          locale?: string;
          placement?: 'homepage' | 'nav' | 'catalog';
          category?: string;
          search?: string;
          limit?: number;
        }
      | string
  ): Promise<T> {
    if (typeof options === 'string') {
      return fetchBackend<T>(`/services?locale=${options}&limit=50`, [] as unknown as T);
    }
    const query = new URLSearchParams();
    query.set('locale', options?.locale || 'en');
    if (options?.placement) query.set('placement', options.placement);
    if (options?.category) query.set('category', options.category);
    if (options?.search) query.set('q', options.search);
    query.set('limit', String(options?.limit || 50));
    return fetchBackend<T>(`/services?${query.toString()}`, [] as unknown as T);
  },
  getServiceCategories<T = any>(): Promise<T> {
    return fetchBackend<T>('/services/categories', [] as unknown as T);
  },
  getServiceBySlug<T = any>(slug: string, locale = 'en', preview = false): Promise<T> {
    const previewParam = preview ? '&preview=true' : '';
    return fetchBackend<T>(
      `/services/${encodeURIComponent(slug)}?locale=${locale}${previewParam}`,
      null as unknown as T
    );
  },
  getProjects<T = any>(locale = 'en'): Promise<T> {
    return fetchBackend<T>(`/projects?locale=${locale}`, [] as unknown as T);
  },
  getProjectBySlug<T = any>(slug: string, locale = 'en'): Promise<T> {
    return fetchBackend<T>(`/projects/${encodeURIComponent(slug)}?locale=${locale}`, null as unknown as T);
  },
  getCaseStudies<T = any>(locale = 'en'): Promise<T> {
    return fetchBackend<T>(`/case-studies?locale=${locale}`, [] as unknown as T);
  },
  getCaseStudyBySlug<T = any>(slug: string, locale = 'en'): Promise<T> {
    return fetchBackend<T>(`/case-studies/${encodeURIComponent(slug)}?locale=${locale}`, null as unknown as T);
  },
  getTeamMembers<T = any>(locale = 'en'): Promise<T> {
    return fetchBackend<T>(`/team?locale=${locale}`, [] as unknown as T);
  },
  getCareers<T = any>(locale = 'en'): Promise<T> {
    return fetchBackend<T>(`/careers?locale=${locale}`, [] as unknown as T);
  },
  getCareerBySlug<T = any>(slug: string, locale = 'en'): Promise<T> {
    return fetchBackend<T>(`/careers/${encodeURIComponent(slug)}?locale=${locale}`, null as unknown as T);
  },
  getBlogPosts<T = any>(locale = 'en'): Promise<T> {
    return fetchBackend<T>(`/blog?locale=${locale}`, [] as unknown as T);
  },
  getBlogPostBySlug<T = any>(slug: string, locale = 'en'): Promise<T> {
    return fetchBackend<T>(`/blog/${encodeURIComponent(slug)}?locale=${locale}`, null as unknown as T);
  },
  getBlogCategories<T = any>(): Promise<T> {
    return fetchBackend<T>('/blog/categories', [] as unknown as T);
  },
  getTestimonials<T = any>(): Promise<T> {
    return fetchBackend<T>('/testimonials', [] as unknown as T);
  },
  getFaqs<T = any>(): Promise<T> {
    return fetchBackend<T>('/faqs', [] as unknown as T);
  },
  getCompanyProfile<T = any>(): Promise<T> {
    return fetchBackend<T>('/company', null as unknown as T);
  },
  getSiteSettings<T = any>(): Promise<T> {
    return fetchBackend<T>('/site-settings', null as unknown as T);
  },
  getNavigation<T = any>(key: string): Promise<T> {
    return fetchBackend<T>(`/navigation/${encodeURIComponent(key)}`, null as unknown as T);
  },
};
