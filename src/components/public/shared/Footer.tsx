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
    <footer className="mrm-glass-footer text-[var(--theme-text-primary)] pt-16 pb-12 transition-colors duration-150 relative bg-[var(--theme-bg-canvas)] border-t border-[var(--theme-border-glass)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column + Brand Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[var(--theme-border-glass)]">
          {/* Brand Info (Span 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="dark" size="lg" />
            <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed max-w-sm">
              {company.description || FALLBACK_COMPANY_PROFILE.description}
            </p>

            <div className="space-y-2 text-xs text-[var(--theme-text-secondary)]">
              {company.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <a
                    href={`mailto:${company.email}`}
                    className="hover:text-[var(--theme-accent)] transition-colors"
                  >
                    {company.email}
                  </a>
                </div>
              )}

              {company.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <a
                    href={`tel:${company.phone.replace(/\s+/g, '')}`}
                    className="hover:text-[var(--theme-accent)] transition-colors"
                  >
                    {company.phone}
                  </a>
                </div>
              )}

              {(company.address || company.headquarters) && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>{company.address || company.headquarters}</span>
                </div>
              )}

              {company.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--theme-accent)] transition-colors"
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
                  className="w-9 h-9 rounded-xl bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_12px_var(--theme-accent-glow)] cursor-pointer"
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
                  className="w-9 h-9 rounded-xl bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_12px_var(--theme-accent-glow)] cursor-pointer"
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
                  className="w-9 h-9 rounded-xl bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_12px_var(--theme-accent-glow)] cursor-pointer"
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
                  className="w-9 h-9 rounded-xl bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_12px_var(--theme-accent-glow)] cursor-pointer"
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
                  className="w-9 h-9 rounded-xl bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_12px_var(--theme-accent-glow)] cursor-pointer"
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
                  className="w-9 h-9 rounded-xl bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_12px_var(--theme-accent-glow)] cursor-pointer"
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
                  className="w-9 h-9 rounded-xl bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-accent-text)] flex items-center justify-center transition-all border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_12px_var(--theme-accent-glow)] cursor-pointer"
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--theme-text-secondary)]">
              <li>
                <Link href="/about" className="hover:text-[var(--theme-accent)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[var(--theme-accent)] transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/about#process" className="hover:text-[var(--theme-accent)] transition-colors">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[var(--theme-accent)] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--theme-accent)] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--theme-text-secondary)]">
              <li>
                <Link href="/products/edumanage-bd" className="hover:text-[var(--theme-accent)] transition-colors">
                  EduManage BD
                </Link>
              </li>
              <li>
                <Link href="/products/medisheba-bd" className="hover:text-[var(--theme-accent)] transition-colors">
                  MediSheba BD
                </Link>
              </li>
              <li>
                <Link href="/products/multi-institution-platform" className="hover:text-[var(--theme-accent)] transition-colors">
                  Multi-Institution Platform
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[var(--theme-accent)] hover:underline transition-colors font-bold">
                  All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">
              Services &amp; Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--theme-text-secondary)]">
              <li>
                <Link href="/services/web-development" className="hover:text-[var(--theme-accent)] transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/custom-software-development" className="hover:text-[var(--theme-accent)] transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/services/saas-development" className="hover:text-[var(--theme-accent)] transition-colors">
                  SaaS Solutions
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[var(--theme-accent)] transition-colors">
                  Projects &amp; Portfolio
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-[var(--theme-accent)] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[var(--theme-accent)] transition-colors">
                  Blog &amp; Insights
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--theme-text-secondary)]/70 gap-4">
          <p>{company.copyrightText?.startsWith('©') ? company.copyrightText : `© ${currentYear} ${company.legalName || 'MRM InfoTech'} All rights reserved.`}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[var(--theme-accent)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--theme-accent)] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/cookie-policy" className="hover:text-[var(--theme-accent)] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
