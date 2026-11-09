import React from 'react';
import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Admin CMS',
  robots: { index: false, follow: false, nocache: true },
  description: 'Enterprise Administrative Dashboard & Content Management System',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-[#040D1A] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
        {children}
      </div>
    </AuthProvider>
  );
}
