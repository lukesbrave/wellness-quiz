'use client'

import { motion } from 'framer-motion'

interface Feature {
  title: string
  description: string
  icon?: React.ReactNode
}

interface FeaturesGridProps {
  headline: string
  subheadline?: string
  features: Feature[]
}

export default function FeaturesGrid({
  headline,
  subheadline,
  features,
}: FeaturesGridProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                {feature.icon && (
                  <div className="w-12 h-12 mb-5 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
