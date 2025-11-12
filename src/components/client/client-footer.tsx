export function ClientFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">E-commerce Demo</h3>
            <p className="text-sm text-muted-foreground">
              Tu tienda online de confianza con los mejores productos y
              servicios.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Enlaces</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Soporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Envíos y devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 E-commerce Demo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

