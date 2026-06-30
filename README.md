# Virya Design System Documentation

A full-stack design system documentation website for **KBZ Bank**, **KBZ Pay**, and **Premium Bank** — built with **Next.js 16**, **Tailwind CSS v4**, and **Supabase**.

## Features

### Public documentation
- **Landing page** — Hero, quick links, multi-brand overview, version badge
- **Getting Started & Foundations** — Markdown docs at `/docs/[slug]` (Introduction, For Designers, Accessibility, Icons, etc.)
- **Component gallery** — Search, category filters, live previews on detail pages
- **Design tokens** — Brand switcher, copy-to-clipboard swatches, Latin + MM typography tabs
- **Global search** — `⌘K` command palette across components, docs, and tokens
- **Changelog** — `/changelog` rendered from `CHANGELOG.md`
- **Mobile navigation** — Collapsible sidebar drawer

### Component detail pages
- **Tabs:** Preview | Usage | Props | Code | Accessibility
- **Live preview** — Interactive registry components with variant controls
- **Breadcrumbs** + sticky table of contents
- **Open in Figma** — Per-component Figma library links

### Admin
- CRUD for components (Supabase CMS)
- Props JSON, preview props, accessibility markdown, Figma URL fields
- Image upload to Supabase Storage
- Drag-and-drop reorder

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Syntax Highlighting | react-syntax-highlighter |
| Markdown | react-markdown + remark-gfm |
| Icons | lucide-react |
| Theming | next-themes |

## Getting Started

### 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run **`supabase-schema.sql`** in the SQL Editor (fresh install)
3. If upgrading an existing database, also run **`supabase-migration-v2.sql`**
4. Create a user in **Authentication → Users** for admin access

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=admin@example.com
```

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run sync:tokens` | Copy token export from companion Figma project |

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/docs/[slug]` | Getting Started, Foundations, Patterns, Resources |
| `/components` | Component gallery |
| `/components/[slug]` | Component detail with live preview |
| `/tokens` | Design tokens reference |
| `/changelog` | Release history |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Component management |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── docs/[slug]/             # Static documentation pages
│   ├── components/              # Gallery + detail
│   ├── tokens/                  # Token reference
│   ├── changelog/               # Changelog
│   └── admin/                   # CMS
├── components/
│   ├── registry/                # Slug → React component map
│   ├── DocsShell.tsx            # Sidebar + mobile drawer + search
│   ├── ComponentPreview.tsx     # Live preview panel
│   ├── GlobalSearch.tsx         # ⌘K palette
│   └── tokens/                  # Token UI sections
└── lib/
    ├── design-tokens.ts         # Token definitions
    ├── pages-seed.ts            # Fallback doc content (no Supabase)
    └── components-data.ts       # Cached Supabase queries
```

## Token sync

To sync tokens from the companion Figma/Storybook project:

```bash
npm run sync:tokens
```

A GitHub Action (`.github/workflows/sync-tokens.yml`) runs weekly and on manual dispatch.

## Deployment

See [DEPLOY.md](./DEPLOY.md) for Vercel setup and CI.
