import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { DesignSystemProvider } from '@/components/providers/DesignSystemProvider';

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
      var saved = localStorage.getItem('mrm_theme_mode');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-[#0B0B0C] text-[#FFFFFF] font-sans antialiased selection:bg-[#C6F432] selection:text-[#0B0B0C] transition-colors duration-150"
      >
        <DesignSystemProvider>
          <ThemeProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
