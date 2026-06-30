'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Component, BookOpen, Braces } from 'lucide-react';
import type { DSComponent, DSPage } from '@/lib/types';
import { buildSearchIndex, filterSearchIndex, type SearchResult } from '@/lib/search-index';
import { cn } from '@/lib/utils';

const GROUP_ICONS = {
  Components: Component,
  Docs: BookOpen,
  Tokens: Braces,
};

interface GlobalSearchProps {
  components: DSComponent[];
  pages: DSPage[];
}

export function GlobalSearch({ components, pages }: GlobalSearchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const index = useMemo(() => buildSearchIndex(components, pages), [components, pages]);
  const results = useMemo(() => filterSearchIndex(index, query), [index, query]);

  const navigate = useCallback(
    (item: SearchResult) => {
      setOpen(false);
      setQuery('');
      router.push(item.href);
    },
    [router]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        navigate(results[activeIndex]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, results, activeIndex, navigate]);

  useEffect(() => setActiveIndex(0), [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#c9d5e8] dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-[#6b82a0] dark:text-zinc-500 hover:border-[#002c76]/30 transition-colors"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="hidden md:inline ml-2 px-1.5 py-0.5 rounded bg-[#eef2f7] dark:bg-zinc-800 text-[10px] font-mono">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg rounded-xl border border-[#c9d5e8] dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 border-b border-[#c9d5e8] dark:border-zinc-800">
              <Search className="w-4 h-4 text-[#9db0c8] shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components, docs, tokens…"
                className="flex-1 py-3 text-sm bg-transparent outline-none text-[#0a1628] dark:text-zinc-100 placeholder:text-[#9db0c8]"
              />
              <button type="button" onClick={() => setOpen(false)} className="text-[#9db0c8] hover:text-[#0a1628] dark:hover:text-zinc-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-[#6b82a0] dark:text-zinc-500">No results</li>
              ) : (
                results.map((item, i) => {
                  const Icon = GROUP_ICONS[item.group];
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => navigate(item)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                          i === activeIndex ? 'bg-[#eef2f7] dark:bg-zinc-800' : 'hover:bg-[#f8fafc] dark:hover:bg-zinc-800/50'
                        )}
                      >
                        <Icon className="w-4 h-4 text-[#002c76] dark:text-[#1464eb] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#0a1628] dark:text-zinc-100 truncate">{item.title}</p>
                          {item.subtitle && (
                            <p className="text-xs text-[#6b82a0] dark:text-zinc-500 truncate">{item.subtitle}</p>
                          )}
                        </div>
                        <span className="ml-auto text-[10px] text-[#9db0c8] dark:text-zinc-600 shrink-0">{item.group}</span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
