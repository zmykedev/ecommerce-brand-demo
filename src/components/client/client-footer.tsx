import { Link as RouterLink } from 'react-router-dom'
import { useLinks } from '@/hooks/use-links'
import { useSupport } from '@/hooks/use-support'

export function ClientFooter() {
  const { links } = useLinks()
  const { supportItems } = useSupport()
  
  const activeLinks = links.filter(link => link.active).sort((a, b) => a.order - b.order)
  const activeSupportItems = supportItems.filter(item => item.active).sort((a, b) => a.order - b.order)

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-[#7b00e0] bg-clip-text text-transparent">
              E-commerce Demo
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Tu tienda online de confianza con los mejores productos y
              servicios.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-base">Enlaces</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {activeLinks.length > 0 ? (
                activeLinks.map((link) => (
                  <li key={link.id}>
                    <RouterLink
                      to={link.url}
                      className="hover:text-primary transition-colors"
                    >
                      {link.title}
                    </RouterLink>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground">No hay enlaces disponibles</li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-base">Soporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <RouterLink
                  to="/faq"
                  className="hover:text-primary transition-colors"
                >
                  Preguntas frecuentes
                </RouterLink>
              </li>
              {activeSupportItems
                .filter((item) => item.category !== 'faq')
                .map((item) => (
                  <li key={item.id}>
                    <RouterLink
                      to={`/support/${item.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item.title}
                    </RouterLink>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-base">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; 2024 E-commerce Demo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

