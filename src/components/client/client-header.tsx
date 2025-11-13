import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Heart, Moon, Sun, Menu, Settings, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useTheme } from '@/components/shared/theme-provider'

export function ClientHeader() {
  const { getItemCount } = useCart()
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const itemCount = getItemCount()

  const showBackButton = ['/about', '/contact', '/terms', '/faq'].includes(location.pathname) || 
                         location.pathname.startsWith('/support/')

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

          <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

