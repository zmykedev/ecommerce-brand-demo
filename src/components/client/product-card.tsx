import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { Product } from '@/types'
import { AnimatedCard } from '@/components/shared/animated-card'
import { AnimatedImage } from '@/components/shared/animated-image'
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
    <AnimatedCard delay={index * 0.1} className="overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
      <div className="relative group">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-secondary to-muted">
            <AnimatedImage
              src={product.image}
              alt={product.name}
              className="transition-transform duration-500 group-hover:scale-110"
              containerClassName="aspect-square"
              size="lg"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm hover:bg-card shadow-md"
          onClick={() => toggleItem(product)}
        >
          <Heart
                className={`h-5 w-5 transition-colors ${
              inWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }`}
          />
        </Button>
        {product.featured && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-primary to-[#7b00e0] text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg">
            ⭐ Destacado
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-base sm:text-lg mb-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-muted-foreground">
            ({product.reviewsCount})
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-[#7b00e0] bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          <Button
            onClick={() => addItem(product)}
            size="sm"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Agregar</span>
            <span className="sm:hidden">Añadir</span>
          </Button>
        </div>
        {product.stock < 10 && (
          <p className="text-xs text-destructive mt-2 font-medium">
            ⚠️ Solo quedan {product.stock} unidades
          </p>
        )}
      </div>
    </AnimatedCard>
  )
}

