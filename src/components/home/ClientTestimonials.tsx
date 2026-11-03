import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import type { TestimonialItem } from '@/lib/api/types';

interface ClientTestimonialsProps {
  testimonials: TestimonialItem[];
}

export function ClientTestimonials({ testimonials }: ClientTestimonialsProps) {
  return (
    <section className="py-24 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verified Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by Forward-Thinking Enterprise Leaders
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            See how MRM InfoTech’s engineering discipline delivers measurable results for executive
            and technical teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between p-8 rounded-2xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-sm relative group hover:border-[#087FC4] dark:hover:border-[#00C2FF] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 dark:text-slate-600 group-hover:text-[#087FC4]/40 dark:group-hover:text-[#00C2FF]/40 transition-colors" />
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.authorName}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.authorRole}, <span className="font-semibold text-slate-700 dark:text-slate-300">{t.companyName}</span>
                  </p>
                </div>

                {t.isVerified && (
                  <span className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 title='Verified Engagement'">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

