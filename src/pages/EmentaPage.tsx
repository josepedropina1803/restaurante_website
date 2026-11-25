import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { MenuList } from '@/components/MenuList'
import { useRestauranteData } from '@/hooks/useRestauranteData'

export function EmentaPage() {
  const { t } = useTranslation()
  const restaurante = useRestauranteData()
  const { contacto } = restaurante

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-dark-brown py-8 text-cream shadow-lg">
        <div className="container mx-auto px-6">
          <div className="mb-4 flex justify-end">
            <LanguageSwitcher />
          </div>
          <div className="text-center">
            <h1 className="mb-2 font-serif text-4xl text-gold md:text-5xl">{restaurante.nome}</h1>
            <p className="text-sm tracking-widest uppercase">{t('ementaPage.title')}</p>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto max-w-4xl px-6">
          <MenuList categorias={restaurante.ementa} />
        </div>
      </main>

      <footer className="mt-12 bg-dark-brown py-6 text-cream">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            {t('contact.reservations')}: {contacto.telefone} | {contacto.email}
          </p>
          <p className="mt-2 text-xs text-gray-400">
            {contacto.morada.rua} - {contacto.morada.codigoPostal} {contacto.morada.cidade}
          </p>
        </div>
      </footer>
    </div>
  )
}
