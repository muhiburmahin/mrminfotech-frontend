import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { getCompanyProfile } from '@/lib/api/public';

export const metadata: Metadata = {
  title: 'Contact Us | MRM InfoTech Ltd.',
  description:
    'Contact MRM InfoTech Ltd. in Dhaka, Bangladesh for software engineering inquiries, SaaS licensing, and technical advisory.',
};

export default async function ContactPage() {
  const company = await getCompanyProfile();

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#00C2FF] uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Connect with Our Engineering Solutions Team
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Have a project in mind, an architectural query, or need SaaS platform onboarding?
              We respond within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Headquarters & Inquiries</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Visit our office or reach out directly to our principal engineers.
                </p>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557]">
                  <MapPin className="w-5 h-5 text-[#087FC4] dark:text-[#00C2FF] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Corporate Office</h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">{company.headquarters || 'Dhaka, Bangladesh'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557]">
                  <Mail className="w-5 h-5 text-[#087FC4] dark:text-[#00C2FF] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Official Email</h3>
                    <a
                      href={`mailto:${company.email || 'contact@mrminfotech.com'}`}
                      className="text-[#087FC4] dark:text-[#00C2FF] hover:underline mt-0.5 block"
                    >
                      {company.email || 'contact@mrminfotech.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557]">
                  <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Direct Hotline</h3>
                    <a
                      href={`tel:${company.phone || '+8801700000000'}`}
                      className="text-slate-700 dark:text-slate-300 hover:text-[#087FC4] dark:hover:text-[#00C2FF] mt-0.5 block"
                    >
                      {company.phone || '+8801700000000'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557]">
                  <Clock className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Business Hours</h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">Sunday – Thursday, 9:00 AM – 6:00 PM (BST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-[#0B1E3B] p-8 rounded-2xl border border-slate-200 dark:border-[#1E3557] shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Fill in your details and an engineering lead will review your message promptly.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Md. Tanvir Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="tanvir@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+880 1700 000000"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Enterprise ERP inquiry"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Project Details or Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your requirements, current tech stack, or questions..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-md text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
