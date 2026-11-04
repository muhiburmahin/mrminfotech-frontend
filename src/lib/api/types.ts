export type LocaleCode = 'en' | 'bn';

export interface CompanyProfile {
  name: string;
  legalName?: string;
  supportEmail?: string;
  tagline: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  headquarters: string;
  address?: string;
  whatsapp?: string;
  foundedYear: number;
  logoUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  copyrightText?: string;
}

export interface NavTreeItem {
  id: string;
  menuId: string;
  parentId: string | null;
  label: Record<string, string>;
  description?: Record<string, string> | null;
  badge?: Record<string, string> | null;
  iconKey?: string | null;
  href?: string | null;
  pageId?: string | null;
  productId?: string | null;
  serviceId?: string | null;
  newTab: boolean;
  isButton: boolean;
  isVisible: boolean;
  sortOrder: number;
  children: NavTreeItem[];
}

export interface NavigationMenu {
  id: string;
  key: string;
  items: NavTreeItem[];
}

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductItem {
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
  launchedAt?: string | null;
  name: string;
  tagline?: string | null;
  summary?: string | null;
  description?: string | null;
  features?: Array<{ title: string; description: string }>;
}

export interface ServiceItem {
  slug: string;
  icon?: string | null;
  sortOrder: number;
  name: string;
  summary: string;
  publishedAt?: string | null;
  body?: unknown;
  seoTitle?: string | null;
  seoDescription?: string | null;
  availableLocales?: string[];
}

export interface PublicImage {
  url: string;
  width?: number | null;
  height?: number | null;
  alt: string;
}

export interface NamedRef {
  slug: string;
  name?: string | null;
}

export interface PublicMetric {
  label: string;
  value: string;
}

export type CaseStudyItem = ProjectItem;

export interface ProjectItem {
  slug: string;
  title: string;
  summary: string;
  cover?: PublicImage | null;
  publishedAt: string;
  sortOrder: number;
  projectWorkStatus: 'IN_DEVELOPMENT' | 'COMPLETED' | 'MAINTENANCE';
  isFeatured: boolean;
  demoVideoUrl?: string | null;
  frontendRepoUrl?: string | null;
  backendRepoUrl?: string | null;
  frontendTechSummary?: Record<string, unknown> | null;
  backendTechSummary?: Record<string, unknown> | null;
  dbToolsSummary?: Record<string, unknown> | null;
  service?: NamedRef | null;
  industry?: NamedRef | null;
  product?: NamedRef | null;
  clientName?: string | null;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  metrics?: PublicMetric[];
}

export interface TeamMember {
  slug: string;
  name: string;
  roleTitle: string;
  department?: string | null;
  photo?: PublicPhoto | null;
  sortOrder: number;
  bio?: string | null;
  socialLinks?: Record<string, string>;
  email?: string | null;
}

export interface PublicPhoto {
  url: string;
  width?: number | null;
  height?: number | null;
  alt: string;
}

export interface TestimonialItem {
  id: string;
  authorName: string;
  authorRole: string;
  companyName: string;
  quote: string;
  rating: number;
  avatarUrl?: string | null;
  isFeatured: boolean;
  isVerified: boolean;
}

export interface BlogCategory {
  id: string;
  slug: string;
  i18n: Record<string, { name: string }>;
}

export interface BlogTag {
  id: string;
  slug: string;
  i18n: Record<string, { name: string }>;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  coverImageUrl?: string | null;
  category?: string | null;
  tags?: string[];
  readingTimeMinutes?: number;
  publishedAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  sortOrder: number;
}
