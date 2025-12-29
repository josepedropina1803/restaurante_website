import { useTranslation } from 'react-i18next'
import { useRestauranteData } from '../hooks/useRestauranteData'
import LanguageSwitcher from '../components/LanguageSwitcher'

function EmentaPage() {
  const { t } = useTranslation()
  const restauranteData = useRestauranteData()

  return (
    <div className="min-h-screen bg-cream">
      {/* Header Simples */}
      <header className="bg-dark-brown text-cream py-8 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <LanguageSwitcher />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-gold mb-2">{restauranteData.nome}</h1>
            <p className="text-sm uppercase tracking-widest">{t('ementaPage.title')}</p>
          </div>
        </div>
      </header>

      {/* Menu Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            {restauranteData.ementa.map((section, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                <h3 className="font-serif text-3xl text-gold mb-8 text-center border-b-2 border-gold pb-4">
                  {section.categoria}
                </h3>
                <div className="space-y-6">
                  {section.itens.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-start border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex-1">
                        <h4 className="font-serif text-xl text-dark-brown mb-2">{item.nome}</h4>
                        <p className="text-gray-600 text-sm">{item.descricao}</p>
                      </div>
                      <div className="text-gold font-semibold text-lg ml-4">{item.preco}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="bg-dark-brown text-cream py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">{t('contact.reservations')}: {restauranteData.contacto.telefone} | {restauranteData.contacto.email}</p>
          <p className="text-xs text-gray-400 mt-2">
            {restauranteData.contacto.morada.rua} - {restauranteData.contacto.morada.codigoPostal} {restauranteData.contacto.morada.cidade}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default EmentaPage
