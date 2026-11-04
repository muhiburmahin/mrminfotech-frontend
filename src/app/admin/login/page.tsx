'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/public/shared/ThemeToggle';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin/dashboard';

  const { login, verifyTwoFactor } = useAuth();

  // Step 1: Credentials | Step 2: 2FA Challenge
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 2FA state
  const [ticket, setTicket] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login({ email, password });

      if (res.requiresTwoFactor && res.twoFactorTicket) {
        setTicket(res.twoFactorTicket);
        setStep('2fa');
        setError(null);
        return;
      }

      if (res.success && res.data) {
        setSuccessMessage('Authentication successful. Redirecting...');
        if (res.mustChangePassword) {
          router.push('/admin/dashboard/security?forceChange=1');
        } else {
          router.push(from);
        }
        return;
      }

      setError(res.error || 'Invalid email or password');
    } catch {
      setError('An unexpected connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!twoFactorCode.trim()) {
      setError('Please enter your 6-digit TOTP code or backup code.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await verifyTwoFactor({
        twoFactorTicket: ticket,
        code: twoFactorCode.trim(),
      });

      if (res.success && res.data) {
        setSuccessMessage('2FA verification verified. Redirecting...');
        if (res.mustChangePassword) {
          router.push('/admin/dashboard/security?forceChange=1');
        } else {
          router.push(from);
        }
        return;
      }

      setError(res.error || 'Invalid or expired 2FA code / backup code.');
    } catch {
      setError('Failed to verify two-factor authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#071A35] border border-slate-200 dark:border-[#1E3557] shadow-2xl relative transition-all duration-200">
      {/* Top Controls */}
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <ThemeToggle />
      </div>

      {/* Brand Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] shadow-inner mb-1">
          <Image
            src="/logo-icon.png"
            alt="MRM InfoTech Emblem"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            MRM <span className="text-[#087FC4] dark:text-[#20B8D5]">Control Panel</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enterprise Content Management System & Administration
          </p>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="leading-relaxed font-medium">{successMessage}</span>
        </div>
      )}

      {/* STEP 1: CREDENTIALS */}
      {step === 'credentials' && (
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mrminfotech.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-xs text-[#087FC4] dark:text-[#20B8D5] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* STEP 2: 2FA CHALLENGE */}
      {step === '2fa' && (
        <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Two-Factor Authentication Required</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              Enter the 6-digit verification code from your authenticator app (Google Authenticator, Authy) or enter an 8-character emergency backup recovery code.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Authentication Code
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                autoFocus
                autoComplete="one-time-code"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.trim())}
                placeholder="123456 or ABCD-1234"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] font-mono tracking-widest text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Code...</span>
              </>
            ) : (
              <>
                <span>Verify & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setStep('credentials');
              setError(null);
              setTwoFactorCode('');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to sign in</span>
          </button>
        </form>
      )}

      {/* Footer Meta */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#1E3557] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Role-Based Access Control</span>
        </div>
        <Link
          href="/"
          className="text-[#087FC4] dark:text-[#20B8D5] hover:underline font-medium flex items-center gap-1"
        >
          <span>Return to website</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#040D1A] px-4 py-12 transition-colors duration-150">
      <Suspense
        fallback={
          <div className="w-full max-w-md p-10 rounded-2xl bg-white dark:bg-[#071A35] border border-slate-200 dark:border-[#1E3557] flex flex-col items-center justify-center min-h-[350px]">
            <Loader2 className="w-8 h-8 text-[#087FC4] animate-spin mb-3" />
            <span className="text-xs text-slate-500">Loading secure portal...</span>
          </div>
        }
      >
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
