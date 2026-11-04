import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import {
  CompanyIntroSection,
  BusinessAreasSection,
  ProductsShowcaseSection,
  ServicesGridSection,
  WhyChooseUsSection,
  WorkProcessSection,
  TechExpertiseSection,
  FinalCtaSection,
} from "@/components/home/CoreHomepageSections";
import {
  FeaturedProjectsSection,
  CaseStudiesSection,
  TeamSection,
  BlogSection,
  FaqSection,
} from "@/components/home/DynamicSections";
import { PublicApiService } from "@/services/public-api.service";

export const metadata: Metadata = {
  title: "MRM InfoTech — IDEAS • PRODUCTS • IMPACT | Software Products & Digital Solutions",
  description:
    "We build innovative software products (EduManage BD, MediSheba BD) and deliver custom digital solutions that help businesses and organizations simplify operations, solve real-world challenges, and grow with technology.",
  openGraph: {
    title: "MRM InfoTech — IDEAS • PRODUCTS • IMPACT",
    description:
      "Software Products & Digital Solutions Company building EduManage BD, MediSheba BD, and custom enterprise web applications.",
    type: "website",
  },
};

export default async function HomePage() {
  const [
    products,
    services,
    projects,
    caseStudies,
    team,
    blogPosts,
    faqs,
  ] = await Promise.all([
    PublicApiService.getProducts("en"),
    PublicApiService.getServices("en"),
    PublicApiService.getProjects("en"),
    PublicApiService.getCaseStudies("en"),
    PublicApiService.getTeamMembers("en"),
    PublicApiService.getBlogPosts("en"),
    PublicApiService.getFaqs(),
  ]);

  return (
    <div className="w-full flex flex-col transition-colors duration-150">
      {/* Section 01: Hero */}
      <HeroSection />

      {/* Section 02: Company Introduction */}
      <CompanyIntroSection />

      {/* Section 03: Business Areas */}
      <BusinessAreasSection />

      {/* Section 04: Software Products (EduManage BD, MediSheba BD, Multi-Institution) */}
      <ProductsShowcaseSection products={products} />

      {/* Section 05: Services (10 Core Services) */}
      <ServicesGridSection services={services} />

      {/* Section 06: Why Choose MRM InfoTech */}
      <WhyChooseUsSection />

      {/* Section 07: Featured Projects (Auto-hides if empty) */}
      <FeaturedProjectsSection projects={projects} />

      {/* Section 08: Work Process */}
      <WorkProcessSection />

      {/* Section 09: Technology Expertise */}
      <TechExpertiseSection />

      {/* Section 10: Case Studies (Auto-hides if empty) */}
      <CaseStudiesSection caseStudies={caseStudies} />

      {/* Section 11: Team (Auto-hides if empty) */}
      <TeamSection team={team} />

      {/* Section 12: Blog & Insights (Auto-hides if empty) */}
      <BlogSection posts={blogPosts} />

      {/* Section 13: FAQ */}
      <FaqSection faqs={faqs} />

      {/* Section 14: Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
