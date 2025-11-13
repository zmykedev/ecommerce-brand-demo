import { Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
}

const iconSizes = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

export function ImagePlaceholder({
  className,
  size = 'md',
  animated = true,
}: ImagePlaceholderProps) {
  const hasCustomSize = className?.includes('w-full') || className?.includes('h-full')
  
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg bg-gradient-to-br from-secondary via-muted to-accent',
        !hasCustomSize && sizeClasses[size],
        animated && 'animate-pulse-subtle',
        className
      )}
    >
      <ImageIcon
        className={cn(
          'text-muted-foreground',
          animated && 'animate-icon-glow',
          hasCustomSize ? 'h-12 w-12 sm:h-16 sm:w-16' : iconSizes[size]
        )}
      />
    </div>
  )
}

