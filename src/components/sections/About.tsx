import { useTranslation } from 'react-i18next'

import { SectionHeading } from '@/components/SectionHeading'
import type { Restaurante } from '@/types/restaurante'

interface AboutProps {
  restaurante: Restaurante
}

export function About({ restaurante }: AboutProps) {
  const { t } = useTranslation()

  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle={t('about.subtitle')} title={t('about.title')} />

        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          <img
            src={restaurante.imagens.sobre}
            alt="Interior do restaurante"
            className="rounded-lg shadow-2xl"
          />
          <div className="space-y-4 text-gray-700">
            {restaurante.descricao.map((paragrafo) => (
              <p key={paragrafo} className="text-lg leading-relaxed">
                {paragrafo}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
