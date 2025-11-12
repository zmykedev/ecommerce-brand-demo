import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function EmptyCart() {
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
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
        <p className="text-muted-foreground mb-6">
          Agrega productos a tu carrito para continuar comprando
        </p>
        <Link to="/">
          <Button size="lg">Explorar productos</Button>
        </Link>
      </motion.div>
    </div>
  )
}

