import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ClientLayout } from '@/components/client/client-layout'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Skeleton } from '@/components/shared/skeleton'

// Lazy load client pages
const HomePage = lazy(() => import('@/pages/client/home-page').then(m => ({ default: m.HomePage })))
const ProductPage = lazy(() => import('@/pages/client/product-page').then(m => ({ default: m.ProductPage })))
const CartPage = lazy(() => import('@/pages/client/cart-page').then(m => ({ default: m.CartPage })))
const CheckoutPage = lazy(() => import('@/pages/client/checkout-page').then(m => ({ default: m.CheckoutPage })))
const WishlistPage = lazy(() => import('@/pages/client/wishlist-page').then(m => ({ default: m.WishlistPage })))

// Lazy load admin pages
const AdminDashboard = lazy(() => import('@/pages/admin/admin-dashboard').then(m => ({ default: m.AdminDashboard })))
const AdminProducts = lazy(() => import('@/pages/admin/admin-products').then(m => ({ default: m.AdminProducts })))
const AdminOrders = lazy(() => import('@/pages/admin/admin-orders').then(m => ({ default: m.AdminOrders })))
const AdminUsers = lazy(() => import('@/pages/admin/admin-users').then(m => ({ default: m.AdminUsers })))

function LoadingFallback() {
  return (
    <div className="container py-8 px-4">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ecommerce-theme">
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
      <Toaster />
    </ThemeProvider>
  )
}

export default App

