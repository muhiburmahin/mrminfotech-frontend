'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, ShieldCheck, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/public/shared/ThemeToggle';

export function AdminHeader({ onToggleMobileMenu }: { onToggleMobileMenu?: () => void }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = user?.name || user?.fullName || 'Admin User';
  const userEmail = user?.email || 'admin@mrminfotech.com';
  const roleName =
    typeof user?.role === 'object' && user?.role?.name
      ? user.role.name
      : typeof user?.role === 'string'
      ? user.role
      : 'Administrator';

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="h-16 bg-white dark:bg-[#071A35] border-b border-slate-200 dark:border-[#1E3557] px-4 sm:px-6 flex items-center justify-between transition-colors duration-150 shrink-0 select-none z-10">
      {/* Left Section: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onToggleMobileMenu && (
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#07162C]"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search records, products, posts..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5] transition-colors"
          />
        </div>
      </div>

      {/* Right Section: Theme Toggle & Admin Profile Dropdown */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* User Profile Pill & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:pl-2.5 sm:pr-2 sm:py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-[#07162C] border border-transparent hover:border-slate-200 dark:hover:border-[#1E3557] transition-all cursor-pointer"
            aria-label="Admin user menu"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0052CC] to-[#087FC4] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {userInitial}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                {userName}
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">
                {roleName}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Menu Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] shadow-xl py-1.5 z-50 text-xs">
              <div className="px-3.5 py-2 border-b border-slate-100 dark:border-[#1E3557] mb-1">
                <div className="font-bold text-slate-900 dark:text-white truncate">
                  {userName}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {userEmail}
                </div>
                <div className="mt-1.5 inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-[#0052CC] dark:text-[#20B8D5]">
                  {roleName}
                </div>
              </div>

              <Link
                href="/admin/dashboard/security"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0B1E3B] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#087FC4]" />
                <span>Security & 2FA Setup</span>
              </Link>

              <div className="my-1 border-t border-slate-100 dark:border-[#1E3557]" />

              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-500 hover:bg-rose-500/10 transition-colors text-left font-medium cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
