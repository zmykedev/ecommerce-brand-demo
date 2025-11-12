import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/products', label: 'Productos', icon: Package },
  { path: '/admin/orders', label: 'Órdenes', icon: ShoppingBag },
  { path: '/admin/users', label: 'Usuarios', icon: Users },
]

export function AdminLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-background">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-secondary'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Volver a la tienda
            </Button>
          </Link>
        </div>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

