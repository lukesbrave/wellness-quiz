'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AboutTwoColumnProps {
  headline: string
  content: string[]
  imageSrc?: string
  imageAlt?: string
  stats?: { value: string; label: string }[]
  imagePosition?: 'left' | 'right'
}

export default function AboutTwoColumn({
  headline,
  content,
  imageSrc,
  imageAlt = 'About us',
  stats,
  imagePosition = 'right',
}: AboutTwoColumnProps) {
  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === 'right' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col justify-center"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
        {headline}
      </h2>
      
      <div className="space-y-4 mb-8">
        {content.map((paragraph, index) => (
          <p key={index} className="text-slate-400 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )

  const imageContent = imageSrc && (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === 'right' ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
      {/* Decorative element */}
      <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl border border-slate-700/50" />
    </motion.div>
  )

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {imagePosition === 'left' ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
