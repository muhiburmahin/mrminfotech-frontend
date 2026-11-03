import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-white dark:bg-[#07162C] transition-colors duration-150">
      <div className="relative flex items-center justify-center">
        {/* Outer pulsating ring */}
        <div className="w-16 h-16 rounded-full border-4 border-[#087FC4]/20 border-t-[#087FC4] animate-spin" />
        {/* Inner brand glow dot */}
        <div className="absolute w-5 h-5 rounded-full bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] animate-pulse shadow-md shadow-[#087FC4]/40" />
      </div>
      <div className="mt-5 text-center space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-[#087FC4] dark:text-[#20B8D5]">
          MRM InfoTech
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Loading platform content...
        </p>
      </div>
    </div>
  );
}
