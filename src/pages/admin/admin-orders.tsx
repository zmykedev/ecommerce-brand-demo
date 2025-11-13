import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedImage } from '@/components/shared/animated-image'
import { mockOrders } from '@/utils/mock-data'
import { formatPrice, formatDate } from '@/lib/utils'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export function AdminOrders() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Gestión de Órdenes</h1>
        <p className="text-muted-foreground mb-8">
          Administra y rastrea todas las órdenes
        </p>
      </motion.div>

      <div className="space-y-4">
        {mockOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Orden #{order.id}</CardTitle>
                  <Badge className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Productos</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <AnimatedImage
                              src={item.product.image}
                              alt={item.product.name}
                              containerClassName="h-12 w-12 rounded"
                              size="sm"
                              animated={false}
                            />
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Cantidad: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Dirección de envío
                        </p>
                        <p className="text-sm">
                          {order.shippingAddress.street}
                          <br />
                          {order.shippingAddress.city},{' '}
                          {order.shippingAddress.zipCode}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Método de pago
                        </p>
                        <p className="text-sm capitalize">
                          {order.paymentMethod.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Fecha: {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

