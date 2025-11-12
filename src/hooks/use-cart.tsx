import { createContext, useContext, useState, useCallback } from 'react'
import { CartItem, Product } from '@/types'
import { useToast } from '@/components/ui/use-toast'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.product.id === product.id
        )

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity
          if (newQuantity > product.stock) {
            setTimeout(() => {
              toast({
                title: 'Stock insuficiente',
                description: `Solo hay ${product.stock} unidades disponibles`,
                variant: 'destructive',
              })
            }, 0)
            return prevItems
          }
          setTimeout(() => {
            toast({
              title: 'Producto actualizado',
              description: `${product.name} actualizado en el carrito`,
            })
          }, 0)
          return prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          )
        }

        if (quantity > product.stock) {
          setTimeout(() => {
            toast({
              title: 'Stock insuficiente',
              description: `Solo hay ${product.stock} unidades disponibles`,
              variant: 'destructive',
            })
          }, 0)
          return prevItems
        }

        setTimeout(() => {
          toast({
            title: 'Producto agregado',
            description: `${product.name} agregado al carrito`,
          })
        }, 0)

        return [...prevItems, { product, quantity }]
      })
    },
    [toast]
  )

  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId)
        return
      }

      setItems((prevItems) => {
        const item = prevItems.find((item) => item.product.id === productId)
        if (!item) return prevItems

        if (quantity > item.product.stock) {
          setTimeout(() => {
            toast({
              title: 'Stock insuficiente',
              description: `Solo hay ${item.product.stock} unidades disponibles`,
              variant: 'destructive',
            })
          }, 0)
          return prevItems
        }

        return prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      })
    },
    [removeItem, toast]
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getTotal = useCallback(() => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  }, [items])

  const getItemCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

