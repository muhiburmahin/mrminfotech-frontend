'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useDeferredEffect } from '@/lib/hooks/useDeferredEffect';
import { Inbox, Search, RefreshCw, Mail, CheckCircle2, AlertCircle, Trash2, FileSpreadsheet } from 'lucide-react';
import {
  getAdminLeads,
  getAdminLeadById,
  updateAdminLeadStatus,
  deleteAdminLead,
  type AdminLeadItem,
} from '@/lib/api/admin';

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Inquiries' },
  { value: 'NEW', label: 'New', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { value: 'CONTACTED', label: 'Contacted', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { value: 'QUALIFIED', label: 'Qualified', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { value: 'PROPOSAL', label: 'Proposal Sent', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { value: 'WON', label: 'Won / Converted', color: 'bg-green-500/15 text-green-400 border-green-500/30' },
  { value: 'LOST', label: 'Lost', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
  { value: 'SPAM', label: 'Spam', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
];

export default function AdminInquiriesPage() {
  const [leads, setLeads] = useState<AdminLeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState<AdminLeadItem | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminLeads({
        status: statusFilter,
        search: searchQuery,
      });
      setLeads(res.data || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch inquiries';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useDeferredEffect(() => fetchLeads(), [fetchLeads]);

  const handleOpenDetail = async (lead: AdminLeadItem) => {
    setSelectedLead(lead);
    setNoteInput('');
    try {
      const full = await getAdminLeadById(lead.id);
      if (full) {
        setSelectedLead(full);
      }
    } catch {
      // Continue with current lead if detailed fetch fails
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const updated = await updateAdminLeadStatus(id, newStatus);
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
      if (selectedLead?.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus, ...(updated?.notes ? { notes: updated.notes } : {}) } : null));
      }
      setSuccessMsg(`Status updated to ${newStatus}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddNote = async (id: string, currentStatus: string) => {
    if (!noteInput.trim()) return;
    setIsSubmittingNote(true);
    try {
      const updated = await updateAdminLeadStatus(id, currentStatus, noteInput.trim());
      setNoteInput('');
      if (updated) {
        setSelectedLead(updated);
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updated } : l)));
      }
      setSuccessMsg('Internal note recorded successfully');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to add note');
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDelete = async (id: string, ref: string) => {
    if (!confirm(`Are you sure you want to delete inquiry ${ref}?`)) return;
    try {
      await deleteAdminLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
      setSuccessMsg('Inquiry deleted successfully');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete inquiry');
    }
  };

  // Export to CSV Functionality
  const exportToCsv = () => {
    if (leads.length === 0) {
      alert('No inquiries available to export.');
      return;
    }

    const headers = [
      'Reference',
      'Date',
      'Client Name',
      'Email',
      'Phone',
      'Company',
      'Country',
      'Type',
      'Status',
      'Message',
    ];

    const escapeCsv = (val?: string | number | null) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = leads.map((l) => [
      escapeCsv(l.ref),
      escapeCsv(new Date(l.createdAt).toISOString().split('T')[0]),
      escapeCsv(l.name),
      escapeCsv(l.email),
      escapeCsv(l.phone),
      escapeCsv(l.company),
      escapeCsv(l.country),
      escapeCsv(l.type),
      escapeCsv(l.status),
      escapeCsv(l.message),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `mrm-inquiries-export-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== 'ALL' && l.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.ref.toLowerCase().includes(q) ||
          (l.email && l.email.toLowerCase().includes(q)) ||
          (l.company && l.company.toLowerCase().includes(q)) ||
          (l.message && l.message.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [leads, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-20">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Client Inquiries & Leads</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              CRM Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Review and qualify incoming consultation requests and &ldquo;Start a Project&rdquo; leads.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchLeads}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={exportToCsv}
            disabled={leads.length === 0}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-40"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export to CSV</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by client name, email, ref, or company..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-400 whitespace-nowrap">
            Showing <strong className="text-white">{filteredLeads.length}</strong> leads
          </span>
        </div>
      </div>

      {/* Main Leads Table or Empty State */}
      {loading ? (
        <div className="p-16 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400">Loading incoming inquiries...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="p-16 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">No Client Inquiries Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {statusFilter !== 'ALL' || searchQuery
              ? 'No inquiries match your current search or status filter.'
              : 'Incoming consultation requests from the website will appear here in real-time.'}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Ref Code</th>
                  <th className="py-3.5 px-4">Client Info</th>
                  <th className="py-3.5 px-4">Service Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredLeads.map((lead) => {
                  const statusMeta =
                    STATUS_OPTIONS.find((o) => o.value === lead.status) || STATUS_OPTIONS[1];

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => handleOpenDetail(lead)}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-blue-400">
                        {lead.ref}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white group-hover:text-blue-300 transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          {lead.email && <span>{lead.email}</span>}
                          {lead.company && <span>· {lead.company}</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-mono">
                          {lead.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            statusMeta.color || 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {statusMeta.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-white text-[11px] focus:outline-hidden"
                          >
                            {STATUS_OPTIONS.filter((o) => o.value !== 'ALL').map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => handleDelete(lead.id, lead.ref)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div>
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                  {selectedLead.ref}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedLead.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Email</span>
                  <span className="text-white font-medium">{selectedLead.email || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Phone</span>
                  <span className="text-white font-medium">{selectedLead.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Company</span>
                  <span className="text-white font-medium">{selectedLead.company || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Country</span>
                  <span className="text-white font-medium">{selectedLead.country || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-bold mb-1.5">Client Message</span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 whitespace-pre-wrap leading-relaxed text-slate-200">
                  {selectedLead.message || 'No written message provided.'}
                </div>
              </div>

              {selectedLead.payload && Object.keys(selectedLead.payload).length > 0 && (
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold mb-1.5">Project Scope Payload</span>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                    {JSON.stringify(selectedLead.payload, null, 2)}
                  </pre>
                </div>
              )}

              {/* Internal Notes History & Input */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Internal Notes ({selectedLead.notes?.length || 0})
                  </span>
                  <span className="text-[10px] text-slate-500">Visible only to team members</span>
                </div>

                {selectedLead.notes && selectedLead.notes.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    {selectedLead.notes.map((n) => (
                      <div key={n.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 text-xs">
                        <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px]">
                          <span className="font-semibold text-blue-400">{n.author?.name || 'Staff Member'}</span>
                          <span className="text-[10px] text-slate-500">{new Date(n.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{n.body || n.note}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    No internal notes recorded yet.
                  </p>
                )}

                {/* Add New Internal Note Input */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Type an internal note or next-step reminder..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddNote(selectedLead.id, selectedLead.status);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddNote(selectedLead.id, selectedLead.status)}
                    disabled={isSubmittingNote || !noteInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md shadow-blue-600/20"
                  >
                    {isSubmittingNote ? 'Saving...' : 'Add Note'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Change Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  {STATUS_OPTIONS.filter((o) => o.value !== 'ALL').map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedLead.email && (
                <a
                  href={`mailto:${selectedLead.email}?subject=Regarding%20Your%20MRM%20InfoTech%20Inquiry%20(${selectedLead.ref})`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
