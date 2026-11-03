import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import type { ProductItem } from '@/lib/api/types';

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-[#0B1E3B] border border-[#1E3557] p-7 group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-lg bg-[#07162C] text-[#00C2FF]">
            <Package className="w-5 h-5" />
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {product.stage}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-[#00C2FF] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs font-semibold text-[#00C2FF] mt-1">{product.tagline}</p>
        <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
          {product.summary}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#1E3557]">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#00C2FF] transition-colors"
        >
          <span>Product Overview</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
