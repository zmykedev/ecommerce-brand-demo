import { Outlet } from 'react-router-dom'
import { CartProvider } from '@/hooks/use-cart'
import { WishlistProvider } from '@/hooks/use-wishlist'
import { LinksProvider } from '@/hooks/use-links'
import { SupportProvider } from '@/hooks/use-support'
import { PageContentProvider } from '@/hooks/use-page-content'
import { ScrollToTop } from '@/components/shared/scroll-to-top'
import { ClientHeader } from './client-header'
import { ClientFooter } from './client-footer'

export function ClientLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <LinksProvider>
          <SupportProvider>
            <PageContentProvider>
              <ScrollToTop />
              <div className="flex min-h-screen flex-col">
                <ClientHeader />
                <main className="flex-1">
                  <Outlet />
                </main>
                <ClientFooter />
              </div>
            </PageContentProvider>
          </SupportProvider>
        </LinksProvider>
      </WishlistProvider>
    </CartProvider>
  )
}

