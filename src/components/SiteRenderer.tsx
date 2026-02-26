'use client'

import { SiteConfig, SectionConfig } from '@/lib/generator'

// Backgrounds
import { AuroraBackground, GradientBackground, DotsBackground, LinesBackground } from '@/components/backgrounds'

// Components
import SimpleNavbar from '@/components/navbar/SimpleNavbar'
import TwoColumnWithImage from '@/components/heroes/TwoColumnWithImage'
import FeaturesGrid from '@/components/features/FeaturesGrid'
import AboutTwoColumn from '@/components/about/AboutTwoColumn'
import TestimonialsMarquee from '@/components/testimonials/TestimonialsMarquee'
import SimpleCTA from '@/components/cta/SimpleCTA'
import SimpleFooter from '@/components/footer/SimpleFooter'

interface SiteRendererProps {
  config: SiteConfig
}

// Service icons based on title keywords
const SERVICE_ICONS: Record<string, JSX.Element> = {
  emergency: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  repair: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  installation: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  maintenance: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  cleaning: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  water: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
  pipe: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  ),
  door: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  opener: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  commercial: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  sewer: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  fixture: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  default: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
}

function getIconForService(title: string): JSX.Element {
  const lowerTitle = title.toLowerCase()
  for (const [keyword, icon] of Object.entries(SERVICE_ICONS)) {
    if (keyword !== 'default' && lowerTitle.includes(keyword)) {
      return icon
    }
  }
  return SERVICE_ICONS.default
}

// Map section types to components
function renderSection(section: SectionConfig, index: number) {
  switch (section.type) {
    case 'navbar':
      return <SimpleNavbar key={index} {...(section.props as any)} />
    
    case 'hero':
      return (
        <TwoColumnWithImage
          key={index}
          headline={section.props.headline}
          subheadline={section.props.subheadline}
          ctaText={section.props.ctaText}
          ctaLink={section.props.ctaLink}
          secondaryCtaText={section.props.secondaryCtaText}
          secondaryCtaLink={section.props.secondaryCtaLink}
          imageSrc={section.props.imageSrc || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'}
          imageAlt={section.props.imageAlt || 'Hero image'}
          badge={section.props.badge}
        />
      )
    
    case 'features':
      return (
        <div key={index} id="services">
          <FeaturesGrid
            headline={section.props.headline}
            subheadline={section.props.subheadline}
            features={section.props.features?.map((f: any) => ({
              title: f.title,
              description: f.description,
              icon: getIconForService(f.title),
            })) || []}
          />
        </div>
      )
    
    case 'about':
      return (
        <div key={index} id="about">
          <AboutTwoColumn
            headline={section.props.headline}
            content={section.props.content}
            stats={section.props.stats}
            imageSrc={section.props.imageSrc}
          />
        </div>
      )
    
    case 'testimonials':
      return (
        <div key={index} id="testimonials">
          <TestimonialsMarquee
            headline={section.props.headline}
            testimonials={section.props.testimonials || []}
          />
        </div>
      )
    
    case 'cta':
      return (
        <div key={index} id="contact">
          <SimpleCTA
            headline={section.props.headline}
            subheadline={section.props.subheadline}
            ctaText={section.props.ctaText}
            ctaLink={section.props.ctaLink}
            variant="grid"
          />
        </div>
      )
    
    case 'footer':
      return (
        <SimpleFooter
          key={index}
          businessName={section.props.businessName}
          description={section.props.description}
          phone={section.props.phone}
          email={section.props.email}
          socials={section.props.socials}
        />
      )
    
    default:
      return null
  }
}

// Wrap content with background effect
function BackgroundWrapper({ 
  effect, 
  children 
}: { 
  effect: SiteConfig['backgroundEffect']
  children: React.ReactNode 
}) {
  switch (effect) {
    case 'aurora':
      return <AuroraBackground>{children}</AuroraBackground>
    case 'gradient':
      return <GradientBackground>{children}</GradientBackground>
    case 'dots':
      return <DotsBackground>{children}</DotsBackground>
    case 'lines':
      return <LinesBackground>{children}</LinesBackground>
    default:
      return <>{children}</>
  }
}

export default function SiteRenderer({ config }: SiteRendererProps) {
  // Find hero section index
  const heroIndex = config.sections.findIndex(s => s.type === 'hero')
  const navbarSection = config.sections.find(s => s.type === 'navbar')
  const heroSection = config.sections.find(s => s.type === 'hero')
  const otherSections = config.sections.filter(s => s.type !== 'navbar' && s.type !== 'hero')
  
  return (
    <main 
      className="min-h-screen"
      style={{
        '--color-primary': config.colorScheme.primary,
        '--color-secondary': config.colorScheme.secondary,
        '--color-accent': config.colorScheme.accent,
      } as React.CSSProperties}
    >
      {/* Navbar */}
      {navbarSection && renderSection(navbarSection, 0)}
      
      {/* Hero with background effect */}
      {heroSection && (
        <BackgroundWrapper effect={config.backgroundEffect}>
          {renderSection(heroSection, 1)}
        </BackgroundWrapper>
      )}
      
      {/* Other sections */}
      {otherSections.map((section, index) => renderSection(section, index + 2))}
    </main>
  )
}
