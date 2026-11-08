'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[MRM Critical Root Error]:', error);
  }, [error]);

  return (
    <html lang="en" className="dark" data-theme="it-blue">
      <body className="min-h-screen flex items-center justify-center bg-[#050C1A] text-[#F8FAFC] p-6 font-sans antialiased">
        <div className="max-w-md w-full text-center bg-[#0F1D36] border border-blue-500/20 rounded-2xl p-8 shadow-2xl">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-2">
            MRM InfoTech • Critical Recovery
          </p>
          <h1 className="text-2xl font-extrabold mb-3 text-white">
            Application Temporarily Unavailable
          </h1>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            A critical rendering error occurred. Please click below to reload and restore the application.
          </p>
          {error?.digest && (
            <p className="text-xs font-mono text-slate-400 mb-6 bg-black/40 py-1.5 px-3 rounded-lg inline-block border border-slate-700">
              Ref: {error.digest}
            </p>
          )}
          <div className="flex justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm cursor-pointer shadow-lg shadow-blue-600/30 transition-all"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
