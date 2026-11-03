import React from 'react';
import Link from 'next/link';
import { Home, Compass, Mail, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-white dark:bg-[#07162C] text-slate-900 dark:text-white transition-colors duration-150">
      <div className="max-w-xl w-full text-center bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#087FC4]/10 dark:bg-[#087FC4]/20 border border-[#087FC4]/20 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center shadow-inner">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5] text-xs font-bold uppercase tracking-wider mb-4 border border-[#087FC4]/20">
          <span>404 • Resource Not Found</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto leading-relaxed">
          The page or architectural resource you requested does not exist, has been removed, or has been relocated to another URL.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#087FC4] hover:bg-[#06659c] text-white font-bold text-sm transition-all shadow-md shadow-[#087FC4]/20 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] text-slate-800 dark:text-slate-200 hover:border-[#087FC4] dark:hover:border-[#20B8D5] font-semibold text-sm transition-all shadow-xs cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
            <span>Explore Services</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] text-slate-800 dark:text-slate-200 hover:border-[#087FC4] dark:hover:border-[#20B8D5] font-semibold text-sm transition-all shadow-xs cursor-pointer"
          >
            <Mail className="w-4 h-4 text-emerald-500" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
