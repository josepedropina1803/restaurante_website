import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { MenuList } from '@/components/MenuList'
import { SectionHeading } from '@/components/SectionHeading'
import type { MenuCategoria } from '@/types/restaurante'

interface MenuSectionProps {
  categorias: MenuCategoria[]
}

export function MenuSection({ categorias }: MenuSectionProps) {
  const { t } = useTranslation()

  return (
    <section id="menu" className="bg-cream py-20">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle={t('menu.subtitle')} title={t('menu.title')} />

        <div className="mt-12">
          <MenuList categorias={categorias} />
        </div>

        <div className="mt-8 text-center">
          <Link to="/ementa" className="font-semibold text-gold underline hover:text-yellow-600">
            {t('menu.viewFullMenu')}
          </Link>
        </div>
      </div>
    </section>
  )
}
