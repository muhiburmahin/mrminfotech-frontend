export type ServiceStatus = 'DRAFT' | 'IN_REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';

export type ServiceSection =
  | 'basic'
  | 'offerings'
  | 'benefits'
  | 'process'
  | 'technologies'
  | 'media'
  | 'projects'
  | 'faqs'
  | 'visibility'
  | 'seo';

export type ReorderPlacement =
  | 'servicesPageOrder'
  | 'homepageOrder'
  | 'navbarOrder'
  | 'featuredOrder'
  | 'sortOrder';

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    services?: number;
  };
}

export interface ServiceOfferingItem {
  id?: string;
  serviceId?: string;
  title: string;
  shortDescription: string;
  detailedDescription?: string | null;
  icon?: string | null;
  imageUrl?: string | null;
  displayOrder: number;
  isVisible?: boolean;
}

export interface ServiceBenefitItem {
  id?: string;
  serviceId?: string;
  title: string;
  description: string;
  icon?: string | null;
  imageUrl?: string | null;
  displayOrder: number;
  isVisible?: boolean;
}

export interface ServiceProcessStepItem {
  id?: string;
  serviceId?: string;
  stepNumber: number;
  title: string;
  description: string;
  icon?: string | null;
  displayOrder: number;
}

export interface ServiceMediaItem {
  id?: string;
  serviceId?: string;
  url: string;
  videoUrl?: string | null;
  mediaType: string;
  title?: string | null;
  caption?: string | null;
  altText?: string | null;
  description?: string | null;
  isCover?: boolean;
  isPrimary?: boolean;
  displayOrder: number;
  createdAt?: string;
}

export interface ServiceFaqItem {
  id?: string;
  serviceId?: string;
  question: string;
  answer: string;
  displayOrder: number;
  isVisible?: boolean;
}

export interface ServiceTechnologyItem {
  id?: string;
  name?: string;
  slug?: string;
  category?: string | null;
}

export interface ServiceRecord {
  id: string;
  slug: string;
  status: ServiceStatus;
  title: string;
  name?: string;
  tagline?: string | null;
  shortDescription: string;
  summary?: string;
  description?: string | null;
  fullDescription?: string | null;
  problemSolved?: string | null;
  problemsAddressed?: string | null;
  targetAudience?: string | null;
  ourApproachSummary?: string | null;
  approach?: string | null;
  serviceType?: string | null;
  brandColor?: string | null;
  primaryColor?: string | null;
  coverImage?: string | null;
  coverImageUrl?: string | null;
  heroImage?: string | null;
  thumbnailImage?: string | null;
  thumbnailUrl?: string | null;
  icon?: string | null;

  // Visibility & Placement Toggles
  isFeatured: boolean;
  showOnServicesPage: boolean;
  showOnHomepage: boolean;
  showInNavbar: boolean;
  showInNavDropdown?: boolean;
  allowPublicDetail: boolean;

  // Ordering
  servicesPageOrder: number;
  homepageOrder: number;
  navbarOrder: number;
  featuredOrder?: number;
  displayOrder?: number;
  order?: number;
  sortOrder?: number;

  // CTAs
  primaryCtaLabel?: string | null;
  secondaryCtaLabel?: string | null;

  // Category
  categoryId?: string | null;
  category?: ServiceCategory | null;
  categoryName?: string | null;

  // Sub-collections
  offerings?: ServiceOfferingItem[];
  benefits?: ServiceBenefitItem[];
  processSteps?: ServiceProcessStepItem[];
  mediaGallery?: ServiceMediaItem[];
  mediaItems?: ServiceMediaItem[];
  serviceFaqs?: ServiceFaqItem[];
  faqs?: ServiceFaqItem[];
  technologies?: Array<string | ServiceTechnologyItem>;
  caseStudies?: any[];
  relatedServices?: any[];

  // SEO
  seo?: any;
  seoTitle?: string | null;
  metaDescription?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  keywords?: string[];
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterImage?: string | null;
  noIndex?: boolean;
  includeInSitemap?: boolean;

  // Counts & Timestamps
  offeringsCount?: number;
  benefitsCount?: number;
  stepsCount?: number;
  mediaCount?: number;
  faqsCount?: number;
  leadsCount?: number;
  caseStudiesCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceKpiStats {
  total: number;
  published: number;
  draft: number;
  featured: number;
  categories?: number;
  comingSoon?: number;
  archived: number;
}

export interface AdminServiceListResponse {
  data: ServiceRecord[];
  kpi: ServiceKpiStats;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
