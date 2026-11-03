export interface Project {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  sortOrder: number;
  projectWorkStatus: 'IN_DEVELOPMENT' | 'COMPLETED' | 'MAINTENANCE';
  isFeatured: boolean;
  clientName?: string | null;
  frontendTechSummary?: Record<string, unknown> | null;
  backendTechSummary?: Record<string, unknown> | null;
  dbToolsSummary?: Record<string, unknown> | null;
  metrics?: Array<{ label: string; value: string }>;
}
