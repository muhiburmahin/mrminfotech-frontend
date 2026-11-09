import type { Metadata } from 'next';

export const SITE_NAME = 'MRM InfoTech';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mrminfotech.com').replace(/\/$/, '');

/** Default social card (1024x390 banner shipped in /public). */
export const DEFAULT_OG_IMAGE = { url: '/banner.jpg', width: 1024, height: 390, alt: `${SITE_NAME} — software engineering and digital solutions` };

/**
 * The root layout applies the `%s | MRM InfoTech` template, so a page title must not repeat the brand.
 * This strips a trailing "| MRM InfoTech" (and the em-dash variant) to avoid "X | MRM InfoTech | MRM InfoTech".
 */
export function cleanTitle(title: string): string {
  return title.replace(/\s*[|—-]\s*MRM InfoTech\s*$/i, '').trim();
}

/** Descriptions beyond ~160 characters are truncated in search results. */
export function clampDescription(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 80 ? cut.lastIndexOf(' ') : cut.length).trim()}…`;
}

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/services". Used for canonical + og:url. */
  path: string;
  /** Absolute canonical from the CMS; overrides `path` for the canonical link only. */
  canonical?: string;
  image?: { url: string; width?: number; height?: number; alt?: string } | null;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
}

/**
 * Builds complete page metadata (title, description, canonical, Open Graph, Twitter).
 * Next replaces — not merges — nested keys such as `openGraph`, so every page must supply the full set.
 */
export function buildMetadata({
  title,
  description,
  path,
  canonical,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  publishedTime,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const pageTitle = cleanTitle(title);
  const fullTitle = `${pageTitle} | ${SITE_NAME}`;
  const desc = clampDescription(description);
  const images = image ? [image] : undefined;

  return {
    title: pageTitle,
    description: desc,
    alternates: { canonical: canonical || path },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description: desc,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}
