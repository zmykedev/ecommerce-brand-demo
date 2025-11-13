import * as React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSupport } from '@/hooks/use-support'
import { usePageContent } from '@/hooks/use-page-content'

export function SupportPage() {
  const { id } = useParams<{ id: string }>()
  const { supportItems } = useSupport()
  const { pageContents } = usePageContent()
  
  const supportItem = supportItems.find((item) => item.id === id)
  
  // Si el item de soporte es de categoría 'help' o 'shipping', usar el contenido de PageContent
  const helpContent = pageContents.find((pc) => pc.page === 'help')
  const shippingContent = pageContents.find((pc) => pc.page === 'shipping')

  // Si el item de soporte es 'help' o 'shipping', mostrar el contenido de PageContent
  if (supportItem?.category === 'help' && helpContent) {
    const paragraphs = helpContent.content.split('\n').filter((p) => p.trim())
    return (
      <div className="container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-[#c26cff] to-[#980fff] bg-clip-text text-transparent leading-[1.4] pb-2 overflow-visible">
            {helpContent.title || 'Centro de Ayuda'}
          </h1>
          <Card>
            <CardContent className="p-6 space-y-4">
              {paragraphs.map((paragraph, index) => {
                if (paragraph.trim().startsWith('¿')) {
                  return (
                    <h2 key={index} className="text-xl font-semibold mb-2 mt-4 first:mt-0">
                      {paragraph.trim()}
                    </h2>
                  )
                }
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (supportItem?.category === 'shipping' && shippingContent) {
    const paragraphs = shippingContent.content.split('\n').filter((p) => p.trim())
    
    // Procesar párrafos y agrupar elementos numerados consecutivos
    const processedElements: React.ReactNode[] = []
    let currentNumberedList: string[] = []
    let listKey = 0
    
    paragraphs.forEach((paragraph, index) => {
      const trimmed = paragraph.trim()
      
      // Si es un título (empieza con mayúscula y termina con :)
      if (/^[A-Z][^:]*:/.test(trimmed)) {
        // Si hay una lista numerada pendiente, renderizarla primero
        if (currentNumberedList.length > 0) {
          processedElements.push(
            <ol key={`list-${listKey++}`} className="list-decimal list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              {currentNumberedList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          )
          currentNumberedList = []
        }
        processedElements.push(
          <h2 key={index} className="text-xl font-semibold mb-2 mt-4 first:mt-0">
            {trimmed}
          </h2>
        )
      }
      // Si es un elemento de lista con guión
      else if (trimmed.startsWith('-')) {
        // Si hay una lista numerada pendiente, renderizarla primero
        if (currentNumberedList.length > 0) {
          processedElements.push(
            <ol key={`list-${listKey++}`} className="list-decimal list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              {currentNumberedList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          )
          currentNumberedList = []
        }
        processedElements.push(
          <ul key={index} className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
            <li>{trimmed.substring(1).trim()}</li>
          </ul>
        )
      }
      // Si es un elemento numerado
      else if (/^\d+\./.test(trimmed)) {
        // Agregar a la lista numerada actual
        currentNumberedList.push(trimmed.replace(/^\d+\.\s*/, ''))
      }
      // Si es un párrafo normal
      else {
        // Si hay una lista numerada pendiente, renderizarla primero
        if (currentNumberedList.length > 0) {
          processedElements.push(
            <ol key={`list-${listKey++}`} className="list-decimal list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              {currentNumberedList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          )
          currentNumberedList = []
        }
        processedElements.push(
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        )
      }
    })
    
    // Si queda una lista numerada pendiente al final, renderizarla
    if (currentNumberedList.length > 0) {
      processedElements.push(
        <ol key={`list-${listKey++}`} className="list-decimal list-inside text-muted-foreground space-y-2 ml-4 mb-4">
          {currentNumberedList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )
    }
    
    return (
      <div className="container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-[#c26cff] to-[#980fff] bg-clip-text text-transparent leading-[1.4] pb-2 overflow-visible">
            {shippingContent.title || 'Envíos y Devoluciones'}
          </h1>
          <Card>
            <CardContent className="p-6 space-y-4">
              {processedElements}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!supportItem) {
    return (
      <div className="container py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Item de soporte no encontrado</h2>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      help: 'Centro de ayuda',
      shipping: 'Envíos y devoluciones',
      faq: 'Preguntas frecuentes',
      other: 'Otro',
    }
    return categories[category] || category
  }

  return (
    <div className="container py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="text-sm text-muted-foreground">
            {getCategoryLabel(supportItem.category)}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-[#c26cff] to-[#980fff] bg-clip-text text-transparent leading-[1.4] pb-2 overflow-visible">
          {supportItem.title}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Información</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {supportItem.content}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

