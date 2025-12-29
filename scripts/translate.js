import { translate } from '@vitalets/google-translate-api'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const languages = ['en', 'es', 'fr', 'de']
const dataPath = path.join(__dirname, '../src/data')

// Função para traduzir texto
async function translateText(text, targetLang) {
  try {
    const result = await translate(text, { from: 'pt', to: targetLang })
    return result.text
  } catch (error) {
    console.error(`Erro ao traduzir "${text.substring(0, 30)}..." para ${targetLang}:`, error.message)
    return text
  }
}

// Função para traduzir objeto recursivamente
async function translateObject(obj, targetLang, depth = 0) {
  const indent = '  '.repeat(depth)

  if (typeof obj === 'string') {
    // Evitar traduzir URLs, emails, telefones, códigos postais
    if (obj.match(/^(http|https|€|@|#|\+\d|<br)/)) {
      return obj
    }
    process.stdout.write(`${indent}Traduzindo: "${obj.substring(0, 40)}..." para ${targetLang}\n`)
    const translated = await translateText(obj, targetLang)
    // Pequeno delay para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 200))
    return translated
  }

  if (Array.isArray(obj)) {
    const translated = []
    for (let i = 0; i < obj.length; i++) {
      translated.push(await translateObject(obj[i], targetLang, depth + 1))
    }
    return translated
  }

  if (typeof obj === 'object' && obj !== null) {
    const translated = {}
    for (const key of Object.keys(obj)) {
      // Não traduzir certos campos
      if (['preco', 'telefone', 'email', 'codigoPostal', 'ano', 'url'].includes(key)) {
        translated[key] = obj[key]
      } else {
        translated[key] = await translateObject(obj[key], targetLang, depth + 1)
      }
    }
    return translated
  }

  return obj
}

async function generateTranslations() {
  console.log('🌍 Iniciando geração de traduções...\n')

  // Ler o arquivo original em português
  const originalData = JSON.parse(
    fs.readFileSync(path.join(dataPath, 'restaurante.json'), 'utf-8')
  )

  for (const lang of languages) {
    console.log(`\n📝 Gerando traduções para ${lang.toUpperCase()}...\n`)

    try {
      const translated = {
        nome: originalData.nome,
        slogan: await translateObject(originalData.slogan, lang),
        descricao: await translateObject(originalData.descricao, lang),
        contacto: originalData.contacto,
        horario: {
          descricao: await translateObject(originalData.horario.descricao, lang)
        },
        redesSociais: originalData.redesSociais,
        ementa: await translateObject(originalData.ementa, lang),
        imagens: {
          ...originalData.imagens,
          galeria: await Promise.all(
            originalData.imagens.galeria.map(async (img) => ({
              url: img.url,
              alt: await translateObject(img.alt, lang)
            }))
          )
        },
        ano: originalData.ano
      }

      // Salvar arquivo traduzido
      const outputPath = path.join(dataPath, `restaurante.${lang}.json`)
      fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2), 'utf-8')
      console.log(`\n✅ Tradução para ${lang.toUpperCase()} salva em: ${outputPath}`)
    } catch (error) {
      console.error(`\n❌ Erro ao gerar tradução para ${lang}:`, error.message)
    }
  }

  console.log('\n\n🎉 Traduções geradas com sucesso!')
  console.log('\n💡 Agora você pode usar os idiomas no website!')
}

generateTranslations().catch(console.error)
