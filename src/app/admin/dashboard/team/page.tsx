/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Plus,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/public/shared/SocialIcons';
import {
  getAdminTeamMembers,
  updateAdminTeamMember,
  deleteAdminTeamMember,
} from '@/lib/api/admin';
import Link from 'next/link';
import { TeamForm, AdminTeamRecord } from '@/components/admin/forms/TeamForm';

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<AdminTeamRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<AdminTeamRecord | null>(null);
  const [isUpdatingRank, setIsUpdatingRank] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: unknown;
      if (typeof getAdminTeamMembers === 'function') {
        data = await getAdminTeamMembers();
      } else {
        const mod = await import('@/lib/api/admin');
        data = await mod.getAdminTeamMembers();
      }

      const rawList = Array.isArray(data)
        ? data
        : Array.isArray((data as unknown as { data: AdminTeamRecord[] })?.data)
        ? (data as unknown as { data: AdminTeamRecord[] }).data
        : [];

      // Sort by order rank (lowest number = highest priority / top)
      const sorted = [...rawList].sort((a, b) => {
        const orderA = a.order ?? a.sortOrder ?? 999;
        const orderB = b.order ?? b.sortOrder ?? 999;
        return orderA - orderB;
      });

      setTeamMembers(sorted as AdminTeamRecord[]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'টিম মেম্বারদের তালিকা লোড করতে ব্যর্থ হয়েছে';
      if (msg.includes('401') || msg.toLowerCase().includes('unauthorized')) {
        setError('AUTH_EXPIRED: আপনার অ্যাডমিন সেশনের মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে পুনরায় লগইন করুন।');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = (member: AdminTeamRecord) => {
    setEditingMember(member);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleAddNew = () => {
    setEditingMember(null);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDelete = async (member: AdminTeamRecord) => {
    if (!member.id) return;
    const confirmName = member.name || 'this member';
    if (!window.confirm(`আপনি কি নিশ্চিতভাবে "${confirmName}" প্রোফাইলটি মুছে ফেলতে চান?`)) {
      return;
    }

    setIsDeleting(member.id);
    try {
      await deleteAdminTeamMember(member.id);
      setSuccessMsg(`"${confirmName}" সফলভাবে ডিলিট করা হয়েছে!`);
      setTimeout(() => setSuccessMsg(null), 3500);
      await fetchMembers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'ডিলিট করতে ব্যর্থ হয়েছে';
      setError(msg);
    } finally {
      setIsDeleting(null);
    }
  };

  // Move Up (Priority Rank)
  const handleMoveUp = async (member: AdminTeamRecord, index: number) => {
    if (index === 0 || !member.id) return;
    const prevMember = teamMembers[index - 1];
    if (!prevMember?.id) return;

    setIsUpdatingRank(member.id);
    try {
      const currentRank = member.order ?? member.sortOrder ?? index + 1;
      const targetRank = prevMember.order ?? prevMember.sortOrder ?? index;
      const newRank = Math.max(1, targetRank <= currentRank ? targetRank - 1 : currentRank - 1);

      await updateAdminTeamMember(member.id, {
        order: newRank,
        sortOrder: newRank,
      });

      setSuccessMsg(`"${member.name}" এর ক্রম #${newRank} এ এগিয়ে নেওয়া হয়েছে!`);
      setTimeout(() => setSuccessMsg(null), 3000);
      await fetchMembers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'ক্রম আপডেট করতে ব্যর্থ হয়েছে';
      setError(msg);
    } finally {
      setIsUpdatingRank(null);
    }
  };

  // Move Down (Priority Rank)
  const handleMoveDown = async (member: AdminTeamRecord, index: number) => {
    if (index === teamMembers.length - 1 || !member.id) return;
    const nextMember = teamMembers[index + 1];
    if (!nextMember?.id) return;

    setIsUpdatingRank(member.id);
    try {
      const currentRank = member.order ?? member.sortOrder ?? index + 1;
      const targetRank = nextMember.order ?? nextMember.sortOrder ?? index + 2;
      const newRank = targetRank >= currentRank ? targetRank + 1 : currentRank + 1;

      await updateAdminTeamMember(member.id, {
        order: newRank,
        sortOrder: newRank,
      });

      setSuccessMsg(`"${member.name}" এর ক্রম #${newRank} এ নামানো হয়েছে!`);
      setTimeout(() => setSuccessMsg(null), 3000);
      await fetchMembers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'ক্রম আপডেট করতে ব্যর্থ হয়েছে';
      setError(msg);
    } finally {
      setIsUpdatingRank(null);
    }
  };

  // Toggle Active Status
  const handleToggleActive = async (member: AdminTeamRecord) => {
    if (!member.id) return;
    const newStatus = !member.isActive;
    try {
      await updateAdminTeamMember(member.id, { isActive: newStatus });
      setTeamMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, isActive: newStatus } : m))
      );
      setSuccessMsg(
        `"${member.name}" এখন ${newStatus ? 'পাবলিক ওয়েবসাইটে দৃশ্যমান' : 'লুকানো (Hidden)'}!`
      );
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে';
      setError(msg);
    }
  };

  const activeMembersCount = teamMembers.filter((m) => m.isActive !== false).length;
  const engineeringCount = teamMembers.filter(
    (m) => (m.department || '').toLowerCase().includes('engineer') || (m.department || '').toLowerCase().includes('architect')
  ).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#1E3557] pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#087FC4] dark:text-[#20B8D5]" />
            Team Members Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            টিম মেম্বারদের সিরিয়াল বা রেংক (#1, #2...), ছবি আপলোড, পদবি ও সোশ্যাল প্রোফাইল ম্যানেজ করুন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchMembers}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-50"
            title="তালিকা রিফ্রেশ করুন"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#087FC4]' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white text-xs font-bold shadow-md shadow-[#087FC4]/20 hover:opacity-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন মেম্বার যুক্ত করুন</span>
          </button>
        </div>
      </div>

      {/* Quick Metric Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Team Members</span>
            <Users className="w-4 h-4 text-[#087FC4]" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{teamMembers.length}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Published / Active</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{activeMembersCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Engineering & Architecture</span>
            <ShieldCheck className="w-4 h-4 text-[#20B8D5]" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{engineeringCount}</p>
        </div>
      </div>

      {/* Global Alerts */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span>{error.replace('AUTH_EXPIRED: ', '')}</span>
          {error.includes('AUTH_EXPIRED') && (
            <Link
              href="/admin/login"
              className="px-3.5 py-1.5 rounded-lg bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-colors shrink-0"
            >
              পুনরায় লগইন করুন (Go to Login)
            </Link>
          )}
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Team Members Catalog Table / List */}
      <div className="bg-white dark:bg-[#0B1E3B] rounded-2xl border border-slate-200 dark:border-[#1E3557] overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
              Team Roster ({teamMembers.length})
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Sorted by Display Rank (Serial 1 appears at the very top of homepage &amp; team page).
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex flex-col items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-[#087FC4]" />
            Loading team members from database...
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No team members found in the database. Use the form below to create your first team profile.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#1E3557]">
            {teamMembers.map((member, idx) => {
              const name = member.name || member.translations?.[0]?.name || member.slug || 'Team Member';
              const role = member.role || member.translations?.[0]?.roleTitle || 'Designation';
              const photo = member.photo || member.photoUrl || null;
              const rank = typeof member.order === 'number' ? member.order : typeof member.sortOrder === 'number' ? member.sortOrder : idx + 1;
              const dept = member.department || 'Engineering';

              return (
                <div
                  key={member.id || member.slug}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-[#07162C]/40 transition-colors"
                >
                  {/* Left: Rank Stepper + Circular Avatar & Info */}
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    {/* Rank Badge & Up/Down Stepper */}
                    <div className="flex flex-col items-center justify-center shrink-0 p-1.5 rounded-xl bg-slate-100 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557]">
                      <button
                        type="button"
                        disabled={idx === 0 || isUpdatingRank === member.id}
                        onClick={() => handleMoveUp(member, idx)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                        title="Move Up (১ নম্বরের দিকে নিন)"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <span
                        className="text-xs font-black text-[#087FC4] dark:text-[#20B8D5] py-0.5 px-1.5"
                        title={`Serial Rank: #${rank}`}
                      >
                        #{rank}
                      </span>

                      <button
                        type="button"
                        disabled={idx === teamMembers.length - 1 || isUpdatingRank === member.id}
                        onClick={() => handleMoveDown(member, idx)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                        title="Move Down (নিচে নামান)"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Circular Avatar with Gradient Ring */}
                    <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] shrink-0 shadow-sm flex items-center justify-center">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#0B1E3B] flex items-center justify-center">
                        {photo ? (
                          <img src={photo} alt={name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <span className="font-bold text-sm text-[#087FC4] dark:text-[#20B8D5]">
                            {name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                          {name}
                        </h3>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3557]">
                          {dept}
                        </span>

                        {member.isActive !== false ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            Hidden
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-[#087FC4] dark:text-[#20B8D5] mt-0.5">
                        {role}
                      </p>

                      {member.bio && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                          {member.bio}
                        </p>
                      )}

                      {/* Social & Contact indicators */}
                      <div className="flex items-center gap-2.5 mt-2">
                        {member.linkedinUrl && (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#0A66C2] transition-colors"
                            title="LinkedIn"
                          >
                            <LinkedinIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.githubUrl && (
                          <a
                            href={member.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            title="GitHub"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.email && (
                          <span
                            className="text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center gap-1 text-[10px]"
                            title={member.showEmail ? `Public Email: ${member.email}` : `Private Email: ${member.email}`}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {member.showEmail && <span className="text-[9px] text-emerald-500">(public)</span>}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(member)}
                      className={`p-2 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                        member.isActive !== false
                          ? 'border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/10'
                          : 'border-slate-200 dark:border-[#1E3557] text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={member.isActive !== false ? 'Hide from Website' : 'Show on Website'}
                    >
                      {member.isActive !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEdit(member)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      disabled={isDeleting === member.id}
                      onClick={() => handleDelete(member)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors disabled:opacity-50 cursor-pointer"
                      title="Delete Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create / Edit Form */}
      <div ref={formRef}>
        <TeamForm
          key={editingMember?.id || 'new'}
          initialData={editingMember}
          onSaved={() => {
            setEditingMember(null);
            fetchMembers();
          }}
          onCancel={() => setEditingMember(null)}
        />
      </div>
    </div>
  );
}
