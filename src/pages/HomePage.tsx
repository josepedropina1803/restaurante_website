import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Gallery } from '@/components/sections/Gallery'
import { Hero } from '@/components/sections/Hero'
import { MenuSection } from '@/components/sections/MenuSection'
import { useRestauranteData } from '@/hooks/useRestauranteData'

export function HomePage() {
  const restaurante = useRestauranteData()

  return (
    <div className="min-h-screen bg-cream">
      <Header nome={restaurante.nome} />
      <main>
        <Hero restaurante={restaurante} />
        <About restaurante={restaurante} />
        <MenuSection categorias={restaurante.ementa} />
        <Gallery imagens={restaurante.imagens.galeria} />
        <Contact restaurante={restaurante} />
      </main>
      <Footer restaurante={restaurante} />
    </div>
  )
}
