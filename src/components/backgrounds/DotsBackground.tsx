'use client'

import { cn } from '@/lib/utils'

interface DotsBackgroundProps {
  children: React.ReactNode
  className?: string
  dotColor?: string
  dotSize?: number
  gap?: number
}

export default function DotsBackground({ 
  children, 
  className,
  dotColor = 'rgba(255,255,255,0.15)',
  dotSize = 1,
  gap = 20
}: DotsBackgroundProps) {
  return (
    <div className={cn("relative bg-[#0a0a0a]", className)}>
      {/* Dots pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
        }}
      />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
