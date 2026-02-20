# Design System Documentation

A full-stack design system documentation website built with **Next.js 16**, **Tailwind CSS v4**, and **Supabase**.

## Features

- **Component Gallery** — Grid view with real-time search and category filtering
- **Sidebar Navigation** — Components grouped by category (Atoms → Pages)
- **Detail Pages** — Visual preview, markdown usage docs, and syntax-highlighted code playground
- **Copy to Clipboard** — One-click code copy with animated feedback
- **Admin Dashboard** — CRUD for all components, protected by Supabase Auth
- **Image Uploads** — Thumbnail upload to Supabase Storage
- **Linear/Vercel Aesthetic** — Dark theme, sharp borders, high contrast

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

## Getting Started

### 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Create a user in **Authentication → Users** for admin access

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

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

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── layout.tsx          # Sidebar layout
│   │   ├── page.tsx            # Component gallery
│   │   └── [slug]/page.tsx     # Component detail
│   ├── admin/
│   │   ├── login/page.tsx      # Auth page
│   │   └── dashboard/
│   │       ├── page.tsx        # Admin table
│   │       ├── new/page.tsx    # Create form
│   │       └── [id]/edit/      # Edit form
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/                     # Base UI primitives
│   ├── Sidebar.tsx
│   ├── SearchBar.tsx           # Gallery with search/filter
│   ├── ComponentCard.tsx
│   ├── ComponentForm.tsx       # Admin create/edit form
│   ├── CodeBlock.tsx           # Syntax highlighted code
│   ├── CopyButton.tsx
│   ├── MarkdownRenderer.tsx
│   ├── AdminNav.tsx
│   └── DeleteButton.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server & service clients
│   ├── actions.ts              # Server Actions (CRUD)
│   ├── types.ts
│   └── utils.ts
└── proxy.ts                    # Auth middleware (Next.js 16)
```

## Database Schema

```sql
CREATE TABLE ds_components (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  category      TEXT NOT NULL,  -- Atoms | Molecules | Organisms | Templates | Pages
  description   TEXT,
  usage_markdown TEXT,          -- Markdown content for "When to use" section
  code          TEXT,           -- Source code for playground
  thumbnail_url TEXT,           -- URL to Supabase Storage image
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

## Routes

| Route | Description |
|---|---|
| `/` | Redirects to `/components` |
| `/components` | Public gallery with search |
| `/components/[slug]` | Component detail page |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Component management table |
| `/admin/dashboard/new` | Create new component |
| `/admin/dashboard/[id]/edit` | Edit existing component |
