import { createContext, useContext, useState, ReactNode } from 'react'
import { Link } from '@/types'

interface LinksContextType {
  links: Link[]
  addLink: (link: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateLink: (id: string, link: Partial<Link>) => void
  deleteLink: (id: string) => void
}

const LinksContext = createContext<LinksContextType | undefined>(undefined)

const initialLinks: Link[] = [
  {
    id: '1',
    title: 'Sobre nosotros',
    url: '/about',
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Contacto',
    url: '/contact',
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Términos y condiciones',
    url: '/terms',
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks)

  const addLink = (linkData: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLink: Link = {
      ...linkData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setLinks((prev) => [...prev, newLink].sort((a, b) => a.order - b.order))
  }

  const updateLink = (id: string, linkData: Partial<Link>) => {
    setLinks((prev) =>
      prev
        .map((link) =>
          link.id === id
            ? { ...link, ...linkData, updatedAt: new Date().toISOString() }
            : link
        )
        .sort((a, b) => a.order - b.order)
    )
  }

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id))
  }

  return (
    <LinksContext.Provider value={{ links, addLink, updateLink, deleteLink }}>
      {children}
    </LinksContext.Provider>
  )
}

function useLinks() {
  const context = useContext(LinksContext)
  if (!context) {
    throw new Error('useLinks must be used within LinksProvider')
  }
  return context
}

export { LinksProvider, useLinks }

