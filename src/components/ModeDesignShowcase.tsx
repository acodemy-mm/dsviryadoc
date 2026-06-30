'use client';

import { useTheme } from 'next-themes';
import { Moon, ShieldCheck, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ModeDesignShowcase() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <section className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-sm font-semibold text-[#0a1628] dark:text-zinc-100">Light & dark interface</h2>
          <p className="text-sm text-[#4d6179] dark:text-zinc-400 mt-1">
            Switch between accessible light and dark surfaces designed for clear reading, navigation, and component review.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors',
              resolvedTheme === 'light'
                ? 'bg-[#002c76] text-white border-[#002c76]'
                : 'bg-white dark:bg-zinc-900 text-[#3d5070] dark:text-zinc-400 border-[#c9d5e8] dark:border-zinc-700 hover:bg-[#eef2f7] dark:hover:bg-zinc-800'
            )}
          >
            <Sun className="w-3.5 h-3.5" />
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors',
              resolvedTheme === 'dark'
                ? 'bg-[#4d8af0] text-zinc-950 border-[#4d8af0]'
                : 'bg-white dark:bg-zinc-900 text-[#3d5070] dark:text-zinc-400 border-[#c9d5e8] dark:border-zinc-700 hover:bg-[#eef2f7] dark:hover:bg-zinc-800'
            )}
          >
            <Moon className="w-3.5 h-3.5" />
            Dark
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="rounded-lg border border-[#c9d5e8] bg-[#f8fafc] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#4d6179]">Light mode</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#002c76]" />
          </div>
          <div className="rounded-md border border-[#dce6f0] bg-white p-3 space-y-2">
            <div className="h-2.5 w-1/2 bg-[#0a1628]/10 rounded" />
            <div className="h-2.5 w-4/5 bg-[#0a1628]/10 rounded" />
            <div className="flex gap-2 pt-1">
              <div className="h-7 w-20 rounded bg-[#002c76]" />
              <div className="h-7 w-20 rounded border border-[#c9d5e8] bg-white" />
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Dark mode</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4d8af0]" />
          </div>
          <div className="rounded-md border border-zinc-700 bg-zinc-950 p-3 space-y-2">
            <div className="h-2.5 w-1/2 bg-zinc-400/25 rounded" />
            <div className="h-2.5 w-4/5 bg-zinc-400/25 rounded" />
            <div className="flex gap-2 pt-1">
              <div className="h-7 w-20 rounded bg-[#4d8af0]" />
              <div className="h-7 w-20 rounded border border-zinc-700 bg-zinc-900" />
            </div>
          </div>
        </article>
      </div>

      <p className="mt-4 text-xs text-[#4d6179] dark:text-zinc-400 inline-flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#002c76] dark:text-[#4d8af0]" />
        Light muted text is darkened for AA contrast; dark mode uses raised zinc surfaces and readable blue accents.
      </p>
    </section>
  );
}
