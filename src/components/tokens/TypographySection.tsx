'use client';

import { useState } from 'react';
import { TYPOGRAPHY_GROUPS, TYPOGRAPHY_GROUPS_MM } from '@/lib/design-tokens';
import { cn } from '@/lib/utils';

export function TypographySection() {
  const [locale, setLocale] = useState<'latin' | 'mm'>('latin');
  const groups = locale === 'latin' ? TYPOGRAPHY_GROUPS : TYPOGRAPHY_GROUPS_MM;

  return (
    <section className="mb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#0a1628] dark:text-zinc-100">Typography</h2>
          <p className="text-sm text-[#6b82a0] dark:text-zinc-500 mt-1">Font size and line height in px</p>
        </div>
        <div className="flex gap-1 p-0.5 rounded-lg bg-[#eef2f7] dark:bg-zinc-800 border border-[#c9d5e8] dark:border-zinc-700">
          {(['latin', 'mm'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                locale === l
                  ? 'bg-[#002c76] text-white'
                  : 'text-[#6b82a0] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300'
              )}
            >
              {l === 'latin' ? 'Latin' : 'MM (Myanmar)'}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
        <div className="divide-y divide-[#c9d5e8] dark:divide-zinc-800">
          {groups.map((group) => (
            <div key={group.label} className="p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6b82a0] dark:text-zinc-500 mb-3">{group.label}</h3>
              <div className="space-y-4">
                {group.tokens.map((t) => (
                  <div key={t.name} className="flex flex-wrap items-baseline gap-4">
                    <span className="text-sm font-medium text-[#3d5070] dark:text-zinc-400 w-24 shrink-0">{t.name}</span>
                    <span
                      className="text-[#0a1628] dark:text-zinc-100"
                      style={{ fontSize: `${t.fontSize}px`, lineHeight: `${t.lineHeight}px` }}
                    >
                      {locale === 'mm' ? 'မြန်မာစာ နမူနာ' : 'The quick brown fox'}
                    </span>
                    <code className="text-xs font-mono text-[#6b82a0] dark:text-zinc-500 ml-auto">
                      {t.fontSize}px / {t.lineHeight}px
                    </code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
