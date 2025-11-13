import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <div
      className="animate-fade-in-up hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
      style={{
        animationDelay: `${delay * 100}ms`,
      }}
    >
      <Card className={cn('shadow-lg', className)}>{children}</Card>
    </div>
  )
}

