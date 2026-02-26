'use client'

import { motion } from 'framer-motion'

interface CenteredHeroProps {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  badge?: string
  trustedBy?: string[]
}

export default function CenteredHero({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  badge,
  trustedBy,
}: CenteredHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-white/10 text-white/80 border border-white/10">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          {headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          {subheadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
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
        </motion.div>

        {/* Trusted By */}
        {trustedBy && trustedBy.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-slate-800"
          >
            <p className="text-sm text-slate-500 mb-4">Trusted by leading companies</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              {trustedBy.map((company, index) => (
                <span key={index} className="text-lg font-semibold text-slate-400">
                  {company}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
