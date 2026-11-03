import { fetchApi } from './client';
import type { HomepageConfig, BrandAppearanceConfig } from '@/types/homepage';

export async function adminLogin(credentials: { email: string; password: string }) {
  return fetchApi<{ user: { id: string; email: string; role: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function getAdminProducts() {
  return fetchApi('/admin/products');
}

export async function getAdminServices() {
  return fetchApi('/admin/services');
}

export async function getAdminProjects() {
  return fetchApi('/admin/projects');
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
    // Try updating existing setting first
    return await fetchApi(`/admin/site-settings/${encodeURIComponent(key)}`, {
      method: 'PATCH',
      body: JSON.stringify({ group, value, isPublic }),
    });
  } catch {
    // If not existing, create it
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

export async function uploadHeroMedia(file: File): Promise<{ url: string; id?: string }> {
  const formData = new FormData();
  formData.append('file', file);
  return fetchApi<{ url: string; id?: string }>('/admin/media/upload', {
    method: 'POST',
    body: formData,
  });
}
