import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, Moon, Sun, Menu, Settings, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useTheme } from '@/components/shared/theme-provider'
import { useLinks } from '@/hooks/use-links'
import { useSupport } from '@/hooks/use-support'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function ClientHeader() {
  const { getItemCount } = useCart()
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const itemCount = getItemCount()
  const { links } = useLinks()
  const { supportItems } = useSupport()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const showBackButton = ['/about', '/contact', '/terms', '/faq'].includes(location.pathname) || 
                         location.pathname.startsWith('/support/')

  const activeLinks = links.filter(link => link.active).sort((a, b) => a.order - b.order)
  const activeSupportItems = supportItems.filter(item => item.active).sort((a, b) => a.order - b.order)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2 min-w-0 hover:scale-105 active:scale-95 transition-transform">
            <img 
              src="/ecommerce-main.svg" 
              alt="E-commerce" 
              className="h-8 sm:h-10 w-auto"
            />
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-[#c26cff] to-[#980fff] bg-clip-text text-transparent">
              E-commerce
            </div>
          </Link>
          {showBackButton && (
            <Button variant="ghost" size="sm" asChild className="hover:bg-accent">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex hover:bg-accent">
            <Link to="/admin">
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hover:bg-accent"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button variant="ghost" size="icon" asChild className="hidden sm:flex hover:bg-accent">
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hover:bg-accent">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white shadow-lg animate-fade-in-up">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menú</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">Enlaces</h3>
                  <nav className="space-y-2">
                    {activeLinks.map((link) => (
                      <Link
                        key={link.id}
                        to={link.url}
                        onClick={() => setIsSheetOpen(false)}
                        className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">Soporte</h3>
                  <nav className="space-y-2">
                    <Link
                      to="/faq"
                      onClick={() => setIsSheetOpen(false)}
                      className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                    >
                      Preguntas frecuentes
                    </Link>
                    {activeSupportItems
                      .filter((item) => item.category !== 'faq')
                      .map((item) => (
                        <Link
                          key={item.id}
                          to={`/support/${item.id}`}
                          onClick={() => setIsSheetOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                        >
                          {item.title}
                        </Link>
                      ))}
                  </nav>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase">Opciones</h3>
                  <nav className="space-y-2">
                    <Link
                      to="/admin"
                      onClick={() => setIsSheetOpen(false)}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsSheetOpen(false)}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Lista de deseos
                    </Link>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

