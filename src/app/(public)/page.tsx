import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { CompanyIntro } from '@/components/home/CompanyIntro';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { WorkProcess } from '@/components/home/WorkProcess';
import { TechExpertise } from '@/components/home/TechExpertise';
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies';
import { TeamPreview } from '@/components/home/TeamPreview';
import { LatestBlog } from '@/components/home/LatestBlog';
import { HomeCta } from '@/components/home/HomeCta';
import { PublicApiService } from '@/services/public-api.service';

export const metadata: Metadata = {
  title: 'MRM InfoTech — IDEAS • PRODUCTS • IMPACT | Software Products & Digital Solutions',
  description:
    'MRM InfoTech builds innovative software products (EduManage BD, MediSheba BD) and delivers modern digital solutions that help businesses and organizations grow, adapt, and succeed.',
};

export default async function HomePage() {
  const [
    company,
    products,
    services,
    projects,
    caseStudies,
    team,
    blogPosts,
  ] = await Promise.all([
    PublicApiService.getCompanyProfile(),
    PublicApiService.getProducts('en'),
    PublicApiService.getServices('en'),
    PublicApiService.getProjects('en'),
    PublicApiService.getCaseStudies('en'),
    PublicApiService.getTeamMembers('en'),
    PublicApiService.getBlogPosts('en'),
  ]);

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      {/* Section 01: Hero Section */}
      <HeroSection />

      {/* Section 02: Company Introduction */}
      <CompanyIntro company={company} />

      {/* Section 03: What We Do (Services Overview) */}
      <ServicesOverview services={services} />

      {/* Section 04: Our Products */}
      <FeaturedProducts products={products} />

      {/* Section 05: Why Choose MRM InfoTech */}
      <WhyChooseUs />

      {/* Section 06: Featured Projects */}
      <FeaturedProjects projects={projects} />

      {/* Section 07: How We Work */}
      <WorkProcess />

      {/* Section 08: Technology Expertise */}
      <TechExpertise />

      {/* Section 09: Case Studies */}
      <FeaturedCaseStudies caseStudies={caseStudies} />

      {/* Section 10: Team Preview */}
      <TeamPreview team={team} />

      {/* Section 11: Blog & Insights */}
      <LatestBlog posts={blogPosts} />

      {/* Section 12: Final CTA */}
      <HomeCta company={company} />
    </div>
  );
}
