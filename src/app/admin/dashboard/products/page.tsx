import React from 'react';
import type { Metadata } from 'next';
import { ProductForm } from '@/components/admin/forms/ProductForm';

export const metadata: Metadata = {
  title: 'Products Management | MRM InfoTech Admin',
};

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">SaaS Products Management</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Add, configure, and publish proprietary SaaS engines (EduManage BD, MediSheba BD).
        </p>
      </div>

      <ProductForm />
    </div>
  );
}
