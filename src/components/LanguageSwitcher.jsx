import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'pt', name: 'Português', shortName: 'PT', flag: '🇵🇹' },
  { code: 'en', name: 'English', shortName: 'EN', flag: '🇬🇧' },
  { code: 'es', name: 'Español', shortName: 'ES', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', shortName: 'FR', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', shortName: 'DE', flag: '🇩🇪' }
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setIsOpen(false)
  }

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do idioma atual */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gold text-dark-brown px-4 py-2 rounded font-medium hover:bg-yellow-600 transition"
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <span>{currentLanguage.shortName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-cream transition ${
                i18n.language === lang.code ? 'bg-gold/10' : ''
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-dark-brown font-medium">{lang.name}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-gold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
