import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import { ContactInquiryForm } from '@/components/public/contact/ContactInquiryForm';

export const metadata: Metadata = {
  title: 'Contact Us | MRM InfoTech Ltd.',
  description:
    'Contact MRM InfoTech Ltd. in Dhaka, Bangladesh for software engineering inquiries, SaaS licensing, and technical advisory.',
};

export default async function ContactPage() {
  const company = await PublicApiService.getCompanyProfile();

  const officialEmail = company?.email || 'contact.mrminfotech@gmail.com';
  const officialPhone = company?.phone || '+8801700000000';
  const officialLocation = company?.headquarters || 'Dhaka, Bangladesh';
  const officialWebsite = company?.website || 'https://mrminfotech.com';

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-20 pb-16 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Connect with Our Engineering Solutions Team
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Have a project in mind, an architectural query, or need SaaS platform onboarding? We respond within 24 business hours.
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Headquarters & Inquiries
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Visit our office or reach out directly to our principal engineers.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="liquid-glass-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Corporate Office</h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">{officialLocation}</p>
                  </div>
                </div>

                <div className="liquid-glass-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Official Email</h3>
                    <a
                      href={`mailto:${officialEmail}`}
                      className="text-[#087FC4] dark:text-[#20B8D5] hover:underline mt-0.5 block font-medium"
                    >
                      {officialEmail}
                    </a>
                  </div>
                </div>

                <div className="liquid-glass-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Direct Line</h3>
                    <a
                      href={`tel:${officialPhone}`}
                      className="text-slate-700 dark:text-slate-300 hover:text-[#087FC4] dark:hover:text-[#20B8D5] mt-0.5 block font-medium"
                    >
                      {officialPhone}
                    </a>
                  </div>
                </div>

                <div className="liquid-glass-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Official Portal</h3>
                    <a
                      href={officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#087FC4] dark:text-[#20B8D5] hover:underline mt-0.5 block font-medium"
                    >
                      {officialWebsite}
                    </a>
                  </div>
                </div>

                <div className="liquid-glass-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Business Hours</h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      Sunday &ndash; Thursday, 9:00 AM &ndash; 6:00 PM (BST)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Contact Form */}
            <div className="lg:col-span-7">
              <ContactInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
