import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWishlist } from '@/hooks/use-wishlist'
import { ProductCard } from '@/components/client/product-card'

export function WishlistPage() {
  const { items } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="container py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-6"
          >
            <Heart className="h-24 w-24 mx-auto text-muted-foreground" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Tu lista de deseos está vacía</h2>
          <p className="text-muted-foreground mb-6">
            Agrega productos a tu lista de deseos para guardarlos para más tarde
          </p>
          <Link to="/">
            <Button size="lg">Explorar productos</Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuar comprando
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mt-4">Lista de Deseos</h1>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? 'producto' : 'productos'} guardados
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence>
          {items.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

