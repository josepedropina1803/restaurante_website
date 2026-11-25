import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_LANGUAGE, isLanguageCode, type LanguageCode } from '@/lib/languages'
import de from '@/locales/de.json'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'
import pt from '@/locales/pt.json'

export const resources = {
  pt: { translation: pt },
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
} as const

const STORAGE_KEY = 'idioma'

// O localStorage pode não existir ou lançar erro (modo privado, cookies bloqueados):
// nesse caso o site funciona na mesma, só não se lembra do idioma.
function idiomaGuardado(): LanguageCode {
  try {
    const valor = localStorage.getItem(STORAGE_KEY)
    return valor && isLanguageCode(valor) ? valor : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

function aoMudarIdioma(lang: string) {
  document.documentElement.lang = lang
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Sem armazenamento disponível: ignora.
  }
}

i18n.on('languageChanged', aoMudarIdioma)

void i18n.use(initReactI18next).init({
  resources,
  lng: idiomaGuardado(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
