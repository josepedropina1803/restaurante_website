# La Bella Tavola

Site de um restaurante em Lisboa, em 5 idiomas (português, inglês, espanhol, francês e alemão). É só frontend e é publicado no GitHub Pages: https://josepedropina1803.github.io/restaurante_website/

## Tecnologias

- React 19 e TypeScript (modo `strict`)
- Vite 7
- Tailwind CSS 4 e [shadcn/ui](https://ui.shadcn.com), com os registos do [Magic UI](https://magicui.design) e do [Aceternity UI](https://ui.aceternity.com) configurados
- React Router 7
- i18next / react-i18next

## Como correr

```bash
npm install
npm run dev
```

O site abre em http://localhost:5173.

| Comando                           | O que faz                                                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                     | Servidor de desenvolvimento                                                                                            |
| `npm run build`                   | Verificação de tipos e build de produção em `dist/`                                                                    |
| `npm run typecheck`               | Só a verificação de tipos                                                                                              |
| `npm run lint`                    | ESLint (typescript-eslint e jsx-a11y em modo estrito)                                                                  |
| `npm run format` / `format:check` | Prettier, com ordenação das classes Tailwind                                                                           |
| `npm run preview`                 | Serve o `dist/`                                                                                                        |
| `npm run translate`               | Gera automaticamente os ficheiros de dados de EN, ES, FR e DE a partir do português (substitui traduções feitas à mão) |

Para comparar `main` e `develop` lado a lado em containers locais, há um `docker-compose.yml`. A explicação está em [docs/FLUXO_DESENVOLVIMENTO.md](docs/FLUXO_DESENVOLVIMENTO.md).

## Conteúdo

Os textos estão em dois sítios:

- **Interface** (menus, títulos, botões): `src/locales/{pt,en,es,fr,de}.json`. Uma chave nova tem de ser acrescentada aos 5 ficheiros; o TypeScript avisa se faltar em português.
- **Dados do restaurante** (nome, descrição, contacto, horário, ementa, imagens): `src/data/restaurante.json` em português e um ficheiro completo por idioma (`restaurante.en.json`, etc.). A estrutura está definida em `src/types/restaurante.ts`.

Pormenores dos dados:

- **Preços:** são números (`8.5`). O site formata-os conforme o idioma, por exemplo "8,50 €" em português e "€8.50" em inglês.
- **Horário:** é uma lista de `{ "dias", "horas" }`.
- **Redes sociais:** um link com a string vazia não aparece no rodapé.
- **Idioma:** o idioma escolhido fica guardado no browser e o `<html lang>` acompanha-o.

## Cores e tipografia

As cores e as fontes estão em `src/index.css`, no bloco `@theme`:

- `gold` (#D4AF37), `dark-brown` (#2C1810) e `cream` (#F5F5DC)
- Playfair Display nos títulos e Lato no texto

Todo o CSS é feito com Tailwind.

## Rotas

- `/`: página principal (início, sobre, ementa, galeria e contacto)
- `/ementa`: só a ementa

## Fluxo de desenvolvimento e deploy

Todas as alterações seguem o fluxo descrito em [docs/FLUXO_DESENVOLVIMENTO.md](docs/FLUXO_DESENVOLVIMENTO.md): issue, branch a partir de `develop`, PR para `develop` e release para `main`. Cada merge de `develop` para `main` publica o site no GitHub Pages.

As fotografias da galeria vêm do [Pexels](https://www.pexels.com) e são usadas ao abrigo da licença livre deles.
