import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import restauranteData from '../data/restaurante.json'
import { translateText } from '../services/translationService'

export function useTranslatedRestauranteData() {
  const { i18n } = useTranslation()
  const [translatedData, setTranslatedData] = useState(restauranteData)
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    const translateData = async () => {
      const currentLang = i18n.language

      // Se for português, retorna os dados originais
      if (currentLang === 'pt') {
        setTranslatedData(restauranteData)
        setIsTranslating(false)
        return
      }

      setIsTranslating(true)

      try {
        // Traduzir campos principais
        const [nome, slogan, ...descricoes] = await Promise.all([
          translateText(restauranteData.nome, currentLang),
          translateText(restauranteData.slogan, currentLang),
          ...restauranteData.descricao.map(desc =>
            translateText(desc, currentLang)
          )
        ])

        // Traduzir ementa
        const ementaTraduzida = await Promise.all(
          restauranteData.ementa.map(async (section) => {
            const categoria = await translateText(section.categoria, currentLang)

            const itensTraduzidos = await Promise.all(
              section.itens.map(async (item) => {
                const [nomeItem, descricaoItem] = await Promise.all([
                  translateText(item.nome, currentLang),
                  translateText(item.descricao, currentLang)
                ])

                return {
                  ...item,
                  nome: nomeItem,
                  descricao: descricaoItem
                }
              })
            )

            return {
              ...section,
              categoria,
              itens: itensTraduzidos
            }
          })
        )

        setTranslatedData({
          ...restauranteData,
          nome,
          slogan,
          descricao: descricoes,
          ementa: ementaTraduzida
        })
      } catch (error) {
        console.error('Erro ao traduzir:', error)
        // Em caso de erro, mantém os dados originais
        setTranslatedData(restauranteData)
      } finally {
        setIsTranslating(false)
      }
    }

    translateData()
  }, [i18n.language])

  return { data: translatedData, isTranslating }
}
