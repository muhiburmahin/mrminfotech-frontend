import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import { ContactInquiryForm } from '@/components/public/contact/ContactInquiryForm';

export const metadata: Metadata = {
  title: 'Contact Us | MRM InfoTech',
  description:
    'Contact MRM InfoTech in Dhaka, Bangladesh for software engineering inquiries, SaaS licensing, and technical advisory.',
};

export default async function ContactPage() {
  const company = await PublicApiService.getCompanyProfile();

  const officialEmail = company?.email || 'contact.mrminfotech@gmail.com';
  const officialPhone = company?.phone || '+8801700000000';
  const officialLocation = company?.headquarters || 'Dhaka, Bangladesh';
  const officialWebsite = company?.website || 'https://mrminfotech.com';

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      <section className="bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] pt-20 pb-16 border-b border-[var(--theme-border-glass)] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[var(--theme-text-primary)]">
              Connect with Our Engineering Solutions Team
            </h1>
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)]">
              Have a project in mind, an architectural query, or need SaaS platform onboarding? We respond within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[var(--theme-text-primary)]">
                  Headquarters & Inquiries
                </h2>
                <p className="text-sm text-[var(--theme-text-secondary)] mt-2">
                  Visit our office or reach out directly to our principal engineers.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="rounded-2xl p-5 flex items-start gap-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] shadow-md">
                  <div className="p-2.5 rounded-xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--theme-text-primary)]">Corporate Office</h3>
                    <p className="text-[var(--theme-text-secondary)] mt-0.5">{officialLocation}</p>
                  </div>
                </div>

                <div className="rounded-2xl p-5 flex items-start gap-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] shadow-md">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--theme-text-primary)]">Official Email</h3>
                    <a
                      href={`mailto:${officialEmail}`}
                      className="text-[var(--theme-accent)] hover:underline mt-0.5 block font-medium"
                    >
                      {officialEmail}
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl p-5 flex items-start gap-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] shadow-md">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--theme-text-primary)]">Direct Line</h3>
                    <a
                      href={`tel:${officialPhone}`}
                      className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] mt-0.5 block font-medium transition-colors"
                    >
                      {officialPhone}
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl p-5 flex items-start gap-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] shadow-md">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--theme-text-primary)]">Official Portal</h3>
                    <a
                      href={officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--theme-accent)] hover:underline mt-0.5 block font-medium"
                    >
                      {officialWebsite}
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl p-5 flex items-start gap-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] shadow-md">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--theme-text-primary)]">Business Hours</h3>
                    <p className="text-[var(--theme-text-secondary)] mt-0.5">
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
