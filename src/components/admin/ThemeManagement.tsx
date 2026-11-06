'use client';

import React, { useState } from 'react';
import {
  Palette,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Layers,
  AlertCircle,
} from 'lucide-react';
import { useThemeContext } from '@/context/ThemeContext';
import {
  THEME_LIST,
  ThemeId,
  ThemeDefinition,
  getContrastRatio,
  DEFAULT_THEME_ID,
} from '@/lib/theme/themes';

export function ThemeManagement() {
  const {
    activeThemeId,
    previewThemeId,
    setPreviewThemeId,
    setGlobalThemeId,
    isApplying,
  } = useThemeContext();

  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const handleApply = async (themeId: ThemeId, themeName: string) => {
    const success = await setGlobalThemeId(themeId);
    if (success) {
      setNotification({
        type: 'success',
        message: `"${themeName}" সফলভাবে পুরো ওয়েবসাইটে সক্রিয় এবং ডেটাবেজে সংরক্ষিত হয়েছে!`,
      });
      setTimeout(() => setNotification(null), 4000);
    } else {
      setNotification({
        type: 'error',
        message: `থিম সক্রিয় করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।`,
      });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const currentTheme = THEME_LIST.find((t) => t.id === activeThemeId) || THEME_LIST[0];

  return (
    <div className="space-y-8 select-none">
      {/* Header & Architecture Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0A192F] border border-slate-200 dark:border-[#1E3A5F] shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20">
              <Palette className="w-3.5 h-3.5" />
              <span>GLOBAL DYNAMIC THEME MANAGEMENT SYSTEM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-[#FAF5EE]">
              Website Theme Templates
            </h1>
            <p className="text-sm text-slate-600 dark:text-[#D6CBB8] max-w-2xl leading-relaxed">
              সরাসরি অ্যাডমিন প্যানেল থেকে ওয়েবসাইটের গ্লোবাল থিম পরিবর্তন করুন। নির্বাচিত থিমটি স্বয়ংক্রিয়ভাবে
              ডেটাবেজে সংরক্ষিত হবে এবং সকল ভিজিটরের জন্য তাৎক্ষণিকভাবে দৃশ্যমান হবে (WCAG 4.5:1 কন্ট্রাস্ট ও 60-30-10 কালার ব্যালেন্স সহ)।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {previewThemeId && (
              <button
                type="button"
                onClick={() => setPreviewThemeId(null)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-500 bg-amber-500/10 border border-amber-500/25 hover:bg-amber-500/20 transition-all cursor-pointer"
              >
                <EyeOff className="w-4 h-4" />
                <span>Exit Preview</span>
              </button>
            )}
            <div className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-[#1E3A5F] flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[var(--theme-accent,#FF6B6B)] animate-pulse" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-[#D6CBB8]/60">
                  Currently Active Theme
                </p>
                <p className="text-xs font-extrabold text-slate-900 dark:text-[#FAF5EE]">
                  {currentTheme.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Active Banner */}
        {previewThemeId && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-between gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 shrink-0 animate-bounce" />
              <span>
                আপনি বর্তমানে <strong>{THEME_LIST.find((t) => t.id === previewThemeId)?.name}</strong> থিমের লাইভ প্রিভিউ দেখছেন। নিচে &quot;Apply Globally&quot; বাটনে ক্লিক করে ডেটাবেজে সংরক্ষণ করুন।
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPreviewThemeId(null)}
              className="text-xs underline hover:opacity-80"
            >
              প্রিভিউ বন্ধ করুন
            </button>
          </div>
        )}

        {/* Action Notifications */}
        {notification && (
          <div
            className={`mt-4 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 transition-all ${
              notification.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-500'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}
      </div>

      {/* Grid of 4 Predefined Themes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {THEME_LIST.map((theme) => {
          const isActive = activeThemeId === theme.id;
          const isPreviewing = previewThemeId === theme.id;
          const dist = theme.distribution;

          // Calculate button text contrast ratio against accent fill
          const contrastRatio = getContrastRatio(
            dist.accent10.contrastTextHex,
            dist.accent10.hex
          );

          return (
            <div
              key={theme.id}
              className={`rounded-3xl border transition-all duration-300 p-6 flex flex-col justify-between space-y-6 ${
                isActive
                  ? 'border-[var(--theme-accent,#FF6B6B)] bg-white dark:bg-[#0A192F] shadow-xl shadow-[var(--theme-accent-glow,#FF6B6B)]/10 ring-2 ring-[var(--theme-accent,#FF6B6B)]/30'
                  : 'border-slate-200 dark:border-[#1E3A5F] bg-white dark:bg-[#0A192F] hover:border-slate-300 dark:hover:border-[#2A4E7A] shadow-sm'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: dist.accent10.hex }}
                    />
                    <h2 className="text-lg font-black text-slate-900 dark:text-[#FAF5EE]">
                      {theme.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {theme.id === 'mrm-brand-cyan' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 flex items-center gap-1 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                        <Sparkles className="w-3 h-3" />
                        Brand Signature
                      </span>
                    )}
                    {theme.isDefault && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-200 dark:bg-[#1E3A5F] text-slate-700 dark:text-[#D6CBB8]">
                        Default
                      </span>
                    )}
                    {isActive && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    )}
                    {isPreviewing && !isActive && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
                        Previewing
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-[#D6CBB8] leading-relaxed">
                  {theme.tagline}
                </p>
              </div>

              {/* 60-30-10 Color Breakdown Swatches */}
              <div className="space-y-3">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-[#D6CBB8]/60">
                  60-30-10 Color Distribution
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {/* 60% Dominant Background */}
                  <div className="p-3 rounded-2xl border border-slate-200 dark:border-[#1E3A5F] bg-slate-50 dark:bg-[#071324] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-slate-400">60% Base</span>
                      <span
                        className="w-4 h-4 rounded-full border border-black/20"
                        style={{ backgroundColor: dist.dominant60.canvasHex }}
                      />
                    </div>
                    <p className="font-extrabold text-slate-800 dark:text-[#FAF5EE] truncate">
                      {dist.dominant60.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">
                      {dist.dominant60.canvasHex}
                    </p>
                  </div>

                  {/* 30% Structural Content */}
                  <div className="p-3 rounded-2xl border border-slate-200 dark:border-[#1E3A5F] bg-slate-50 dark:bg-[#071324] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-slate-400">30% Text</span>
                      <span
                        className="w-4 h-4 rounded-full border border-black/20"
                        style={{ backgroundColor: dist.structural30.textPrimaryHex }}
                      />
                    </div>
                    <p className="font-extrabold text-slate-800 dark:text-[#FAF5EE] truncate">
                      {dist.structural30.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">
                      {dist.structural30.textPrimaryHex}
                    </p>
                  </div>

                  {/* 10% Interactive Accent */}
                  <div className="p-3 rounded-2xl border border-slate-200 dark:border-[#1E3A5F] bg-slate-50 dark:bg-[#071324] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-slate-400">10% CTA</span>
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                        style={{ backgroundColor: dist.accent10.hex }}
                      />
                    </div>
                    <p className="font-extrabold text-slate-800 dark:text-[#FAF5EE] truncate">
                      {dist.accent10.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">
                      {dist.accent10.hex}
                    </p>
                  </div>
                </div>
              </div>

              {/* Realistic Mock Component Box */}
              <div
                className="rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden space-y-3"
                style={{
                  backgroundColor: dist.dominant60.canvasHex,
                  borderColor: dist.structural30.borderHex,
                }}
              >
                {/* Luminous background beam glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 right-0 w-44 h-44 rounded-full blur-2xl opacity-40"
                  style={{ backgroundColor: dist.accent10.hex }}
                />

                <div className="flex items-center justify-between relative z-10">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: dist.accent10.hex,
                      color: dist.accent10.hex,
                      backgroundColor: dist.accent10.subtleRgba,
                    }}
                  >
                    SOFTWARE PRODUCTS
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold"
                    style={{ color: dist.structural30.textSecondaryHex }}
                  >
                    WCAG: {contrastRatio.toFixed(2)}:1
                  </span>
                </div>

                <div className="relative z-10 space-y-1">
                  <h4
                    className="text-sm font-black tracking-tight"
                    style={{ color: dist.structural30.textPrimaryHex }}
                  >
                    We Turn Ideas Into Technology That Moves Forward.
                  </h4>
                  <p
                    className="text-[11px] line-clamp-2 leading-relaxed"
                    style={{ color: dist.structural30.textSecondaryHex }}
                  >
                    High-craft enterprise software architecture, cloud platforms, and bespoke engineering.
                  </p>
                </div>

                {/* Primary CTA and Secondary Mock Buttons */}
                <div className="pt-2 flex items-center gap-2.5 relative z-10">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1 shadow-md cursor-default"
                    style={{
                      backgroundColor: dist.accent10.hex,
                      color: dist.accent10.contrastTextHex,
                      boxShadow: `0 0 16px ${dist.accent10.glowRgba}`,
                    }}
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <div
                    className="px-3.5 py-2 rounded-full text-xs font-semibold border backdrop-blur-md"
                    style={{
                      color: dist.structural30.textPrimaryHex,
                      borderColor: dist.structural30.borderGlass,
                      backgroundColor: dist.dominant60.glassBg,
                    }}
                  >
                    Products
                  </div>
                </div>
              </div>

              {/* Action Buttons: Preview & Apply Globally */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setPreviewThemeId(isPreviewing ? null : theme.id)
                  }
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                    isPreviewing
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-500'
                      : 'border-slate-200 dark:border-[#1E3A5F] hover:bg-slate-100 dark:hover:bg-[#071324] text-slate-700 dark:text-[#FAF5EE]'
                  }`}
                >
                  {isPreviewing ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Cancel Preview</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Live Preview</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isApplying || isActive}
                  onClick={() => handleApply(theme.id, theme.name)}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-black transition-all shadow-md cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 dark:bg-[#1E3A5F]/50 text-slate-400 dark:text-[#D6CBB8]/40 border border-transparent cursor-not-allowed'
                      : 'bg-[#FF6B6B] hover:bg-[#FF8585] text-[#071324] shadow-lg shadow-[#FF6B6B]/25 active:scale-[0.98]'
                  }`}
                  style={
                    !isActive
                      ? {
                          backgroundColor: dist.accent10.hex,
                          color: dist.accent10.contrastTextHex,
                          boxShadow: `0 0 20px ${dist.accent10.glowRgba}`,
                        }
                      : {}
                  }
                >
                  {isApplying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Applying...</span>
                    </>
                  ) : isActive ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Active Theme</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Apply Globally</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeManagement;

