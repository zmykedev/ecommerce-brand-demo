import { Outlet } from 'react-router-dom'
import { CartProvider } from '@/hooks/use-cart'
import { WishlistProvider } from '@/hooks/use-wishlist'
import { ClientHeader } from './client-header'
import { ClientFooter } from './client-footer'

export function ClientLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex min-h-screen flex-col">
          <ClientHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <ClientFooter />
        </div>
      </WishlistProvider>
    </CartProvider>
  )
}

