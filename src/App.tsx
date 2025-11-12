import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ClientLayout } from '@/components/client/client-layout'
import { AdminLayout } from '@/components/admin/admin-layout'
import { HomePage } from '@/pages/client/home-page'
import { ProductPage } from '@/pages/client/product-page'
import { CartPage } from '@/pages/client/cart-page'
import { CheckoutPage } from '@/pages/client/checkout-page'
import { WishlistPage } from '@/pages/client/wishlist-page'
import { AdminDashboard } from '@/pages/admin/admin-dashboard'
import { AdminProducts } from '@/pages/admin/admin-products'
import { AdminOrders } from '@/pages/admin/admin-orders'
import { AdminUsers } from '@/pages/admin/admin-users'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ecommerce-theme">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App

