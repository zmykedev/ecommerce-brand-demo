import { Card, CardContent } from '@/components/ui/card'
import { usePageContent } from '@/hooks/use-page-content'

export function TermsPage() {
  const { pageContents } = usePageContent()
  const termsContent = pageContents.find((pc) => pc.page === 'terms')

  const paragraphs = termsContent?.content.split('\n').filter((p) => p.trim()) || []

  return (
    <div className="container py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-[#c26cff] to-[#980fff] bg-clip-text text-transparent leading-[1.4] pb-2 overflow-visible">
          {termsContent?.title || 'Términos y Condiciones'}
        </h1>
        
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => {
                // Si el párrafo empieza con un número seguido de punto, es un título de sección
                const isSectionTitle = /^\d+\.\s/.test(paragraph.trim())
                if (isSectionTitle) {
                  return (
                    <h2 key={index} className="text-2xl font-semibold mb-3 mt-6 first:mt-0">
                      {paragraph.trim()}
                    </h2>
                  )
                }
                // Si el párrafo empieza con "-", es un item de lista
                if (paragraph.trim().startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>{paragraph.trim().substring(1).trim()}</li>
                    </ul>
                  )
                }
                // Párrafo normal
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                )
              })
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                Términos y condiciones de uso del servicio.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

