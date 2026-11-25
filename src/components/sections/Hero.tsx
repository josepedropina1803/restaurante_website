import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import type { Restaurante } from '@/types/restaurante'

interface HeroProps {
  restaurante: Restaurante
}

export function Hero({ restaurante }: HeroProps) {
  const { t } = useTranslation()

  return (
    <section id="home" className="relative flex h-screen items-center justify-center">
      <img
        src={restaurante.imagens.hero}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 px-4 text-center text-white">
        <h1 className="mb-4 font-serif text-6xl md:text-7xl">{restaurante.nome}</h1>
        <p className="mb-8 text-xl font-light tracking-wide md:text-2xl">{restaurante.slogan}</p>
        <Button asChild size="cta" className="hover:bg-yellow-600">
          <a href="#menu">{t('hero.viewMenu')}</a>
        </Button>
      </div>
    </section>
  )
}
