'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Globe } from 'lucide-react';
import { Logo } from './Logo';
import {
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
} from './SocialIcons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mrm-glass-footer text-slate-700 dark:text-slate-300 pt-16 pb-12 transition-colors duration-150 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column + Brand Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200 dark:border-[#103B68]/70">
          {/* Brand Info (Span 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="dark" size="lg" />
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
              Building innovative software products and delivering high-impact digital solutions for modern businesses and organizations worldwide.
            </p>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
                <a
                  href="mailto:contact@mrminfotech.com"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  contact@mrminfotech.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
                <a
                  href="https://mrminfotech.com"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  https://mrminfotech.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com/mrminfotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#087FC4] dark:hover:bg-[#087FC4] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/mrminfotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#087FC4] dark:hover:bg-[#087FC4] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/mrminfotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#087FC4] dark:hover:bg-[#087FC4] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/mrminfotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-[#103B68]/70 hover:bg-[#087FC4] dark:hover:bg-[#087FC4] flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all backdrop-blur-xs border border-slate-300/40 dark:border-white/10"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
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
                <Link href="/about#team" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Our Team
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
              Services & Resources
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
                  Projects & Portfolio
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Blog & Insights
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {currentYear} MRM InfoTech Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms & Conditions
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
