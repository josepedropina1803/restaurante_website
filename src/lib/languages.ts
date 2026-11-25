export const LANGUAGES = [
  { code: 'pt', name: 'Português', shortName: 'PT', flag: '🇵🇹' },
  { code: 'en', name: 'English', shortName: 'EN', flag: '🇬🇧' },
  { code: 'es', name: 'Español', shortName: 'ES', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', shortName: 'FR', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', shortName: 'DE', flag: '🇩🇪' },
] as const

export type Language = (typeof LANGUAGES)[number]
export type LanguageCode = Language['code']

export const DEFAULT_LANGUAGE: LanguageCode = 'pt'

export function getLanguage(code: string): Language {
  return LANGUAGES.find((lang) => lang.code === code) ?? LANGUAGES[0]
}
