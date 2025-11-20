import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, Users, ArrowLeft, FileText, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LinksProvider } from '@/hooks/use-links'
import { SupportProvider } from '@/hooks/use-support'
import { PageContentProvider } from '@/hooks/use-page-content'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/products', label: 'Productos', icon: Package },
  { path: '/admin/orders', label: 'Órdenes', icon: ShoppingBag },
  { path: '/admin/users', label: 'Usuarios', icon: Users },
  { path: '/admin/content', label: 'Contenido', icon: FileText },
]

function NavigationContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation()
  
  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <Link key={item.path} to={item.path} onClick={onNavigate}>
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
  )
}

export function AdminLayout() {
  const location = useLocation()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const currentNavItem = navItems.find(item => item.path === location.pathname) || navItems[0]

  return (
    <LinksProvider>
      <SupportProvider>
        <PageContentProvider>
          <div className="flex min-h-screen bg-gradient-to-b from-background to-secondary/20 overflow-x-hidden">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex w-64 border-r bg-card flex-col flex-shrink-0">
              <div className="flex h-16 items-center border-b px-6">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-[#7b00e0] bg-clip-text text-transparent">
                  Admin Panel
                </h1>
              </div>
              <nav className="p-4 space-y-2 flex-1">
                <NavigationContent />
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col max-w-full overflow-hidden">
              {/* Header Sticky */}
              <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
                <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Mobile Menu */}
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-accent flex-shrink-0">
                          <Menu className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                          <SheetTitle className="text-left">Admin Panel</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <NavigationContent onNavigate={() => setIsSheetOpen(false)} />
                        </div>
                      </SheetContent>
                    </Sheet>
                    
                    {/* Mobile Title */}
                    <div className="lg:hidden min-w-0">
                      <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-[#7b00e0] bg-clip-text text-transparent truncate">
                        {currentNavItem.label}
                      </h1>
                    </div>
                    
                    {/* Desktop Back Button */}
                    <Button variant="ghost" size="sm" asChild className="hidden lg:flex hover:bg-accent flex-shrink-0">
                      <Link to="/">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a la tienda
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Mobile Back Button */}
                  <Button variant="ghost" size="sm" asChild className="lg:hidden hover:bg-accent flex-shrink-0">
                    <Link to="/">
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <Outlet />
              </div>
            </main>
          </div>
        </PageContentProvider>
      </SupportProvider>
    </LinksProvider>
  )
}

