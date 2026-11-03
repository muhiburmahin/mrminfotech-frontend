import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Start a Project | MRM InfoTech Ltd.',
  description:
    'Initiate a new software project or SaaS onboarding with MRM InfoTech Ltd. Receive an architectural proposal within 48 hours.',
};

export default function StartProjectPage() {
  const serviceOptions = [
    'Custom Software Engineering',
    'EduManage BD (School ERP)',
    'MediSheba BD (Healthcare Platform)',
    'Enterprise ERP Solutions',
    'Cloud & DevOps Infrastructure',
    'AI & Automation Engineering',
    'Cybersecurity & Penetration Testing',
    'Other / Advisory',
  ];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
              Project Onboarding
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Start a Project with MRM InfoTech
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Tell us about your organizational goals, timeline, and scope. Our lead architects will
              review your requirements and provide a preliminary scope and proposal within 48 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 dark:bg-[#0B1E3B] p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-[#1E3557] shadow-sm space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project Scope & Specifications</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Please fill in as much information as possible to help us assess technical feasibility.
              </p>
            </div>

            <form className="space-y-6">
              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Md. Tariqul Islam"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="tariqul@organization.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Organization / Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delta Enterprises Ltd."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="+880 1700 000000"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  What service or platform are you interested in? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {serviceOptions.map((opt, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#07162C] hover:border-[#087FC4] text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        name="serviceInterest"
                        value={opt}
                        className="rounded text-[#0052CC] focus:ring-[#0052CC]"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Project Description & Key Objectives *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your current system, pain points, target launch date, and any specific requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Project Request</span>
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>NDA & Confidentiality guaranteed</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
