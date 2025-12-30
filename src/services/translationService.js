// Serviço de tradução usando MyMemory Translation API (gratuita e funciona no browser)
const TRANSLATION_API = 'https://api.mymemory.translated.net/get'

// Cache de traduções para evitar chamadas repetidas
const translationCache = new Map()

function getCacheKey(text, targetLang) {
  return text + '_' + targetLang
}

export async function translateText(text, targetLang) {
  // Se for português, retorna o texto original
  if (targetLang === 'pt' || !text) {
    return text
  }

  // Verifica se já está em cache
  const cacheKey = getCacheKey(text, targetLang)
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)
  }

  try {
    const url = TRANSLATION_API + '?q=' + encodeURIComponent(text) + '&langpair=pt|' + targetLang
    const response = await fetch(url)
    const data = await response.json()

    if (data.responseData && data.responseData.translatedText) {
      const translatedText = data.responseData.translatedText
      translationCache.set(cacheKey, translatedText)
      return translatedText
    }

    // Em caso de erro, retorna o texto original
    return text
  } catch (error) {
    console.error('Erro ao traduzir:', error)
    return text
  }
}

export async function translateArray(textArray, targetLang) {
  return Promise.all(textArray.map(text => translateText(text, targetLang)))
}

export async function translateObject(obj, targetLang, fields) {
  const translations = await Promise.all(
    fields.map(field => translateText(obj[field], targetLang))
  )

  const result = { ...obj }
  fields.forEach((field, index) => {
    result[field] = translations[index]
  })

  return result
}
