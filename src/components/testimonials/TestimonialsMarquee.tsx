'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  quote: string
  author: string
  role?: string
  avatar?: string
}

interface TestimonialsMarqueeProps {
  headline?: string
  testimonials: Testimonial[]
}

export default function TestimonialsMarquee({
  headline = "What Our Clients Say",
  testimonials,
}: TestimonialsMarqueeProps) {
  // Duplicate for seamless scroll
  const allTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center"
        >
          {headline}
        </motion.h2>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
          className="flex gap-6"
        >
          {allTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50"
            >
              <p className="text-slate-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{testimonial.author}</p>
                  {testimonial.role && (
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
