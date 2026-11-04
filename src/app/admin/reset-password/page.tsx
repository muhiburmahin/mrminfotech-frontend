'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Lock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { resetPasswordAction } from '@/actions/auth.actions';
import { ThemeToggle } from '@/components/public/shared/ThemeToggle';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token.trim()) {
      setError('A valid reset token is required. Check the link provided in your email.');
      return;
    }

    if (newPassword.length < 12) {
      setError('Password must contain at least 12 characters for enterprise security.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter them carefully.');
      return;
    }

    setLoading(true);

    try {
      const res = await resetPasswordAction({
        token: token.trim(),
        newPassword,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || 'Password reset failed. The token may be invalid or expired.');
      }
    } catch {
      setError('An unexpected error occurred while resetting password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#071A35] border border-slate-200 dark:border-[#1E3557] shadow-2xl relative">
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
            Create New Password
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose a secure passphrase with at least 12 characters
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{error}</span>
        </div>
      )}

      {success ? (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-sm block">Password Successfully Updated</span>
              <p className="leading-relaxed">
                Your new password has been committed to the security store. You can now sign in with your updated credentials.
              </p>
            </div>
          </div>

          <Link
            href="/admin/login"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors"
          >
            <span>Proceed to Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {!tokenFromUrl && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Reset Token
              </label>
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste token from reset email"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] font-mono text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#087FC4]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              New Password (minimum 12 characters)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={12}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 12 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
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

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={12}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Changing your password will revoke all other active sessions globally.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Committing Password...</span>
              </>
            ) : (
              <>
                <span>Commit New Password</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-4 text-center">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to sign in</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#040D1A] px-4 py-12 transition-colors duration-150">
      <Suspense
        fallback={
          <div className="w-full max-w-md p-10 rounded-2xl bg-white dark:bg-[#071A35] border border-slate-200 dark:border-[#1E3557] flex flex-col items-center justify-center min-h-[350px]">
            <Loader2 className="w-8 h-8 text-[#087FC4] animate-spin mb-3" />
            <span className="text-xs text-slate-500">Loading reset session...</span>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

