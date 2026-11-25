import { getLanguage } from '@/lib/languages'

export function formatPreco(valor: number, lang: string): string {
  return new Intl.NumberFormat(getLanguage(lang).locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(valor)
}
