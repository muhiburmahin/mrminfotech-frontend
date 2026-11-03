import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | MRM InfoTech Ltd.',
  description: 'Information regarding cookie usage on MRM InfoTech Ltd. websites.',
};

export default function CookiePolicyPage() {
  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
            Browser Storage & Privacy
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Cookie Policy</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>MRM InfoTech Ltd.</strong> uses minimal, essential cookies and local browser
            storage strictly necessary for system authentication, CSRF security, and user session
            continuity.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">1. Essential Security Cookies</h2>
          <p>
            Our backend utilizes secure, encrypted <code>HttpOnly</code>, <code>SameSite=Lax</code>{' '}
            session cookies (such as <code>mrm_session</code>) to safeguard administrative logins
            and prevent cross-site request forgery attacks.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">2. No Third-Party Tracking</h2>
          <p>
            We do not sell advertising tracking cookies or deploy intrusive cross-site behavior
            monitors. Our priority is operational speed and sovereign data privacy.
          </p>
        </div>
      </section>
    </div>
  );
}

