import { createContext, useState, ReactNode } from 'react'
import { PageContent, FAQItem } from '@/types'
import { initialPageContents, initialFAQItems } from './use-page-content-data'

export interface PageContentContextType {
  pageContents: PageContent[]
  faqItems: FAQItem[]
  updatePageContent: (page: PageContent['page'], content: Partial<PageContent>) => void
  addFAQItem: (item: Omit<FAQItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateFAQItem: (id: string, item: Partial<FAQItem>) => void
  deleteFAQItem: (id: string) => void
}

export const PageContentContext = createContext<PageContentContextType | undefined>(undefined)

export function PageContentProvider({ children }: { children: ReactNode }) {
  const [pageContents, setPageContents] = useState<PageContent[]>(initialPageContents)
  const [faqItems, setFAQItems] = useState<FAQItem[]>(initialFAQItems)

  const updatePageContent = (page: PageContent['page'], content: Partial<PageContent>) => {
    setPageContents((prev) =>
      prev.map((pc) =>
        pc.page === page
          ? { ...pc, ...content, updatedAt: new Date().toISOString() }
          : pc
      )
    )
  }

  const addFAQItem = (itemData: Omit<FAQItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: FAQItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setFAQItems((prev) => [...prev, newItem].sort((a, b) => a.order - b.order))
  }

  const updateFAQItem = (id: string, itemData: Partial<FAQItem>) => {
    setFAQItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, ...itemData, updatedAt: new Date().toISOString() }
            : item
        )
        .sort((a, b) => a.order - b.order)
    )
  }

  const deleteFAQItem = (id: string) => {
    setFAQItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <PageContentContext.Provider
      value={{
        pageContents,
        faqItems,
        updatePageContent,
        addFAQItem,
        updateFAQItem,
        deleteFAQItem,
      }}
    >
      {children}
    </PageContentContext.Provider>
  )
}

