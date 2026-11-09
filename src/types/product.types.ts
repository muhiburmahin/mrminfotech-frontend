import type { PublicMetric } from './public-content';
export type ProductStatus =
  | 'DRAFT'
  | 'IN_REVIEW'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type LaunchStage = 'LIVE' | 'BETA' | 'PLANNED' | 'COMING_SOON';

export type ProductType =
  | 'SaaS'
  | 'ERP'
  | 'CRM'
  | 'Healthcare Software'
  | 'Education Software'
  | 'Website Platform'
  | 'Custom Software'
  | string;

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface ProductMediaItem {
  id?: string;
  url: string;
  mediaType: 'SCREENSHOT' | 'DASHBOARD' | 'MOBILE' | 'MOCKUP' | 'BANNER' | 'VIDEO' | string;
  title?: string;
  caption?: string;
  altText?: string;
  description?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface ProductFeatureItem {
  id?: string;
  title: string;
  shortDescription: string;
  detailedDescription?: string;
  icon?: string;
  imageUrl?: string;
  categoryName: string;
  isFeatured: boolean;
  displayOrder: number;
}

export interface ProductBenefitItem {
  id?: string;
  title: string;
  description: string;
  icon?: string;
  displayOrder: number;
}

export type ProductLinkType =
  | 'OFFICIAL_WEBSITE'
  | 'LIVE_DEMO'
  | 'REQUEST_DEMO'
  | 'DOCUMENTATION'
  | 'USER_GUIDE'
  | 'SUPPORT_PORTAL'
  | 'LOGIN_PORTAL'
  | 'ANDROID_APP'
  | 'IOS_APP'
  | 'VIDEO_DEMO'
  | 'GITHUB_REPO'
  | 'CUSTOM';

export interface ProductLinkItem {
  id?: string;
  title: string;
  url: string;
  linkType: ProductLinkType;
  icon?: string;
  openInNewTab: boolean;
  isVisible: boolean;
  displayOrder: number;
}

export interface ProductDemoItem {
  id?: string;
  title: string;
  description?: string;
  demoType: 'DASHBOARD' | 'INTERFACE' | 'MOBILE' | 'WALKTHROUGH' | 'VIDEO' | string;
  mediaUrl: string;
  caption?: string;
  displayOrder: number;
}

export interface ProductFaqItem {
  id?: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export interface ProductSeoData {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterImage?: string;
  noIndex?: boolean;
  includeInSitemap?: boolean;
}

export interface ProductRecord {
  id: string;
  slug: string;
  title: string;
  name?: string; // alias for compatibility
  tagline?: string;
  shortDescription?: string;
  description?: string;
  summary?: string; // alias for compatibility
  targetAudience?: string;
  problemsAddressed?: string;
  mainPurpose?: string;
  productType?: ProductType;
  stage?: LaunchStage | string;
  status?: ProductStatus | string;
  version?: string;
  launchedAt?: string;
  brandColor?: string;
  logoUrl?: string;
  thumbnailUrl?: string;
  primaryImage?: string | null;

  // Legacy fields
  images: string[];
  liveUrl?: string | null;
  productSiteUrl?: string | null;
  demoUrl?: string | null;
  caseStudy?: string | null;
  sourceCodeUrl?: string | null;
  isSourcePrivate?: boolean;
  integrations?: string[];

  // Visibility & Section Toggles
  isFeatured: boolean;
  showOnHomepage: boolean;
  showOnProductsPage: boolean;
  showInNavDropdown: boolean;
  allowPublicDetail: boolean;
  enableGallery: boolean;
  enableCaseStudies: boolean;
  enableDemos: boolean;
  enableFaq: boolean;

  // Ordering
  sortOrder?: number;
  displayOrder: number;
  homepageOrder: number;
  navOrder: number;
  featuredOrder: number;

  // Category
  categoryId?: string | null;
  categoryName?: string;
  categorySlug?: string;
  categoryIcon?: string | null;
  category?: ProductCategory | null;

  // Sub-collections
  mediaItems: ProductMediaItem[];
  features?: ProductFeatureItem[]; // public or richFeatures
  richFeatures?: ProductFeatureItem[];
  benefits: ProductBenefitItem[];
  links: ProductLinkItem[];
  demonstrations: ProductDemoItem[];
  faqs?: ProductFaqItem[]; // public or productFaqs
  productFaqs?: ProductFaqItem[];
  caseStudies?: Array<{
    id: string;
    slug: string;
    isFeatured?: boolean;
    projectWorkStatus?: string;
    metrics?: PublicMetric[];
    translations?: Array<Record<string, unknown>>;
  }>;

  // SEO
  seo?: ProductSeoData;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterImage?: string;
  noIndex?: boolean;
  includeInSitemap?: boolean;

  counts?: {
    mediaItems?: number;
    richFeatures?: number;
    benefits?: number;
    links?: number;
    demonstrations?: number;
    productFaqs?: number;
    caseStudies?: number;
  };

  createdAt?: string;
  updatedAt?: string;
}

export interface ProductKpiStats {
  total: number;
  published: number;
  draft: number;
  featured: number;
  comingSoon: number;
  archived: number;
}

export type ProductSection =
  | 'basic'
  | 'media'
  | 'features'
  | 'benefits'
  | 'links'
  | 'demonstrations'
  | 'faqs'
  | 'visibility'
  | 'seo';

export type ReorderContext =
  | 'displayOrder'
  | 'homepageOrder'
  | 'navOrder'
  | 'featuredOrder';
