import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { DesignSystemProvider } from '@/components/providers/DesignSystemProvider';
import { DEFAULT_THEME_ID, isValidThemeId, ThemeId } from '@/lib/theme/themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mrminfotech.com'),
  title: {
    default: 'MRM InfoTech — IDEAS • PRODUCTS • IMPACT | Enterprise Software & Cloud Platforms',
    template: '%s | MRM InfoTech',
  },
  description:
    'MRM InfoTech Ltd. develops cloud SaaS platforms (EduManage BD, MediSheba BD) and engineers mission-critical enterprise software solutions with high concurrency, security, and proven architecture in Bangladesh.',
  keywords: [
    'MRM InfoTech',
    'EduManage BD',
    'MediSheba BD',
    'Enterprise Software Bangladesh',
    'Custom Software Development',
    'NestJS Next.js Engineering',
    'SaaS Architecture',
    'ERP Systems Dhaka',
  ],
  authors: [{ name: 'MRM InfoTech Ltd.' }],
  creator: 'MRM InfoTech Ltd.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mrminfotech.com',
    siteName: 'MRM InfoTech',
    title: 'MRM InfoTech — IDEAS • PRODUCTS • IMPACT',
    description:
      'Proprietary cloud SaaS platforms and mission-critical enterprise engineering in Bangladesh.',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

// Immediate blocking script to prevent FOUC (Flash of Unstyled Content)
const themeInitScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('mrm_active_theme_id');
      var validThemes = ['mrm-brand-cyan', 'midnight-lime', 'classic-navy-coral', 'forest-purple', 'it-blue'];
      if (savedTheme && validThemes.indexOf(savedTheme) !== -1) {
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'mrm-brand-cyan');
      }
      var savedMode = localStorage.getItem('mrm_theme_mode');
      if (savedMode === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-mode', 'light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.setAttribute('data-mode', 'dark');
      }
    } catch (e) {}
  })();
`;

async function getActiveTheme(): Promise<ThemeId> {
  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:5000/api/v1';
    const res = await fetch(`${apiUrl}/site-settings`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const json = await res.json();
      const settings = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
      const themeSetting = settings.find((s: { key: string }) => s.key === 'theme.active');
      if (themeSetting?.value && isValidThemeId(themeSetting.value)) {
        return themeSetting.value as ThemeId;
      }
    }
  } catch {
    // Backend offline or building statically
  }
  return DEFAULT_THEME_ID;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTheme = await getActiveTheme();

  return (
    <html
      lang="en"
      data-theme={initialTheme}
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] font-sans antialiased selection:bg-[var(--theme-accent)] selection:text-[var(--theme-accent-text)] transition-colors duration-150"
      >
        <DesignSystemProvider>
          <ThemeProvider initialThemeId={initialTheme}>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
