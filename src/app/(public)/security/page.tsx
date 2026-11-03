import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Server, Key, Eye, FileCode2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Security Architecture | MRM InfoTech Ltd.',
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
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-[#0B1E3B] border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Bank-Grade Security</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Security Architecture & Data Sovereignty
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300">
            How MRM InfoTech Ltd. guarantees data integrity, privacy, and system resilience for
            enterprises and public institutions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] hover:border-[#087FC4] dark:hover:border-[#00C2FF] transition-all shadow-sm"
              >
                <div className="p-3 rounded-xl bg-white dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] w-fit mb-5 shadow-sm">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

