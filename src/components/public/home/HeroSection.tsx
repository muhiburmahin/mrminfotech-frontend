import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Server,
  Layers,
  ChevronRight,
  Terminal,
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-[#07162C] text-white pt-24 pb-20 overflow-hidden border-b border-[#1E3557]">
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,194,255,0.15),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1E3B] border border-[#00C2FF]/30 text-xs font-semibold text-[#00C2FF] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
            <span>ENTERPRISE SOFTWARE & CLOUD SAAS PLATFORMS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
            Architecting High-Concurrency Systems &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] via-cyan-300 to-blue-400">
              Scalable SaaS Platforms
            </span>
          </h1>

          {/* Corporate Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            MRM InfoTech powers institutions and enterprises through a dual-engine model:
            proprietary cloud products including{' '}
            <span className="text-white font-semibold underline decoration-[#00C2FF]">
              EduManage BD
            </span>{' '}
            and{' '}
            <span className="text-white font-semibold underline decoration-[#00C2FF]">
              MediSheba BD
            </span>
            , coupled with bespoke, mission-critical custom engineering.
          </p>

          {/* Tagline Ribbon */}
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-widest text-[#00C2FF] uppercase pt-2">
            <span>IDEAS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" />
            <span>PRODUCTS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" />
            <span>IMPACT</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/start-project"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] active:scale-[0.98] transition-all shadow-lg shadow-[#0052CC]/30 border border-blue-400/20 text-base"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-[#0B1E3B] hover:bg-[#1E3557] hover:text-white transition-all border border-[#1E3557] text-base"
            >
              <span>Explore SaaS Products</span>
              <ChevronRight className="w-4 h-4 text-[#00C2FF]" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all text-base"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>

        {/* Executive Trust Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-[#1E3557]/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-lg bg-[#0B1E3B]/50 border border-[#1E3557]/60">
            <div className="p-2.5 rounded-lg bg-[#00C2FF]/10 text-[#00C2FF]">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">99.98%</div>
              <div className="text-xs text-slate-400">Production Uptime SLA</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-lg bg-[#0B1E3B]/50 border border-[#1E3557]/60">
            <div className="p-2.5 rounded-lg bg-[#0052CC]/15 text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">14 Disciplines</div>
              <div className="text-xs text-slate-400">Full-Stack & Cloud Services</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-lg bg-[#0B1E3B]/50 border border-[#1E3557]/60">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Bank-Grade</div>
              <div className="text-xs text-slate-400">OWASP & Security Audited</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-lg bg-[#0B1E3B]/50 border border-[#1E3557]/60">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">3 Flagship SaaS</div>
              <div className="text-xs text-slate-400">EduManage & MediSheba BD</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
