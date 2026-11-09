'use client';

import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown, Save, Move, AlertCircle } from 'lucide-react';
import { reorderAdminServices } from '@/lib/api/admin';
import type { ServiceRecord, ReorderPlacement } from '@/types/service.types';
import { useDeferredEffect } from '@/lib/hooks/useDeferredEffect';

interface ServiceReorderModalProps {
  services: ServiceRecord[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ServiceReorderModal({
  services,
  isOpen,
  onClose,
  onSuccess,
}: ServiceReorderModalProps) {
  const [activeContext, setActiveContext] = useState<ReorderPlacement>('servicesPageOrder');
  const [items, setItems] = useState<Array<{ id: string; title: string; slug: string; order: number }>>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useDeferredEffect(() => {
    if (!isOpen) return;
    const sorted = [...services].sort((a, b) => {
      const rank = (item: typeof a): number => {
        const value = (item as unknown as Record<string, unknown>)[activeContext];
        return typeof value === "number" ? value : (item as { displayOrder?: number }).displayOrder ?? 999;
      };
      return rank(a) - rank(b);
    });

    setItems(
      sorted.map((s, idx) => ({
        id: s.id,
        title: s.title || s.name || s.slug,
        slug: s.slug,
        order: idx + 1,
      }))
    );
    setError(null);
  }, [isOpen, activeContext, services]);

  if (!isOpen) return null;

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);

    setItems(
      newItems.map((item, idx) => ({
        ...item,
        order: idx + 1,
      }))
    );
  };

  const handleOrderChange = (index: number, newOrder: number) => {
    const newItems = [...items];
    newItems[index].order = Math.max(1, newOrder);
    setItems(newItems);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await reorderAdminServices(
        activeContext,
        items.map((it) => ({ id: it.id, order: it.order }))
      );
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save service ordering';
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const contexts: Array<{ key: ReorderPlacement; label: string; desc: string }> = [
    {
      key: 'servicesPageOrder',
      label: 'Services Page',
      desc: 'Controls primary sequence on the /services showcase page',
    },
    {
      key: 'homepageOrder',
      label: 'Homepage Section 05',
      desc: 'Sequence in Homepage Section 05 service cards grid',
    },
    {
      key: 'navbarOrder',
      label: 'Navbar Dropdown',
      desc: 'Sequence within Header "Services" dropdown navigation menu',
    },
    {
      key: 'featuredOrder',
      label: 'Featured Bento Grid',
      desc: 'Sequence within high-visibility featured spotlight showcase',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Move className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Manage Service Display Priorities</h3>
              <p className="text-xs text-slate-400">
                Drag, shift up/down or type numbers to control exact rendering sequence
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Context Selector Tabs */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap gap-2">
          {contexts.map((ctx) => (
            <button
              key={ctx.key}
              type="button"
              onClick={() => setActiveContext(ctx.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeContext === ctx.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {ctx.label}
            </button>
          ))}
        </div>

        {/* Error notification */}
        {error && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Reorderable List */}
        <div className="p-5 overflow-y-auto space-y-2 flex-1">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:border-slate-600 transition-all gap-3"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-blue-400">
                  #{idx + 1}
                </div>
                <div className="truncate">
                  <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                  <p className="text-[11px] font-mono text-slate-400 truncate">/{item.slug}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.order}
                  onChange={(e) => handleOrderChange(idx, parseInt(e.target.value) || 1)}
                  className="w-14 px-2 py-1 text-center rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-blue-500 focus:outline-hidden"
                />

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-slate-700 flex items-center justify-center text-slate-200 transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-slate-700 flex items-center justify-center text-slate-200 transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              No services found for reordering.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving || items.length === 0}
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Orders...' : 'Save Sequence'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

