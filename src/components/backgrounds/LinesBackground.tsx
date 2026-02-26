'use client'

import { cn } from '@/lib/utils'

interface LinesBackgroundProps {
  children: React.ReactNode
  className?: string
  lineColor?: string
  direction?: 'vertical' | 'horizontal' | 'both'
  gap?: number
}

export default function LinesBackground({ 
  children, 
  className,
  lineColor = 'rgba(255,255,255,0.05)',
  direction = 'both',
  gap = 60
}: LinesBackgroundProps) {
  const getBackgroundImage = () => {
    const vertical = `linear-gradient(to right, ${lineColor} 1px, transparent 1px)`
    const horizontal = `linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`
    
    if (direction === 'vertical') return vertical
    if (direction === 'horizontal') return horizontal
    return `${vertical}, ${horizontal}`
  }

  return (
    <div className={cn("relative bg-[#0a0a0a]", className)}>
      {/* Lines pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: getBackgroundImage(),
          backgroundSize: `${gap}px ${gap}px`,
        }}
      />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
