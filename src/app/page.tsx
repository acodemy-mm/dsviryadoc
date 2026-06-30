import Link from 'next/link';
import { Layers, ArrowRight, Braces, BookOpen, Component } from 'lucide-react';
import { ThemeToggleCompact } from '@/components/ThemeToggle';
import { SITE_VERSION } from '@/lib/constants';

const QUICK_LINKS = [
  { href: '/docs/introduction', label: 'Getting Started', icon: BookOpen, description: 'Learn the principles and audience for Virya' },
  { href: '/components', label: 'Components', icon: Component, description: 'Browse the component gallery with live previews' },
  { href: '/tokens', label: 'Design Tokens', icon: Braces, description: 'Colors, typography, spacing, and elevation' },
];

const BRANDS = [
  { name: 'KBZ Bank', color: '#002c76' },
  { name: 'KBZ Pay', color: '#0054a6' },
  { name: 'Premium Bank', color: '#1d2d49' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f0f4fa] dark:bg-zinc-950">
      <header className="border-b border-[#c9d5e8] dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#002c76] flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#002c76] dark:text-zinc-100 block leading-tight">Virya</span>
              <span className="text-[10px] text-[#6b82a0] dark:text-zinc-600">Design System</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[10px] font-mono text-[#9db0c8] dark:text-zinc-600">v{SITE_VERSION}</span>
            <ThemeToggleCompact />
            <Link href="/admin/login" className="text-xs text-[#6b82a0] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300">
              Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#002c76] dark:text-[#1464eb] mb-4">
            KBZ Bank Design Language
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a1628] dark:text-zinc-100 tracking-tight leading-tight mb-6">
            Build consistent, accessible products with Virya
          </h1>
          <p className="text-lg text-[#3d5070] dark:text-zinc-400 leading-relaxed mb-8">
            Virya is the shared design system for KBZ Bank, KBZ Pay, and Premium Bank — tokens, components, patterns, and guidelines in one place.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/docs/introduction"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#002c76] text-white text-sm font-medium hover:bg-[#011b47] transition-colors"
            >
              Get started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/components"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#c9d5e8] dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[#002c76] dark:text-zinc-200 text-sm font-medium hover:bg-[#eef2f7] dark:hover:bg-zinc-800 transition-colors"
            >
              Browse components
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {QUICK_LINKS.map(({ href, label, icon: Icon, description }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-[#002c76]/30 hover:shadow-md transition-all"
            >
              <Icon className="w-5 h-5 text-[#002c76] dark:text-[#1464eb] mb-3" />
              <h2 className="text-sm font-semibold text-[#0a1628] dark:text-zinc-100 mb-1 group-hover:text-[#002c76] dark:group-hover:text-[#1464eb] transition-colors">
                {label}
              </h2>
              <p className="text-xs text-[#6b82a0] dark:text-zinc-500 leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>

        <section className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
          <h2 className="text-sm font-semibold text-[#0a1628] dark:text-zinc-100 mb-4">Multi-brand support</h2>
          <p className="text-sm text-[#3d5070] dark:text-zinc-400 mb-5">
            Switch brands via <code className="text-xs bg-[#eef2f7] dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">data-brand</code> on the document root. Each brand has its own color palette and typeface.
          </p>
          <div className="flex flex-wrap gap-4">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-black/10" style={{ background: brand.color }} />
                <span className="text-sm text-[#0a1628] dark:text-zinc-300">{brand.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-black/10 bg-[#666]" />
              <span className="text-sm text-[#0a1628] dark:text-zinc-300">MM locale typography</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
