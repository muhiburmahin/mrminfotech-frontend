'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  HeartPulse,
  Building2,
  Code2,
  Cpu,
  Layers,
  Layout,
  Briefcase,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop active dropdown state: 'products' | 'services' | 'projects' | null
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'services' | 'projects' | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Mobile accordion states
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  // Safe hover handlers with invisible bridge so cursor never drops dropdown
  const handleMouseEnter = (menuKey: 'products' | 'services' | 'projects') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleDropdown = (menuKey: 'products' | 'services' | 'projects') => {
    setActiveDropdown((prev) => (prev === menuKey ? null : menuKey));
  };

  // Products Mega Menu Data
  const products = [
    {
      name: 'EduManage BD',
      category: 'Education ERP',
      desc: 'Complete School, College & University management with grading, attendance & fees.',
      href: '/products/edumanage-bd',
      icon: GraduationCap,
      color: '#087FC4',
      badge: 'Live',
    },
    {
      name: 'MediSheba BD',
      category: 'Healthcare ERP',
      desc: 'Clinical, diagnostic & pathology management system with barcode report tracking.',
      href: '/products/medisheba-bd',
      icon: HeartPulse,
      color: '#20B8D5',
      badge: 'Live',
    },
    {
      name: 'Multi-Institution Platform',
      category: 'Institutional SaaS',
      desc: 'Centralized multi-tenant portal for chain schools and institutional clusters.',
      href: '/products/multi-institution-platform',
      icon: Building2,
      color: '#103B68',
      badge: 'Enterprise',
    },
  ];

  // Services Menu Data
  const services = [
    { name: 'Web Application Development', desc: 'Modern, reactive web systems', href: '/services/web-development', icon: Code2 },
    { name: 'Custom Software Development', desc: 'Bespoke enterprise engineering', href: '/services/custom-software-development', icon: Cpu },
    { name: 'SaaS & Cloud Platforms', desc: 'Multi-tenant scalable architectures', href: '/services/saas-development', icon: Layers },
    { name: 'Mobile App Development', desc: 'High-performance iOS & Android', href: '/services/mobile-apps', icon: Smartphone },
    { name: 'UI/UX & Product Design', desc: 'User-centric wireframes & interfaces', href: '/services/ui-ux-design', icon: Layout },
    { name: 'Cybersecurity & Compliance', desc: 'Data protection & security audits', href: '/services/cybersecurity', icon: ShieldCheck },
  ];

  // Projects Menu Data
  const projects = [
    { name: 'All Case Studies & Projects', desc: 'Explore all delivered solutions', href: '/projects', icon: Briefcase },
    { name: 'Web Applications', desc: 'High-traffic commercial platforms', href: '/projects?category=web', icon: Code2 },
    { name: 'SaaS Platforms', desc: 'Multi-tenant cloud applications', href: '/projects?category=saas', icon: Layers },
    { name: 'Enterprise Systems', desc: 'Mission-critical software systems', href: '/projects?category=software', icon: Cpu },
  ];

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'mrm-glass-nav'
          : 'bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on Left */}
          <Logo variant="dark" size="md" onClick={closeAll} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1" aria-label="Main Navigation">
            {/* 1. Home */}
            <Link
              href="/"
              onClick={closeAll}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                pathname === '/'
                  ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                  : 'text-[#15243A] dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/30'
              }`}
            >
              Home
            </Link>

            {/* 2. About Us */}
            <Link
              href="/about"
              onClick={closeAll}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                pathname.startsWith('/about')
                  ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                  : 'text-[#15243A] dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/30'
              }`}
            >
              About Us
            </Link>

            {/* 3. Products (Mega Menu Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('products')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  activeDropdown === 'products' || pathname.startsWith('/products')
                    ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                    : 'text-[#15243A] dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/30'
                }`}
                aria-expanded={activeDropdown === 'products'}
                aria-haspopup="true"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'products' ? 'rotate-180 text-[#087FC4] dark:text-[#20B8D5]' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'products' && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-[680px] rounded-2xl mrm-glass-strong shadow-2xl p-5">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3EAF2] dark:border-[#1E3557]">
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
                          Proprietary Software Products
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Enterprise cloud software built and maintained by MRM InfoTech
                        </p>
                      </div>
                      <Link
                        href="/products"
                        onClick={closeAll}
                        className="text-xs font-semibold text-[#087FC4] dark:text-[#20B8D5] hover:underline flex items-center gap-1 group"
                      >
                        <span>All Products</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {products.map((p) => {
                        const IconComp = p.icon;
                        return (
                          <Link
                            key={p.name}
                            href={p.href}
                            onClick={closeAll}
                            className="flex flex-col p-3.5 rounded-xl border border-slate-100 dark:border-[#1E3557]/80 hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B] transition-all group"
                          >
                            <div className="flex items-center justify-between mb-2.5">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs"
                                style={{ backgroundColor: p.color }}
                              >
                                <IconComp className="w-4 h-4" />
                              </div>
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#103B68] text-slate-700 dark:text-slate-200">
                                {p.badge}
                              </span>
                            </div>
                            <h5 className="text-[13px] font-bold text-[#15243A] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors line-clamp-1">
                              {p.name}
                            </h5>
                            <p className="text-[11px] text-[#66758A] dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                              {p.desc}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Services (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('services')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  activeDropdown === 'services' || pathname.startsWith('/services')
                    ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                    : 'text-[#15243A] dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/30'
                }`}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180 text-[#087FC4] dark:text-[#20B8D5]' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'services' && (
                <div
                  className="absolute left-0 top-full pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-[520px] rounded-2xl mrm-glass-strong shadow-2xl p-4">
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E3EAF2] dark:border-[#1E3557]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
                        Client Engineering Services
                      </span>
                      <Link
                        href="/services"
                        onClick={closeAll}
                        className="text-xs font-semibold text-[#087FC4] dark:text-[#20B8D5] hover:underline flex items-center gap-1 group"
                      >
                        <span>All Services</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {services.map((s) => {
                        const Icon = s.icon;
                        return (
                          <Link
                            key={s.name}
                            href={s.href}
                            onClick={closeAll}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B] border border-transparent hover:border-[#E3EAF2] dark:hover:border-[#1E3557] transition-all group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#F4F8FC] dark:bg-[#103B68] text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center shrink-0 mt-0.5">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <h5 className="text-xs font-semibold text-[#15243A] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors leading-tight">
                                {s.name}
                              </h5>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                {s.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Projects (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('projects')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('projects')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                  activeDropdown === 'projects' || pathname.startsWith('/projects')
                    ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                    : 'text-[#15243A] dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/30'
                }`}
                aria-expanded={activeDropdown === 'projects'}
                aria-haspopup="true"
              >
                <span>Projects</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'projects' ? 'rotate-180 text-[#087FC4] dark:text-[#20B8D5]' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'projects' && (
                <div
                  className="absolute left-0 top-full pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                  onMouseEnter={() => handleMouseEnter('projects')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-[300px] rounded-2xl mrm-glass-strong shadow-2xl p-3">
                    <div className="pb-2 mb-2 border-b border-[#E3EAF2] dark:border-[#1E3557] px-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
                        Portfolio & Proof
                      </span>
                    </div>
                    <div className="space-y-1">
                      {projects.map((p) => {
                        const Icon = p.icon;
                        return (
                          <Link
                            key={p.name}
                            href={p.href}
                            onClick={closeAll}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-[#15243A] dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B] transition-colors group"
                          >
                            <div className="w-6 h-6 rounded-md bg-[#F4F8FC] dark:bg-[#103B68] text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="truncate">{p.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Insights / Blog */}
            <Link
              href="/blog"
              onClick={closeAll}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                pathname.startsWith('/blog')
                  ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                  : 'text-[#15243A] dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/30'
              }`}
            >
              Insights
            </Link>

            {/* 7. Careers */}
            <Link
              href="/careers"
              onClick={closeAll}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                pathname.startsWith('/careers')
                  ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                  : 'text-[#15243A] dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/30'
              }`}
            >
              Careers
            </Link>

            {/* 8. Contact */}
            <Link
              href="/contact"
              onClick={closeAll}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                pathname === '/contact'
                  ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                  : 'text-[#15243A] dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:bg-[#F4F8FC] dark:hover:bg-[#103B68]/30'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right Actions: Theme Toggle + Let's Talk CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-[#087FC4] hover:bg-[#103B68] shadow-xs hover:shadow active:scale-[0.98] transition-all duration-200"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Right Actions: Theme Toggle + Hamburger Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#103B68]/40 focus:outline-none transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mrm-glass-strong border-b border-[var(--border-subtle)] px-4 pt-2 pb-6 space-y-1 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
          <Link
            href="/"
            onClick={closeAll}
            className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
              pathname === '/'
                ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                : 'text-[#15243A] dark:text-slate-200 hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B]'
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={closeAll}
            className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
              pathname.startsWith('/about')
                ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                : 'text-[#15243A] dark:text-slate-200 hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B]'
            }`}
          >
            About Us
          </Link>

          {/* Products Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#15243A] dark:text-slate-200 hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B]"
            >
              <span>Products</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileProductsOpen ? 'rotate-180 text-[#087FC4]' : 'text-slate-400'
                }`}
              />
            </button>
            {mobileProductsOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-[#F4F8FC]/60 dark:bg-[#0B1E3B]/40 rounded-lg">
                {products.map((p) => (
                  <Link
                    key={p.name}
                    href={p.href}
                    onClick={closeAll}
                    className="block px-3 py-2 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[#087FC4] dark:hover:text-[#20B8D5]"
                  >
                    {p.name}
                  </Link>
                ))}
                <Link
                  href="/products"
                  onClick={closeAll}
                  className="block px-3 py-2 rounded-md text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]"
                >
                  View All Products →
                </Link>
              </div>
            )}
          </div>

          {/* Services Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#15243A] dark:text-slate-200 hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B]"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileServicesOpen ? 'rotate-180 text-[#087FC4]' : 'text-slate-400'
                }`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-[#F4F8FC]/60 dark:bg-[#0B1E3B]/40 rounded-lg">
                {services.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    onClick={closeAll}
                    className="block px-3 py-2 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[#087FC4] dark:hover:text-[#20B8D5]"
                  >
                    {s.name}
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={closeAll}
                  className="block px-3 py-2 rounded-md text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]"
                >
                  View All Services →
                </Link>
              </div>
            )}
          </div>

          {/* Projects Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#15243A] dark:text-slate-200 hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B]"
            >
              <span>Projects</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileProjectsOpen ? 'rotate-180 text-[#087FC4]' : 'text-slate-400'
                }`}
              />
            </button>
            {mobileProjectsOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-[#F4F8FC]/60 dark:bg-[#0B1E3B]/40 rounded-lg">
                {projects.map((p) => (
                  <Link
                    key={p.name}
                    href={p.href}
                    onClick={closeAll}
                    className="block px-3 py-2 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[#087FC4] dark:hover:text-[#20B8D5]"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            onClick={closeAll}
            className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
              pathname.startsWith('/blog')
                ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                : 'text-[#15243A] dark:text-slate-200 hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B]'
            }`}
          >
            Insights
          </Link>

          <Link
            href="/careers"
            onClick={closeAll}
            className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
              pathname.startsWith('/careers')
                ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                : 'text-[#15243A] dark:text-slate-200 hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B]'
            }`}
          >
            Careers
          </Link>

          <Link
            href="/contact"
            onClick={closeAll}
            className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
              pathname === '/contact'
                ? 'text-[#087FC4] dark:text-[#20B8D5] font-semibold bg-[#F4F8FC] dark:bg-[#103B68]/40'
                : 'text-[#15243A] dark:text-slate-200 hover:bg-[#F4F8FC] dark:hover:bg-[#0B1E3B]'
            }`}
          >
            Contact
          </Link>

          <div className="pt-3">
            <Link
              href="/start-project"
              onClick={closeAll}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold text-white bg-[#087FC4] hover:bg-[#103B68] shadow-sm transition-colors"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
