export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images?: string[]
  category: string
  stock: number
  rating: number
  reviewsCount: number
  featured?: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  avatar?: string
  createdAt: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export interface WishlistItem {
  id: string
  productId: string
  userId: string
  product: Product
  createdAt: string
}

export interface Link {
  id: string
  title: string
  url: string
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface SupportItem {
  id: string
  title: string
  content: string
  category: 'help' | 'shipping' | 'faq' | 'other'
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface PageContent {
  id: string
  page: 'about' | 'contact' | 'faq' | 'terms' | 'help' | 'shipping'
  title?: string
  content: string
  metadata?: {
    email?: string
    phone?: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
  }
  updatedAt: string
}

