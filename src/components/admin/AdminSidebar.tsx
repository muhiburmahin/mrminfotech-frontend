'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  FolderGit2,
  FileText,
  Mail,
  Palette,
  ExternalLink,
  LogOut,
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/dashboard/products', icon: Package },
    { label: 'Services', href: '/admin/dashboard/services', icon: Layers },
    { label: 'Projects', href: '/admin/dashboard/projects', icon: FolderGit2 },
    { label: 'Blog Posts', href: '/admin/dashboard/blog', icon: FileText },
    { label: 'Inquiries', href: '/admin/dashboard/inquiries', icon: Mail },
    { label: 'Settings & Theme', href: '/admin/dashboard/settings', icon: Palette },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#07162C] border-r border-slate-200 dark:border-[#1E3557] flex flex-col justify-between shrink-0 transition-colors duration-150">
      <div>
        <div className="h-16 flex items-center px-5 border-b border-slate-200 dark:border-[#1E3557]">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#07162C] ring-1 ring-slate-900/10 dark:ring-white/15 shrink-0 flex items-center justify-center">
              <Image
                src="/logo-icon.png"
                alt="MRM InfoTech Emblem"
                width={32}
                height={32}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                  MRM <span className="text-[#087FC4] dark:text-[#20B8D5]">CMS</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-[#087FC4] text-white">
                  Admin
                </span>
              </div>
              <span className="text-[8.5px] font-medium tracking-wider uppercase text-slate-400">
                Control Panel
              </span>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#087FC4] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0B1E3B]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-[#1E3557] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0B1E3B] rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
          <span>View Public Site</span>
        </Link>
        <Link
          href="/admin/login"
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
