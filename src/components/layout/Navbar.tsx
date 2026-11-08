'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import type { NavigationMenu } from '@/lib/api/types';
import { FALLBACK_HEADER_NAV } from '@/lib/api/public';

interface NavbarProps {
  initialMenu?: NavigationMenu | null;
}

export function Navbar({ initialMenu }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const menu = initialMenu || FALLBACK_HEADER_NAV;
  const navItems = menu.items || [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const getLabel = (labelObj: Record<string, string> | string | undefined): string => {
    if (!labelObj) return '';
    if (typeof labelObj === 'string') return labelObj;
    return labelObj.en || Object.values(labelObj)[0] || '';
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07162C]/95 backdrop-blur-md shadow-xl border-b border-[#1E3557]'
          : 'bg-[#07162C] border-b border-[#1E3557]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline */}
          <Link href="/" onClick={closeDrawer} className="flex flex-col group py-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                MRM <span className="text-[#00C2FF]">InfoTech</span>
              </span>
            </div>
            <span className="text-[9px] font-medium tracking-widest uppercase text-slate-400 group-hover:text-slate-300 transition-colors mt-0.5">
              IDEAS <span className="text-[#00C2FF] font-bold">•</span> PRODUCTS{' '}
              <span className="text-[#00C2FF] font-bold">•</span> IMPACT
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              if (item.isButton) return null;
              const href = item.href || '/';
              const isActive = pathname === href;
              const label = getLabel(item.label);

              return (
                <Link
                  key={item.id || href}
                  href={href}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-[#00C2FF] bg-[#1E3557]/60 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-[#0B1E3B]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0052CC] hover:bg-[#0040A8] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#0052CC]/25 border border-blue-400/20"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-[#0052CC] hover:bg-[#0040A8]"
            >
              Start Project
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#0B1E3B] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#07162C] border-b border-[#1E3557] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const href = item.href || '/';
            const isActive = pathname === href;
            const label = getLabel(item.label);

            return (
              <Link
                key={`mobile-${item.id || href}`}
                href={href}
                onClick={closeDrawer}
                className={`block px-4 py-2.5 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'text-[#00C2FF] bg-[#0B1E3B] font-semibold border-l-2 border-[#00C2FF]'
                    : 'text-slate-200 hover:text-white hover:bg-[#0B1E3B]'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#1E3557]/80 flex flex-col gap-2">
            <Link
              href="/start-project"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg text-center font-semibold text-white bg-[#0052CC] hover:bg-[#0040A8] shadow-lg shadow-[#0052CC]/20"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
