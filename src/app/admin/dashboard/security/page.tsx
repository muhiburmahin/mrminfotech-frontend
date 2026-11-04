'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Lock,
  Copy,
  Check,
  Download,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  QrCode,
  Smartphone,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  changePasswordAction,
  getTwoFactorStatusAction,
  generate2faSecretAction,
  enable2faAction,
  disable2faAction,
  regenerateRecoveryCodesAction,
} from '@/actions/auth.actions';

function SecurityManagementView() {
  const searchParams = useSearchParams();
  const forceChange = searchParams.get('forceChange') === '1';

  const { user, refreshUser } = useAuth();

  // --- Password Change State ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState<string | null>(null);

  // --- 2FA State ---
  const [twoFactorActive, setTwoFactorActive] = useState<boolean>(false);
  const [tfaLoading, setTfaLoading] = useState<boolean>(false);
  const [setupMode, setSetupMode] = useState<boolean>(false);
  const [secretData, setSecretData] = useState<{ secret: string; uri: string } | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [tfaError, setTfaError] = useState<string | null>(null);
  const [tfaSuccess, setTfaSuccess] = useState<string | null>(null);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);

  // Disable 2FA modal state
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [disablePassword, setDisablePassword] = useState('');

  // Regenerate codes modal state
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [regenPassword, setRegenPassword] = useState('');

  useEffect(() => {
    let isMounted = true;
    getTwoFactorStatusAction()
      .then((res) => {
        if (!isMounted) return;
        if (res.success && res.data) {
          setTwoFactorActive(res.data.enabled);
        } else if (user) {
          setTwoFactorActive(Boolean(user.twoFactorEnabled));
        }
      })
      .catch(() => {
        if (isMounted && user) {
          setTwoFactorActive(Boolean(user.twoFactorEnabled));
        }
      });
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Handle Password Change Submit
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(null);

    if (newPassword.length < 12) {
      setPwError('New password must be at least 12 characters long for enterprise security.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwError('New passwords do not match.');
      return;
    }

    setPwLoading(true);

    try {
      const res = await changePasswordAction({
        currentPassword,
        newPassword,
      });

      if (res.success) {
        setPwSuccess('Password updated successfully. Other active sessions have been terminated.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        await refreshUser();
      } else {
        setPwError(res.error || 'Failed to update password. Verify your current password.');
      }
    } catch {
      setPwError('An unexpected error occurred while updating password.');
    } finally {
      setPwLoading(false);
    }
  };

  // Start 2FA Setup
  const handleStart2faSetup = async () => {
    setTfaError(null);
    setTfaSuccess(null);
    setTfaLoading(true);

    try {
      const res = await generate2faSecretAction();
      if (res.success && res.data) {
        setSecretData({
          secret: res.data.secret,
          uri: res.data.uri || res.data.otpauthUrl || '',
        });
        setSetupMode(true);
      } else {
        setTfaError(res.error || 'Failed to initialize two-factor authentication.');
      }
    } catch {
      setTfaError('Failed to generate 2FA secret.');
    } finally {
      setTfaLoading(false);
    }
  };

  // Confirm 2FA Activation with 6-digit TOTP
  const handleConfirm2faActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode.trim() || verifyCode.trim().length !== 6) {
      setTfaError('Please enter the exact 6-digit TOTP code from your authenticator app.');
      return;
    }

    setTfaError(null);
    setTfaLoading(true);

    try {
      const res = await enable2faAction(verifyCode.trim());
      if (res.success && res.data) {
        setTwoFactorActive(true);
        setSetupMode(false);
        const codes = res.data.recoveryCodes || res.data.backupCodes || [];
        setRecoveryCodes(codes);
        setTfaSuccess('Two-factor authentication successfully enabled! Make sure to save your backup recovery codes.');
        setVerifyCode('');
        await refreshUser();
      } else {
        setTfaError(res.error || 'Invalid 6-digit verification code. Please check your clock and re-enter.');
      }
    } catch {
      setTfaError('Failed to enable two-factor authentication.');
    } finally {
      setTfaLoading(false);
    }
  };

  // Disable 2FA
  const handleDisable2fa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disablePassword) return;

    setTfaError(null);
    setTfaLoading(true);

    try {
      const res = await disable2faAction({ password: disablePassword });
      if (res.success) {
        setTwoFactorActive(false);
        setShowDisableModal(false);
        setDisablePassword('');
        setRecoveryCodes([]);
        setTfaSuccess('Two-factor authentication has been disabled.');
        await refreshUser();
      } else {
        setTfaError(res.error || 'Incorrect password.');
      }
    } catch {
      setTfaError('Failed to disable two-factor authentication.');
    } finally {
      setTfaLoading(false);
    }
  };

  // Regenerate Recovery Codes
  const handleRegenerateCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regenPassword) return;

    setTfaError(null);
    setTfaLoading(true);

    try {
      const res = await regenerateRecoveryCodesAction(regenPassword);
      if (res.success && res.data) {
        const codes = res.data.recoveryCodes || res.data.backupCodes || [];
        setRecoveryCodes(codes);
        setShowRegenModal(false);
        setRegenPassword('');
        setTfaSuccess('New emergency recovery codes generated. Previous codes are now invalid.');
      } else {
        setTfaError(res.error || 'Incorrect password.');
      }
    } catch {
      setTfaError('Failed to regenerate recovery codes.');
    } finally {
      setTfaLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: 'secret' | 'codes') => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      if (type === 'secret') {
        setCopiedSecret(true);
        setTimeout(() => setCopiedSecret(false), 2000);
      } else {
        setCopiedCodes(true);
        setTimeout(() => setCopiedCodes(false), 2000);
      }
    }
  };

  const downloadRecoveryCodes = () => {
    if (!recoveryCodes.length) return;
    const content = `MRM INFOTECH — 2FA EMERGENCY BACKUP CODES\nGenerated: ${new Date().toISOString()}\nAccount: ${user?.email}\n\nKEEP THESE CODES SECURE. EACH CODE CAN BE USED ONCE IF YOU LOSE ACCESS TO YOUR AUTHENTICATOR APP.\n\n${recoveryCodes.map((code, i) => `${i + 1}. ${code}`).join('\n')}\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mrm-recovery-codes-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <ShieldCheck className="w-7 h-7 text-[#0052CC] dark:text-[#20B8D5]" />
          <span>Security & Authentication Settings</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your administrative password, enforce Multi-Factor Authentication (2FA), and secure your account credentials.
        </p>
      </div>

      {/* Force Password Change Alert */}
      {forceChange && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-sm block">Password Change Required</span>
            <p className="leading-relaxed">
              Your account has been flagged for a mandatory password change before you can access management modules. Please set a new password below.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 1: TWO-FACTOR AUTHENTICATION */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#071A35] border border-slate-200 dark:border-[#1E3557] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#1E3557] pb-5">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${twoFactorActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-[#07162C] text-slate-400'}`}>
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Two-Factor Authentication (TOTP)
                </h2>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${twoFactorActive
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                >
                  {twoFactorActive ? 'Active' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Add an extra layer of defense by requiring an authenticator code on each sign-in attempt.
              </p>
            </div>
          </div>

          {!twoFactorActive && !setupMode && (
            <button
              type="button"
              onClick={handleStart2faSetup}
              disabled={tfaLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-md shadow-[#0052CC]/20 cursor-pointer shrink-0"
            >
              {tfaLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
              <span>Enable 2FA</span>
            </button>
          )}

          {twoFactorActive && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowRegenModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#07162C] hover:bg-slate-200 dark:hover:bg-[#0B1E3B] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Recovery Codes</span>
              </button>
              <button
                type="button"
                onClick={() => setShowDisableModal(true)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 transition-colors cursor-pointer"
              >
                Disable 2FA
              </button>
            </div>
          )}
        </div>

        {/* 2FA Alerts */}
        {tfaError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{tfaError}</span>
          </div>
        )}

        {tfaSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{tfaSuccess}</span>
          </div>
        )}

        {/* 2FA SETUP WIZARD */}
        {setupMode && secretData && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1E3557] pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#087FC4]" />
                <span>Step 1: Scan Authenticator QR Code</span>
              </h3>
              <button
                type="button"
                onClick={() => setSetupMode(false)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Cancel Setup
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* QR Image Box */}
              <div className="w-44 h-44 rounded-xl bg-white p-2.5 shadow-md border border-slate-200 flex items-center justify-center shrink-0">
                {/* Clean inline QR Code generated from standard QR API fallback */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    secretData.uri
                  )}`}
                  alt="2FA TOTP QR Code"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Instructions and Manual Secret Key */}
              <div className="space-y-3 flex-1 text-xs text-slate-600 dark:text-slate-300">
                <p>
                  1. Open your authenticator app (such as Google Authenticator, Authy, or 1Password).
                </p>
                <p>
                  2. Scan this QR code or enter the manual configuration key below:
                </p>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#040D1A] border border-slate-300 dark:border-[#1E3557]">
                  <code className="font-mono text-xs font-bold text-[#0052CC] dark:text-[#20B8D5] flex-1 break-all">
                    {secretData.secret}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(secretData.secret, 'secret')}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#07162C] transition-colors"
                    title="Copy Key"
                  >
                    {copiedSecret ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Verification Input */}
            <form onSubmit={handleConfirm2faActivation} className="border-t border-slate-200 dark:border-[#1E3557] pt-4 space-y-3">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                Step 2: Enter 6-Digit Code from App
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full sm:w-48 px-4 py-2.5 rounded-xl bg-white dark:bg-[#040D1A] border border-slate-300 dark:border-[#1E3557] font-mono text-center tracking-widest text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                />
                <button
                  type="submit"
                  disabled={tfaLoading || verifyCode.length !== 6}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {tfaLoading ? 'Activating...' : 'Verify & Activate 2FA'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* BACKUP RECOVERY CODES DISPLAY */}
        {recoveryCodes.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>One-Time Emergency Backup Recovery Codes</span>
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-300/90 mt-0.5">
                  Save these 8 recovery codes safely. Each code can be entered once to sign in if you lose your phone.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(recoveryCodes.join('\n'), 'codes')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 transition-colors cursor-pointer"
                >
                  {copiedCodes ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCodes ? 'Copied!' : 'Copy All'}</span>
                </button>
                <button
                  type="button"
                  onClick={downloadRecoveryCodes}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download (.txt)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {recoveryCodes.map((code, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-white/80 dark:bg-[#07162C] border border-amber-500/30 font-mono text-center text-xs font-bold text-slate-800 dark:text-slate-100 select-all"
                >
                  {code}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: CHANGE PASSWORD */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#071A35] border border-slate-200 dark:border-[#1E3557] shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-[#1E3557] pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#0052CC] dark:text-[#20B8D5]" />
            <span>Update Account Password</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ensure your password is at least 12 characters long and contains a mix of letters, numbers, and symbols.
          </p>
        </div>

        {pwError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{pwError}</span>
          </div>
        )}

        {pwSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{pwSuccess}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#087FC4]"
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
              New Password (minimum 12 characters)
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={12}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 12 characters"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#087FC4]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={12}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-300 dark:border-[#1E3557] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#087FC4]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={pwLoading}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-md shadow-[#0052CC]/20 disabled:opacity-50 cursor-pointer"
            >
              {pwLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* DISABLE 2FA CONFIRMATION MODAL */}
      {showDisableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              <span>Confirm Disabling Two-Factor Authentication</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Disabling 2FA will remove an essential layer of security from your administrator account. Please confirm with your current password.
            </p>
            <form onSubmit={handleDisable2fa} className="space-y-4">
              <input
                type="password"
                required
                autoFocus
                value={disablePassword}
                onChange={(e) => setDisablePassword(e.target.value)}
                placeholder="Current Password"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#040D1A] border border-slate-300 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDisableModal(false);
                    setDisablePassword('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={tfaLoading || !disablePassword}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors disabled:opacity-50"
                >
                  {tfaLoading ? 'Disabling...' : 'Confirm Disable'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REGENERATE CODES CONFIRMATION MODAL */}
      {showRegenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#087FC4]" />
              <span>Regenerate Recovery Codes</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Generating new backup recovery codes will immediately invalidate any previous codes. Enter your current password to proceed:
            </p>
            <form onSubmit={handleRegenerateCodes} className="space-y-4">
              <input
                type="password"
                required
                autoFocus
                value={regenPassword}
                onChange={(e) => setRegenPassword(e.target.value)}
                placeholder="Current Password"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#040D1A] border border-slate-300 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowRegenModal(false);
                    setRegenPassword('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={tfaLoading || !regenPassword}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors disabled:opacity-50"
                >
                  {tfaLoading ? 'Generating...' : 'Regenerate Codes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SecurityPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#087FC4] animate-spin mb-3" />
          <span className="text-xs text-slate-500">Loading security portal...</span>
        </div>
      }
    >
      <SecurityManagementView />
    </Suspense>
  );
}
