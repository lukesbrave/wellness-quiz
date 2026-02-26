'use client'

import { cn } from '@/lib/utils'

interface GradientBackgroundProps {
  children: React.ReactNode
  className?: string
  variant?: 'blue' | 'purple' | 'teal' | 'warm'
}

const gradients = {
  blue: 'from-blue-600/20 via-cyan-500/10 to-blue-600/20',
  purple: 'from-purple-600/20 via-pink-500/10 to-purple-600/20',
  teal: 'from-teal-600/20 via-emerald-500/10 to-teal-600/20',
  warm: 'from-orange-600/20 via-red-500/10 to-orange-600/20',
}

export default function GradientBackground({ 
  children, 
  className,
  variant = 'blue' 
}: GradientBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0a0a0a]", className)}>
      {/* Animated gradient blobs */}
      <div className="absolute inset-0">
        <div className={cn(
          "absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl animate-gradient bg-gradient-to-r",
          gradients[variant]
        )} />
        <div className={cn(
          "absolute bottom-0 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl animate-gradient bg-gradient-to-l",
          gradients[variant]
        )} style={{ animationDelay: '-4s' }} />
      </div>
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
