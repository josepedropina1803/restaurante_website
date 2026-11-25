# La Bella Tavola - Template de Website para Restaurante

Website SPA (Single Page Application) moderno e elegante para restaurantes, desenvolvido com React e Tailwind CSS.

## Características

- Design clássico e elegante com tipografia refinada
- Totalmente responsivo (mobile-first)
- **Suporte multilíngua** (Português, Inglês, Espanhol, Francês, Alemão)
- Navegação suave entre seções
- Imagens de alta qualidade do Unsplash
- Seções completas:
  - Hero com imagem de fundo impressionante
  - Sobre o restaurante
  - Ementa completa (Entradas, Pratos Principais, Sobremesas)
  - Galeria de fotos
  - Informações de contacto

## Tecnologias Utilizadas

- **React** - Framework JavaScript
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Navegação entre páginas
- **i18next / react-i18next** - Sistema de internacionalização
- **Google Fonts** - Playfair Display (serif) e Lato (sans-serif)

## Como Executar

1. Instalar dependências:

```bash
npm install
```

2. Iniciar servidor de desenvolvimento:

```bash
npm run dev
```

3. Abrir no navegador: [http://localhost:5173](http://localhost:5173)

## Personalização

### Arquivo de Configuração JSON

Todos os dados do restaurante estão centralizados no arquivo `src/data/restaurante.json`. Este ficheiro permite personalizar facilmente:

**Informações Básicas:**

- Nome do restaurante
- Slogan
- Descrição e história

**Contacto:**

- Telefone
- Email
- Morada completa

**Horário:**

- Horários de funcionamento

**Ementa:**

- Categorias (Entradas, Pratos Principais, Sobremesas)
- Itens com nome, descrição e preço

**Imagens:**

- Imagem hero (banner principal)
- Imagem da seção "Sobre"
- Galeria de fotos

**Navegação e Redes Sociais:**

- Links de navegação
- Links para redes sociais

Para personalizar o website, edite apenas o arquivo `src/data/restaurante.json` - não é necessário modificar o código React!

### Cores

As cores principais estão definidas em `tailwind.config.js`:

- `gold`: #D4AF37 (dourado)
- `dark-brown`: #2C1810 (castanho escuro)
- `cream`: #F5F5DC (creme)

## Internacionalização (i18n)

O website suporta 5 idiomas:

- 🇵🇹 Português (padrão)
- 🇬🇧 Inglês
- 🇪🇸 Espanhol
- 🇫🇷 Francês
- 🇩🇪 Alemão

### Seletor de Idioma

O seletor de idioma aparece no canto superior direito do header em todas as páginas. Clique numa bandeira para mudar o idioma.

### Adicionar ou Editar Traduções

As traduções estão nos arquivos da pasta `src/locales/`:

- `pt.json` - Português
- `en.json` - Inglês
- `es.json` - Espanhol
- `fr.json` - Francês
- `de.json` - Alemão

Para adicionar novas traduções:

1. Edite o arquivo JSON do idioma correspondente
2. Use a mesma estrutura de chaves para todos os idiomas
3. As alterações serão refletidas automaticamente

**Nota:** As traduções aplicam-se a:

1. **Elementos da interface** (navegação, títulos, botões) - nos arquivos `src/locales/*.json`
2. **Dados do restaurante** (slogan, descrição, ementa, etc.) - no arquivo `src/data/restaurante.json`

### Traduzir Dados do Restaurante

O arquivo `src/data/restaurante.json` está estruturado para suportar múltiplos idiomas. Para adicionar traduções:

1. Localize o campo que deseja traduzir (ex: `slogan`, `descricao`, `ementa`)
2. Cada idioma tem sua própria chave (pt, en, es, fr, de)
3. Adicione/edite o conteúdo para cada idioma

**Exemplo da ementa:**

```json
"ementa": {
  "pt": [
    {
      "categoria": "Entradas",
      "itens": [...]
    }
  ],
  "en": [
    {
      "categoria": "Starters",
      "itens": [...]
    }
  ]
}
```

O website seleciona automaticamente os dados no idioma atual!

## Estrutura do Projeto

```
ementa-template/
├── public/
├── src/
│   ├── components/
│   │   └── LanguageSwitcher.jsx  # Seletor de idioma
│   ├── data/
│   │   └── restaurante.json      # Configuração centralizada
│   ├── locales/
│   │   ├── pt.json               # Traduções em Português
│   │   ├── en.json               # Traduções em Inglês
│   │   ├── es.json               # Traduções em Espanhol
│   │   ├── fr.json               # Traduções em Francês
│   │   └── de.json               # Traduções em Alemão
│   ├── pages/
│   │   ├── HomePage.jsx          # Página principal completa
│   │   └── EmentaPage.jsx        # Página apenas da ementa
│   ├── App.jsx                   # Componente principal com rotas
│   ├── i18n.js                   # Configuração do i18next
│   ├── index.css                 # Estilos Tailwind
│   └── main.jsx                  # Ponto de entrada
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Rotas Disponíveis

- **`/`** - Página principal com todas as seções (Hero, Sobre, Ementa, Galeria, Contacto)
- **`/ementa`** - Página apenas com a ementa do restaurante

## Deploy

Para fazer build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## Licença

Livre para uso em projetos pessoais e comerciais.
