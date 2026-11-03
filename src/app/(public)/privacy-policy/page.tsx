import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | MRM InfoTech Ltd.',
  description: 'Privacy Policy and data governance principles for MRM InfoTech Ltd.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
            Governance & Privacy
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            At <strong>MRM InfoTech Ltd.</strong> (&ldquo;MRM InfoTech&rdquo;, &ldquo;we&rdquo;,
            &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we take your privacy and institutional data
            security seriously. This policy describes how we collect, store, and process personal
            and organizational data through our corporate website and proprietary software products
            such as <em>EduManage BD</em> and <em>MediSheba BD</em>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">1. Data We Collect</h2>
          <p>
            We collect personal details submitted through our contact and project inquiry forms
            (including your full name, work email address, telephone number, and company name). For
            our hosted SaaS clients, data is strictly processed according to the relevant institutional
            licensing agreements and tenant isolation protocols.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">2. Use of Information</h2>
          <p>
            Data provided is used solely for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Responding to technical inquiries and providing architectural proposals.</li>
            <li>Operating, maintaining, and enhancing the security of our platforms.</li>
            <li>Complying with statutory and regulatory mandates under the laws of Bangladesh.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">3. Data Sovereignty & Security</h2>
          <p>
            We enforce strict database-level constraints, TLS encryption in transit, and robust
            access control policies. We do not sell, rent, or lease personal or client data to
            third-party marketers under any circumstances.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">4. Contact Information</h2>
          <p>
            For privacy inquiries or data access requests, please contact our Data Protection
            Officer at{' '}
            <a href="mailto:privacy@mrminfotech.com" className="text-[#087FC4] dark:text-[#00C2FF] font-bold">
              privacy@mrminfotech.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

