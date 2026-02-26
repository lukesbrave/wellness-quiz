'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface TwoColumnHeroProps {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  imageSrc: string
  imageAlt: string
  badge?: string
}

export default function TwoColumnWithImage({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  imageSrc,
  imageAlt,
  badge,
}: TwoColumnHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center py-20 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {badge && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-white/10 text-white/80 border border-white/10"
              >
                {badge}
              </motion.span>
            )}
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {headline}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
              {subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href={ctaLink}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-slate-100 transition-colors"
              >
                {ctaText}
              </motion.a>
              
              {secondaryCtaText && secondaryCtaLink && (
                <motion.a
                  href={secondaryCtaLink}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors"
                >
                  {secondaryCtaText}
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-2xl border border-white/10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
