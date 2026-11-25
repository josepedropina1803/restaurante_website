import { useTranslation } from 'react-i18next'

import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import type { Restaurante } from '@/types/restaurante'

interface ContactProps {
  restaurante: Restaurante
}

export function Contact({ restaurante }: ContactProps) {
  const { t } = useTranslation()
  const { contacto, horario } = restaurante
  const telefoneHref = `tel:${contacto.telefone.replace(/\s/g, '')}`

  return (
    <section id="contact" className="bg-dark-brown py-20 text-cream">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle={t('contact.subtitle')} title={t('contact.title')} tone="dark" />

        <div className="mt-12 grid gap-12 text-center md:grid-cols-3">
          <div>
            <div className="mb-4 text-4xl text-gold" aria-hidden="true">
              📍
            </div>
            <h3 className="mb-2 font-serif text-xl">{t('contact.location')}</h3>
            <p className="text-gray-300">
              {contacto.morada.rua}
              <br />
              {contacto.morada.codigoPostal} {contacto.morada.cidade}, {contacto.morada.pais}
            </p>
          </div>
          <div>
            <div className="mb-4 text-4xl text-gold" aria-hidden="true">
              ⏰
            </div>
            <h3 className="mb-2 font-serif text-xl">{t('contact.hours')}</h3>
            {/* O horário ainda vem com <br /> nos dados; passa a lista na issue de limpeza. */}
            <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: horario.descricao }} />
          </div>
          <div>
            <div className="mb-4 text-4xl text-gold" aria-hidden="true">
              📞
            </div>
            <h3 className="mb-2 font-serif text-xl">{t('contact.reservations')}</h3>
            <p className="text-gray-300">
              {contacto.telefone}
              <br />
              {contacto.email}
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="cta" className="hover:bg-yellow-600">
            <a href={telefoneHref}>{t('contact.makeReservation')}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
