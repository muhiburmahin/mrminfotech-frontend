import React from 'react';

export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse p-2">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-64 bg-slate-200 dark:bg-[#1E3557] rounded-lg" />
        <div className="h-4 w-96 bg-slate-200 dark:bg-[#1E3557]/60 rounded-md" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-200 dark:bg-[#1E3557] rounded" />
              <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-[#1E3557]" />
            </div>
            <div className="h-8 w-16 bg-slate-200 dark:bg-[#1E3557] rounded-lg" />
            <div className="h-3 w-32 bg-slate-200 dark:bg-[#1E3557]/60 rounded" />
          </div>
        ))}
      </div>

      {/* Main card skeleton */}
      <div className="p-8 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] space-y-4">
        <div className="h-5 w-48 bg-slate-200 dark:bg-[#1E3557] rounded" />
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full bg-slate-200 dark:bg-[#1E3557]/60 rounded" />
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-[#1E3557]/60 rounded" />
          <div className="h-4 w-4/6 bg-slate-200 dark:bg-[#1E3557]/60 rounded" />
        </div>
      </div>
    </div>
  );
}
