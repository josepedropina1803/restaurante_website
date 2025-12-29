import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import restauranteDataPt from '../data/restaurante.json'

export const useRestauranteData = () => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || 'pt'

  const [data, setData] = useState(restauranteDataPt)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadTranslatedData = async () => {
      // Se for português, usa os dados originais
      if (currentLang === 'pt') {
        setData(restauranteDataPt)
        return
      }

      setIsLoading(true)

      try {
        // Carregar arquivo de tradução correspondente
        const translatedData = await import(`../data/restaurante.${currentLang}.json`)
        setData(translatedData.default)
      } catch (error) {
        console.warn(`Arquivo de tradução para ${currentLang} não encontrado. Usando português.`)
        // Se não encontrar o arquivo traduzido, usa o português
        setData(restauranteDataPt)
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslatedData()
  }, [currentLang])

  return { ...data, isLoading }
}
