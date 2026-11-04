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
  ShieldCheck,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: string;
  badge?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export function AdminSidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { user, logout, hasPermission } = useAuth();

  const navigationGroups: NavGroup[] = [
    {
      group: 'Core',
      items: [
        { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'Content & Catalog',
      items: [
        {
          label: 'Products',
          href: '/admin/dashboard/products',
          icon: Package,
          permission: 'content:read',
        },
        {
          label: 'Services',
          href: '/admin/dashboard/services',
          icon: Layers,
          permission: 'content:read',
        },
        {
          label: 'Projects',
          href: '/admin/dashboard/projects',
          icon: FolderGit2,
          permission: 'content:read',
        },
        {
          label: 'Blog Posts',
          href: '/admin/dashboard/blog',
          icon: FileText,
          permission: 'content:read',
        },
      ],
    },
    {
      group: 'Client Inquiries',
      items: [
        {
          label: 'Inquiries & Leads',
          href: '/admin/dashboard/inquiries',
          icon: Mail,
          permission: 'lead:read',
        },
      ],
    },
    {
      group: 'Security & System',
      items: [
        {
          label: 'Security & 2FA',
          href: '/admin/dashboard/security',
          icon: ShieldCheck,
          badge: user?.twoFactorEnabled ? '2FA On' : undefined,
        },
        {
          label: 'Settings & Theme',
          href: '/admin/dashboard/settings',
          icon: Palette,
          permission: 'setting:read',
        },
      ],
    },
  ];

  const roleLabel =
    typeof user?.role === 'object' && user?.role?.name
      ? user.role.name
      : typeof user?.role === 'string'
      ? user.role
      : 'Admin';

  return (
    <aside className="w-64 bg-white dark:bg-[#07162C] border-r border-slate-200 dark:border-[#1E3557] flex flex-col justify-between shrink-0 h-full transition-colors duration-150 select-none">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 dark:border-[#1E3557] shrink-0">
          <Link
            href="/admin/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5"
          >
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
                  {roleLabel}
                </span>
              </div>
              <span className="text-[8.5px] font-medium tracking-wider uppercase text-slate-400">
                Control Panel
              </span>
            </div>
          </Link>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0B1E3B]"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Grouped Navigation */}
        <nav className="p-3.5 space-y-6">
          {navigationGroups.map((group) => {
            const visibleItems = group.items.filter(
              (item) => !item.permission || hasPermission(item.permission)
            );

            if (visibleItems.length === 0) return null;

            return (
              <div key={group.group} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  {group.group}
                </div>
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === '/admin/dashboard'
                      ? pathname === '/admin/dashboard'
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#0052CC] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0B1E3B]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer System Actions */}
      <div className="p-3.5 border-t border-slate-200 dark:border-[#1E3557] space-y-1 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0B1E3B] rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
            <span>Public Site</span>
          </div>
          <span className="text-[10px] text-slate-400">↗</span>
        </Link>

        <button
          type="button"
          onClick={() => logout()}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
