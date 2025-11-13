import { Card, CardContent } from '@/components/ui/card'
import { usePageContent } from '@/hooks/use-page-content'

export function AboutPage() {
  const { pageContents } = usePageContent()
  const aboutContent = pageContents.find((pc) => pc.page === 'about')

  const paragraphs = aboutContent?.content.split('\n').filter((p) => p.trim()) || []

  return (
    <div className="container py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-[#c26cff] to-[#980fff] bg-clip-text text-transparent leading-[1.4] pb-2 overflow-visible">
          {aboutContent?.title || 'Sobre Nosotros'}
        </h1>
        
        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                Bienvenido a E-commerce Demo, tu tienda online de confianza.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

