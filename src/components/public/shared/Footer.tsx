'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Globe, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import {
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
  TwitterIcon,
  YoutubeIcon,
  WhatsappIcon,
} from './SocialIcons';
import { getCompanyProfile, FALLBACK_COMPANY_PROFILE } from '@/lib/api/public';
import type { CompanyProfile } from '@/lib/api/types';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [company, setCompany] = useState<CompanyProfile>(FALLBACK_COMPANY_PROFILE);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await getCompanyProfile();
        if (isMounted && data && data.name) {
          setCompany((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err) {
        console.error('Failed to fetch public company profile in Footer:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="mrm-glass-footer text-slate-700 dark:text-slate-300 pt-16 pb-12 transition-colors duration-150 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column + Brand Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200 dark:border-[#103B68]/70">
          {/* Brand Info (Span 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="dark" size="lg" />
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
              {company.description || FALLBACK_COMPANY_PROFILE.description}
            </p>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {company.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5] shrink-0" />
                  <a
                    href={`mailto:${company.email}`}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {company.email}
                  </a>
                </div>
              )}

              {company.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5] shrink-0" />
                  <a
                    href={`tel:${company.phone.replace(/\s+/g, '')}`}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {company.phone}
                  </a>
                </div>
              )}

              {(company.address || company.headquarters) && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5] shrink-0" />
                  <span>{company.address || company.headquarters}</span>
                </div>
              )}

              {company.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5] shrink-0" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {company.website}
                  </a>
                </div>
              )}
            </div>

            {/* Dynamic Social Links Managed from Admin */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {company.facebookUrl && (
                <a
                  href={company.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#1877F2] dark:hover:bg-[#1877F2] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}

              {company.linkedinUrl && (
                <a
                  href={company.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}

              {company.instagramUrl && (
                <a
                  href={company.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#E4405F] dark:hover:bg-[#E4405F] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}

              {company.githubUrl && (
                <a
                  href={company.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#087FC4] dark:hover:bg-[#087FC4] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}

              {company.twitterUrl && (
                <a
                  href={company.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-slate-900 dark:hover:bg-black flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                  aria-label="Twitter / X"
                  title="Twitter / X"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}

              {company.youtubeUrl && (
                <a
                  href={company.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#FF0000] dark:hover:bg-[#FF0000] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}

              {company.whatsapp && (
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#25D366] dark:hover:bg-[#25D366] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <WhatsappIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 1: Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/about#process" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/products/edumanage-bd" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  EduManage BD
                </Link>
              </li>
              <li>
                <Link href="/products/medisheba-bd" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  MediSheba BD
                </Link>
              </li>
              <li>
                <Link href="/products/multi-institution-platform" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Multi-Institution Platform
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#087FC4] dark:text-[#20B8D5] hover:text-[#06659c] dark:hover:text-cyan-300 transition-colors font-medium">
                  All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
              Services &amp; Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/services/web-development" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/custom-software-development" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/services/saas-development" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  SaaS Solutions
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Projects &amp; Portfolio
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Blog &amp; Insights
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {currentYear} {company.copyrightText || `${company.legalName || 'MRM InfoTech Ltd.'} All rights reserved.`}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/cookie-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
