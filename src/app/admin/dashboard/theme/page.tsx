import React from 'react';
import type { Metadata } from 'next';
import { ThemeManagement } from '@/components/admin/ThemeManagement';

export const metadata: Metadata = {
  title: 'Theme Management | MRM InfoTech Admin',
  description: 'Manage and apply the global website theme across all public pages.',
};

export default function AdminThemePage() {
  return (
    <div className="space-y-6">
      <ThemeManagement />
    </div>
  );
}
