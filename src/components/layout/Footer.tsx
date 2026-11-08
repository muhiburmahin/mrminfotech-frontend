import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import type { CompanyProfile, NavigationMenu } from '@/lib/api/types';
import {
  FALLBACK_COMPANY_PROFILE,
  FALLBACK_FOOTER_COMPANY,
  FALLBACK_FOOTER_LEGAL,
  FALLBACK_PRODUCTS,
} from '@/lib/api/public';

interface FooterProps {
  company?: CompanyProfile | null;
  companyMenu?: NavigationMenu | null;
  legalMenu?: NavigationMenu | null;
}

export function Footer({
  company = FALLBACK_COMPANY_PROFILE,
  companyMenu = FALLBACK_FOOTER_COMPANY,
  legalMenu = FALLBACK_FOOTER_LEGAL,
}: FooterProps) {
  const profile = company || FALLBACK_COMPANY_PROFILE;
  const cMenu = companyMenu || FALLBACK_FOOTER_COMPANY;
  const lMenu = legalMenu || FALLBACK_FOOTER_LEGAL;
  const currentYear = 2026;

  const coreServices = [
    { name: 'Custom Software Development', href: '/services/custom-software-development' },
    { name: 'Enterprise ERP Solutions', href: '/services/enterprise-erp-solutions' },
    { name: 'Cloud & DevOps Infrastructure', href: '/services/cloud-devops-infrastructure' },
    { name: 'AI & Machine Learning Solutions', href: '/services/ai-machine-learning-solutions' },
    { name: 'E-Commerce & FinTech Platforms', href: '/services/ecommerce-fintech-platforms' },
    { name: 'Cybersecurity & Compliance', href: '/services/cybersecurity-compliance' },
  ];

  const getLabel = (labelObj: Record<string, string> | string | undefined): string => {
    if (!labelObj) return '';
    if (typeof labelObj === 'string') return labelObj;
    return labelObj.en || Object.values(labelObj)[0] || '';
  };

  return (
    <footer className="bg-[#040D1A] text-slate-300 border-t border-[#1E3557] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#1E3557]/80">
          {/* Column 1: Company Profile & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black text-white tracking-tight">
                MRM <span className="text-[#00C2FF]">InfoTech</span>
              </span>
              <p className="text-[10px] font-semibold tracking-widest text-[#00C2FF] uppercase mt-0.5">
                IDEAS • PRODUCTS • IMPACT
              </p>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {profile.description ||
                'Leading software architecture and enterprise technology provider delivering scalable digital products and custom engineering solutions.'}
            </p>
            <div className="pt-2 space-y-2.5 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#00C2FF] shrink-0" />
                <span>{profile.headquarters || 'Dhaka, Bangladesh'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00C2FF] shrink-0" />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-white transition-colors"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00C2FF] shrink-0" />
                <a
                  href={`tel:${profile.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {profile.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Flagship SaaS Products */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C2FF]"></span>
              Our Products
            </h3>
            <ul className="space-y-3 text-sm">
              {FALLBACK_PRODUCTS.map((prod) => (
                <li key={prod.slug}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="group block p-2 -mx-2 rounded-md hover:bg-[#0B1E3B] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200 group-hover:text-[#00C2FF] transition-colors">
                        {prod.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-medium bg-[#0052CC]/20 text-cyan-300 border border-cyan-500/20">
                        {prod.stage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {prod.tagline}
                    </p>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C2FF] hover:text-cyan-300 transition-colors"
                >
                  <span>Explore all products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Engineering Services */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0052CC]"></span>
              Core Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {coreServices.map((svc) => (
                <li key={svc.href}>
                  <Link
                    href={svc.href}
                    className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all inline-block"
                  >
                    {svc.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C2FF] hover:text-cyan-300 transition-colors"
                >
                  <span>All 14 specialized services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company Links from Menu */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Company & Impact
            </h3>
            <ul className="space-y-2.5 text-sm">
              {cMenu.items.map((item) => (
                <li key={item.id || item.href}>
                  <Link
                    href={item.href || '/about'}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {getLabel(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                href="/start-project"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors border border-blue-400/20"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {currentYear} MRM InfoTech. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Dhaka, Bangladesh</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {lMenu.items.map((item) => (
              <Link
                key={item.id || item.href}
                href={item.href || '/privacy-policy'}
                className="hover:text-slate-300 transition-colors"
              >
                {getLabel(item.label)}
              </Link>
            ))}
            <Link
              href="/security"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enterprise Security</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
