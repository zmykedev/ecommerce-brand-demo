import { useState } from 'react'
import * as React from 'react'
import { FileText, Mail, HelpCircle, Scale, Package, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { usePageContent } from '@/hooks/use-page-content'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { FAQItem } from '@/types'

const contentSchema = z.object({
  content: z.string().min(1, 'Contenido requerido'),
})

const contactSchema = z.object({
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Teléfono requerido'),
  address: z.string().min(1, 'Dirección requerida'),
  city: z.string().min(1, 'Ciudad requerida'),
  state: z.string().min(1, 'Estado requerido'),
  zipCode: z.string().min(1, 'Código postal requerido'),
})

const faqSchema = z.object({
  question: z.string().min(1, 'Pregunta requerida'),
  answer: z.string().min(1, 'Respuesta requerida'),
  order: z.number().min(0, 'Orden debe ser mayor o igual a 0'),
  active: z.boolean().optional(),
})

type ContentFormData = z.infer<typeof contentSchema>
type ContactFormData = z.infer<typeof contactSchema>
type FAQFormData = z.infer<typeof faqSchema>

export function AdminPageContent() {
  const { pageContents, faqItems, updatePageContent, addFAQItem, updateFAQItem, deleteFAQItem } =
    usePageContent()
  const { toast } = useToast()
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null)

  const aboutContent = pageContents.find((pc) => pc.page === 'about')
  const contactContent = pageContents.find((pc) => pc.page === 'contact')
  const termsContent = pageContents.find((pc) => pc.page === 'terms')
  const helpContent = pageContents.find((pc) => pc.page === 'help')
  const shippingContent = pageContents.find((pc) => pc.page === 'shipping')

  const {
    register: registerAbout,
    handleSubmit: handleSubmitAbout,
    reset: resetAbout,
    formState: { errors: errorsAbout },
  } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content: aboutContent?.content || '',
    },
  })

  const {
    register: registerTerms,
    handleSubmit: handleSubmitTerms,
    reset: resetTerms,
    formState: { errors: errorsTerms },
  } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content: termsContent?.content || '',
    },
  })

  const {
    register: registerHelp,
    handleSubmit: handleSubmitHelp,
    reset: resetHelp,
    formState: { errors: errorsHelp },
  } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content: helpContent?.content || '',
    },
  })

  const {
    register: registerShipping,
    handleSubmit: handleSubmitShipping,
    reset: resetShipping,
    formState: { errors: errorsShipping },
  } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content: shippingContent?.content || '',
    },
  })

  React.useEffect(() => {
    if (aboutContent) {
      resetAbout({ content: aboutContent.content })
    }
  }, [aboutContent, resetAbout])

  React.useEffect(() => {
    if (termsContent) {
      resetTerms({ content: termsContent.content })
    }
  }, [termsContent, resetTerms])

  React.useEffect(() => {
    if (helpContent) {
      resetHelp({ content: helpContent.content })
    }
  }, [helpContent, resetHelp])

  React.useEffect(() => {
    if (shippingContent) {
      resetShipping({ content: shippingContent.content })
    }
  }, [shippingContent, resetShipping])

  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    reset: resetContact,
    formState: { errors: errorsContact },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: contactContent?.metadata?.email || '',
      phone: contactContent?.metadata?.phone || '',
      address: contactContent?.metadata?.address || '',
      city: contactContent?.metadata?.city || '',
      state: contactContent?.metadata?.state || '',
      zipCode: contactContent?.metadata?.zipCode || '',
    },
  })

  React.useEffect(() => {
    if (contactContent?.metadata) {
      resetContact({
        email: contactContent.metadata.email || '',
        phone: contactContent.metadata.phone || '',
        address: contactContent.metadata.address || '',
        city: contactContent.metadata.city || '',
        state: contactContent.metadata.state || '',
        zipCode: contactContent.metadata.zipCode || '',
      })
    }
  }, [contactContent, resetContact])

  const {
    register: registerFAQ,
    handleSubmit: handleSubmitFAQ,
    reset: resetFAQ,
    formState: { errors: errorsFAQ },
  } = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: '',
      answer: '',
      order: faqItems.length + 1,
      active: true,
    },
  })

  const onSubmitAbout = (data: ContentFormData) => {
    updatePageContent('about', { content: data.content })
    toast({
      title: 'Contenido actualizado',
      description: 'El contenido de "Sobre Nosotros" ha sido actualizado',
    })
  }

  const onSubmitTerms = (data: ContentFormData) => {
    updatePageContent('terms', { content: data.content })
    toast({
      title: 'Contenido actualizado',
      description: 'El contenido de "Términos y Condiciones" ha sido actualizado',
    })
  }

  const onSubmitHelp = (data: ContentFormData) => {
    updatePageContent('help', { content: data.content })
    toast({
      title: 'Contenido actualizado',
      description: 'El contenido de "Centro de Ayuda" ha sido actualizado',
    })
  }

  const onSubmitShipping = (data: ContentFormData) => {
    updatePageContent('shipping', { content: data.content })
    toast({
      title: 'Contenido actualizado',
      description: 'El contenido de "Envíos y Devoluciones" ha sido actualizado',
    })
  }

  const onSubmitContact = (data: ContactFormData) => {
    updatePageContent('contact', {
      metadata: {
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      },
    })
    toast({
      title: 'Datos actualizados',
      description: 'La información de contacto ha sido actualizada',
    })
  }

  const onSubmitFAQ = (data: FAQFormData) => {
    if (editingFAQ) {
      updateFAQItem(editingFAQ.id, data)
      toast({
        title: 'Pregunta actualizada',
        description: 'La pregunta frecuente ha sido actualizada',
      })
    } else {
      addFAQItem({
        ...data,
        active: data.active ?? true,
      })
      toast({
        title: 'Pregunta agregada',
        description: 'La pregunta frecuente ha sido agregada',
      })
    }
    resetFAQ()
    setEditingFAQ(null)
  }

  const handleEditFAQ = (faq: FAQItem) => {
    setEditingFAQ(faq)
    resetFAQ({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      active: faq.active,
    })
  }

  const handleDeleteFAQ = (id: string) => {
    deleteFAQItem(id)
    toast({
      title: 'Pregunta eliminada',
      description: 'La pregunta frecuente ha sido eliminada',
    })
  }

  const activeFAQItems = faqItems.filter((item) => item.active).sort((a, b) => a.order - b.order)

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Gestión de Contenido de Páginas</h1>
        <p className="text-muted-foreground">
          Edita el contenido de las páginas estáticas del sitio
        </p>
      </div>

      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 w-full">
          <TabsTrigger value="about">
            <FileText className="h-4 w-4 mr-2" />
            Sobre Nosotros
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Contacto
          </TabsTrigger>
          <TabsTrigger value="terms">
            <Scale className="h-4 w-4 mr-2" />
            Términos
          </TabsTrigger>
          <TabsTrigger value="help">
            <Package className="h-4 w-4 mr-2" />
            Centro de Ayuda
          </TabsTrigger>
          <TabsTrigger value="shipping">
            <Truck className="h-4 w-4 mr-2" />
            Envíos
          </TabsTrigger>
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Sobre Nosotros</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitAbout(onSubmitAbout)} className="space-y-4">
                <div>
                  <Label htmlFor="about-content">Contenido</Label>
                  <Textarea
                    id="about-content"
                    {...registerAbout('content')}
                    rows={10}
                    placeholder="Escribe el contenido de la página Sobre Nosotros..."
                    className="font-mono text-sm"
                  />
                  {errorsAbout.content && (
                    <p className="text-sm text-destructive mt-1">
                      {errorsAbout.content.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Usa saltos de línea para separar párrafos
                  </p>
                </div>
                <Button type="submit">Guardar Cambios</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitContact(onSubmitContact)} className="space-y-4">
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    {...registerContact('email')}
                    placeholder="contacto@ecommerce-demo.com"
                  />
                  {errorsContact.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errorsContact.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="contact-phone">Teléfono</Label>
                  <Input
                    id="contact-phone"
                    {...registerContact('phone')}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errorsContact.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {errorsContact.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="contact-address">Dirección</Label>
                  <Input
                    id="contact-address"
                    {...registerContact('address')}
                    placeholder="123 Calle Principal"
                  />
                  {errorsContact.address && (
                    <p className="text-sm text-destructive mt-1">
                      {errorsContact.address.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contact-city">Ciudad</Label>
                    <Input
                      id="contact-city"
                      {...registerContact('city')}
                      placeholder="Ciudad"
                    />
                    {errorsContact.city && (
                      <p className="text-sm text-destructive mt-1">
                        {errorsContact.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="contact-state">Estado</Label>
                    <Input
                      id="contact-state"
                      {...registerContact('state')}
                      placeholder="Estado"
                    />
                    {errorsContact.state && (
                      <p className="text-sm text-destructive mt-1">
                        {errorsContact.state.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="contact-zipCode">Código Postal</Label>
                    <Input
                      id="contact-zipCode"
                      {...registerContact('zipCode')}
                      placeholder="12345"
                    />
                    {errorsContact.zipCode && (
                      <p className="text-sm text-destructive mt-1">
                        {errorsContact.zipCode.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button type="submit">Guardar Cambios</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle>Términos y Condiciones</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTerms(onSubmitTerms)} className="space-y-4">
                <div>
                  <Label htmlFor="terms-content">Contenido</Label>
                  <Textarea
                    id="terms-content"
                    {...registerTerms('content')}
                    rows={15}
                    placeholder="Escribe el contenido de Términos y Condiciones..."
                    className="font-mono text-sm"
                  />
                  {errorsTerms.content && (
                    <p className="text-sm text-destructive mt-1">
                      {errorsTerms.content.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Usa saltos de línea para separar párrafos y secciones. Usa números seguidos de punto (1., 2., etc.) para títulos de sección.
                  </p>
                </div>
                <Button type="submit">Guardar Cambios</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Centro de Ayuda</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitHelp(onSubmitHelp)} className="space-y-4">
                <div>
                  <Label htmlFor="help-content">Contenido</Label>
                  <Textarea
                    id="help-content"
                    {...registerHelp('content')}
                    rows={15}
                    placeholder="Escribe el contenido del Centro de Ayuda..."
                    className="font-mono text-sm"
                  />
                  {errorsHelp.content && (
                    <p className="text-sm text-destructive mt-1">
                      {errorsHelp.content.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Usa saltos de línea para separar párrafos y secciones. Usa preguntas (¿) para destacar secciones.
                  </p>
                </div>
                <Button type="submit">Guardar Cambios</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Envíos y Devoluciones</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitShipping(onSubmitShipping)} className="space-y-4">
                <div>
                  <Label htmlFor="shipping-content">Contenido</Label>
                  <Textarea
                    id="shipping-content"
                    {...registerShipping('content')}
                    rows={15}
                    placeholder="Escribe el contenido de Envíos y Devoluciones..."
                    className="font-mono text-sm"
                  />
                  {errorsShipping.content && (
                    <p className="text-sm text-destructive mt-1">
                      {errorsShipping.content.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Usa saltos de línea para separar párrafos y secciones. Usa "-" para listas y números seguidos de punto (1., 2., etc.) para pasos.
                  </p>
                </div>
                <Button type="submit">Guardar Cambios</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Preguntas Frecuentes</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setEditingFAQ(null)
                          resetFAQ({
                            question: '',
                            answer: '',
                            order: faqItems.length + 1,
                            active: true,
                          })
                        }}
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Pregunta
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {editingFAQ ? 'Editar Pregunta' : 'Nueva Pregunta'}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmitFAQ(onSubmitFAQ)} className="space-y-4">
                        <div>
                          <Label htmlFor="faq-question">Pregunta</Label>
                          <Input
                            id="faq-question"
                            {...registerFAQ('question')}
                            placeholder="¿Cómo puedo realizar un pedido?"
                          />
                          {errorsFAQ.question && (
                            <p className="text-sm text-destructive mt-1">
                              {errorsFAQ.question.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="faq-answer">Respuesta</Label>
                          <Textarea
                            id="faq-answer"
                            {...registerFAQ('answer')}
                            rows={4}
                            placeholder="Escribe la respuesta..."
                          />
                          {errorsFAQ.answer && (
                            <p className="text-sm text-destructive mt-1">
                              {errorsFAQ.answer.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="faq-order">Orden</Label>
                          <Input
                            id="faq-order"
                            type="number"
                            {...registerFAQ('order', { valueAsNumber: true })}
                            placeholder="0"
                          />
                          {errorsFAQ.order && (
                            <p className="text-sm text-destructive mt-1">
                              {errorsFAQ.order.message}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="faq-active"
                            {...registerFAQ('active')}
                            className="rounded"
                          />
                          <Label htmlFor="faq-active">Activo</Label>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              resetFAQ()
                              setEditingFAQ(null)
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button type="submit">Guardar</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {activeFAQItems.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start justify-between">
                          <p className="text-muted-foreground flex-1">{faq.answer}</p>
                          <div className="flex gap-2 ml-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditFAQ(faq)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Editar Pregunta</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmitFAQ(onSubmitFAQ)} className="space-y-4">
                                  <div>
                                    <Label htmlFor="edit-faq-question">Pregunta</Label>
                                    <Input
                                      id="edit-faq-question"
                                      {...registerFAQ('question')}
                                      placeholder="¿Cómo puedo realizar un pedido?"
                                    />
                                    {errorsFAQ.question && (
                                      <p className="text-sm text-destructive mt-1">
                                        {errorsFAQ.question.message}
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-faq-answer">Respuesta</Label>
                                    <Textarea
                                      id="edit-faq-answer"
                                      {...registerFAQ('answer')}
                                      rows={4}
                                      placeholder="Escribe la respuesta..."
                                    />
                                    {errorsFAQ.answer && (
                                      <p className="text-sm text-destructive mt-1">
                                        {errorsFAQ.answer.message}
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-faq-order">Orden</Label>
                                    <Input
                                      id="edit-faq-order"
                                      type="number"
                                      {...registerFAQ('order', { valueAsNumber: true })}
                                      placeholder="0"
                                    />
                                    {errorsFAQ.order && (
                                      <p className="text-sm text-destructive mt-1">
                                        {errorsFAQ.order.message}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="edit-faq-active"
                                      {...registerFAQ('active')}
                                      className="rounded"
                                    />
                                    <Label htmlFor="edit-faq-active">Activo</Label>
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => {
                                        resetFAQ()
                                        setEditingFAQ(null)
                                      }}
                                    >
                                      Cancelar
                                    </Button>
                                    <Button type="submit">Guardar</Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteFAQ(faq.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

