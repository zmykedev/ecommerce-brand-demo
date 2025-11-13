import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePageContent } from '@/hooks/use-page-content'

export function FAQPage() {
  const { pageContents, faqItems } = usePageContent()
  const faqContent = pageContents.find((pc) => pc.page === 'faq')
  const activeFAQItems = faqItems.filter((item) => item.active).sort((a, b) => a.order - b.order)

  return (
    <div className="container py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-[#c26cff] to-[#980fff] bg-clip-text text-transparent leading-[1.4] pb-2 overflow-visible">
          {faqContent?.title || 'Preguntas Frecuentes'}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          {faqContent?.content || 'Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.'}
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Preguntas Comunes</CardTitle>
          </CardHeader>
          <CardContent>
            {activeFAQItems.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {activeFAQItems.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No hay preguntas frecuentes disponibles en este momento.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

