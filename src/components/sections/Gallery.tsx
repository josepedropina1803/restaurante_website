import { useTranslation } from 'react-i18next'

import { SectionHeading } from '@/components/SectionHeading'
import type { Imagem } from '@/types/restaurante'

interface GalleryProps {
  imagens: Imagem[]
}

export function Gallery({ imagens }: GalleryProps) {
  const { t } = useTranslation()

  return (
    <section id="gallery" className="scroll-mt-20 bg-white py-20">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle={t('gallery.subtitle')} title={t('gallery.title')} />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {imagens.map((imagem) => (
            <div
              key={imagem.url}
              className="overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            >
              <img
                src={imagem.url}
                alt={imagem.alt}
                width={800}
                height={533}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
