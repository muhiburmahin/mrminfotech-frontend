import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inquiries & Leads | MRM InfoTech Admin',
};

export default function AdminInquiriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Client Inquiries & Project Requests</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review incoming leads from &ldquo;Start a Project&rdquo; and contact forms.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-slate-600 dark:text-slate-300 text-sm text-center">
        No unread project inquiries at this time.
      </div>
    </div>
  );
}
