import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { Link } from 'react-router-dom'

const checkoutSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  address: z.string().min(5, 'Dirección inválida'),
  city: z.string().min(2, 'Ciudad inválida'),
  zipCode: z.string().min(5, 'Código postal inválido'),
  country: z.string().min(2, 'País inválido'),
  paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer']),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

const steps = [
  { id: 1, title: 'Información de envío' },
  { id: 2, title: 'Método de pago' },
  { id: 3, title: 'Confirmación' },
]

export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { items, getTotal, clearCart } = useCart()
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'credit_card',
    },
  })

  const paymentMethod = watch('paymentMethod')

  if (items.length === 0) {
    return (
      <div className="container py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
          <Link to="/">
            <Button>Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    )
  }

  const total = getTotal()

  const onSubmit = (data: CheckoutFormData) => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      toast({
        title: '¡Pedido realizado!',
        description: 'Tu pedido ha sido procesado correctamente',
      })
      clearCart()
      navigate('/')
    }
  }

  return (
    <div className="container py-8 px-4">
      <Link to="/cart">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al carrito
        </Button>
      </Link>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground text-muted-foreground'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`ml-2 hidden sm:block ${
                    currentStep >= step.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-4 ${
                    currentStep > step.id
                      ? 'bg-primary'
                      : 'bg-muted-foreground'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Información de envío</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          {...register('name')}
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          id="address"
                          {...register('address')}
                          className={errors.address ? 'border-destructive' : ''}
                        />
                        {errors.address && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Ciudad</Label>
                          <Input
                            id="city"
                            {...register('city')}
                            className={
                              errors.city ? 'border-destructive' : ''
                            }
                          />
                          {errors.city && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="zipCode">Código postal</Label>
                          <Input
                            id="zipCode"
                            {...register('zipCode')}
                            className={
                              errors.zipCode ? 'border-destructive' : ''
                            }
                          />
                          {errors.zipCode && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.zipCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="country">País</Label>
                        <Input
                          id="country"
                          {...register('country')}
                          className={
                            errors.country ? 'border-destructive' : ''
                          }
                        />
                        {errors.country && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Método de pago</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={paymentMethod}
                        onValueChange={(value) =>
                          setValue('paymentMethod', value as any)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit_card">
                            Tarjeta de crédito
                          </SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="bank_transfer">
                            Transferencia bancaria
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Confirmar pedido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Revisa tu pedido y confirma para completar la compra.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Anterior
                </Button>
              )}
              <Button type="submit" className="ml-auto">
                {currentStep === 3 ? 'Confirmar pedido' : 'Continuar'}
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="text-sm">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

