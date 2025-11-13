import { useState, useEffect } from 'react'
import { Product } from '@/types'
import { mockProducts } from '@/utils/mock-data'

const STORAGE_KEY = 'ecommerce-products'

function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return mockProducts
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Si los productos guardados tienen precios antiguos (menores a 1000), resetear con datos nuevos
      const hasOldPrices = parsed.some((p: Product) => p.price < 1000)
      // Si los productos guardados tienen imágenes de picsum, resetear con datos nuevos
      const hasPicsumImages = parsed.some((p: Product) => 
        p.image?.includes('picsum') || p.images?.some(img => img.includes('picsum'))
      )
      if (hasOldPrices || hasPicsumImages) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts))
        return mockProducts
      }
      return parsed
    }
  } catch (error) {
    console.error('Error loading products from localStorage:', error)
  }
  
  // Initialize with mock data if nothing stored
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts))
  return mockProducts
}

function saveProducts(products: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (error) {
    console.error('Error saving products to localStorage:', error)
  }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(getStoredProducts)

  useEffect(() => {
    // Sync with localStorage on mount
    const stored = getStoredProducts()
    setProducts(stored)
  }, [])

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = [...products, newProduct]
    setProducts(updated)
    saveProducts(updated)
    return newProduct
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) =>
      p.id === id
        ? { ...p, ...updates, updatedAt: new Date().toISOString() }
        : p
    )
    setProducts(updated)
    saveProducts(updated)
  }

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id)
    setProducts(updated)
    saveProducts(updated)
  }

  const resetProducts = () => {
    setProducts(mockProducts)
    saveProducts(mockProducts)
  }

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    setProducts,
  }
}

