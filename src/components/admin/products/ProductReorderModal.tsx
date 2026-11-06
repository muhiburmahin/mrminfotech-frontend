'use client';

import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown, Save, CheckCircle2, Move, AlertCircle } from 'lucide-react';
import { reorderAdminProducts } from '@/lib/api/admin';
import type { ProductRecord, ReorderContext } from '@/types/product.types';

interface ProductReorderModalProps {
  products: ProductRecord[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProductReorderModal({
  products,
  isOpen,
  onClose,
  onSuccess,
}: ProductReorderModalProps) {
  const [activeContext, setActiveContext] = useState<ReorderContext>('displayOrder');
  const [items, setItems] = useState<Array<{ id: string; title: string; slug: string; order: number }>>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize order items when modal opens or context changes
  React.useEffect(() => {
    if (!isOpen) return;
    const sorted = [...products].sort((a, b) => {
      const valA = a[activeContext] ?? a.sortOrder ?? 0;
      const valB = b[activeContext] ?? b.sortOrder ?? 0;
      return valA - valB;
    });

    setItems(
      sorted.map((p, idx) => ({
        id: p.id,
        title: p.title || p.slug,
        slug: p.slug,
        order: idx + 1,
      }))
    );
    setError(null);
  }, [isOpen, activeContext, products]);

  if (!isOpen) return null;

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);

    // Re-assign 1-based order
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
      await reorderAdminProducts(
        activeContext,
        items.map((it) => ({ id: it.id, order: it.order }))
      );
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save product ordering';
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

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
              <h3 className="text-base font-bold text-white">Manage Product Display Priorities</h3>
              <p className="text-xs text-slate-400">
                Arrange which products appear first across key areas of the website.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabbed Context Selector */}
        <div className="px-5 pt-4 pb-2 border-b border-slate-800 flex gap-2 overflow-x-auto">
          {[
            { id: 'displayOrder', label: 'Products Page Catalog' },
            { id: 'homepageOrder', label: 'Homepage Showcase' },
            { id: 'navOrder', label: 'Navbar Products Menu' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveContext(tab.id as ReorderContext)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeContext === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error notice */}
        {error && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {item.order}
                </span>
                <div className="truncate">
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">/{item.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Manual Order Number Input */}
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={item.order}
                  onChange={(e) => handleOrderChange(idx, parseInt(e.target.value) || 1)}
                  className="w-14 px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold text-center focus:border-blue-500 focus:outline-hidden"
                  title="Priority Number (Lower = Appears First)"
                />

                {/* Move Up / Down Buttons */}
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === items.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-900/50">
          <span className="text-xs text-slate-400">
            Priority 1 appears highest/first in the selected area.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Apply New Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

