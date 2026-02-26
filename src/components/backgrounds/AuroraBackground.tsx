'use client'

import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  children: React.ReactNode
  className?: string
}

export default function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0a0a0a]", className)}>
      {/* Aurora effect - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div 
          className="
            absolute -inset-[10px] opacity-40
            [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#8b5cf6_15%,#06b6d4_20%,#3b82f6_25%,#8b5cf6_30%)]
            [background-image:var(--aurora)]
            [background-size:300%_300%]
            [background-position:50%_50%]
            animate-aurora
            blur-[120px]
            saturate-150
          "
        />
      </div>
      
      {/* Mobile-friendly gradient fallback */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0a0a0a]/70" />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
