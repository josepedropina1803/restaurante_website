import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import restaurantePt from '@/data/restaurante.json'
import type { LanguageCode } from '@/lib/languages'
import type { Restaurante } from '@/types/restaurante'

const dadosPt: Restaurante = restaurantePt

// Cada import é verificado contra o tipo Restaurante; o português vem no bundle
// principal e os outros idiomas são carregados só quando são escolhidos.
const traducoes: Record<Exclude<LanguageCode, 'pt'>, () => Promise<Restaurante>> = {
  en: () => import('@/data/restaurante.en.json').then((m) => m.default),
  es: () => import('@/data/restaurante.es.json').then((m) => m.default),
  fr: () => import('@/data/restaurante.fr.json').then((m) => m.default),
  de: () => import('@/data/restaurante.de.json').then((m) => m.default),
}

function isTraduzido(lang: string): lang is keyof typeof traducoes {
  return lang in traducoes
}

interface Carregado {
  lang: string
  data: Restaurante
}

export function useRestauranteData(): Restaurante {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [carregado, setCarregado] = useState<Carregado | null>(null)

  useEffect(() => {
    if (!isTraduzido(lang)) return

    let cancelado = false
    traducoes[lang]()
      .then((data) => {
        if (!cancelado) setCarregado({ lang, data })
      })
      .catch(() => {
        if (!cancelado) setCarregado(null)
      })

    return () => {
      cancelado = true
    }
  }, [lang])

  if (!isTraduzido(lang)) return dadosPt
  // Enquanto o novo idioma carrega, mantém o último que foi carregado.
  return carregado?.data ?? dadosPt
}
