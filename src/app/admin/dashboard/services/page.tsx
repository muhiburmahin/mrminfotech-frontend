import React from 'react';
import type { Metadata } from 'next';
import { ServiceForm } from '@/components/admin/forms/ServiceForm';

export const metadata: Metadata = {
  title: 'Services Management | MRM InfoTech Admin',
};

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Client Services Management</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage and edit the 14 enterprise capabilities and engineering disciplines.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}
