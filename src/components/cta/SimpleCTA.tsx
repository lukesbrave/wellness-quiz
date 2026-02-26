'use client'

import { motion } from 'framer-motion'

interface SimpleCTAProps {
  headline: string
  subheadline?: string
  ctaText: string
  ctaLink: string
  variant?: 'default' | 'noise' | 'grid'
}

export default function SimpleCTA({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  variant = 'default',
}: SimpleCTAProps) {
  const bgClass = {
    default: 'bg-slate-800/50',
    noise: 'bg-slate-800/50 bg-noise',
    grid: 'bg-slate-800/50 bg-dashed-grid',
  }[variant]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`max-w-4xl mx-auto text-center p-12 sm:p-16 rounded-3xl border border-slate-700/50 relative overflow-hidden ${bgClass}`}
      >
        {/* Decorative blurs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {headline}
          </h2>
          
          {subheadline && (
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}
          
          <motion.a
            href={ctaLink}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-slate-100 transition-colors"
          >
            {ctaText}
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
