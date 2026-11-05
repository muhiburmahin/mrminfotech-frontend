import React from 'react';
import { Navbar } from '@/components/public/shared/Navbar';
import { Footer } from '@/components/public/shared/Footer';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-[#0B0B0C] text-[#FFFFFF] transition-colors duration-150">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
