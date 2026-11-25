export const LANGUAGES = [
  { code: 'pt', locale: 'pt-PT', name: 'Português', shortName: 'PT', flag: '🇵🇹' },
  { code: 'en', locale: 'en-GB', name: 'English', shortName: 'EN', flag: '🇬🇧' },
  { code: 'es', locale: 'es-ES', name: 'Español', shortName: 'ES', flag: '🇪🇸' },
  { code: 'fr', locale: 'fr-FR', name: 'Français', shortName: 'FR', flag: '🇫🇷' },
  { code: 'de', locale: 'de-DE', name: 'Deutsch', shortName: 'DE', flag: '🇩🇪' },
] as const

export type Language = (typeof LANGUAGES)[number]
export type LanguageCode = Language['code']

export const DEFAULT_LANGUAGE: LanguageCode = 'pt'

export function getLanguage(code: string): Language {
  return LANGUAGES.find((lang) => lang.code === code) ?? LANGUAGES[0]
}

export function isLanguageCode(code: string): code is LanguageCode {
  return LANGUAGES.some((lang) => lang.code === code)
}
