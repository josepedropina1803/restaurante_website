import { useTranslation } from 'react-i18next'

import type { Restaurante } from '@/types/restaurante'

interface FooterProps {
  restaurante: Restaurante
}

const ANO_ATUAL = new Date().getFullYear()

export function Footer({ restaurante }: FooterProps) {
  const { t } = useTranslation()
  const redes = [
    { nome: 'Facebook', url: restaurante.redesSociais.facebook },
    { nome: 'Instagram', url: restaurante.redesSociais.instagram },
    { nome: 'TripAdvisor', url: restaurante.redesSociais.tripadvisor },
  ].filter((rede) => rede.url !== '')

  return (
    <footer className="bg-black py-8 text-cream">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-2 font-serif text-xl text-gold">{restaurante.nome}</p>
        <p className="text-sm text-gray-400">
          © {ANO_ATUAL} {t('footer.rights')}
        </p>
        {redes.length > 0 && (
          <div className="mt-4 flex justify-center space-x-6">
            {redes.map((rede) => (
              <a
                key={rede.nome}
                href={rede.url}
                className="text-gray-400 transition hover:text-gold"
              >
                {rede.nome}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
