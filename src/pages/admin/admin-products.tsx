import { useState } from 'react'
import { Plus, Edit, Trash2, Search, Image as ImageIcon, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AnimatedImage } from '@/components/shared/animated-image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useProducts } from '@/hooks/use-products'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

const productSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  description: z.string().min(1, 'Descripción requerida'),
  price: z.number().min(0, 'Precio debe ser mayor a 0'),
  stock: z.number().min(0, 'Stock debe ser mayor o igual a 0'),
  category: z.string().min(1, 'Categoría requerida'),
  image: z.string().url('URL de imagen inválida'),
  featured: z.boolean().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

const categories = ['Electronics', 'Audio', 'Wearables', 'Cameras', 'Computers', 'Accessories']

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      featured: false,
    },
  })

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...data,
        images: [data.image],
        featured: data.featured ?? false,
      })
      toast({
        title: '✅ Producto actualizado',
        description: 'El producto ha sido actualizado correctamente',
      })
    } else {
      addProduct({
        ...data,
        rating: 0,
        reviewsCount: 0,
        featured: data.featured ?? false,
        images: [data.image],
      })
      toast({
        title: '✨ Producto creado',
        description: 'El producto ha sido agregado al catálogo',
      })
    }
    setIsDialogOpen(false)
    setEditingProduct(null)
    reset()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image: product.image,
      featured: product.featured ?? false,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (productId: string) => {
    deleteProduct(productId)
    toast({
      title: '🗑️ Producto eliminado',
      description: 'El producto ha sido eliminado del catálogo',
      variant: 'destructive',
    })
  }

  const handleNewProduct = () => {
    setEditingProduct(null)
    reset()
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-[#7b00e0] bg-clip-text text-transparent">
            Gestión de Productos
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Administra y agrega productos al catálogo
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewProduct} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">
                {editingProduct ? '✏️ Editar Producto' : '✨ Nuevo Producto'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div>
                <Label htmlFor="name">Nombre</Label>
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
                <Label htmlFor="description">Descripción</Label>
                <textarea
                  id="description"
                  {...register('description')}
                  rows={3}
                  className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.description ? 'border-destructive' : ''
                  }`}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Precio (CLP)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="1000"
                    placeholder="0"
                    {...register('price', { valueAsNumber: true })}
                    className={errors.price ? 'border-destructive' : ''}
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    {...register('stock', { valueAsNumber: true })}
                    className={errors.stock ? 'border-destructive' : ''}
                  />
                  {errors.stock && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={watch('category') || editingProduct?.category || ''}
                    onValueChange={(value) => setValue('category', value)}
                  >
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="featured">Destacado</Label>
                  <Select
                    value={watch('featured') ? 'true' : 'false'}
                    onValueChange={(value) => setValue('featured', value === 'true')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sí</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="image">URL de Imagen</Label>
                <div className="space-y-2">
                  <Input
                    id="image"
                    placeholder="https://picsum.photos/200/200?1"
                    {...register('image')}
                    className={errors.image ? 'border-destructive' : ''}
                  />
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ImageIcon className="h-3 w-3" />
                    Usa una URL válida de imagen (ej: https://picsum.photos/200/200?1)
                  </p>
                  {editingProduct && (
                    <div className="mt-2">
                      <img
                        src={editingProduct.image}
                        alt="Preview"
                        className="h-24 w-24 rounded-lg object-cover border"
                      />
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos por nombre o categoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-2 focus:border-primary"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            {searchQuery ? 'No se encontraron productos' : 'No hay productos aún'}
          </p>
          {!searchQuery && (
            <Button onClick={handleNewProduct} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Crear primer producto
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card className="hover:shadow-lg transition-shadow border hover:border-primary/50">
                <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-secondary to-muted">
                  <AnimatedImage
                    src={product.image}
                    alt={product.name}
                    containerClassName="aspect-square"
                    size="lg"
                    animated={false}
                  />
                  {product.featured && (
                    <span className="absolute top-2 left-2 bg-gradient-to-r from-primary to-[#7b00e0] text-white px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 z-10">
                      <Star className="h-3 w-3 fill-white" />
                      Destacado
                    </span>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg line-clamp-1">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-primary to-[#7b00e0] bg-clip-text text-transparent">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Stock: {product.stock}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-secondary px-2 py-1 rounded">
                        {product.category}
                      </span>
                      {product.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="sm:w-auto"
                    >
                      <Trash2 className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Eliminar</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

