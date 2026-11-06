import { fetchApi } from './client';
import { authRequest } from './auth.service';
import type { CompanyProfile } from './types';
import type { HomepageConfig, BrandAppearanceConfig } from '@/types/homepage';

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

export async function getAdminProducts() {
  const res = await authRequest<{ data: Array<Record<string, unknown>> }>('/admin/products?limit=50&sortBy=sortOrder&order=asc');
  return res.data;
}

export async function createAdminProduct(payload: AdminProductPayload) {
  const res = await authRequest('/admin/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateAdminProduct(id: string, payload: Partial<AdminProductPayload>) {
  const res = await authRequest('/admin/products/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteAdminProduct(id: string) {
  const res = await authRequest('/admin/products/' + encodeURIComponent(id), {
    method: 'DELETE',
  });
  return res.data;
}

// ──────────────────────── Projects (Case Studies) Admin ────────────────────────

export interface AdminProjectPayload {
  title: string;
  slug: string;
  summary?: string;
  sortOrder?: number;
  projectWorkStatus?: string;
  isFeatured?: boolean;
  liveUrl?: string;
  frontendRepoUrl?: string;
  backendRepoUrl?: string;
  showFrontendRepo?: boolean;
  showBackendRepo?: boolean;
  frontendTechSummary?: string[];
  backendTechSummary?: string[];
  dbToolsSummary?: string[];
}

export async function getAdminProjects() {
  const res = await authRequest<{ data: Array<Record<string, unknown>> }>('/admin/projects?limit=50&sort=sortOrder&order=asc');
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

export interface AdminServicePayload {
  title?: string;
  name?: string;
  slug: string;
  summary?: string;
  description?: string;
  icon?: string | null;
  sortOrder?: number;
  order?: number;
  isActive?: boolean;
  isPublished?: boolean;
  status?: string;
}

export async function getAdminServices() {
  const res = await authRequest<{ data: Array<Record<string, unknown>> }>('/admin/services?limit=100&sort=sortOrder&order=asc');
  return res.data;
}

export async function createAdminService(payload: AdminServicePayload) {
  const res = await authRequest('/admin/services', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateAdminService(id: string, payload: Partial<AdminServicePayload>) {
  const res = await authRequest('/admin/services/' + encodeURIComponent(id), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteAdminService(id: string) {
  const res = await authRequest('/admin/services/' + encodeURIComponent(id), {
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

export async function getAdminBlogPosts() {
  return fetchApi('/admin/blog');
}

export async function getAdminInquiries() {
  return fetchApi('/admin/inquiries');
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

export async function updateAdminCompanyProfile(profile: Partial<CompanyProfile>): Promise<unknown> {
  const allowedKeys = [
    'name',
    'legalName',
    'tagline',
    'description',
    'logoUrl',
    'email',
    'supportEmail',
    'phone',
    'whatsapp',
    'address',
    'headquarters',
    'website',
    'facebookUrl',
    'linkedinUrl',
    'twitterUrl',
    'instagramUrl',
    'githubUrl',
    'youtubeUrl',
    'copyrightText',
    'foundedYear',
    'isPublic',
  ];

  const payload: Record<string, unknown> = {
    isPublic: true,
    name: profile.name || 'MRM InfoTech',
  };

  for (const key of allowedKeys) {
    if (key in profile) {
      const val = (profile as Record<string, unknown>)[key];
      payload[key] = val === '' ? null : val;
    }
  }

  const res = await authRequest('/admin/company', {
    method: 'PATCH',
    body: JSON.stringify(payload),
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

