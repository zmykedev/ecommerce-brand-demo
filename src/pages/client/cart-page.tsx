import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { EmptyCart } from '@/components/client/empty-cart'

export function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()

  if (items.length === 0) {
    return <EmptyCart />
  }

  const total = getTotal()

  return (
    <div className="container py-8 px-4">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuar comprando
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mt-4">Carrito de Compras</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Link to={`/product/${item.product.id}`}>
                        <div className="h-24 w-24 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-1">
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-semibold hover:text-primary transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              disabled={
                                item.quantity >= item.product.stock
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="font-semibold">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button
            variant="outline"
            onClick={clearCart}
            className="w-full"
          >
            Vaciar carrito
          </Button>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío:</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <Link to="/checkout">
                <Button className="w-full" size="lg">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Proceder al pago
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

