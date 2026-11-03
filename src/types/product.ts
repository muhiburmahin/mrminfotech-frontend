export interface Product {
  id: string;
  slug: string;
  stage: 'CONCEPT' | 'BETA' | 'LIVE' | 'SUNSET';
  heroImageId?: string | null;
  brandColor?: string | null;
  productSiteUrl?: string | null;
  demoUrl?: string | null;
  privacyUrl?: string | null;
  termsUrl?: string | null;
  isFeatured: boolean;
  sortOrder: number;
  name: string;
  tagline?: string | null;
  summary?: string | null;
  features?: Array<{ title: string; description: string }>;
}
