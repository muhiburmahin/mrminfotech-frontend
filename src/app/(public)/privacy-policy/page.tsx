import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | MRM InfoTech',
  description: 'Privacy Policy and data governance principles for MRM InfoTech.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      <section className="bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] pt-20 pb-16 border-b border-[var(--theme-border-glass)] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
            Governance & Privacy
          </span>
          <h1 className="text-4xl font-black tracking-tight text-[var(--theme-text-primary)]">Privacy Policy</h1>
          <p className="text-sm text-[var(--theme-text-muted)]">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 bg-[var(--theme-bg-canvas)] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm text-[var(--theme-text-secondary)] leading-relaxed">
          <p>
            At <strong className="text-[var(--theme-text-primary)]">MRM InfoTech</strong> (&ldquo;we&rdquo;,
            &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we take your privacy and institutional data
            security seriously. This policy describes how we collect, store, and process personal
            and organizational data through our corporate website and proprietary software products
            such as <em>EduManage BD</em> and <em>MediSheba BD</em>.
          </p>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">1. Data We Collect</h2>
          <p>
            We collect personal details submitted through our contact and project inquiry forms
            (including your full name, work email address, telephone number, and company name). For
            our hosted SaaS clients, data is strictly processed according to the relevant institutional
            licensing agreements and tenant isolation protocols.
          </p>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">2. Use of Information</h2>
          <p>
            Data provided is used solely for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Responding to technical inquiries and providing architectural proposals.</li>
            <li>Operating, maintaining, and enhancing the security of our platforms.</li>
            <li>Complying with statutory and regulatory mandates under the laws of Bangladesh.</li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">3. Data Sovereignty & Security</h2>
          <p>
            We enforce strict database-level constraints, TLS encryption in transit, and robust
            access control policies. We do not sell, rent, or lease personal or client data to
            third-party marketers under any circumstances.
          </p>

          <h2 className="text-xl font-bold text-[var(--theme-text-primary)] pt-4">4. Contact Information</h2>
          <p>
            For privacy inquiries or data access requests, please contact our Data Protection
            Officer at{' '}
            <a href="mailto:privacy@mrminfotech.com" className="text-[var(--theme-accent)] font-bold hover:underline">
              privacy@mrminfotech.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

