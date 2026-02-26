/**
 * Template Generator Engine
 * Takes quiz data and generates site configuration
 */

export interface QuizData {
  industry: string;
  businessType: 'service' | 'product' | 'hybrid';
  businessName: string;
  businessDescription: string;
  siteGoals: string[];
  stylePreference: 'modern-minimal' | 'bold-colorful' | 'classic-professional' | 'creative-artistic';
  colorPalette: string;
  contentSections: string[];
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  logoUrl?: string;
  
  // Optional content (if provided)
  services?: Array<{ title: string; description: string }>;
  testimonials?: Array<{ quote: string; author: string; role?: string }>;
  teamMembers?: Array<{ name: string; role: string; image?: string }>;
  pricing?: Array<{ name: string; price: string; features: string[]; highlighted?: boolean }>;
  stats?: Array<{ value: string; label: string }>;
  aboutContent?: string[];
  heroImage?: string;
  aboutImage?: string;
}

export interface SiteConfig {
  // Meta
  businessName: string;
  description: string;
  
  // Theme
  theme: 'dark' | 'light';
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  
  // Background effect
  backgroundEffect: 'none' | 'dots' | 'lines' | 'aurora' | 'gradient';
  
  // Components to render (in order)
  sections: SectionConfig[];
  
  // Contact
  contact: {
    email: string;
    phone: string;
    socials: Record<string, string>;
  };
}

export interface SectionConfig {
  type: string;
  variant: string;
  props: Record<string, any>;
}

// Color schemes mapped to palettes
const COLOR_SCHEMES: Record<string, SiteConfig['colorScheme']> = {
  ocean: { primary: '#0EA5E9', secondary: '#06B6D4', accent: '#14B8A6', background: '#0a0a0a' },
  sunset: { primary: '#F97316', secondary: '#EF4444', accent: '#EC4899', background: '#0a0a0a' },
  forest: { primary: '#22C55E', secondary: '#16A34A', accent: '#15803D', background: '#0a0a0a' },
  midnight: { primary: '#64748B', secondary: '#475569', accent: '#94A3B8', background: '#0f172a' },
  lavender: { primary: '#8B5CF6', secondary: '#A78BFA', accent: '#C4B5FD', background: '#0a0a0a' },
  earth: { primary: '#78716C', secondary: '#A8A29E', accent: '#D6D3D1', background: '#1c1917' },
  coral: { primary: '#FB7185', secondary: '#FDA4AF', accent: '#FECDD3', background: '#0a0a0a' },
  monochrome: { primary: '#ffffff', secondary: '#a3a3a3', accent: '#737373', background: '#0a0a0a' },
};

// Background effect based on style
const STYLE_TO_BACKGROUND: Record<string, SiteConfig['backgroundEffect']> = {
  'modern-minimal': 'none',
  'bold-colorful': 'aurora',
  'classic-professional': 'lines',
  'creative-artistic': 'gradient',
};

// Hero variant based on business type and style
function selectHeroVariant(quiz: QuizData): string {
  if (quiz.stylePreference === 'bold-colorful' || quiz.stylePreference === 'creative-artistic') {
    return 'playful';
  }
  if (quiz.businessType === 'product') {
    return 'centered';
  }
  return 'twoColumn';
}

// Features variant based on content amount
function selectFeaturesVariant(servicesCount: number): string {
  if (servicesCount <= 3) return 'simple';
  if (servicesCount <= 6) return 'grid';
  return 'stickyScroll';
}

export function generateSiteConfig(quiz: QuizData): SiteConfig {
  const colorScheme = COLOR_SCHEMES[quiz.colorPalette] || COLOR_SCHEMES.monochrome;
  const backgroundEffect = STYLE_TO_BACKGROUND[quiz.stylePreference] || 'none';
  
  const sections: SectionConfig[] = [];
  
  // 1. Navbar (always)
  sections.push({
    type: 'navbar',
    variant: 'simple',
    props: {
      businessName: quiz.businessName,
      logoUrl: quiz.logoUrl,
      links: quiz.contentSections
        .filter(s => !['hero'].includes(s))
        .map(s => ({ label: s.charAt(0).toUpperCase() + s.slice(1), href: `#${s}` })),
      ctaText: quiz.siteGoals.includes('bookings') ? 'Book Now' : 'Contact Us',
      ctaLink: '#contact',
      phone: quiz.contactPhone,
    },
  });
  
  // 2. Hero (always)
  sections.push({
    type: 'hero',
    variant: selectHeroVariant(quiz),
    props: {
      headline: generateHeadline(quiz),
      subheadline: quiz.businessDescription,
      ctaText: quiz.siteGoals.includes('leads') ? 'Get a Free Quote' : 
               quiz.siteGoals.includes('bookings') ? 'Book Appointment' : 'Learn More',
      ctaLink: '#contact',
      badge: generateBadge(quiz),
      imageSrc: quiz.heroImage,
      imageAlt: `${quiz.businessName} - ${quiz.industry}`,
    },
  });
  
  // 3. Services/Features (if selected)
  if (quiz.contentSections.includes('services') && quiz.services?.length) {
    sections.push({
      type: 'features',
      variant: selectFeaturesVariant(quiz.services.length),
      props: {
        headline: quiz.businessType === 'product' ? 'Features' : 'Our Services',
        subheadline: `What ${quiz.businessName} offers`,
        features: quiz.services,
      },
    });
  }
  
  // 4. About (if selected)
  if (quiz.contentSections.includes('about')) {
    sections.push({
      type: 'about',
      variant: 'twoColumn',
      props: {
        headline: `About ${quiz.businessName}`,
        content: quiz.aboutContent || [quiz.businessDescription],
        stats: quiz.stats,
        imageSrc: quiz.aboutImage || quiz.heroImage,
      },
    });
  }
  
  // 5. Pricing (if selected and has data)
  if (quiz.contentSections.includes('pricing') && quiz.pricing?.length) {
    sections.push({
      type: 'pricing',
      variant: 'cards',
      props: {
        headline: 'Pricing',
        subheadline: 'Choose the plan that works for you',
        plans: quiz.pricing,
      },
    });
  }
  
  // 6. Testimonials (if selected and has data)
  if (quiz.contentSections.includes('testimonials') && quiz.testimonials?.length) {
    sections.push({
      type: 'testimonials',
      variant: quiz.testimonials.length > 3 ? 'marquee' : 'grid',
      props: {
        headline: 'What Our Clients Say',
        testimonials: quiz.testimonials,
      },
    });
  }
  
  // 7. Team (if selected and has data)
  if (quiz.contentSections.includes('team') && quiz.teamMembers?.length) {
    sections.push({
      type: 'team',
      variant: 'grid',
      props: {
        headline: 'Meet the Team',
        members: quiz.teamMembers,
      },
    });
  }
  
  // 8. CTA (always before footer)
  sections.push({
    type: 'cta',
    variant: 'simple',
    props: {
      headline: generateCtaHeadline(quiz),
      subheadline: 'Get in touch today',
      ctaText: quiz.siteGoals.includes('bookings') ? 'Book Now' : 'Contact Us',
      ctaLink: '#contact',
    },
  });
  
  // 9. Footer (always)
  sections.push({
    type: 'footer',
    variant: 'simple',
    props: {
      businessName: quiz.businessName,
      description: quiz.businessDescription.substring(0, 150),
      phone: quiz.contactPhone,
      email: quiz.contactEmail,
      socials: quiz.socialLinks,
    },
  });
  
  return {
    businessName: quiz.businessName,
    description: quiz.businessDescription,
    theme: 'dark',
    colorScheme,
    backgroundEffect,
    sections,
    contact: {
      email: quiz.contactEmail,
      phone: quiz.contactPhone,
      socials: quiz.socialLinks,
    },
  };
}

// Helper functions for generating copy
function generateHeadline(quiz: QuizData): string {
  const templates: Record<string, string[]> = {
    service: [
      `Professional ${quiz.industry} Services`,
      `Trusted ${quiz.industry} Experts`,
      `Your Local ${quiz.industry} Specialists`,
    ],
    product: [
      `${quiz.businessName}`,
      `Discover ${quiz.businessName}`,
      `Welcome to ${quiz.businessName}`,
    ],
    hybrid: [
      `${quiz.businessName}`,
      `Experience ${quiz.businessName}`,
    ],
  };
  
  const options = templates[quiz.businessType] || templates.service;
  return options[0]; // Could randomize or use AI to pick best
}

function generateBadge(quiz: QuizData): string | undefined {
  if (quiz.businessType === 'service') {
    return `Trusted ${quiz.industry} Professionals`;
  }
  return undefined;
}

function generateCtaHeadline(quiz: QuizData): string {
  if (quiz.siteGoals.includes('bookings')) {
    return 'Ready to Book?';
  }
  if (quiz.siteGoals.includes('leads')) {
    return 'Ready to Get Started?';
  }
  return `Get in Touch with ${quiz.businessName}`;
}
