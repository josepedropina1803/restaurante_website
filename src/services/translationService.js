import translate from 'translate'

// Configurar a biblioteca para usar o motor gratuito
translate.engine = 'libre'

// Mapeamento de códigos de idioma
const langMap = {
  pt: 'pt',
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de'
}

// Cache de traduções em memória
const translationCache = {}

// Carregar cache do localStorage
const loadCacheFromStorage = () => {
  try {
    const cached = localStorage.getItem('translationCache')
    if (cached) {
      const parsedCache = JSON.parse(cached)
      Object.assign(translationCache, parsedCache)
    }
  } catch (error) {
    console.error('Erro ao carregar cache de traduções:', error)
  }
}

// Salvar cache no localStorage
const saveCacheToStorage = () => {
  try {
    localStorage.setItem('translationCache', JSON.stringify(translationCache))
  } catch (error) {
    console.error('Erro ao salvar cache de traduções:', error)
  }
}

// Gerar chave de cache
const getCacheKey = (text, toLang) => {
  return `${text.substring(0, 50)}_${toLang}` // Usa os primeiros 50 caracteres como parte da chave
}

// Traduzir texto
export const translateText = async (text, toLang = 'en') => {
  // Se for português, retorna o texto original
  if (toLang === 'pt' || !text) {
    return text
  }

  // Verificar cache
  const cacheKey = getCacheKey(text, toLang)
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey]
  }

  try {
    const translated = await translate(text, {
      from: 'pt',
      to: langMap[toLang] || toLang
    })

    // Salvar no cache
    translationCache[cacheKey] = translated
    saveCacheToStorage()

    return translated
  } catch (error) {
    console.error('Erro na tradução:', error)
    // Em caso de erro, retorna o texto original
    return text
  }
}

// Traduzir objeto profundamente
export const translateObject = async (obj, toLang = 'en') => {
  if (toLang === 'pt') {
    return obj
  }

  if (typeof obj === 'string') {
    return await translateText(obj, toLang)
  }

  if (Array.isArray(obj)) {
    return await Promise.all(obj.map(item => translateObject(item, toLang)))
  }

  if (typeof obj === 'object' && obj !== null) {
    const translated = {}
    for (const key of Object.keys(obj)) {
      translated[key] = await translateObject(obj[key], toLang)
    }
    return translated
  }

  return obj
}

// Inicializar cache ao carregar o módulo
loadCacheFromStorage()
