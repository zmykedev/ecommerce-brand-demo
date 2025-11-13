import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, Users, ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LinksProvider } from '@/hooks/use-links'
import { SupportProvider } from '@/hooks/use-support'
import { PageContentProvider } from '@/hooks/use-page-content'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/products', label: 'Productos', icon: Package },
  { path: '/admin/orders', label: 'Órdenes', icon: ShoppingBag },
  { path: '/admin/users', label: 'Usuarios', icon: Users },
  { path: '/admin/content', label: 'Contenido', icon: FileText },
]

export function AdminLayout() {
  const location = useLocation()

  return (
    <LinksProvider>
      <SupportProvider>
        <PageContentProvider>
          <div className="flex min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <aside className="hidden lg:flex w-64 border-r bg-card flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-[#7b00e0] bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start transition-colors',
                    isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
        
      </aside>
      <main className="flex-1 min-w-0">
        <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
          <div className="flex h-14 items-center px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" size="sm" asChild className="hover:bg-accent">
          <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la tienda
              </Link>
            </Button>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
        </PageContentProvider>
      </SupportProvider>
    </LinksProvider>
  )
}

