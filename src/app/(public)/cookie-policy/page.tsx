import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | MRM InfoTech',
  description: 'Information regarding cookie usage on MRM InfoTech websites.',
};

export default function CookiePolicyPage() {
  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      <section className="bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] pt-20 pb-16 border-b border-[var(--theme-border-glass)] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
            Browser Storage & Privacy
          </span>
          <h1 className="text-4xl font-black tracking-tight text-[var(--theme-text-primary)]">Cookie Policy</h1>
          <p className="text-sm text-[var(--theme-text-muted)]">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 bg-[var(--theme-bg-canvas)] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm text-[var(--theme-text-secondary)] leading-relaxed">
          <p>
            <strong className="text-[var(--theme-text-primary)]">MRM InfoTech</strong> uses minimal, essential cookies and local browser
            storage strictly necessary for system authentication, CSRF security, and user session
            continuity.
          </p>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">1. Essential Security Cookies</h2>
          <p>
            Our backend utilizes secure, encrypted <code className="px-1.5 py-0.5 rounded bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] text-[var(--theme-accent)]">HttpOnly</code>, <code className="px-1.5 py-0.5 rounded bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] text-[var(--theme-accent)]">SameSite=Lax</code>{' '}
            session cookies (such as <code className="px-1.5 py-0.5 rounded bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] text-[var(--theme-accent)]">mrm_session</code>) to safeguard administrative logins
            and prevent cross-site request forgery attacks.
          </p>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">2. No Third-Party Tracking</h2>
          <p>
            We do not sell advertising tracking cookies or deploy intrusive cross-site behavior
            monitors. Our priority is operational speed and sovereign data privacy.
          </p>
        </div>
      </section>
    </div>
  );
}

