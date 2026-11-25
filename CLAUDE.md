# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A restaurant website template ("La Bella Tavola"). It is a single-page app built with React 19, Vite 7, Tailwind CSS 3, React Router 7 and i18next. Code comments, data keys and the README are in Portuguese (`ementa` = menu, `preco` = price, `morada` = address, `horario` = opening hours). This is a frontend-only project (no backend). GitHub Pages is the only deploy target: https://josepedropina1803.github.io/restaurante_website/. Don't add other hosting (Vercel, Netlify, etc.).

## Development workflow (mandatory)

Every task follows [docs/FLUXO_DESENVOLVIMENTO.md](docs/FLUXO_DESENVOLVIMENTO.md): task → plan → **user approves the plan** → GitHub issue (`gh issue create`, label `enhancement` or `bug`) → branch `feature/<issue#>-<slug>` or `bugfix/<issue#>-<slug>` cut from `develop` → implement → review the diff → `npm run lint` + `npm run build` + manual check → commit and push → run `npm run dev` and **wait for the user to validate locally** → `gh pr create --base develop` with `Closes #<issue#>`.

Never commit directly to `develop` or `main`. `main` only receives PRs from `develop`.

Commits are authored by the user only (`José Pedro Pina`, set in this repo's local git config). Never add `Co-Authored-By: Claude` or any other Claude attribution to commit messages or PR descriptions.

## CI/CD

- `.github/workflows/ci.yml` runs `npm ci`, lint and build on pushes to `develop`, `feature/**` and `bugfix/**`, and on PRs to `develop` and `main`.
- `.github/workflows/deploy.yml` deploys to GitHub Pages only when a PR from `develop` is merged into `main` (or when it is run by hand).
- Because Pages serves the site under `/restaurante_website/`, the deploy build sets `BASE_PATH`. `vite.config.js` uses it as `base`, and `BrowserRouter` takes its `basename` from `import.meta.env.BASE_URL`. The workflow also copies `index.html` to `404.html` so deep links like `/ementa` work. Locally the base is `/`. Don't hardcode absolute asset paths; use `<Link>` for routes.

## Commands

```bash
npm run dev        # Vite dev server at http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the built dist/
npm run lint       # ESLint (flat config in eslint.config.js)
npm run translate  # regenerate src/data/restaurante.{en,es,fr,de}.json from restaurante.json
docker compose up -d --build  # local containers: main on :8090, develop on :8091
```

The Docker setup (`docker-compose.yml`, `docker/`) is only for comparing the `main` and `develop` branches side by side on this machine; it is not a deploy. `docker/Dockerfile` pulls the source with `ADD <repo>.git#<BRANCH>`, so it builds what is pushed to GitHub, not the local working tree. It serves at `/` (no `BASE_PATH`), and `docker/nginx.conf` provides the SPA fallback.

There is no test suite.

## Architecture

Translated text comes from two separate places:

1. **UI strings** (nav, headings, buttons) live in `src/locales/{pt,en,es,fr,de}.json`. They are loaded statically in `src/i18n.js` and read with `t()` from `useTranslation()`. The default and fallback language is `pt`. When you add a key, add it to all five files.
2. **Restaurant content** (name, slogan, description, contact, hours, menu, images, social links) lives in `src/data/`:
   - `restaurante.json` is the Portuguese source of truth.
   - `restaurante.<lang>.json` holds one full translated copy per language, with the same shape.
   - `src/hooks/useRestauranteData.js` watches `i18n.language` and loads `restaurante.${lang}.json` with a dynamic `import()`. If that file is missing, it falls back to the Portuguese file. Pages read every piece of content from this hook, not by importing the JSON directly.

The README says each field in `restaurante.json` has per-language keys (`"ementa": { "pt": [...], "en": [...] }`). That is out of date: the real model is one file per language.

**Translation script** (`scripts/translate.js`): it reads `restaurante.json` and machine-translates it with `@vitalets/google-translate-api`, which is unofficial, so it can be rate-limited or fail. It then overwrites the four language files. Keep these points in mind when using it:
- It rebuilds each output from an explicit list of top-level fields (`nome`, `slogan`, `descricao`, `contacto`, `horario.descricao`, `redesSociais`, `ementa`, `imagens`, `ano`). If you add a new top-level field to `restaurante.json`, you must also add it to the script, or the script will drop it.
- It copies `contacto` and `redesSociais` without translating them, and skips the keys `preco`, `telefone`, `email`, `codigoPostal`, `ano` and `url`, plus strings that start with `http`, `€`, `@`, `#`, `+<digit>` or `<br`.
- Running it overwrites any hand-edited translations in the language files.

`src/services/translationService.js` is not used anywhere. It imports a `translate` package that is not in `package.json`, so importing it would break the build.

**Routes** (`src/App.jsx`): `/` is `HomePage`, which has the hero, about, menu, gallery and contact sections and in-page smooth scrolling. `/ementa` is `EmentaPage`, which shows only the menu. Both pages render `LanguageSwitcher`.

**Styling**: Tailwind with custom colors in `tailwind.config.js`: `gold` (#D4AF37), `dark-brown` (#2C1810) and `cream` (#F5F5DC). Fonts are Playfair Display (serif) and Lato (sans-serif).
