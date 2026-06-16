# AstroBP — Astro + React + shadcn/ui Boilerplate

Production-ready boilerplate with SSR auth, blog, and dashboard, built on **Astro 6**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui New York**.

## Stack

| Layer      | Tech                                                          |
| ---------- | ------------------------------------------------------------- |
| Framework  | [Astro](https://astro.build) 6 (SSR via `@astrojs/node`)      |
| UI Library | [React](https://react.dev) 19 islands                         |
| Styling    | [Tailwind CSS](https://tailwindcss.com) v4 + `tw-animate-css` |
| Components | [shadcn/ui](https://ui.shadcn.com) (New York style)           |
| Auth       | httpOnly cookie-based, [DummyJSON](https://dummyjson.com) API |
| Forms      | React Hook Form + Zod validation + Astro Actions              |
| Icons      | [Lucide React](https://lucide.dev)                            |
| Linting    | ESLint 9 + Prettier + TypeScript strict                       |

## Features

- **Auth** — Login/logout with httpOnly cookies, middleware-protected dashboard
- **Blog** — SSR blog listing + detail pages from external API
- **Dashboard** — Protected dashboard with shadcn collapsible sidebar
- **SEO** — OG/Twitter/JSON-LD meta, canonical URLs, sitemap, robots.txt
- **Dark Mode** — System-preference + manual toggle with localStorage persistence
- **Responsive** — Mobile sheet sidebar, responsive layout via shadcn

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

### Login

| Username | Password     |
| -------- | ------------ |
| `emilys` | `emilyspass` |

## Project Structure

```
src/
├── actions/          # Astro Actions (login, logout)
├── components/
│   ├── dashboard/    # DashboardSidebar (React island)
│   ├── forms/        # LoginForm (React Hook Form)
│   ├── shared/       # Header, Footer, ThemeToggle, LogoutButton
│   └── ui/           # shadcn/ui components (button, card, input, sidebar, etc.)
├── hooks/            # use-theme, use-mobile, useAuth
├── layouts/          # BaseLayout (SEO + shell), AuthLayout
├── lib/              # Utilities, API client, auth helpers, schemas, SEO config
├── pages/            # Routes: /, /login, /blog, /dashboard, /api/*
│   ├── api/          # API routes (logout, robots.txt, sitemap)
│   ├── blog/         # Blog listing + [slug]
│   └── dashboard/    # Protected dashboard
└── styles/           # globals.css (Tailwind v4 + OKLCH theme variables)
```

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable      | Description           | Default                 |
| ------------- | --------------------- | ----------------------- |
| `PUBLIC_SITE` | Public site URL       | `http://localhost:4321` |
| `API_URL`     | External API base URL | `https://dummyjson.com` |

## Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `pnpm dev`          | Start dev server               |
| `pnpm build`        | Production build               |
| `pnpm preview`      | Preview production build       |
| `pnpm lint`         | Run ESLint                     |
| `pnpm lint:fix`     | Run ESLint with auto-fix       |
| `pnpm format`       | Format with Prettier           |
| `pnpm format:check` | Check formatting with Prettier |
| `pnpm typecheck`    | Run Astro type checking        |
| `pnpm clean`        | Remove dist and .astro cache   |

## Deployment

Built for `@astrojs/node` (standalone mode). Deploy to any Node.js host:

```bash
pnpm build
node dist/server/entry.mjs
```

Requires Node.js >= 22.12.
