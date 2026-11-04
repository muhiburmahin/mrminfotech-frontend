export interface HomepageCMSContent {
  hero?: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  intro?: {
    eyebrow: string;
    heading: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export const DEFAULT_HOMEPAGE_COPY = {
  brandTagline: 'IDEAS • PRODUCTS • IMPACT',
  hero: {
    eyebrow: 'SOFTWARE PRODUCTS & DIGITAL SOLUTIONS',
    heading: 'We Turn Ideas Into Technology That Moves Businesses Forward.',
    description:
      'We build innovative software products and deliver custom digital solutions that help businesses and organizations simplify operations, solve real-world challenges, and grow with technology.',
    primaryCtaLabel: 'Explore Our Services',
    primaryCtaHref: '/services',
    secondaryCtaLabel: 'Discover Our Products',
    secondaryCtaHref: '/products',
  },
  companyIntro: {
    eyebrow: 'WHO WE ARE',
    heading: 'Technology With Purpose. Solutions With Impact.',
    description:
      'MRM InfoTech is a technology company focused on building software products and delivering digital solutions for modern businesses and organizations. From our own industry-focused platforms to custom digital experiences, we bring ideas to life through thoughtful design, practical technology, and a commitment to meaningful results.',
    ctaLabel: 'Discover MRM InfoTech',
    ctaHref: '/about',
  },
  businessAreas: {
    eyebrow: 'WHAT WE DO',
    heading: 'Two Areas of Focus. One Vision for Better Technology.',
    description:
      'We create technology that serves real needs. Through our own software products and client-focused digital services, we help organizations embrace better ways of working and growing.',
    areas: [
      {
        id: 'software-products',
        badge: 'Proprietary Platforms',
        title: 'Software Products',
        description:
          'We develop industry-focused software platforms designed to simplify operations and solve practical challenges.',
        highlights: ['Education Management', 'Healthcare Operations', 'Multi-Institution Portals'],
        href: '/products',
      },
      {
        id: 'client-solutions',
        badge: 'Custom Engineering',
        title: 'Client Solutions',
        description:
          'We deliver websites, custom software, web applications, and digital solutions shaped around business needs.',
        highlights: ['Custom Web & SaaS Apps', 'Enterprise Architecture', 'API & Automation'],
        href: '/services',
      },
    ],
    ctaLabel: 'Explore What We Do',
    ctaHref: '/services',
  },
  productsSection: {
    eyebrow: 'BUILT BY MRM INFOTECH',
    heading: 'Our Products. Built Around Real-World Needs.',
    description:
      'We are building focused technology products that help organizations manage their operations, connect with people, and create better digital experiences.',
    ctaLabel: 'Explore All Products',
    ctaHref: '/products',
    fallbackProducts: [
      {
        slug: 'edumanage-bd',
        name: 'EduManage BD',
        category: 'Education Management Software',
        description:
          'A digital platform designed to simplify educational institution management and support connected academic operations.',
        ctaText: 'Explore Product',
      },
      {
        slug: 'medisheba-bd',
        name: 'MediSheba BD',
        category: 'Healthcare & Diagnostic Management',
        description:
          'A healthcare technology platform designed to support diagnostic centres and healthcare service operations.',
        ctaText: 'Explore Product',
      },
      {
        slug: 'multi-institution-website-platform',
        name: 'Multi-Institution Website Platform',
        category: 'Institutional Website Management',
        description:
          'A platform designed to help educational institutions manage their own professional websites and digital presence.',
        ctaText: 'Explore Platform',
      },
    ],
  },
  servicesSection: {
    eyebrow: 'OUR SERVICES',
    heading: 'From Digital Ideas to Fully Built Solutions.',
    description:
      'Whether you need a modern website, custom software, a scalable web application, or support for your digital growth, we work to turn your requirements into practical solutions.',
    ctaLabel: 'Explore All Services',
    ctaHref: '/services',
    items: [
      {
        title: 'Web Development',
        description:
          'Modern, responsive websites designed to communicate your brand and support your business goals.',
      },
      {
        title: 'Custom Software Development',
        description:
          'Tailored software solutions built around your unique workflows and operational requirements.',
      },
      {
        title: 'Web Application Development',
        description:
          'Interactive, reliable web applications designed for real-world business use.',
      },
      {
        title: 'SaaS Development',
        description:
          'Scalable software platforms that turn ideas into usable digital products.',
      },
      {
        title: 'E-commerce Development',
        description:
          'Online shopping experiences designed to help businesses sell and manage products digitally.',
      },
      {
        title: 'API Development & Integration',
        description:
          'Reliable APIs and integrations that help different systems work together.',
      },
      {
        title: 'Business Automation',
        description:
          'Practical automation solutions that simplify repetitive work and improve efficiency.',
      },
      {
        title: 'UI/UX Design',
        description:
          'User-centered interfaces designed for clarity, usability, and engaging experiences.',
      },
      {
        title: 'SEO & Digital Marketing',
        description:
          'Digital strategies that help businesses improve online visibility and reach relevant audiences.',
      },
      {
        title: 'Website Maintenance',
        description:
          'Ongoing website support, updates, and improvements to keep digital experiences reliable.',
      },
    ],
  },
  whyChooseUs: {
    eyebrow: 'WHY WORK WITH US',
    heading: 'Built With Purpose. Driven by Quality. Focused on Impact.',
    description:
      'Good technology starts with understanding the problem. We focus on clear requirements, thoughtful planning, quality development, and solutions that serve meaningful business goals.',
    cards: [
      {
        title: 'Purpose-Driven Thinking',
        description:
          'We start by understanding the real problem before choosing the technology.',
      },
      {
        title: 'Quality-Focused Development',
        description:
          'We value clean implementation, usability, and dependable results.',
      },
      {
        title: 'Modern Technology',
        description:
          'We use suitable modern tools and technologies to build maintainable solutions.',
      },
      {
        title: 'Client-Centered Approach',
        description:
          'We value clear communication and solutions shaped around actual requirements.',
      },
      {
        title: 'Long-Term Perspective',
        description:
          'We consider maintainability, adaptability, and future growth.',
      },
      {
        title: 'Continuous Improvement',
        description:
          'We keep learning, refining, and improving the way we build.',
      },
    ],
  },
  workProcess: {
    eyebrow: 'OUR APPROACH',
    heading: 'A Thoughtful Process. From First Conversation to Final Delivery.',
    description:
      'Every successful solution begins with a clear understanding of the goal. Our process helps turn requirements into carefully planned, tested, and usable digital experiences.',
    steps: [
      {
        number: '01',
        title: 'Discover',
        description: 'We understand your goals, challenges, and requirements.',
      },
      {
        number: '02',
        title: 'Plan',
        description: 'We define the project scope, priorities, and suitable approach.',
      },
      {
        number: '03',
        title: 'Design & Build',
        description:
          'We turn the plan into a functional and thoughtful digital solution.',
      },
      {
        number: '04',
        title: 'Test & Refine',
        description:
          'We review functionality, usability, and quality before delivery.',
      },
      {
        number: '05',
        title: 'Launch & Support',
        description:
          'We deliver the solution and provide agreed ongoing support.',
      },
    ],
  },
  technology: {
    eyebrow: 'OUR TECHNOLOGY',
    heading: 'The Right Tools. Thoughtfully Applied.',
    description:
      'We work with modern development technologies and tools, selecting the right combination for each project\'s needs, performance requirements, and long-term maintainability.',
    stack: [
      { name: 'React', category: 'Frontend UI' },
      { name: 'Next.js', category: 'Full-Stack Framework' },
      { name: 'TypeScript', category: 'Type Safety' },
      { name: 'Node.js', category: 'Runtime' },
      { name: 'NestJS', category: 'Backend Architecture' },
      { name: 'PostgreSQL', category: 'Relational Database' },
      { name: 'Prisma', category: 'ORM & Data Layer' },
      { name: 'Tailwind CSS', category: 'Design System' },
    ],
  },
  finalCta: {
    eyebrow: "LET'S CREATE SOMETHING MEANINGFUL",
    heading: "Have an Idea? Let's Turn It Into Something Real.",
    description:
      "Whether you're planning a new digital product, need a custom software solution, or want to strengthen your online presence, we'd love to hear what you're working on.",
    primaryCtaLabel: 'Start a Project',
    primaryCtaHref: '/start-project',
    secondaryCtaLabel: 'Talk to Our Team',
    secondaryCtaHref: '/contact',
  },
};

