import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Server, Key, Eye, FileCode2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Security Architecture | MRM InfoTech',
  description:
    'Overview of MRM InfoTech’s security standards, OWASP compliance, and data sovereignty safeguards.',
};

export default function SecurityPage() {
  const securityPillars = [
    {
      title: 'OWASP Top 10 Mitigation',
      desc: 'Active defenses against SQL injection, XSS, CSRF, broken access control, and SSRF enforced directly at middleware and schema layers.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: 'Cryptographic Hashing & Secrets',
      desc: 'Argon2 / high-cost bcrypt password hashing with dedicated IP-bound salt mechanisms and timed token expiration.',
      icon: <Lock className="w-6 h-6 text-[#0052CC]" />,
    },
    {
      title: 'PostgreSQL Relational Constraints',
      desc: 'CHECK constraints, foreign key cascades, and unique indexes executed at the database engine level to eliminate corrupt state.',
      icon: <Server className="w-6 h-6 text-[#00C2FF]" />,
    },
    {
      title: 'HttpOnly Secure Session Cookies',
      desc: 'Protection against client-side script credential theft through SameSite-isolated, HttpOnly session tokens.',
      icon: <Key className="w-6 h-6 text-amber-500" />,
    },
    {
      title: 'Audit Logging & Observability',
      desc: 'Tamper-resistant audit trails tracking administrative operations, privilege elevations, and data mutations.',
      icon: <Eye className="w-6 h-6 text-purple-500" />,
    },
    {
      title: 'Zero Unsanitized Execution',
      desc: 'Strict Zod / class-validator data transformation pipelines stripping unauthorized payload properties across all endpoints.',
      icon: <FileCode2 className="w-6 h-6 text-cyan-600" />,
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      <section className="bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] pt-20 pb-16 border-b border-[var(--theme-border-glass)] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30 text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Bank-Grade Security</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[var(--theme-text-primary)]">
            Security Architecture & Data Sovereignty
          </h1>
          <p className="text-base text-[var(--theme-text-secondary)]">
            How MRM InfoTech guarantees data integrity, privacy, and system resilience for
            enterprises and public institutions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[var(--theme-bg-canvas)] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 transition-all shadow-lg group"
              >
                <div className="p-3 rounded-xl bg-[var(--theme-bg-card)] border border-[var(--theme-border-glass)] w-fit mb-5 shadow-sm group-hover:scale-105 transition-transform">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--theme-text-primary)] mb-2 group-hover:text-[var(--theme-accent)] transition-colors">{p.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

