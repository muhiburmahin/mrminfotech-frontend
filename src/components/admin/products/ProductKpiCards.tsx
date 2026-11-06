'use client';

import React from 'react';
import { Layers, CheckCircle2, FileEdit, Star, Clock, Archive } from 'lucide-react';
import type { ProductKpiStats } from '@/types/product.types';

interface ProductKpiCardsProps {
  kpi: ProductKpiStats;
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

export function ProductKpiCards({ kpi, selectedFilter, onSelectFilter }: ProductKpiCardsProps) {
  const cards = [
    {
      id: 'ALL',
      label: 'Total Products',
      count: kpi.total,
      icon: Layers,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      activeBorder: 'border-blue-500 ring-2 ring-blue-500/30',
    },
    {
      id: 'PUBLISHED',
      label: 'Published (Live)',
      count: kpi.published,
      icon: CheckCircle2,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/30',
    },
    {
      id: 'DRAFT',
      label: 'Draft Products',
      count: kpi.draft,
      icon: FileEdit,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/30',
    },
    {
      id: 'FEATURED',
      label: 'Featured Products',
      count: kpi.featured,
      icon: Star,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      activeBorder: 'border-indigo-500 ring-2 ring-indigo-500/30',
    },
    {
      id: 'COMING_SOON',
      label: 'Coming Soon',
      count: kpi.comingSoon,
      icon: Clock,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      activeBorder: 'border-cyan-500 ring-2 ring-cyan-500/30',
    },
    {
      id: 'ARCHIVED',
      label: 'Archived Products',
      count: kpi.archived,
      icon: Archive,
      color: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
      activeBorder: 'border-slate-500 ring-2 ring-slate-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = selectedFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectFilter(card.id)}
            className={`text-left p-4 rounded-xl border transition-all cursor-pointer bg-slate-900/60 backdrop-blur-md hover:bg-slate-900/90 ${
              isActive ? card.activeBorder : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`p-2 rounded-lg border ${card.color}`}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="text-2xl font-black text-white">{card.count}</span>
            </div>
            <p className="text-xs font-medium text-slate-400 truncate">{card.label}</p>
          </button>
        );
      })}
    </div>
  );
}
