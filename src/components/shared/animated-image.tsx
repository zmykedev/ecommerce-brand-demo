import { useState } from 'react'
import { ImagePlaceholder } from './image-placeholder'
import { cn } from '@/lib/utils'

interface AnimatedImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function AnimatedImage({
  src,
  alt,
  className,
  containerClassName,
  size = 'md',
  animated = true,
  onLoad,
  onError,
}: AnimatedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Si src está vacío, mostrar directamente el placeholder
  if (!src || src.trim() === '') {
    return (
      <div className={cn('relative w-full h-full', containerClassName)}>
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary via-muted to-accent",
          animated && "animate-pulse-subtle"
        )}>
          <ImagePlaceholder size={size} animated={animated} className="w-full h-full" />
        </div>
      </div>
    )
  }

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  return (
    <div className={cn('relative w-full h-full', containerClassName)}>
      {isLoading && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary via-muted to-accent",
          animated && "animate-pulse-subtle"
        )}>
          <ImagePlaceholder size={size} animated={animated} className="w-full h-full" />
        </div>
      )}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0 absolute' : 'opacity-100',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary via-muted to-accent">
          <ImagePlaceholder size={size} animated={animated} className="w-full h-full" />
        </div>
      )}
    </div>
  )
}

