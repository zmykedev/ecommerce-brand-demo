import { createContext, useContext, useState, useCallback } from 'react'
import { Product } from '@/types'
import { useToast } from '@/components/ui/use-toast'

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  toggleItem: (product: Product) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const { toast } = useToast()

  const addItem = useCallback(
    (product: Product) => {
      setItems((prevItems) => {
        if (prevItems.find((item) => item.id === product.id)) {
          return prevItems
        }
        setTimeout(() => {
          toast({
            title: 'Agregado a favoritos',
            description: `${product.name} agregado a tu lista de deseos`,
          })
        }, 0)
        return [...prevItems, product]
      })
    },
    [toast]
  )

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
      setTimeout(() => {
        toast({
          title: 'Eliminado de favoritos',
          description: 'Producto eliminado de tu lista de deseos',
        })
      }, 0)
    },
    [toast]
  )

  const isInWishlist = useCallback(
    (productId: string) => {
      return items.some((item) => item.id === productId)
    },
    [items]
  )

  const toggleItem = useCallback(
    (product: Product) => {
      if (isInWishlist(product.id)) {
        removeItem(product.id)
      } else {
        addItem(product)
      }
    },
    [isInWishlist, addItem, removeItem]
  )

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

