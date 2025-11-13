import { useContext } from 'react'
import { PageContentContext } from './page-content-provider'

export function usePageContent() {
  const context = useContext(PageContentContext)
  if (context === undefined) {
    throw new Error('usePageContent must be used within PageContentProvider')
  }
  return context
}

