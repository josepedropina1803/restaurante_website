// Gera src/data/restaurante.{en,es,fr,de}.json a partir de restaurante.json (português)
// usando a API não oficial do Google Translate. Sobrescreve traduções editadas à mão.
import fs from 'node:fs'
import path from 'node:path'

import { translate } from '@vitalets/google-translate-api'

import type { Restaurante } from '../src/types/restaurante.ts'

type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

const LANGUAGES = ['en', 'es', 'fr', 'de'] as const
const DATA_PATH = path.join(import.meta.dirname, '../src/data')
const CAMPOS_FIXOS = new Set(['preco', 'telefone', 'email', 'codigoPostal', 'ano', 'url'])
const NAO_TRADUZIR = /^(http|https|€|@|#|\+\d|<br)/

const esperar = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

async function traduzirTexto(texto: string, lang: string): Promise<string> {
  try {
    const result = await translate(texto, { from: 'pt', to: lang })
    return result.text
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : String(error)
    console.error(`Erro ao traduzir "${texto.substring(0, 30)}..." para ${lang}:`, mensagem)
    return texto
  }
}

async function traduzir<T extends Json>(valor: T, lang: string, profundidade = 0): Promise<T> {
  if (typeof valor === 'string') {
    if (NAO_TRADUZIR.test(valor)) return valor
    process.stdout.write(
      `${'  '.repeat(profundidade)}A traduzir: "${valor.substring(0, 40)}..." para ${lang}\n`,
    )
    const traduzido = await traduzirTexto(valor, lang)
    await esperar(200)
    return traduzido as T
  }

  if (Array.isArray(valor)) {
    const resultado: Json[] = []
    const lista: readonly Json[] = valor
    for (const item of lista) {
      resultado.push(await traduzir(item, lang, profundidade + 1))
    }
    return resultado as T
  }

  if (typeof valor === 'object' && valor !== null) {
    const resultado: Record<string, Json> = {}
    for (const [chave, item] of Object.entries(valor)) {
      resultado[chave] = CAMPOS_FIXOS.has(chave)
        ? item
        : await traduzir(item, lang, profundidade + 1)
    }
    return resultado as T
  }

  return valor
}

async function gerarTraducoes() {
  console.log('🌍 A gerar traduções...\n')

  const original = JSON.parse(
    fs.readFileSync(path.join(DATA_PATH, 'restaurante.json'), 'utf-8'),
  ) as Restaurante

  for (const lang of LANGUAGES) {
    console.log(`\n📝 ${lang.toUpperCase()}\n`)

    try {
      const traduzido: Restaurante = {
        nome: original.nome,
        slogan: await traduzir(original.slogan, lang),
        descricao: await traduzir(original.descricao, lang),
        contacto: original.contacto,
        horario: {
          descricao: await traduzir(original.horario.descricao, lang),
        },
        redesSociais: original.redesSociais,
        ementa: (await traduzir(
          original.ementa as unknown as Json,
          lang,
        )) as unknown as Restaurante['ementa'],
        imagens: {
          ...original.imagens,
          galeria: await Promise.all(
            original.imagens.galeria.map(async (img) => ({
              url: img.url,
              alt: await traduzir(img.alt, lang),
            })),
          ),
        },
        ano: original.ano,
      }

      const destino = path.join(DATA_PATH, `restaurante.${lang}.json`)
      fs.writeFileSync(destino, JSON.stringify(traduzido, null, 2) + '\n', 'utf-8')
      console.log(`\n✅ ${lang.toUpperCase()} guardado em ${destino}`)
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : String(error)
      console.error(`\n❌ Erro ao gerar ${lang}:`, mensagem)
    }
  }

  console.log('\n🎉 Traduções geradas.')
}

await gerarTraducoes()
