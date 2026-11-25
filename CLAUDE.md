# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A restaurant website template ("La Bella Tavola"). It is a single-page app built with React 19, TypeScript (strict), Vite 7, Tailwind CSS 4, shadcn/ui, React Router 7 and i18next. Code comments, data keys and the README are in Portuguese (`ementa` = menu, `preco` = price, `morada` = address, `horario` = opening hours). This is a frontend-only project (no backend). GitHub Pages is the only deploy target: https://josepedropina1803.github.io/restaurante_website/. Don't add other hosting (Vercel, Netlify, etc.).

## Development workflow (mandatory)

Every task follows [docs/FLUXO_DESENVOLVIMENTO.md](docs/FLUXO_DESENVOLVIMENTO.md): task → plan → **user approves the plan** → GitHub issue (`gh issue create`, label `enhancement` or `bug`) → branch `feature/<issue#>-<slug>` or `bugfix/<issue#>-<slug>` cut from `develop` → implement → review the diff → `npm run lint` + `npm run typecheck` + `npm run format:check` + `npm run build` + visual check with the Playwright MCP → commit and push → run `npm run dev` and **wait for the user to validate locally** → `gh pr create --base develop` with `Closes #<issue#>`.

Never commit directly to `develop` or `main`. `main` only receives PRs from `develop`.

Commits are authored by the user only (`José Pedro Pina`, set in this repo's local git config). Never add `Co-Authored-By: Claude` or any other Claude attribution to commit messages or PR descriptions.

## CI/CD

- `.github/workflows/ci.yml` runs `npm ci`, lint, Prettier check, typecheck and build on pushes to `develop`, `feature/**` and `bugfix/**`, and on PRs to `develop` and `main`.
- `.github/workflows/deploy.yml` deploys to GitHub Pages only when a PR from `develop` is merged into `main` (or when it is run by hand).
- Because Pages serves the site under `/restaurante_website/`, the deploy build sets `BASE_PATH`. `vite.config.ts` uses it as `base`, and `BrowserRouter` takes its `basename` from `import.meta.env.BASE_URL`. The workflow also copies `index.html` to `404.html` so deep links like `/ementa` work. Locally the base is `/`. Don't hardcode absolute asset paths; use `<Link>` for routes.

## Commands

```bash
npm run dev        # Vite dev server at http://localhost:5173
npm run build         # tsc -b + production build to dist/
npm run typecheck     # tsc -b (app + node projects)
npm run lint          # ESLint: typescript-eslint strict type-checked + jsx-a11y strict
npm run format        # Prettier (with prettier-plugin-tailwindcss for class order)
npm run format:check  # what CI runs
npm run preview       # serve the built dist/
npm run translate     # regenerate src/data/restaurante.{en,es,fr,de}.json (tsx scripts/translate.ts)
docker compose up -d --build  # local containers: main on :8090, develop on :8091
```

The Docker setup (`docker-compose.yml`, `docker/`) is only for comparing the `main` and `develop` branches side by side on this machine; it is not a deploy. `docker/Dockerfile` pulls the source with `ADD <repo>.git#<BRANCH>`, so it builds what is pushed to GitHub, not the local working tree. It serves at `/` (no `BASE_PATH`), and `docker/nginx.conf` provides the SPA fallback.

There is no test suite.

## Architecture

Imports use the `@/` alias for `src/` (set in `tsconfig*.json` and `vite.config.ts`).

**Components**:

- `src/pages/` (`HomePage`, `EmentaPage`) only compose. `HomePage` is `Header` + `sections/*` (`Hero`, `About`, `MenuSection`, `Gallery`, `Contact`) + `Footer`.
- Shared pieces live in `src/components/`. Examples are `MenuList`, which both pages use, `SectionHeading` and `LanguageSwitcher`.
- `src/components/ui/` holds vendored components added with the shadcn CLI. Edit them freely (for example, the `Button` has a custom `cta` size). Don't reimplement what a shadcn primitive already does: the mobile nav is a `Sheet`, the language switcher is a `DropdownMenu`, and menu categories are `Card`s.

**UI libraries**: `components.json` registers shadcn/ui plus the `@magicui` (Magic UI, animations) and `@aceternity` (Aceternity UI, showpiece effects) registries. Add components with:

```bash
npx shadcn@latest add <name>             # shadcn/ui
npx shadcn@latest add @magicui/<name>     # Magic UI
npx shadcn@latest add @aceternity/<name>  # Aceternity UI
```

`cn()` comes from shadcn's `cn` package (re-exported in `src/lib/utils.ts`).

**Styling**: Tailwind only. Never write plain CSS rules, inline `style={{}}`, CSS modules or CSS-in-JS. `src/index.css` is the single CSS file. It holds:

- the Tailwind entry;
- the `@theme` tokens: `gold` (#D4AF37), `dark-brown` (#2C1810), `cream` (#F5F5DC), and the fonts Playfair Display (serif) and Lato (sans), loaded from Google Fonts in `index.html`;
- shadcn's CSS variables, mapped to that palette (`--primary` = gold, `--ring` = gold, `--accent` = cream).

There is no `tailwind.config.js` (Tailwind 4).

**i18n and data**: translated text comes from two separate places.

1. **UI strings** (nav, headings, buttons) live in `src/locales/{pt,en,es,fr,de}.json`. They are loaded statically in `src/i18n.ts` and read with `t()` from `useTranslation()`. Keys are type-checked against `pt.json` (`src/types/i18next.d.ts`), so a missing or misspelled key is a compile error. When you add a key, add it to all five files. The default and fallback language is `pt`. The list of languages is in `src/lib/languages.ts`.
2. **Restaurant content** (name, slogan, description, contact, hours, menu, images, social links) lives in `src/data/`, typed by `src/types/restaurante.ts`:
   - `restaurante.json` is the Portuguese source of truth.
   - `restaurante.<lang>.json` holds one full translated copy per language, with the same shape.
   - `src/hooks/useRestauranteData.ts` watches `i18n.language` and lazy-loads the matching file. Each import is type-checked against `Restaurante`. Pages and sections read every piece of content from this hook, never by importing the JSON directly.

Data details: `preco` is a number formatted per language with `formatPreco` (`src/lib/format.ts`, using each language's `locale` from `src/lib/languages.ts`); `horario` is a list of `{ dias, horas }`; an empty `redesSociais` URL hides that link; the footer year is computed. The chosen language is saved in `localStorage` (key `idioma`, wrapped in try/catch) and mirrored to `<html lang>` in `src/i18n.ts`.

**Translation script** (`scripts/translate.ts`, run with `tsx`): it machine-translates `restaurante.json` with the unofficial `@vitalets/google-translate-api`, which can be rate-limited or fail. It then overwrites the four language files.

- It rebuilds each output from an explicit list of top-level fields. If you add a new top-level field, you must also add it to the script.
- It skips the keys `preco`, `horas`, `telefone`, `email`, `codigoPostal` and `url`, plus strings that start with `http`, `@`, `#` or `+<digit>`.
- Running it overwrites any hand-edited translations. The current EN/ES/FR/DE files were reviewed by hand, so prefer editing them directly over re-running the script.

**Routes** (`src/App.tsx`): `/` is `HomePage`, and `/ementa` is `EmentaPage`, which shows only the menu.
