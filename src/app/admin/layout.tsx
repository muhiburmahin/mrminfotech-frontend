import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MRM InfoTech Admin CMS',
  description: 'Enterprise Administrative Dashboard & Content Management System',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#040D1A] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {children}
    </div>
  );
}
