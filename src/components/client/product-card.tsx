import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { AnimatedCard } from '@/components/shared/animated-card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'
import { formatPrice } from '@/lib/utils'
import { Star } from 'lucide-react'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const { isInWishlist, toggleItem } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  return (
    <AnimatedCard delay={index * 0.1} className="overflow-hidden">
      <div className="relative group">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square w-full overflow-hidden bg-muted">
            <motion.img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={() => toggleItem(product)}
        >
          <Heart
            className={`h-5 w-5 ${
              inWishlist ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </Button>
        {product.featured && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-semibold rounded">
            Destacado
          </span>
        )}
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewsCount})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
          <Button
            onClick={() => addItem(product)}
            size="sm"
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Agregar
          </Button>
        </div>
        {product.stock < 10 && (
          <p className="text-xs text-destructive mt-2">
            Solo quedan {product.stock} unidades
          </p>
        )}
      </div>
    </AnimatedCard>
  )
}

