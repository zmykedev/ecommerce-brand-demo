import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react'
import { AnimatedImage } from '@/components/shared/animated-image'
import { mockProducts, mockOrders, mockUsers } from '@/utils/mock-data'
import { formatPrice } from '@/lib/utils'

const stats = [
  {
    title: 'Total Productos',
    value: mockProducts.length,
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    title: 'Órdenes Totales',
    value: mockOrders.length,
    icon: ShoppingBag,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    title: 'Usuarios',
    value: mockUsers.length,
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
  },
  {
    title: 'Ingresos Totales',
    value: formatPrice(
      mockOrders.reduce((sum, order) => sum + order.total, 0)
    ),
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900',
  },
]

export function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div
                      className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Órdenes Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-semibold">Orden #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Destacados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts
                .filter((p) => p.featured)
                .slice(0, 5)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 border-b pb-4 last:border-0"
                  >
                    <AnimatedImage
                      src={product.image}
                      alt={product.name}
                      containerClassName="h-12 w-12 rounded"
                      size="sm"
                      animated={false}
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Stock: {product.stock}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

