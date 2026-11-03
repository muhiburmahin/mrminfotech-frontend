'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/public/shared/ThemeToggle';

export function AdminHeader() {
  return (
    <header className="h-16 bg-white dark:bg-[#071A35] border-b border-slate-200 dark:border-[#1E3557] px-6 flex items-center justify-between transition-colors duration-150">
      <div className="flex items-center gap-3 w-72">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Single-Click Theme Toggle in Admin Header */}
        <ThemeToggle />

        <button
          type="button"
          className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#07162C] transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-[#087FC4] dark:bg-[#20B8D5] absolute top-1.5 right-1.5" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-[#1E3557]">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] flex items-center justify-center text-[#087FC4] dark:text-[#20B8D5] font-bold text-xs">
            A
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-slate-800 dark:text-white">Super Admin</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">admin@mrminfotech.com</div>
          </div>
        </div>
      </div>
    </header>
  );
}
