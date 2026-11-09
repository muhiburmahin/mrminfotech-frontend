import { fetchApi } from './client';
import { authRequest } from './auth.service';
import type { CompanyProfile } from './types';
import type { HomepageConfig, BrandAppearanceConfig } from '@/types/homepage';
import type {
  ProductRecord,
  ProductCategory,
  ProductKpiStats,
  ProductSection,
  ReorderContext,
  ProductStatus,
  LaunchStage,
} from '@/types/product.types';

export async function adminLogin(credentials: { email: string; password: string }) {
  return fetchApi<{ user: { id: string; email: string; role: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export interface AdminProductPayload {
  title: string;
  slug: string;
  tagline?: string;
  description?: string;
  images: string[];
  liveUrl?: string;
  caseStudy?: string;
  sourceCodeUrl?: string;
  isSourcePrivate?: boolean;
  stage: string;
  sortOrder?: number;
}

export interface AdminProductListResponse {
  data: ProductRecord[];
  kpi: ProductKpiStats;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getAdminProducts(params?: {
  status?: string;
  stage?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}): Promise<AdminProductListResponse> {
  const query = new URLSearchParams();
  if (params?.status) query.set('status', params.status);
  if (params?.stage) query.set('stage', params.stage);
  if (params?.category) query.set('category', params.category);
  if (params?.search) query.set('search', params.search);
  if (params?.page) query.set('page', String(params.page));
  query.set('limit', String(params?.limit || 50));
  query.set('sortBy', params?.sortBy || 'displayOrder');
  query.set('order', params?.order || 'asc');

  const res = await authRequest<AdminProductListResponse>(`/admin/products?${query.toString()}`);
  const unwrapped = res.data as AdminProductListResponse;
  if (unwrapped && Array.isArray(unwrapped.data)) {
    return unwrapped;
  }
  // Fallback if data is raw array
  const rawList = Array.isArray(res.data) ? (res.data as unknown as ProductRecord[]) : [];
  return {
    data: rawList,
    kpi: {
      total: rawList.length,
      published: rawList.filter((p) => p.status === 'PUBLISHED').length,
      draft: rawList.filter((p) => p.status === 'DRAFT').length,
      featured: rawList.filter((p) => p.isFeatured).length,
      comingSoon: rawList.filter((p) => p.stage === 'COMING_SOON').length,
      archived: rawList.filter((p) => p.status === 'ARCHIVED').length,
    },
    meta: {
      page: 1,
      limit: rawList.length || 50,
      total: rawList.length,
      totalPages: 1,
    },
  };
}

export async function getAdminProductById(id: string): Promise<ProductRecord> {
  const res = await authRequest<ProductRecord>(`/admin/products/${encodeURIComponent(id)}`);
  return res.data as ProductRecord;
}

export async function createAdminProduct(payload: Partial<ProductRecord>): Promise<ProductRecord> {
  const res = await authRequest<ProductRecord>('/admin/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data as ProductRecord;
}

export async function updateAdminProduct(id: string, payload: Partial<ProductRecord>): Promise<ProductRecord> {
  const res = await authRequest<ProductRecord>('/admin/products/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return res.data as ProductRecord;
}

export async function updateAdminProductSection(
  id: string,
  section: ProductSection,
  data: Record<string, unknown>
): Promise<ProductRecord> {
  const res = await authRequest<ProductRecord>(`/admin/products/${encodeURIComponent(id)}/section`, {
    method: 'PATCH',
    body: JSON.stringify({ section, data }),
  });
  return res.data as ProductRecord;
}

export async function reorderAdminProducts(
  context: ReorderContext,
  items: Array<{ id: string; order: number }>
): Promise<{ success: boolean; count: number }> {
  const res = await authRequest<{ success: boolean; count: number }>('/admin/products/reorder', {
    method: 'PATCH',
    body: JSON.stringify({ context, items }),
  });
  return res.data as { success: boolean; count: number };
}

export async function duplicateAdminProduct(id: string): Promise<ProductRecord> {
  const res = await authRequest<ProductRecord>(`/admin/products/${encodeURIComponent(id)}/duplicate`, {
    method: 'POST',
  });
  return res.data as ProductRecord;
}

export async function updateAdminProductStatus(
  id: string,
  status: ProductStatus,
  stage?: LaunchStage
): Promise<{ success: boolean; status: ProductStatus; stage?: LaunchStage }> {
  const res = await authRequest<{ success: boolean; status: ProductStatus; stage?: LaunchStage }>(
    `/admin/products/${encodeURIComponent(id)}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status, stage }),
    }
  );
  return res.data as { success: boolean; status: ProductStatus; stage?: LaunchStage };
}

export async function deleteAdminProduct(id: string): Promise<{ message: string }> {
  const res = await authRequest<{ message: string }>('/admin/products/' + encodeURIComponent(id), {
    method: 'DELETE',
  });
  return res.data as { message: string };
}

export async function getAdminProductCategories(): Promise<ProductCategory[]> {
  const res = await authRequest<ProductCategory[]>('/products/categories');
  return (res.data as ProductCategory[]) || [];
}

// ──────────────────────── Projects (Case Studies) Admin ────────────────────────

export interface ProjectScreenshotItem {
  id?: string;
  url: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  alt?: string;
  device?: string;
  deviceType?: string;
  isFeatured?: boolean;
  order?: number;
}

export interface AdminProjectPayload {
  title: string;
  slug: string;
  summary?: string;
  sortOrder?: number;
  projectWorkStatus?: string;
  isFeatured?: boolean;
  liveUrl?: string;
  demoVideoUrl?: string;
  frontendRepoUrl?: string;
  backendRepoUrl?: string;
  showFrontendRepo?: boolean;
  showBackendRepo?: boolean;
  frontendTechSummary?: string[];
  backendTechSummary?: string[];
  dbToolsSummary?: string[];
  metrics?: Array<{ label: string; value: string }>;
  status?: string;
  translations?: Array<{
    locale: string;
    title?: string;
    summary?: string;
    challenge?: string | null;
    solution?: string | null;
    result?: string | null;
    body?: Record<string, unknown>;
    status?: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
  }>;
}

export async function getAdminProjects() {
  const res = await authRequest<{ data: Array<Record<string, unknown>> }>('/admin/projects?limit=50&sort=sortOrder&order=asc');
  return res.data;
}

export async function getAdminProjectById(id: string) {
  const res = await authRequest<Record<string, unknown>>('/admin/projects/' + encodeURIComponent(id));
  return res.data;
}

export async function createAdminProject(payload: AdminProjectPayload) {
  const res = await authRequest('/admin/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateAdminProject(id: string, payload: Partial<AdminProjectPayload>) {
  const res = await authRequest('/admin/projects/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteAdminProject(id: string) {
  const res = await authRequest('/admin/projects/' + encodeURIComponent(id), {
    method: 'DELETE',
  });
  return res.data;
}

import type {
  ServiceRecord,
  ServiceCategory,
  AdminServiceListResponse,
  ServiceSection,
  ReorderPlacement,
} from '@/types/service.types';

export interface AdminServicePayload extends Partial<ServiceRecord> {}

export async function getAdminServices(params?: {
  status?: string;
  category?: string;
  search?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}): Promise<AdminServiceListResponse> {
  const query = new URLSearchParams();
  if (params?.status) query.set('status', params.status);
  if (params?.category) query.set('category', params.category);
  if (params?.search) query.set('q', params.search);
  if (params?.isFeatured !== undefined) query.set('isFeatured', String(params.isFeatured));
  if (params?.page) query.set('page', String(params.page));
  query.set('limit', String(params?.limit || 50));
  query.set('sort', params?.sortBy || 'sortOrder');
  query.set('order', params?.order || 'asc');

  const res = await authRequest<AdminServiceListResponse>(`/admin/services?${query.toString()}`);
  const unwrapped = res.data as AdminServiceListResponse;
  if (unwrapped && Array.isArray(unwrapped.data)) {
    return unwrapped;
  }
  const rawList = Array.isArray(res.data) ? (res.data as unknown as ServiceRecord[]) : [];
  return {
    data: rawList,
    kpi: {
      total: rawList.length,
      published: rawList.filter((s) => s.status === 'PUBLISHED').length,
      draft: rawList.filter((s) => s.status === 'DRAFT').length,
      featured: rawList.filter((s) => s.isFeatured).length,
      comingSoon: rawList.filter((s) => s.status === 'IN_REVIEW' || s.status === 'SCHEDULED').length,
      archived: rawList.filter((s) => s.status === 'ARCHIVED').length,
    },
    meta: {
      page: 1,
      limit: rawList.length || 50,
      total: rawList.length,
      totalPages: 1,
    },
  };
}

export async function getAdminServiceById(id: string): Promise<ServiceRecord> {
  const res = await authRequest<ServiceRecord>(`/admin/services/${encodeURIComponent(id)}`);
  return res.data as ServiceRecord;
}

export async function createAdminService(payload: Partial<ServiceRecord>): Promise<ServiceRecord> {
  const res = await authRequest<ServiceRecord>('/admin/services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data as ServiceRecord;
}

export async function updateAdminService(id: string, payload: Partial<ServiceRecord>): Promise<ServiceRecord> {
  const res = await authRequest<ServiceRecord>('/admin/services/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return res.data as ServiceRecord;
}

export async function updateAdminServiceSection(
  id: string,
  section: ServiceSection,
  data: Record<string, unknown>
): Promise<ServiceRecord> {
  const res = await authRequest<ServiceRecord>(`/admin/services/${encodeURIComponent(id)}/section`, {
    method: 'PATCH',
    body: JSON.stringify({ section, data }),
  });
  return res.data as ServiceRecord;
}

export async function reorderAdminServices(
  placement: ReorderPlacement,
  items: Array<{ id: string; order: number }>
): Promise<{ success: boolean; count: number }> {
  const res = await authRequest<{ success: boolean; count: number }>('/admin/services/reorder', {
    method: 'PATCH',
    body: JSON.stringify({ placement, items }),
  });
  return res.data as { success: boolean; count: number };
}

export async function duplicateAdminService(id: string): Promise<ServiceRecord> {
  const res = await authRequest<ServiceRecord>(`/admin/services/${encodeURIComponent(id)}/duplicate`, {
    method: 'POST',
  });
  return res.data as ServiceRecord;
}

export async function updateAdminServiceStatus(id: string, status: string): Promise<ServiceRecord> {
  const res = await authRequest<ServiceRecord>(`/admin/services/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return res.data as ServiceRecord;
}

export async function deleteAdminService(id: string) {
  const res = await authRequest('/admin/services/' + encodeURIComponent(id), {
    method: 'DELETE',
  });
  return res.data;
}

export async function getAdminServiceCategories(): Promise<ServiceCategory[]> {
  const res = await authRequest<ServiceCategory[]>('/admin/services/categories');
  return (Array.isArray(res.data) ? res.data : []) as ServiceCategory[];
}

export async function createAdminServiceCategory(data: Partial<ServiceCategory>): Promise<ServiceCategory> {
  const res = await authRequest<ServiceCategory>('/admin/services/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.data as ServiceCategory;
}

export async function updateAdminServiceCategory(id: string, data: Partial<ServiceCategory>): Promise<ServiceCategory> {
  const res = await authRequest<ServiceCategory>(`/admin/services/categories/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return res.data as ServiceCategory;
}

export async function deleteAdminServiceCategory(id: string) {
  const res = await authRequest(`/admin/services/categories/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return res.data;
}

// ──────────────────────── Team Members Admin ────────────────────────

export interface AdminTeamPayload {
  name: string;
  role: string;
  photo?: string | null;
  bio?: string | null;
  email?: string | null;
  showEmail?: boolean;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  order?: number;
  sortOrder?: number;
  isActive?: boolean;
  isPublic?: boolean;
  consentGiven?: boolean;
  slug?: string;
  department?: string | null;
  photoId?: string | null;
}

export async function getAdminTeamMembers() {
  const res = await authRequest<{ data: Array<Record<string, unknown>> }>(
    '/admin/team?limit=100&sort=order&order=asc'
  );
  return res.data;
}

export async function createAdminTeamMember(payload: AdminTeamPayload) {
  const res = await authRequest('/admin/team', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateAdminTeamMember(id: string, payload: Partial<AdminTeamPayload>) {
  const res = await authRequest('/admin/team/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteAdminTeamMember(id: string) {
  const res = await authRequest('/admin/team/' + encodeURIComponent(id), {
    method: 'DELETE',
  });
  return res.data;
}

// ──────────────────────── Blog Admin ────────────────────────
export interface AdminBlogTranslationPayload {
  locale: string;
  slug: string;
  title: string;
  excerpt?: string;
  body: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'IN_REVIEW' | 'ARCHIVED';
  seoTitle?: string;
  seoDescription?: string;
}

export interface AdminBlogPostPayload {
  translations: AdminBlogTranslationPayload[];
  categoryId?: string | null;
  coverId?: string | null;
  readingMinutes?: number;
  isFeatured?: boolean;
  tagIds?: string[];
}

export async function getAdminBlogPosts() {
  const res = await authRequest<{ data: Array<Record<string, unknown>> }>(
    '/admin/blog?limit=50&sortBy=createdAt&order=desc'
  );
  return res.data;
}

export async function getAdminBlogCategories() {
  const res = await authRequest<Array<{ id: string; slug: string; i18n?: Record<string, { name: string }> }>>(
    '/admin/blog/categories'
  );
  return res.data;
}

export async function getAdminBlogTags() {
  const res = await authRequest<Array<{ id: string; slug: string; i18n?: Record<string, { name: string }> }>>(
    '/admin/blog/tags'
  );
  return res.data;
}

export async function createAdminBlogPost(payload: AdminBlogPostPayload) {
  const res = await authRequest('/admin/blog', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateAdminBlogPost(id: string, payload: Partial<AdminBlogPostPayload>) {
  const res = await authRequest('/admin/blog/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteAdminBlogPost(id: string) {
  const res = await authRequest('/admin/blog/' + encodeURIComponent(id), {
    method: 'DELETE',
  });
  return res.data;
}

export async function getAdminInquiries(params?: Parameters<typeof getAdminLeads>[0]) {
  return getAdminLeads(params);
}

export async function getAdminSettings() {
  return fetchApi<{ data: Array<{ key: string; group: string; value: unknown }> }>('/admin/site-settings');
}

export async function saveSiteSetting(key: string, group: string, value: unknown, isPublic = true) {
  try {
    return await fetchApi(`/admin/site-settings/${encodeURIComponent(key)}`, {
      method: 'PATCH',
      body: JSON.stringify({ group, value, isPublic }),
    });
  } catch {
    return await fetchApi('/admin/site-settings', {
      method: 'POST',
      body: JSON.stringify({ key, group, value, isPublic }),
    });
  }
}

export async function saveHomepageConfig(config: HomepageConfig) {
  return saveSiteSetting('homepage.sections', 'homepage', config, true);
}

export async function saveBrandAppearance(appearance: BrandAppearanceConfig) {
  return saveSiteSetting('branding.appearance', 'branding', appearance, true);
}

export async function getAdminCompanyProfile(): Promise<CompanyProfile | null> {
  try {
    const res = await authRequest<{ value: CompanyProfile }>('/admin/company');
    return res.data?.value || (res.data as unknown as CompanyProfile);
  } catch {
    return null;
  }
}

/**
 * PATCHes the company profile. `payload` must come from buildCompanyPatch(): every key is explicit,
 * empty values are `null` (clears the stored value) and omitted keys are retained by the server.
 * Resolves with the persisted record as returned by the API (`{ value, ... }`).
 */
export async function updateAdminCompanyProfile(
  payload: Record<string, unknown>,
): Promise<{ value?: Record<string, unknown> } | undefined> {
  const res = await authRequest<{ value?: Record<string, unknown> }>('/admin/company', {
    method: 'PATCH',
    body: JSON.stringify({ isPublic: true, ...payload }),
  });
  return res.data;
}

export async function uploadHeroMedia(file: File): Promise<{ url: string; id?: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await authRequest<{ url?: string; id?: string; data?: { url?: string; id?: string } }>(
    '/admin/media/upload',
    {
      method: 'POST',
      body: formData,
      timeoutMs: 120000,
    }
  );
  const data = res.data;
  const url = data?.url || data?.data?.url || (data as unknown as { url?: string })?.url || '';
  const id = data?.id || data?.data?.id || (data as unknown as { id?: string })?.id;
  return { url, id };
}

export async function uploadMediaFiles(files: File[]): Promise<string[]> {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const res = await authRequest<{ urls?: string[]; items?: Array<{ url: string }> }>(
      '/admin/media/upload-multiple',
      {
        method: 'POST',
        body: formData,
        timeoutMs: 180000,
      }
    );
    if (res.data?.urls && Array.isArray(res.data.urls)) {
      return res.data.urls;
    }
  } catch (err) {
    console.warn('Batch upload failed, falling back to sequential single upload:', err);
  }

  // Fallback: upload one by one using /admin/media/upload
  const urls: string[] = [];
  for (const file of files) {
    try {
      const singleFormData = new FormData();
      singleFormData.append('file', file);
      const singleRes = await authRequest<{ url?: string; data?: { url?: string } }>(
        '/admin/media/upload',
        {
          method: 'POST',
          body: singleFormData,
          timeoutMs: 120000,
        }
      );
      const uploadedUrl = singleRes.data?.url || (singleRes.data as unknown as { url?: string })?.url;
      if (uploadedUrl) {
        urls.push(uploadedUrl);
      }
    } catch (err) {
      console.error('Failed to upload file:', file.name, err);
    }
  }
  return urls;
}

// ============================================================================
// CLIENT INQUIRIES & LEADS API
// ============================================================================

export interface AdminLeadItem {
  id: string;
  ref: string;
  type: string;
  status: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  preferredContact?: string;
  message?: string;
  payload?: Record<string, unknown>;
  estimatedValue?: number;
  currency?: string;
  createdAt: string;
  updatedAt: string;
  notes?: Array<{ id: string; body?: string; note?: string; createdAt: string; author?: { id?: string; name?: string } }>;
  changes?: Array<{ id: string; from?: string; to?: string; oldStatus?: string; newStatus?: string; createdAt: string }>;
}

export interface AdminLeadsResponse {
  data: AdminLeadItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getAdminLeads(params?: {
  status?: string;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<AdminLeadsResponse> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'ALL') query.set('status', params.status);
  if (params?.type && params.type !== 'ALL') query.set('type', params.type);
  if (params?.search && params.search.trim()) query.set('search', params.search.trim());
  if (params?.page) query.set('page', String(params.page));
  query.set('limit', String(params?.limit || 50));

  const res = await authRequest<AdminLeadsResponse>(`/admin/leads?${query.toString()}`);
  return (res.data as AdminLeadsResponse) || { data: [], meta: { page: 1, limit: 50, total: 0, totalPages: 0 } };
}

export async function getAdminLeadById(id: string): Promise<AdminLeadItem> {
  const res = await authRequest<AdminLeadItem>(`/admin/leads/${encodeURIComponent(id)}`);
  return res.data as AdminLeadItem;
}

export async function updateAdminLeadStatus(
  id: string,
  status: string,
  note?: string
): Promise<AdminLeadItem> {
  const payload: Record<string, unknown> = { status };
  if (note && note.trim()) {
    payload.internalNote = note.trim();
  }
  const res = await authRequest<AdminLeadItem>(`/admin/leads/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return res.data as AdminLeadItem;
}

export async function deleteAdminLead(id: string): Promise<void> {
  await authRequest(`/admin/leads/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}



// ──────────────────────── Testimonials Admin ────────────────────────

export interface AdminTestimonialPayload {
  clientId?: string;
  authorName: string;
  authorRole?: string | null;
  companyName?: string | null;
  avatarUrl?: string | null;
  rating?: number;
  serviceSlug?: string | null;
  projectSlug?: string | null;
  reviewDate?: string | null;
  source?: string | null;
  isFeatured?: boolean;
  quote: Record<string, string> | string;
  evidenceNote?: string | null;
  consentAt?: string | null;
  isVerified?: boolean;
  sortOrder?: number;
  showOnSite?: boolean;
}

export interface AdminTestimonialItem {
  id: string;
  clientId?: string | null;
  authorName: string;
  authorRole?: string | null;
  companyName?: string | null;
  avatarUrl?: string | null;
  rating?: number;
  serviceSlug?: string | null;
  projectSlug?: string | null;
  reviewDate?: string | null;
  source?: string | null;
  isFeatured: boolean;
  quote: Record<string, string> | string;
  isVerified: boolean;
  evidenceNote?: string | null;
  consentAt?: string | null;
  showOnSite: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export async function getAdminTestimonials(params?: {
  page?: number;
  limit?: number;
  showOnSite?: boolean;
  isVerified?: boolean;
  serviceSlug?: string;
  projectSlug?: string;
  isFeatured?: boolean;
}): Promise<{ data: AdminTestimonialItem[]; meta: { page: number; limit: number; total: number; totalPages: number } }> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.showOnSite !== undefined) query.set('showOnSite', String(params.showOnSite));
  if (params?.isVerified !== undefined) query.set('isVerified', String(params.isVerified));
  if (params?.serviceSlug) query.set('serviceSlug', params.serviceSlug);
  if (params?.projectSlug) query.set('projectSlug', params.projectSlug);
  if (params?.isFeatured !== undefined) query.set('isFeatured', String(params.isFeatured));

  const qs = query.toString();
  const url = '/admin/testimonials' + (qs ? '?' + qs : '');
  const res = await authRequest<{ data: AdminTestimonialItem[]; meta: { page: number; limit: number; total: number; totalPages: number } }>(url);
  return res.data;
}

export async function getAdminTestimonial(id: string): Promise<AdminTestimonialItem> {
  const res = await authRequest<AdminTestimonialItem>('/admin/testimonials/' + encodeURIComponent(id));
  return res.data;
}

export async function createAdminTestimonial(payload: AdminTestimonialPayload): Promise<AdminTestimonialItem> {
  const res = await authRequest<AdminTestimonialItem>('/admin/testimonials', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateAdminTestimonial(
  id: string,
  payload: Partial<AdminTestimonialPayload>
): Promise<AdminTestimonialItem> {
  const res = await authRequest<AdminTestimonialItem>('/admin/testimonials/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteAdminTestimonial(id: string): Promise<{ message: string }> {
  const res = await authRequest<{ message: string }>('/admin/testimonials/' + encodeURIComponent(id), {
    method: 'DELETE',
  });
  return res.data;
}
