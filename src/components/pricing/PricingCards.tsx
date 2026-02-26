'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PricingPlan {
  name: string
  price: string
  period?: string
  description?: string
  features: string[]
  ctaText?: string
  ctaLink?: string
  highlighted?: boolean
  badge?: string
}

interface PricingCardsProps {
  headline?: string
  subheadline?: string
  plans: PricingPlan[]
}

export default function PricingCards({
  headline = 'Pricing',
  subheadline,
  plans,
}: PricingCardsProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
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

        {/* Pricing Cards */}
        <div className={cn(
          "grid gap-8",
          plans.length === 2 && "md:grid-cols-2 max-w-4xl mx-auto",
          plans.length === 3 && "md:grid-cols-3",
          plans.length >= 4 && "md:grid-cols-2 lg:grid-cols-4"
        )}>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl p-8 flex flex-col",
                plan.highlighted
                  ? "bg-white text-slate-900 scale-105 shadow-xl shadow-white/10"
                  : "bg-slate-800/50 border border-slate-700/50"
              )}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-white text-slate-900 text-sm font-semibold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={cn(
                "text-xl font-semibold mb-2",
                plan.highlighted ? "text-slate-900" : "text-white"
              )}>
                {plan.name}
              </h3>

              {/* Description */}
              {plan.description && (
                <p className={cn(
                  "text-sm mb-4",
                  plan.highlighted ? "text-slate-600" : "text-slate-400"
                )}>
                  {plan.description}
                </p>
              )}

              {/* Price */}
              <div className="mb-6">
                <span className={cn(
                  "text-4xl font-bold",
                  plan.highlighted ? "text-slate-900" : "text-white"
                )}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={cn(
                    "text-sm ml-1",
                    plan.highlighted ? "text-slate-600" : "text-slate-500"
                  )}>
                    /{plan.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg
                      className={cn(
                        "w-5 h-5 mt-0.5 flex-shrink-0",
                        plan.highlighted ? "text-green-600" : "text-green-400"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={cn(
                      "text-sm",
                      plan.highlighted ? "text-slate-700" : "text-slate-300"
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.a
                href={plan.ctaLink || '#contact'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full py-3 text-center font-semibold rounded-full transition-colors",
                  plan.highlighted
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-white text-slate-900 hover:bg-slate-100"
                )}
              >
                {plan.ctaText || 'Get Started'}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
