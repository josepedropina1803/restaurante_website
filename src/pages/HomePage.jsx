import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTranslatedRestauranteData } from '../hooks/useTranslatedRestauranteData'
import LanguageSwitcher from '../components/LanguageSwitcher'

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation()
  const { data: restauranteData, isTranslating } = useTranslatedRestauranteData()

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="fixed w-full bg-dark-brown/95 backdrop-blur-sm shadow-lg z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-serif text-gold">{restauranteData.nome}</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-cream hover:text-gold transition">{t('nav.home')}</a>
              <a href="#about" className="text-cream hover:text-gold transition">{t('nav.about')}</a>
              <a href="#menu" className="text-cream hover:text-gold transition">{t('nav.menu')}</a>
              <a href="#gallery" className="text-cream hover:text-gold transition">{t('nav.gallery')}</a>
              <a href="#contact" className="text-cream hover:text-gold transition">{t('nav.contact')}</a>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-cream"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <a href="#home" className="block text-cream hover:text-gold transition py-2">{t('nav.home')}</a>
              <a href="#about" className="block text-cream hover:text-gold transition py-2">{t('nav.about')}</a>
              <a href="#menu" className="block text-cream hover:text-gold transition py-2">{t('nav.menu')}</a>
              <a href="#gallery" className="block text-cream hover:text-gold transition py-2">{t('nav.gallery')}</a>
              <a href="#contact" className="block text-cream hover:text-gold transition py-2">{t('nav.contact')}</a>
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${restauranteData.imagens.hero}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-6xl md:text-7xl mb-4">{restauranteData.nome}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light tracking-wide">{restauranteData.slogan}</p>
          <a href="#menu" className="btn-primary inline-block">{t('hero.viewMenu')}</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <p className="section-subtitle">{t('about.subtitle')}</p>
          <h2 className="section-title">{t('about.title')}</h2>

          <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
            <div>
              <img
                src={restauranteData.imagens.sobre}
                alt="Interior do restaurante"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="space-y-4 text-gray-700">
              {restauranteData.descricao.map((paragrafo, idx) => (
                <p key={idx} className="text-lg leading-relaxed">
                  {paragrafo}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-cream">
        <div className="container mx-auto px-6">
          <p className="section-subtitle">{t('menu.subtitle')}</p>
          <h2 className="section-title">{t('menu.title')}</h2>

          <div className="mt-12 space-y-12">
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

          <div className="mt-8 text-center">
            <Link to="/ementa" className="text-gold hover:text-yellow-600 font-semibold underline">
              {t('menu.viewFullMenu')}
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <p className="section-subtitle">{t('gallery.subtitle')}</p>
          <h2 className="section-title">{t('gallery.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {restauranteData.imagens.galeria.map((imagem, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={imagem.url}
                  alt={imagem.alt}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-brown text-cream">
        <div className="container mx-auto px-6">
          <p className="section-subtitle text-gold">{t('contact.subtitle')}</p>
          <h2 className="section-title text-cream">{t('contact.title')}</h2>

          <div className="grid md:grid-cols-3 gap-12 mt-12 text-center">
            <div>
              <div className="text-gold text-4xl mb-4">📍</div>
              <h3 className="font-serif text-xl mb-2">{t('contact.location')}</h3>
              <p className="text-gray-300">
                {restauranteData.contacto.morada.rua}<br />
                {restauranteData.contacto.morada.codigoPostal} {restauranteData.contacto.morada.cidade}, {restauranteData.contacto.morada.pais}
              </p>
            </div>
            <div>
              <div className="text-gold text-4xl mb-4">⏰</div>
              <h3 className="font-serif text-xl mb-2">{t('contact.hours')}</h3>
              <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: restauranteData.horario.descricao }} />
            </div>
            <div>
              <div className="text-gold text-4xl mb-4">📞</div>
              <h3 className="font-serif text-xl mb-2">{t('contact.reservations')}</h3>
              <p className="text-gray-300">
                {restauranteData.contacto.telefone}<br />
                {restauranteData.contacto.email}
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a href={`tel:${restauranteData.contacto.telefone.replace(/\s/g, '')}`} className="btn-primary">{t('contact.makeReservation')}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-cream py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="font-serif text-gold text-xl mb-2">{restauranteData.nome}</p>
          <p className="text-sm text-gray-400">© {restauranteData.ano} {t('footer.rights')}</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href={restauranteData.redesSociais.facebook} className="text-gray-400 hover:text-gold transition">Facebook</a>
            <a href={restauranteData.redesSociais.instagram} className="text-gray-400 hover:text-gold transition">Instagram</a>
            <a href={restauranteData.redesSociais.tripadvisor} className="text-gray-400 hover:text-gold transition">TripAdvisor</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
