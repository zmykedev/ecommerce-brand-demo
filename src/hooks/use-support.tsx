import { createContext, useContext, useState, ReactNode } from 'react'
import { SupportItem } from '@/types'

interface SupportContextType {
  supportItems: SupportItem[]
  addSupportItem: (item: Omit<SupportItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateSupportItem: (id: string, item: Partial<SupportItem>) => void
  deleteSupportItem: (id: string) => void
}

const SupportContext = createContext<SupportContextType | undefined>(undefined)

const initialSupportItems: SupportItem[] = [
  {
    id: '1',
    title: 'Centro de ayuda',
    content: 'Encuentra respuestas a tus preguntas más comunes y obtén ayuda con tu cuenta.',
    category: 'help',
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Envíos y devoluciones',
    content: 'Información sobre políticas de envío, tiempos de entrega y proceso de devoluciones.',
    category: 'shipping',
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Preguntas frecuentes',
    content: 'Respuestas a las preguntas más comunes sobre nuestros productos y servicios.',
    category: 'faq',
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

function SupportProvider({ children }: { children: ReactNode }) {
  const [supportItems, setSupportItems] = useState<SupportItem[]>(initialSupportItems)

  const addSupportItem = (itemData: Omit<SupportItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: SupportItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setSupportItems((prev) => [...prev, newItem].sort((a, b) => a.order - b.order))
  }

  const updateSupportItem = (id: string, itemData: Partial<SupportItem>) => {
    setSupportItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, ...itemData, updatedAt: new Date().toISOString() }
            : item
        )
        .sort((a, b) => a.order - b.order)
    )
  }

  const deleteSupportItem = (id: string) => {
    setSupportItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <SupportContext.Provider
      value={{ supportItems, addSupportItem, updateSupportItem, deleteSupportItem }}
    >
      {children}
    </SupportContext.Provider>
  )
}

function useSupport() {
  const context = useContext(SupportContext)
  if (!context) {
    throw new Error('useSupport must be used within SupportProvider')
  }
  return context
}

export { SupportProvider, useSupport }

