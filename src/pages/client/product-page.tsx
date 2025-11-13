import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Heart, Star, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedImage } from '@/components/shared/animated-image'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'
import { useProducts } from '@/hooks/use-products'
import { formatPrice } from '@/lib/utils'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { products } = useProducts()
  const { addItem, items, updateQuantity } = useCart()
  const { isInWishlist, toggleItem } = useWishlist()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="container py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <Link to="/">
            <Button>Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    )
  }

  const cartItem = items.find((item) => item.product.id === product.id)
  const inWishlist = isInWishlist(product.id)
  const images = product.images || [product.image]

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(product.stock, quantity + delta)))
  }

  return (
    <div className="container py-8 px-4">
      <Link to="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted mb-4">
            <AnimatedImage
              key={selectedImage}
              src={images[selectedImage]}
              alt={product.name}
              containerClassName="aspect-square"
              size="lg"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all hover:scale-105 active:scale-95 ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                >
                  <AnimatedImage
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    containerClassName="aspect-square"
                    size="sm"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} ({product.reviewsCount} reseñas)
              </span>
            </div>
            <p className="text-3xl font-bold mb-4">
              {formatPrice(product.price)}
            </p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Cantidad:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold">Stock disponible:</span>
                <span
                  className={
                    product.stock < 10 ? 'text-destructive' : 'text-green-600'
                  }
                >
                  {product.stock} unidades
                </span>
              </div>

              <div className="flex gap-2">
                {cartItem ? (
                  <>
                    <Button
                      onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                      className="flex-1"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Agregar más ({cartItem.quantity} en carrito)
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Agregar al carrito
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleItem(product)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      inWishlist ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Especificaciones</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Categoría:</dt>
                  <dd>{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Disponibilidad:</dt>
                  <dd>
                    {product.stock > 0 ? (
                      <span className="text-green-600">En stock</span>
                    ) : (
                      <span className="text-destructive">Agotado</span>
                    )}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

