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
  Users,
  Workflow,
} from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { PublicApiService } from '@/services/public-api.service';


const ABOUT_MENU_ITEMS = [
  {
    title: 'Company Overview',
    description: 'Who we are, our story & dual-engine mission.',
    href: '/about',
    icon: Building2,
    badge: 'Core',
  },
  {
    title: 'Our Team',
    description: 'The engineers and minds behind MRM InfoTech.',
    href: '/team',
    icon: Users,
  },
  {
    title: 'How We Work & Process',
    description: 'Our 5-step engineering & delivery workflow.',
    href: '/about#process',
    icon: Workflow,
  },
  {
    title: 'Technology & Ecosystem',
    description: 'Modern stack & scalable architecture standards.',
    href: '/about#technology',
    icon: Code2,
  },
  {
    title: 'Careers at MRM',
    description: 'Join our team & explore open positions.',
    href: '/careers',
    icon: Briefcase,
    badge: 'Hiring',
  },
];

const PRODUCTS_DATA = [
  {
    name: 'EduManage BD',
    category: 'Education ERP',
    desc: 'Complete School, College & University management with grading, attendance & fees.',
    href: '/products/edumanage-bd',
    icon: GraduationCap,
    badge: 'Live',
  },
  {
    name: 'MediSheba BD',
    category: 'Healthcare ERP',
    desc: 'Clinical, diagnostic & pathology management system with barcode report tracking.',
    href: '/products/medisheba-bd',
    icon: HeartPulse,
    badge: 'Live',
  },
  {
    name: 'Multi-Institution Platform',
    category: 'Institutional SaaS',
    desc: 'Centralized multi-tenant portal for chain schools and institutional clusters.',
    href: '/products/multi-institution-platform',
    icon: Building2,
    badge: 'Enterprise',
  },
];

const SERVICES_DATA = [
  { name: 'Web Application Development', desc: 'Modern, reactive web systems', href: '/services/web-development', icon: Code2 },
  { name: 'Custom Software Development', desc: 'Bespoke enterprise engineering', href: '/services/custom-software-development', icon: Cpu },
  { name: 'SaaS & Cloud Platforms', desc: 'Multi-tenant scalable architectures', href: '/services/saas-development', icon: Layers },
  { name: 'Mobile App Development', desc: 'High-performance iOS & Android', href: '/services/mobile-apps', icon: Smartphone },
  { name: 'UI/UX & Product Design', desc: 'User-centric wireframes & interfaces', href: '/services/ui-ux-design', icon: Layout },
  { name: 'Cybersecurity & Compliance', desc: 'Data protection & security audits', href: '/services/cybersecurity', icon: ShieldCheck },
];

const PROJECTS_DATA = [
  { name: 'All Case Studies & Projects', desc: 'Explore all delivered solutions', href: '/projects', icon: Briefcase },
  { name: 'Web Applications', desc: 'High-traffic commercial platforms', href: '/projects?category=web', icon: Code2 },
  { name: 'SaaS Platforms', desc: 'Multi-tenant cloud applications', href: '/projects?category=saas', icon: Layers },
  { name: 'Enterprise Systems', desc: 'Mission-critical software systems', href: '/projects?category=software', icon: Cpu },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop active dropdown state: 'about' | 'products' | 'services' | 'projects' | null
  const [activeDropdown, setActiveDropdown] = useState<'about' | 'products' | 'services' | 'projects' | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Mobile accordion states
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  // Dynamic Navigation Products from CMS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dynamicProducts, setDynamicProducts] = useState<any[]>(PRODUCTS_DATA);

  // Dynamic Navigation Services from CMS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dynamicServices, setDynamicServices] = useState<any[]>(SERVICES_DATA);

  useEffect(() => {
    let active = true;
    PublicApiService.getProducts({ placement: 'nav' })
      .then((items) => {
        if (active && Array.isArray(items) && items.length > 0) {
          setDynamicProducts(items);
        }
      })
      .catch(() => { });

    PublicApiService.getServices({ placement: 'nav' })
      .then((items) => {
        if (active && Array.isArray(items) && items.length > 0) {
          setDynamicServices(
            items.map((s: any) => ({
              name: s.title || s.name,
              desc: s.tagline || s.shortDescription || 'Enterprise digital engineering',
              href: `/services/${s.slug}`,
              icon: getServiceNavIcon(s.icon, s.slug),
            }))
          );
        }
      })
      .catch(() => { });

    return () => {
      active = false;
    };
  }, []);

  const getServiceNavIcon = (iconName?: string, slug?: string) => {
    const s = (iconName || slug || '').toLowerCase();
    if (s.includes('web') || s.includes('globe')) return Code2;
    if (s.includes('software') || s.includes('cpu')) return Cpu;
    if (s.includes('mobile') || s.includes('smartphone')) return Smartphone;
    if (s.includes('ui') || s.includes('ux') || s.includes('palette')) return Layout;
    if (s.includes('sec') || s.includes('shield')) return ShieldCheck;
    return Layers;
  };

  const getProductNavIcon = (slug?: string, catName?: string) => {
    if (slug?.includes('edumanage') || catName?.toLowerCase().includes('edu')) return GraduationCap;
    if (slug?.includes('medisheba') || catName?.toLowerCase().includes('health')) return HeartPulse;
    if (slug?.includes('institution') || catName?.toLowerCase().includes('website')) return Building2;
    return Layers;
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Safe hover handlers with invisible hover bridge
  const handleMouseEnter = (menuKey: 'about' | 'products' | 'services' | 'projects') => {
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

  const toggleDropdown = (menuKey: 'about' | 'products' | 'services' | 'projects') => {
    setActiveDropdown((prev) => (prev === menuKey ? null : menuKey));
  };

  const isAboutActive =
    pathname === '/about' || pathname === '/team' || pathname.startsWith('/careers');
  const isProductsActive = pathname.startsWith('/products');
  const isServicesActive = pathname.startsWith('/services');
  const isProjectsActive = pathname.startsWith('/projects');
  const isInsightsActive = pathname.startsWith('/blog');
  const isContactActive = pathname === '/contact';

  return (
    <>
      {activeDropdown && (
        <div
          className="fixed inset-0 top-16 sm:top-20 bg-black/40 backdrop-blur-xs z-[80] pointer-events-auto transition-opacity duration-200"
          onClick={closeAll}
        />
      )}
      <header
        ref={navRef}
        className={`sticky top-0 z-[90] w-full transition-all duration-200 ${isScrolled
            ? 'bg-[var(--theme-bg-surface)]/95 backdrop-blur-2xl border-b border-[var(--theme-border-glass)] shadow-2xl'
            : 'bg-[var(--theme-bg-surface)]/85 backdrop-blur-xl border-b border-[var(--theme-border-glass)]/60'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo on Left */}
            <Logo variant="dark" size="md" onClick={closeAll} />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {/* 1. Home */}
              <Link
                href="/"
                onClick={closeAll}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all ${pathname === '/'
                    ? 'text-[var(--theme-accent)] bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 shadow-xs'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-white/[0.05]'
                  }`}
              >
                Home
              </Link>

              {/* 2. ABOUT (Tailored Dynamic Glass Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('about')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${activeDropdown === 'about' || isAboutActive
                      ? 'text-[var(--theme-accent)] bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 shadow-xs'
                      : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-white/[0.05]'
                    }`}
                  aria-expanded={activeDropdown === 'about'}
                  aria-haspopup="true"
                >
                  <span>About</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'about'
                        ? 'rotate-180 text-[var(--theme-accent)]'
                        : 'text-[var(--theme-text-muted)]'
                      }`}
                  />
                </button>

                {/* Invisible Cursor Hover Bridge & Glass Dropdown Panel */}
                {activeDropdown === 'about' && (
                  <div
                    className="absolute left-0 top-full pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                    onMouseEnter={() => handleMouseEnter('about')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-[380px] rounded-2xl bg-[var(--theme-bg-surface)]/95 backdrop-blur-2xl shadow-2xl p-4 border border-[var(--theme-border-glass)] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--theme-border-glass)] px-2">
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                            Inside MRM InfoTech
                          </h4>
                          <p className="text-[11px] text-[var(--theme-text-secondary)]">
                            Our vision, engineering team &amp; career opportunities
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {ABOUT_MENU_ITEMS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={closeAll}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--theme-accent)]/10 border border-transparent hover:border-[var(--theme-accent)]/30 transition-all group"
                            >
                              <div className="w-9 h-9 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-text)] transition-all flex items-center justify-center shrink-0 mt-0.5">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-[var(--theme-text-secondary)] font-normal leading-snug mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="pt-2.5 mt-2 border-t border-[var(--theme-border-glass)] flex items-center justify-between px-2">
                        <span className="text-[11px] text-[var(--theme-text-muted)] font-normal">
                          IDEAS • PRODUCTS • IMPACT
                        </span>
                        <Link
                          href="/about"
                          onClick={closeAll}
                          className="text-xs font-bold text-[var(--theme-accent)] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Learn More</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. PRODUCTS (Mega Menu Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('products')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${activeDropdown === 'products' || isProductsActive
                      ? 'text-[var(--theme-accent)] bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 shadow-xs'
                      : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-white/[0.05]'
                    }`}
                  aria-expanded={activeDropdown === 'products'}
                  aria-haspopup="true"
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products'
                        ? 'rotate-180 text-[var(--theme-accent)]'
                        : 'text-[var(--theme-text-muted)]'
                      }`}
                  />
                </button>

                {activeDropdown === 'products' && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-[100] animate-in fade-in-0 zoom-in-95 duration-150"
                    onMouseEnter={() => handleMouseEnter('products')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-[720px] rounded-2xl bg-[var(--theme-bg-surface)]/98 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] p-5 border border-[var(--theme-border-glass)] ring-1 ring-white/10">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--theme-border-glass)]">
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                            Proprietary Software Products
                          </h4>
                          <p className="text-[11px] text-[var(--theme-text-secondary)] mt-0.5">
                            Enterprise cloud platforms built and maintained by MRM InfoTech
                          </p>
                        </div>
                        <Link
                          href="/products"
                          onClick={closeAll}
                          className="text-xs font-semibold text-[var(--theme-accent)] hover:underline flex items-center gap-1 group"
                        >
                          <span>All Products</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {dynamicProducts.map((p: any) => {
                          const IconComp = p.icon || getProductNavIcon(p.slug, p.categoryName || p.category);
                          const href = p.href || `/products/${p.slug}`;
                          const title = p.title || p.name;
                          const category = p.category?.name || p.categoryName || p.category || 'Software Product';
                          const desc = p.shortDescription || p.tagline || p.desc || p.description;
                          const badge = p.stage || p.badge || 'Live';

                          return (
                            <Link
                              key={p.slug || title}
                              href={href}
                              onClick={closeAll}
                              className="flex flex-col justify-between p-3.5 rounded-xl border border-transparent hover:border-[var(--theme-accent)]/30 hover:bg-[var(--theme-accent)]/10 transition-all group relative bg-white/[0.02]"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] flex items-center justify-center">
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 uppercase">
                                    {badge}
                                  </span>
                                </div>
                                <span className="text-[11px] font-semibold text-[var(--theme-accent)] uppercase tracking-wider block truncate">
                                  {category}
                                </span>
                                <h5 className="text-xs font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors mt-0.5 line-clamp-1">
                                  {title}
                                </h5>
                                <p className="text-[11px] text-[var(--theme-text-secondary)] leading-snug mt-1 line-clamp-2">
                                  {desc}
                                </p>
                              </div>
                              <div className="pt-2.5 mt-2 border-t border-[var(--theme-border-glass)] flex items-center text-[11px] font-semibold text-[var(--theme-accent)] group-hover:translate-x-0.5 transition-transform">
                                Explore details →
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Bottom strip in mega menu */}
                      <div className="mt-3.5 pt-3 border-t border-[var(--theme-border-glass)] flex items-center justify-between text-[11px] text-[var(--theme-text-secondary)]">
                        <span>Need a custom software solution tailored to your workflow?</span>
                        <Link
                          href="/start-project"
                          onClick={closeAll}
                          className="font-bold text-[var(--theme-accent)] hover:underline"
                        >
                          Request Institutional Demo →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. SERVICES (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('services')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${activeDropdown === 'services' || isServicesActive
                      ? 'text-[var(--theme-accent)] bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 shadow-xs'
                      : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-white/[0.05]'
                    }`}
                  aria-expanded={activeDropdown === 'services'}
                  aria-haspopup="true"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'services'
                        ? 'rotate-180 text-[var(--theme-accent)]'
                        : 'text-[var(--theme-text-muted)]'
                      }`}
                  />
                </button>

                {activeDropdown === 'services' && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                    onMouseEnter={() => handleMouseEnter('services')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-[520px] rounded-2xl bg-[var(--theme-bg-surface)]/95 backdrop-blur-2xl shadow-2xl p-4 border border-[var(--theme-border-glass)] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--theme-border-glass)]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                          Client Engineering Services
                        </span>
                        <Link
                          href="/services"
                          onClick={closeAll}
                          className="text-xs font-semibold text-[var(--theme-accent)] hover:underline"
                        >
                          All Services →
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {dynamicServices.map((s) => {
                          const Icon = s.icon;
                          return (
                            <Link
                              key={s.name}
                              href={s.href}
                              onClick={closeAll}
                              className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[var(--theme-accent)]/10 border border-transparent hover:border-[var(--theme-accent)]/30 transition-colors group"
                            >
                              <div className="w-7 h-7 rounded-lg bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0 mt-0.5">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                                  {s.name}
                                </h5>
                                <p className="text-[11px] text-[var(--theme-text-secondary)] leading-tight mt-0.5">
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

              {/* 5. PROJECTS (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('projects')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('projects')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${activeDropdown === 'projects' || isProjectsActive
                      ? 'text-[var(--theme-accent)] bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 shadow-xs'
                      : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-white/[0.05]'
                    }`}
                  aria-expanded={activeDropdown === 'projects'}
                  aria-haspopup="true"
                >
                  <span>Projects</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'projects'
                        ? 'rotate-180 text-[var(--theme-accent)]'
                        : 'text-[var(--theme-text-muted)]'
                      }`}
                  />
                </button>

                {activeDropdown === 'projects' && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                    onMouseEnter={() => handleMouseEnter('projects')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-[300px] rounded-2xl bg-[var(--theme-bg-surface)]/95 backdrop-blur-2xl shadow-2xl p-3 border border-[var(--theme-border-glass)] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                      <div className="pb-2 mb-2 border-b border-[var(--theme-border-glass)] px-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                          Portfolio &amp; Proof
                        </span>
                      </div>
                      <div className="space-y-1">
                        {PROJECTS_DATA.map((p) => {
                          const Icon = p.icon;
                          return (
                            <Link
                              key={p.name}
                              href={p.href}
                              onClick={closeAll}
                              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-[var(--theme-text-primary)] hover:bg-[var(--theme-accent)]/10 border border-transparent hover:border-[var(--theme-accent)]/30 transition-colors group"
                            >
                              <div className="w-6 h-6 rounded-md bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center shrink-0">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="truncate group-hover:text-[var(--theme-accent)] transition-colors">{p.name}</span>
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
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all ${isInsightsActive
                    ? 'text-[var(--theme-accent)] bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 shadow-xs'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-white/[0.05]'
                  }`}
              >
                Insights
              </Link>

              {/* 7. Contact */}
              <Link
                href="/contact"
                onClick={closeAll}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all ${isContactActive
                    ? 'text-[var(--theme-accent)] bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 shadow-xs'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-white/[0.05]'
                  }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Right Actions: Theme Toggle + Let's Talk CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/start-project"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-[13px] font-black text-[var(--theme-accent-text)] bg-[var(--theme-accent)] hover:brightness-110 shadow-lg shadow-[var(--theme-accent-glow)] active:scale-[0.98] transition-all duration-200"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Right Actions: Theme Toggle + Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                type="button"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-[var(--theme-accent)]/10 border border-[var(--theme-border-glass)] focus:outline-none transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="w-5 h-5 text-[var(--theme-accent)]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-[var(--theme-bg-surface)] border-b border-[var(--theme-border-glass)] px-4 pt-2 pb-6 space-y-1 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
            <Link
              href="/"
              onClick={closeAll}
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${pathname === '/'
                  ? 'text-[var(--theme-accent)] font-semibold bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30'
                  : 'text-[var(--theme-text-primary)] hover:bg-[var(--theme-accent)]/10'
                }`}
            >
              Home
            </Link>

            {/* Mobile About Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--theme-text-primary)] hover:bg-[var(--theme-accent)]/10"
              >
                <span className={isAboutActive ? 'text-[var(--theme-accent)] font-bold' : ''}>
                  About
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180 text-[var(--theme-accent)]' : 'text-[var(--theme-text-muted)]'
                    }`}
                />
              </button>
              {mobileAboutOpen && (
                <div className="pl-3 pr-2 py-1.5 space-y-1 bg-[var(--theme-bg-canvas)]/80 border border-[var(--theme-border-glass)] rounded-xl my-1">
                  {ABOUT_MENU_ITEMS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={closeAll}
                      className="block px-3 py-2 rounded-lg text-xs font-medium text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[var(--theme-text-primary)]">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[var(--theme-text-muted)] block mt-0.5">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Products Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--theme-text-primary)] hover:bg-[var(--theme-accent)]/10"
              >
                <span className={isProductsActive ? 'text-[var(--theme-accent)] font-bold' : ''}>
                  Products
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180 text-[var(--theme-accent)]' : 'text-[var(--theme-text-muted)]'
                    }`}
                />
              </button>
              {mobileProductsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-[var(--theme-bg-canvas)]/80 border border-[var(--theme-border-glass)] rounded-xl my-1">
                  {dynamicProducts.map((p: any) => {
                    const title = p.title || p.name;
                    const href = p.href || `/products/${p.slug}`;
                    return (
                      <Link
                        key={p.slug || title}
                        href={href}
                        onClick={closeAll}
                        className="block px-3 py-2 rounded-md text-xs font-medium text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10"
                      >
                        {title}
                      </Link>
                    );
                  })}
                  <Link
                    href="/products"
                    onClick={closeAll}
                    className="block px-3 py-2 rounded-md text-xs font-bold text-[var(--theme-accent)]"
                  >
                    View All Products →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Services Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--theme-text-primary)] hover:bg-[var(--theme-accent)]/10"
              >
                <span className={isServicesActive ? 'text-[var(--theme-accent)] font-bold' : ''}>
                  Services
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-[var(--theme-accent)]' : 'text-[var(--theme-text-muted)]'
                    }`}
                />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-[var(--theme-bg-canvas)]/80 border border-[var(--theme-border-glass)] rounded-xl my-1">
                  {dynamicServices.map((s) => (
                    <Link
                      key={s.name}
                      href={s.href}
                      onClick={closeAll}
                      className="block px-3 py-2 rounded-md text-xs font-medium text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10"
                    >
                      {s.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={closeAll}
                    className="block px-3 py-2 rounded-md text-xs font-bold text-[var(--theme-accent)]"
                  >
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Projects Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--theme-text-primary)] hover:bg-[var(--theme-accent)]/10"
              >
                <span className={isProjectsActive ? 'text-[var(--theme-accent)] font-bold' : ''}>
                  Projects
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileProjectsOpen ? 'rotate-180 text-[var(--theme-accent)]' : 'text-[var(--theme-text-muted)]'
                    }`}
                />
              </button>
              {mobileProjectsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-[var(--theme-bg-canvas)]/80 border border-[var(--theme-border-glass)] rounded-xl my-1">
                  {PROJECTS_DATA.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      onClick={closeAll}
                      className="block px-3 py-2 rounded-md text-xs font-medium text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10"
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
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${isInsightsActive
                  ? 'text-[var(--theme-accent)] font-semibold bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30'
                  : 'text-[var(--theme-text-primary)] hover:bg-[var(--theme-accent)]/10'
                }`}
            >
              Insights
            </Link>

            <Link
              href="/contact"
              onClick={closeAll}
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${isContactActive
                  ? 'text-[var(--theme-accent)] font-semibold bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30'
                  : 'text-[var(--theme-text-primary)] hover:bg-[var(--theme-accent)]/10'
                }`}
            >
              Contact
            </Link>

            <div className="pt-3">
              <Link
                href="/start-project"
                onClick={closeAll}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-black text-[var(--theme-accent-text)] bg-[var(--theme-accent)] shadow-lg shadow-[var(--theme-accent-glow)] transition-opacity hover:brightness-110 active:scale-[0.99]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
