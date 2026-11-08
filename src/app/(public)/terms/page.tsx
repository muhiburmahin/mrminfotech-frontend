import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | MRM InfoTech',
  description: 'Terms of Service governing the use of MRM InfoTech websites and applications.',
};

export default function TermsPage() {
  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      <section className="bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] pt-20 pb-16 border-b border-[var(--theme-border-glass)] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
            Legal Terms
          </span>
          <h1 className="text-4xl font-black tracking-tight text-[var(--theme-text-primary)]">Terms of Service</h1>
          <p className="text-sm text-[var(--theme-text-muted)]">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 bg-[var(--theme-bg-canvas)] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm text-[var(--theme-text-secondary)] leading-relaxed">
          <p>
            Welcome to <strong className="text-[var(--theme-text-primary)]">MRM InfoTech</strong>. By accessing or using our websites,
            APIs, and digital services, you agree to comply with and be bound by the following terms
            and conditions.
          </p>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">1. Use of Services</h2>
          <p>
            You agree to use our digital assets and services strictly for lawful purposes and in
            accordance with all applicable national and international regulations. Unauthorized
            penetration testing, scraping, or denial-of-service attempts against our infrastructure
            are strictly prohibited and subject to legal prosecution.
          </p>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">2. Intellectual Property</h2>
          <p>
            All trademarks, logos, codebases, and product designs—including <em>MRM InfoTech</em>,{' '}
            <em>EduManage BD</em>, and <em>MediSheba BD</em>—are the exclusive intellectual property
            of MRM InfoTech unless explicitly assigned via a custom enterprise engineering
            contract.
          </p>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">3. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, MRM InfoTech shall not be liable for
            any indirect, incidental, special, or consequential damages resulting from the use or
            inability to use our services outside of agreed service level agreements (SLAs).
          </p>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">4. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the People’s
            Republic of Bangladesh, without regard to its conflict of law provisions.
          </p>
        </div>
      </section>
    </div>
  );
}

