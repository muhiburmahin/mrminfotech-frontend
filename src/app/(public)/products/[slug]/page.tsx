import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Lock,
  Code2,
  Image as ImageIcon,
  Sparkles,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  Users2,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import ProductInteractiveGallery from '@/components/public/products/ProductInteractiveGallery';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Rich fallback content definitions for MRM InfoTech's flagship SaaS engines
interface ProductProfileData {
  headline: string;
  category: string;
  problems: {
    before: string[];
    withProduct: string[];
  };
  modules: Array<{
    title: string;
    description: string;
  }>;
  workflowSteps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  targetAudience: Array<{
    title: string;
    description: string;
  }>;
  benefits: Array<{
    feature: string;
    benefit: string;
  }>;
  pricing: {
    starterTitle: string;
    starterDesc: string;
    enterpriseTitle: string;
    enterpriseDesc: string;
  };
  trustPoints: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const PRODUCT_PROFILES: Record<string, ProductProfileData> = {
  'edumanage-bd': {
    headline: 'Simplifying Education Management Through Modern Technology.',
    category: 'Education Management SaaS',
    problems: {
      before: [
        'Paper registers, manual attendance tracking, and misplaced student records',
        'Physical fee collection queues with manual cash and bank reconciliations',
        'Time-consuming manual grading, exam tabulation, and report card preparation',
        'Disconnected communication channels leaving guardians in the dark',
      ],
      withProduct: [
        'Centralized cloud-native SIS with instantaneous student record lookups',
        'Automated digital invoicing with bKash/Nagad auto-reconciliation',
        'Dynamic automated GPA grading and printable official transcripts',
        'Real-time guardian portal with SMS attendance and exam alerts',
      ],
    },
    modules: [
      {
        title: 'Student & Academic Management',
        description: 'Complete student lifecycle tracking from digital admission to section assignment and academic archiving.',
      },
      {
        title: 'Biometric & RFID Attendance',
        description: 'Hardware telemetry integration with automated SMS alerts dispatched to guardians upon arrival or absence.',
      },
      {
        title: 'Fees & Automated Reconciliation',
        description: 'Scheduled tuition fee generation with mobile financial service (MFS) reconciliation without cash leakage.',
      },
      {
        title: 'Examination & Transcripts',
        description: 'Custom grading policies, GPA calculations, tabulations, and printable official marksheets in seconds.',
      },
      {
        title: 'Guardian Portal & Mobile PWA',
        description: 'Parents monitor daily attendance, test scores, notices, and payment receipts from any smartphone.',
      },
      {
        title: 'Campus Asset & Library System',
        description: 'Barcode-driven book inventory, borrowing registers, and multi-campus asset oversight.',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Institutional Configuration',
        description: 'Configure academic years, class sections, grading schemes, and tuition fee schedules in under 24 hours.',
      },
      {
        step: '02',
        title: 'Rapid Data Onboarding',
        description: 'Import existing student and teacher spreadsheets with automated data validation and duplicate detection.',
      },
      {
        step: '03',
        title: 'Daily Autonomous Operations',
        description: 'Automate attendance notifications, online fee collections, and staff scheduling without paperwork.',
      },
      {
        step: '04',
        title: 'Strategic Reporting & Audit',
        description: 'Generate single-click ministry reports, cash flow summaries, and academic analytics for the governing board.',
      },
    ],
    targetAudience: [
      { title: 'Primary & Secondary Schools', description: 'Complete SIS for Bangla and English version academic institutions.' },
      { title: 'Colleges & Higher Secondary', description: 'Departmental management, semester grading, and admissions.' },
      { title: 'Madrasa Networks', description: 'Specialized support for Kamil, Fazil, Dakhil, and Qawmi curricula.' },
      { title: 'Coaching & Skill Academies', description: 'Batch scheduling, student test tracking, and monthly fee collections.' },
    ],
    benefits: [
      { feature: 'Centralized Digital Records', benefit: '85% reduction in administrative paperwork and search time' },
      { feature: 'Automated MFS Reconciliation', benefit: '100% financial transparency with zero unverified cash handling' },
      { feature: 'Biometric Attendance Telemetry', benefit: 'Instant parent confidence and improved student punctuality' },
      { feature: 'Automated Marksheet Generation', benefit: 'Teachers save days of manual calculation every exam season' },
    ],
    pricing: {
      starterTitle: 'Cloud Campus Plan',
      starterDesc: 'Predictable per-student monthly or annual license with complete hosting, automated backups, and updates.',
      enterpriseTitle: 'Multi-Campus Enterprise',
      enterpriseDesc: 'Tailored deployment for educational chains with dedicated database clusters and custom domain branding.',
    },
    trustPoints: [
      { title: 'Sovereign Data Storage', description: 'Student and institutional data is isolated with daily automated snapshots.' },
      { title: 'Role-Based Encryption', description: 'Granular permissions ensure accountants, teachers, and students only access authorized data.' },
      { title: 'Guaranteed 99.9% Uptime', description: 'Engineered on resilient cloud architecture to maintain uninterrupted service during exam peaks.' },
      { title: 'Dedicated Onboarding Support', description: 'Our engineering specialists assist in hands-on data migration and staff training.' },
    ],
    faqs: [
      {
        question: 'How long does data migration take for an active school?',
        answer: 'Most institutions migrate their existing student rolls within 24 to 48 hours using our Excel importer and dedicated support team.',
      },
      {
        question: 'Does EduManage BD support bKash and Nagad payments?',
        answer: 'Yes, parents can pay tuition fees directly through integrated mobile gateways with instant digital payment receipts.',
      },
      {
        question: 'Can teachers enter grades and attendance from mobile phones?',
        answer: 'Yes, the responsive mobile-friendly dashboard allows teachers to mark attendance and input exam scores from any smartphone.',
      },
    ],
  },

  'medisheba-bd': {
    headline: 'Bringing Healthcare & Clinical Diagnostic Operations Into One Platform.',
    category: 'Healthcare Management SaaS',
    problems: {
      before: [
        'Overcrowded reception queues, paper tokens, and manual patient registration',
        'Handwritten diagnostic requests risking sample misidentification or loss',
        'Delayed pathology and radiology report approvals causing patient distress',
        'Disorganized doctor appointment slots and fragmented prescription history',
      ],
      withProduct: [
        'Streamlined digital OPD token queues with instant mobile patient lookup',
        'Automated barcode sample labeling ensuring zero test mix-ups',
        'Cloud-based lab analyzer interfaces with digital pathologist verification',
        'Encrypted Electronic Medical Records (EMR) accessible to verified doctors',
      ],
    },
    modules: [
      {
        title: 'Patient Registration & OPD Queue',
        description: 'Instant mobile/ID search, dynamic doctor appointment tokens, and real-time waiting room queue screens.',
      },
      {
        title: 'Pathology & Diagnostic Laboratory',
        description: 'Barcoded specimen tracking, automated analyzer interfaces, and verified digital report generation.',
      },
      {
        title: 'Radiology & Imaging Workflow',
        description: 'Order management for X-Ray, Ultrasonography, CT, and MRI with digital radiologist review and archiving.',
      },
      {
        title: 'Electronic Medical Records (EMR)',
        description: 'Structured prescription builder with custom medication templates, dosages, and patient clinical history.',
      },
      {
        title: 'Pharmacy & Medical Inventory',
        description: 'Real-time stock depletion linked to billing with batch expiry alerts and automated reorder points.',
      },
      {
        title: 'Financial Accounting & Shift Audits',
        description: 'Cashier shift balancing, corporate panel discounts, doctor referral tracking, and revenue dashboards.',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Clinical Setup & Rate Configuration',
        description: 'Configure diagnostic test menus, reference normal ranges, doctor OPD fee structures, and lab equipment.',
      },
      {
        step: '02',
        title: 'Patient Intake & Barcode Labeling',
        description: 'Fast registration generates unique barcode stickers for phlebotomy and imaging requisitions.',
      },
      {
        step: '03',
        title: 'Lab Analysis & Digital Verification',
        description: 'Pathologists review analyzer findings and sign off reports with verifiable digital signatures.',
      },
      {
        step: '04',
        title: 'Automated SMS Report Delivery',
        description: 'Patients receive an instant SMS notification with a secure link to view and print their official report.',
      },
    ],
    targetAudience: [
      { title: 'Diagnostic Centers & Pathology Labs', description: 'Complete barcoding, sample tracking, and report delivery.' },
      { title: 'Specialized Clinics & Polyclinics', description: 'Doctor appointments, queue management, and digital EMR.' },
      { title: 'Private Hospitals & Nursing Homes', description: 'Integrated billing, ward management, pharmacy, and diagnostics.' },
      { title: 'Imaging & Radiology Centers', description: 'Requisition routing, radiologist reporting, and cloud archives.' },
    ],
    benefits: [
      { feature: 'Barcoded Specimen Tracking', benefit: 'Zero sample misidentification or clinical error' },
      { feature: 'Automated SMS Report Dispatch', benefit: 'Patients avoid return visits; diagnostic turnaround cut by 60%' },
      { feature: 'Digital Prescription Builder', benefit: 'Doctors prepare clear, legible prescriptions in under 60 seconds' },
      { feature: 'Cashier Shift Audit Logs', benefit: '100% financial accountability across every diagnostic counter' },
    ],
    pricing: {
      starterTitle: 'Clinic Standard Edition',
      starterDesc: 'Engineered for outpatient clinics and standalone diagnostic labs with complete patient management.',
      enterpriseTitle: 'Hospital Diagnostic Suite',
      enterpriseDesc: 'Multi-branch deployment with automated lab machine interfaces and dedicated server instances.',
    },
    trustPoints: [
      { title: 'HIPAA-Aligned Privacy', description: 'Patient diagnostic records are strictly confidential and encrypted at rest.' },
      { title: 'Tamper-Proof Verification', description: 'Every printed and digital lab report includes a secure verification QR code.' },
      { title: 'Automatic Cloud Backups', description: 'Redundant off-site backups ensure zero data loss even in the event of local hardware failure.' },
      { title: '24/7 Clinical Support', description: 'Round-the-clock priority technical assistance for continuous emergency diagnostics.' },
    ],
    faqs: [
      {
        question: 'Can patients view and download their test results from home?',
        answer: 'Yes, patients automatically receive an SMS with a secure unique URL to download and print their official PDF test reports.',
      },
      {
        question: 'Does MediSheba BD connect to automated laboratory analyzers?',
        answer: 'Yes, our enterprise tier supports unidirectional and bidirectional interfacing with standard clinical chemistry and hematology analyzers.',
      },
      {
        question: 'Can doctors customize their prescription medicine sets?',
        answer: 'Yes, doctors can create personalized templates with frequently prescribed medications, dosage rules, and clinical instructions.',
      },
    ],
  },

  'multi-institution-platform': {
    headline: 'Professional Digital Governance for Educational Networks & Chains.',
    category: 'Institutional Website Platform',
    problems: {
      before: [
        'Outdated, neglected static websites with broken mobile views and expired SSL certificates',
        'Vulnerable WordPress installations susceptible to malicious hacks and plugin conflicts',
        'No unified oversight for conglomerates managing multiple schools or campus branches',
        'Difficult non-technical editing forcing institutions to pay expensive external agencies for every notice',
      ],
      withProduct: [
        'Modern, high-performance responsive web portals with automatic HTTPS and CDN caching',
        'Secure multi-tenant architecture without vulnerable third-party plugins',
        'Unified governance dashboard managing subdomains and multi-campus digital assets',
        'Intuitive non-technical content management allowing staff to post circulars in 30 seconds',
      ],
    },
    modules: [
      {
        title: 'Multi-Tenant Branch & Subdomain Routing',
        description: 'Dynamic subdomain routing (e.g. campus1.domain.com) and custom domain mapping with automated SSL.',
      },
      {
        title: 'Institutional Profile & Leadership Directory',
        description: 'Showcase governing body, headmaster message, faculty members, and institutional history with dignity.',
      },
      {
        title: 'Notice Board & Circular Publishing',
        description: 'Publish exam routines, admission circulars, and official PDF documents with searchable archives.',
      },
      {
        title: 'Online Admission & Application Portal',
        description: 'Digital admission forms, document uploads, and application status tracking for prospective students.',
      },
      {
        title: 'Event Media & Campus Photo Gallery',
        description: 'Cloud-optimized photo albums, co-curricular highlights, and achievements showcased in responsive grids.',
      },
      {
        title: 'Native Bilingual Content Architecture',
        description: 'Seamless toggle between Bangla and English versions across all pages, notices, and teacher directories.',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Tenant & Domain Provisioning',
        description: 'Deploy new institutional branches in minutes with automated SSL certificates and CDN routing.',
      },
      {
        step: '02',
        title: 'Institutional Content Ingestion',
        description: 'Populate institutional history, faculty profiles, governing body messages, and campus facilities.',
      },
      {
        step: '03',
        title: 'Autonomous Notice & Admission Launch',
        description: 'Staff publish notices and open digital admission applications without writing a line of code.',
      },
      {
        step: '04',
        title: 'Central Network Governance',
        description: 'Trust leadership monitors all branch portals, visitor telemetry, and security from one central console.',
      },
    ],
    targetAudience: [
      { title: 'Educational Networks & Chain Schools', description: 'Centralized web governance across multiple campus locations.' },
      { title: 'Colleges & Higher Academic Institutions', description: 'Departmental portals, admission forms, and public notices.' },
      { title: 'Institutional Trusts & Conglomerates', description: 'Consistent brand dignity and verified public transparency.' },
      { title: 'Cadet & Specialized Academies', description: 'Bilingual public portals compliant with educational standards.' },
    ],
    benefits: [
      { feature: 'Multi-Tenant Brand Consistency', benefit: 'Professional, unified brand dignity across all network institutions' },
      { feature: 'Zero-Plugin Core Security', benefit: 'Eliminates website defacement and third-party security vulnerabilities' },
      { feature: 'Bilingual Public Accessibility', benefit: 'Native Bangla and English support ensuring broad community reach' },
      { feature: '30-Second Notice Publishing', benefit: 'Non-technical staff upload circulars instantly from any browser' },
    ],
    pricing: {
      starterTitle: 'Single Institution Portal',
      starterDesc: 'Complete institutional website platform with unlimited bandwidth, custom domain mapping, and support.',
      enterpriseTitle: 'Multi-Campus Network Suite',
      enterpriseDesc: 'Centralized network governance dashboard for educational chains with unlimited branch subdomains.',
    },
    trustPoints: [
      { title: 'Automated Custom Domain SSL', description: 'Every institutional domain and subdomain is secured with automatic HTTPS encryption.' },
      { title: 'Global Cloudflare CDN Delivery', description: 'Lightning-fast page loading even during nationwide admission and exam result surges.' },
      { title: 'Ministry Standard Compliance', description: 'Layouts and transparency sections designed to meet national educational portal guidelines.' },
      { title: 'Dedicated Content Assistance', description: 'Our editorial and support team assists staff during setup and major academic transitions.' },
    ],
    faqs: [
      {
        question: 'Can each institution use its own custom .edu.bd or .org domain?',
        answer: 'Yes, custom domain mapping with automated SSL certificate generation is supported for every institution.',
      },
      {
        question: 'Can non-technical office staff upload notices and PDF circulars?',
        answer: 'Yes, the intuitive administrative interface is designed so anyone who can use email can publish notices in seconds.',
      },
      {
        question: 'Does the platform support proper Bangla typography?',
        answer: 'Yes, full Unicode Bangla support is native across all notices, menus, forms, and institutional descriptions.',
      },
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await PublicApiService.getProductBySlug(slug, 'en');
  if (!product) {
    return { title: 'Product Not Found | MRM InfoTech' };
  }
  const name = product.title || product.name || product.translations?.[0]?.name || 'Product';
  const tagline = product.tagline || product.translations?.[0]?.tagline || 'Cloud SaaS';
  const summary = product.description || product.summary || product.translations?.[0]?.summary || 'Enterprise SaaS Platform engineered by MRM InfoTech Ltd.';

  return {
    title: `${name} — ${tagline} | MRM InfoTech`,
    description: summary,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await PublicApiService.getProductBySlug(slug, 'en');

  if (!product) {
    notFound();
  }

  const translation = product.translations?.[0];
  const name = product.title || product.name || translation?.name || 'SaaS Product';
  const tagline = product.tagline || translation?.tagline || '';
  const summary = product.description || product.summary || translation?.summary || translation?.description || '';
  const stage = product.stage || 'LIVE';
  const color = product.brandColor || '#087FC4';
  const liveUrl = product.liveUrl || product.productSiteUrl || product.demoUrl;
  const images: string[] = Array.isArray(product.images) ? product.images : [];
  const caseStudy: string | null = product.caseStudy || null;

  // Match profile data or use generic enterprise fallback
  const profile = PRODUCT_PROFILES[slug] || {
    headline: `${name} — Built for Essential Enterprise Workflows.`,
    category: tagline || 'Proprietary Software Product',
    problems: {
      before: [
        'Manual workflows, repetitive administrative tasks, and human errors',
        'Scattered records without central synchronization or audit trails',
        'Slow daily turnaround causing operational bottlenecks',
        'Limited reporting and lack of real-time management visibility',
      ],
      withProduct: [
        'Centralized cloud-native architecture with instant record retrieval',
        'Automated workflows eliminating manual intervention and paperwork',
        'Fast turnaround times with real-time operational notifications',
        'Executive dashboards delivering actionable business telemetry',
      ],
    },
    modules: [
      { title: 'Core Operations Engine', description: 'End-to-end administration and lifecycle management.' },
      { title: 'Central Database & Governance', description: 'Encrypted storage with granular role-based access control.' },
      { title: 'Automated Reporting', description: 'Comprehensive audits, analytics, and printable executive summaries.' },
      { title: 'Multi-Tenant Scalability', description: 'Engineered for seamless horizontal growth and multi-branch operations.' },
    ],
    workflowSteps: [
      { step: '01', title: 'System Configuration', description: 'Tailored setup according to your organizational hierarchy.' },
      { step: '02', title: 'Data Migration', description: 'Safe ingestion of historical data with zero data loss.' },
      { step: '03', title: 'Live Operations', description: 'Automated daily workflows and staff role authorization.' },
      { step: '04', title: 'Continuous Telemetry', description: 'Ongoing performance reporting and institutional oversight.' },
    ],
    targetAudience: [
      { title: 'Enterprise Organizations', description: 'Scalable automation for institutional networks.' },
      { title: 'Growing Businesses', description: 'Cost-effective digital operations and customer management.' },
    ],
    benefits: [
      { feature: 'Centralized Architecture', benefit: 'Eliminates departmental silos and data fragmentation' },
      { feature: 'Role-Based Access', benefit: 'Prevents unauthorized data exposure and protects intellectual assets' },
    ],
    pricing: {
      starterTitle: 'Standard Cloud Edition',
      starterDesc: 'Hosted cloud platform with complete maintenance and regular software upgrades.',
      enterpriseTitle: 'Enterprise Dedicated Suite',
      enterpriseDesc: 'Tailored deployment with custom API integrations and dedicated support SLAs.',
    },
    trustPoints: [
      { title: 'Sovereign Data Protection', description: 'Strict database isolation with automated encrypted backups.' },
      { title: 'Guaranteed Reliability', description: 'High-availability infrastructure engineered for zero downtime.' },
    ],
    faqs: [
      {
        question: `How do I request a personalized demo for ${name}?`,
        answer: 'Click the "Request a Demo" button below to connect with our technical solutions team for a live walkthrough.',
      },
    ],
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      {/* =====================================================================
          SECTION 1 — PRODUCT HERO
          ===================================================================== */}
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] relative transition-colors duration-150 overflow-hidden">
        {/* Ambient radiance */}
        <div className="absolute top-0 right-1/4 w-96 h-96 mrm-glow-blue blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 mrm-glow-cyan blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1.5 ${
                  stage === 'LIVE'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {stage === 'LIVE' ? 'Live in Production' : `${stage} Release`}
              </span>

              <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mrm-glass-pill text-[#087FC4] dark:text-[#20B8D5]">
                {profile.category}
              </span>

              {product.isSourcePrivate ? (
                <span className="text-xs px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Lock className="w-3.5 h-3.5" /> Proprietary Intellectual Property (Private Code)
                </span>
              ) : product.sourceCodeUrl ? (
                <a
                  href={product.sourceCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 rounded-full font-semibold inline-flex items-center gap-1.5 bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5] border border-[#087FC4]/20 hover:underline"
                >
                  <Code2 className="w-3.5 h-3.5" /> Open Source / Public Repository
                </a>
              ) : null}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              {name}
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-[#087FC4] dark:text-[#20B8D5]">
              {profile.headline}
            </p>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/start-project?service=${slug}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 transition-all shadow-lg text-sm"
              >
                <span>Request Enterprise License</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold mrm-glass-card text-slate-800 dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] transition-colors text-sm"
                >
                  <span>Visit Live Platform</span>
                  <ExternalLink className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
                </a>
              )}

              <Link
                href={`/contact?demo=${slug}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-slate-300 dark:border-slate-700 hover:border-[#087FC4] text-slate-700 dark:text-slate-300 transition-colors text-sm"
              >
                Schedule Interactive Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2 — PROBLEMS & SOLUTIONS MATRIX (Before vs. With Product)
          ===================================================================== */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              Operational Transformation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Before {name} vs. Operating With {name}
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              See the exact operational bottlenecks our engineering eliminates from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column A: Before (Pain Points) */}
            <div className="p-8 rounded-3xl bg-red-500/[0.04] dark:bg-red-500/[0.07] border border-red-500/20 space-y-5">
              <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400 font-bold text-lg">
                <XCircle className="w-5 h-5 shrink-0" />
                <h3>Before Using {name}</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                {profile.problems.before.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column B: With Product (Engineering Solution) */}
            <div className="p-8 rounded-3xl bg-emerald-500/[0.05] dark:bg-emerald-500/[0.08] border border-emerald-500/25 space-y-5 shadow-sm">
              <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <h3>Operating With {name}</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                {profile.problems.withProduct.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 — CATEGORIZED KEY MODULES & FEATURES
          ===================================================================== */}
      <section className="py-20 bg-slate-50/60 dark:bg-[#0B1E3B]/30 border-b border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Engineered Capabilities &amp; Modular Features
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Each module is engineered to operate autonomously or synchronize seamlessly with central databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.modules.map((mod, idx) => (
              <div
                key={idx}
                className="mrm-glass-card rounded-2xl p-7 space-y-3.5 hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: color }}
                >
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {mod.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 — PRODUCT WALKTHROUGH / HOW IT WORKS
          ===================================================================== */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              Step-by-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              How {name} Deploys &amp; Operates
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              A frictionless transition path from paper or legacy tools into verified cloud automation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-2xl font-black text-[#087FC4] dark:text-[#20B8D5]">
                    {step.step}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5 — REAL PRODUCT SCREENSHOTS & INTERACTIVE GALLERY (Up to 10 Images)
          ===================================================================== */}
      {images.length > 0 && (
        <section className="py-20 bg-slate-50/50 dark:bg-[#0B1E3B]/40 border-b border-slate-200 dark:border-[#1E3557]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" /> Product Showcase &amp; Interactive Gallery
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Interface Screenshots &amp; Workflows
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Click any thumbnail to switch views, or open fullscreen to inspect details.
                </p>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono px-3 py-1 rounded-full mrm-glass-pill self-start sm:self-auto">
                {images.length} High-Res Screenshots
              </span>
            </div>

            <ProductInteractiveGallery images={images} title={name} stage={stage} />
          </div>
        </section>
      )}

      {/* =====================================================================
          CASE STUDY & ARCHITECTURAL SPECIFICATIONS
          ===================================================================== */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="mrm-glass-card rounded-3xl p-8 sm:p-10 space-y-5">
                <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Case Study &amp; System Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Solving Real-World Challenges Through Scalable Engineering
                </h3>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                  {caseStudy || `${name} was conceptualized, architected, and built by MRM InfoTech to solve systemic operational bottlenecks. By transitioning paper registers, disparate spreadsheets, and disconnected channels into a unified high-availability cloud platform, organizations achieve complete operational transparency.\n\nBuilt upon secure multi-tenant cloud architecture, it delivers instantaneous data synchronization, verifiable audit trails, and strict data isolation across every institutional deployment.`}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="mrm-glass-card rounded-3xl p-6 sm:p-8 space-y-5">
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-[#1E3557] pb-3">
                  Product Specifications
                </h4>
                <ul className="space-y-3.5 text-xs sm:text-sm">
                  <li className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-[#1E3557]/60">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Release Stage</span>
                    <span className="font-bold text-emerald-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {stage}
                    </span>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-[#1E3557]/60">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Source Code Status</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {product.isSourcePrivate ? 'Confidential / Private IP' : 'Public Repository'}
                    </span>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-[#1E3557]/60">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Engineering Owner</span>
                    <span className="font-bold text-[#087FC4] dark:text-[#20B8D5]">MRM InfoTech Ltd.</span>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-[#1E3557]/60">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Multi-Tenancy</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Native Database Isolation</span>
                  </li>
                  <li className="flex items-center justify-between py-1.5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Deployment</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Cloud High Availability</span>
                  </li>
                </ul>

                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-opacity"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6 — WHO IS IT FOR? (Target Audience)
          ===================================================================== */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center gap-1.5">
              <Users2 className="w-3.5 h-3.5" /> Institutional Fit
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Who Is {name} Built For?
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              Engineered specifically around regulatory frameworks, scale requirements, and local user behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.targetAudience.map((aud, idx) => (
              <div
                key={idx}
                className="mrm-glass-card rounded-2xl p-6 space-y-2.5 hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center font-black text-sm">
                  ✓
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {aud.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {aud.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7 — TANGIBLE USER BENEFITS (Feature-to-Benefit Value)
          ===================================================================== */}
      <section className="py-20 bg-slate-50 dark:bg-[#0B1E3B]/30 border-b border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Concrete Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Measurable Operational Advantages
            </h2>
          </div>

          <div className="mrm-glass-card rounded-3xl overflow-hidden divide-y divide-slate-100 dark:divide-[#1E3557]">
            {profile.benefits.map((b, idx) => (
              <div key={idx} className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{b.feature}</span>
                </div>
                <div className="text-sm font-semibold text-[#087FC4] dark:text-[#20B8D5] sm:text-right">
                  {b.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8 — PRICING & PACKAGES / REQUEST PRICING
          ===================================================================== */}
      <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider">
              Transparent Deployment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Institutional Licensing &amp; Packages
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              No hidden surprise costs. Scaled predictably to your institutional size and student/patient volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mrm-glass-card rounded-3xl p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
                  Standard Edition
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {profile.pricing.starterTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {profile.pricing.starterDesc}
                </p>
              </div>
              <Link
                href={`/start-project?service=${slug}`}
                className="w-full py-3 rounded-xl border border-[#087FC4] text-center font-bold text-xs text-[#087FC4] dark:text-[#20B8D5] hover:bg-[#087FC4]/10 transition-colors"
              >
                Request Quotation
              </Link>
            </div>

            <div className="rounded-3xl p-8 bg-gradient-to-br from-[#071A35] via-[#0B2548] to-[#103B68] text-white border border-[#20B8D5]/30 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#20B8D5]">
                  Enterprise Edition
                </span>
                <h3 className="text-2xl font-black text-white">
                  {profile.pricing.enterpriseTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {profile.pricing.enterpriseDesc}
                </p>
              </div>
              <Link
                href={`/start-project?service=${slug}&tier=enterprise`}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-center font-bold text-xs text-white shadow-md hover:opacity-95 transition-all relative z-10"
              >
                Schedule Architecture Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9 — TRUST, SECURITY & OPERATIONAL SUPPORT
          ===================================================================== */}
      <section className="py-20 bg-slate-50/60 dark:bg-[#0B1E3B]/30 border-b border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Certified Practices
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Data Protection, Backups &amp; Support SLA
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              Only authentic, verifiable engineering facts. We hold zero tolerance for data leaks or unbacked systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.trustPoints.map((tp, idx) => (
              <div key={idx} className="mrm-glass-card rounded-2xl p-6 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {tp.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CASE STUDY OVERVIEW (if available)
          ===================================================================== */}
      {caseStudy && (
        <section className="py-20 bg-white dark:bg-[#07162C] border-b border-slate-200 dark:border-[#1E3557]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Engineering &amp; Case Study
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Technical Architecture &amp; Case Overview
              </h2>
            </div>
            <div className="mrm-glass-card rounded-2xl p-8 sm:p-10 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {caseStudy}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 10 — PRODUCT FAQ & FINAL CALL-TO-ACTION
          ===================================================================== */}
      <section className="py-20 bg-slate-50 dark:bg-[#040D1A] border-t border-slate-200 dark:border-[#1E3557]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Questions About {name}?
            </h2>
          </div>

          <div className="space-y-4 mb-16">
            {profile.faqs.map((faq, idx) => (
              <div key={idx} className="mrm-glass-card rounded-2xl p-6 space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Final CTA Panel */}
          <div className="mrm-glass-cta rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 shadow-2xl relative overflow-hidden">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Upgrade Operations with {name}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
              Our software architects handle full system setup, data migration, and staff training. Let&apos;s build technology that works.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/start-project?service=${slug}`}
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 transition-all shadow-lg text-sm inline-flex items-center gap-2"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-xl font-semibold mrm-glass-pill text-white hover:text-[#20B8D5] transition-colors text-sm"
              >
                Contact Engineering Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
