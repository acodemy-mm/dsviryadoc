'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DSComponent, DSPage } from '@/lib/types';
import { CATEGORIES, cn } from '@/lib/utils';
import { PAGE_SECTIONS } from '@/lib/constants';
import { Layers, ChevronRight, Settings, Braces, BookOpen, FileText, Puzzle, Library } from 'lucide-react';
import { ThemeToggle, ThemeToggleCompact } from '@/components/ThemeToggle';
import { GlobalSearch } from '@/components/GlobalSearch';
import { SITE_VERSION } from '@/lib/constants';

const SECTION_ICONS: Record<string, React.ElementType> = {
  'Getting Started': BookOpen,
  Foundations: FileText,
  Patterns: Puzzle,
  Resources: Library,
};

interface SidebarNavProps {
  components: DSComponent[];
  pages: DSPage[];
  onNavigate?: () => void;
}

export function SidebarNav({ components, pages, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  const grouped = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = components.filter((c) => c.category === cat);
      return acc;
    },
    {} as Record<string, DSComponent[]>
  );

  const pagesBySection = PAGE_SECTIONS.reduce(
    (acc, section) => {
      acc[section] = pages.filter((p) => p.section === section);
      return acc;
    },
    {} as Record<string, DSPage[]>
  );

  const navItem = (href: string, label: string, badge?: string | number, icon?: React.ReactNode) => {
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href + '/'));
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className={cn(
          'flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150',
          isActive
            ? 'bg-[#002c76] text-white shadow-sm'
            : 'text-[#0a1628] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300 hover:bg-[#eef2f7] dark:hover:bg-zinc-900'
        )}
      >
        {icon}
        {label}
        {badge !== undefined && (
          <span className={cn('ml-auto text-[10px] font-mono', isActive ? 'text-blue-200' : 'text-[#4d6179] dark:text-zinc-600')}>
            {badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      <div className="px-4 py-5 border-b border-[#c9d5e8] dark:border-zinc-800">
        <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#002c76] flex items-center justify-center shadow-sm shrink-0">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-[#002c76] dark:text-zinc-100 leading-tight block tracking-tight">Virya</span>
            <span className="text-[10px] text-[#0a1628] dark:text-zinc-600 leading-none font-medium">Design System</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItem('/tokens', 'Design Tokens', undefined, <Braces className="w-3.5 h-3.5 shrink-0" />)}
        {navItem('/components', 'All Components', components.length)}

        {PAGE_SECTIONS.map((section) => {
          const items = pagesBySection[section];
          if (!items.length) return null;
          const SectionIcon = SECTION_ICONS[section] ?? FileText;
          return (
            <div key={section} className="pt-3">
              <p className="px-2.5 pb-1 text-[10px] font-bold uppercase tracking-widest text-[#0a1628] dark:text-zinc-700 flex items-center gap-1.5">
                <SectionIcon className="w-3 h-3" />
                {section}
              </p>
              <div className="space-y-0.5">
                {items.map((page) => {
                  const href = `/docs/${page.slug}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={page.id}
                      href={href}
                      onClick={onNavigate}
                      className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all duration-150',
                        isActive
                          ? 'bg-[#002c76] text-white font-medium shadow-sm'
                          : 'text-[#0a1628] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300 hover:bg-[#eef2f7] dark:hover:bg-zinc-900'
                      )}
                    >
                      {isActive && <ChevronRight className="w-3 h-3 shrink-0" />}
                      <span className={isActive ? '' : 'pl-[18px]'}>{page.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="pt-3 pb-1">
          <p className="px-2.5 text-[10px] font-bold uppercase tracking-widest text-[#0a1628] dark:text-zinc-700">Components</p>
        </div>

        {CATEGORIES.map((category) => {
          const items = grouped[category];
          if (items.length === 0) return null;
          return (
            <div key={category} className="mb-2">
              <p className="px-2.5 mb-0.5 mt-2 text-[10px] font-bold uppercase tracking-widest text-[#0a1628] dark:text-zinc-600">
                {category}
              </p>
              <div className="space-y-0.5">
                {items.map((component) => {
                  const isActive = pathname === `/components/${component.slug}`;
                  return (
                    <Link
                      key={component.id}
                      href={`/components/${component.slug}`}
                      onClick={onNavigate}
                      prefetch
                      className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all duration-150',
                        isActive
                          ? 'bg-[#002c76] text-white font-medium shadow-sm'
                          : 'text-[#0a1628] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300 hover:bg-[#eef2f7] dark:hover:bg-zinc-900'
                      )}
                    >
                      {isActive && <ChevronRight className="w-3 h-3 shrink-0" />}
                      <span className={isActive ? '' : 'pl-[18px]'}>{component.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="pt-3">
          {navItem('/changelog', 'Changelog')}
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-[#c9d5e8] dark:border-zinc-800 space-y-2">
        <p className="px-2.5 text-[10px] font-mono text-[#4d6179] dark:text-zinc-600">v{SITE_VERSION}</p>
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-[#0a1628] dark:text-zinc-600 hover:text-[#002c76] dark:hover:text-zinc-400 hover:bg-[#eef2f7] dark:hover:bg-zinc-900 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          Admin
        </Link>
      </div>
    </>
  );
}

interface DocsShellProps {
  components: DSComponent[];
  pages: DSPage[];
  children: React.ReactNode;
}

export function DocsShell({ components, pages, children }: DocsShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-[#c9d5e8] dark:border-zinc-800 bg-[#f8fafc] dark:bg-zinc-950 h-screen sticky top-0">
        <SidebarNav components={components} pages={pages} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 max-w-[85vw] h-full flex flex-col bg-[#f8fafc] dark:bg-zinc-950 border-r border-[#c9d5e8] dark:border-zinc-800">
            <SidebarNav components={components} pages={pages} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b border-[#c9d5e8] dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm md:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col gap-1 w-8 h-8 items-center justify-center rounded-md border border-[#c9d5e8] dark:border-zinc-700"
            aria-label="Open menu"
          >
            <span className="w-4 h-0.5 bg-[#0a1628] dark:bg-zinc-300" />
            <span className="w-4 h-0.5 bg-[#0a1628] dark:bg-zinc-300" />
            <span className="w-4 h-0.5 bg-[#0a1628] dark:bg-zinc-300" />
          </button>
          <div className="flex-1" />
          <GlobalSearch components={components} pages={pages} />
          <ThemeToggle className="hidden sm:flex" />
          <ThemeToggleCompact className="sm:hidden" />
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
