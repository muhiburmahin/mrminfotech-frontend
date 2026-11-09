/**
 * Shapes of public API records that pages read directly. Fields are optional where the backend omits them
 * (unpublished locale, client did not approve disclosure, etc.), so consumers must handle absence.
 */

export interface PublicMetric {
  label?: string;
  metric?: string;
  value?: string;
  description?: string;
}

export interface PublicCaseStudy {
  id?: string;
  slug?: string;
  title?: string | null;
  summary?: string | null;
  clientName?: string | null;
  industry?: string | null;
  metrics?: PublicMetric[];
  impactMetrics?: PublicMetric[];
}

export interface PublicBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  summary?: string | null;
  body?: string | null;
  readingMinutes?: number | null;
  publishedAt?: string | Date | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  category?: { name?: string } | string | null;
  categoryName?: string | null;
  tags?: Array<{ name?: string }>;
}

/** List endpoints return either a bare array or `{ data: [...] }`. */
export type ListResponse<T> = T[] | { data?: T[] } | null | undefined;

export function unwrapList<T>(raw: ListResponse<T>): T[] {
  if (Array.isArray(raw)) return raw;
  const data = raw?.data;
  return Array.isArray(data) ? data : [];
}

export interface PublicImage {
  url: string;
  alt?: string;
  width?: number | null;
  height?: number | null;
}

export interface PublicGalleryItem {
  id?: string;
  url?: string;
  media?: { url?: string } | null;
  title?: string;
  caption?: string | { title?: string; description?: string } | null;
  device?: string;
  isFeatured?: boolean;
}

/** Legacy embedded case-study block that older project records still carry. */
export interface LegacyCaseStudy {
  clientName?: string | null;
  liveUrl?: string | null;
  frontendRepoUrl?: string | null;
  backendRepoUrl?: string | null;
  showFrontendRepo?: boolean;
  showBackendRepo?: boolean;
  frontendTechStack?: string[];
  backendTechStack?: string[];
  dbToolsSummary?: string[] | null;
}

/** Project as returned by `GET /projects/:slug`. */
export interface PublicProjectDetail {
  slug?: string;
  title?: string;
  name?: string;
  summary?: string | null;
  challenge?: string | null;
  solution?: string | null;
  result?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  cover?: PublicImage | null;
  gallery?: PublicGalleryItem[];
  body?: { gallery?: unknown } | Record<string, unknown> | null;
  metrics?: Array<{ label: string; value: string }>;
  clientName?: string | null;
  liveUrl?: string | null;
  frontendRepoUrl?: string | null;
  backendRepoUrl?: string | null;
  frontendTechSummary?: string[] | null;
  backendTechSummary?: string[] | null;
  dbToolsSummary?: string[] | null;
  projectWorkStatus?: string;
  isFeatured?: boolean;
  service?: { slug?: string; name?: string | null } | null;
  product?: { slug: string; name?: string | null } | null;
  caseStudy?: LegacyCaseStudy | null;
}
