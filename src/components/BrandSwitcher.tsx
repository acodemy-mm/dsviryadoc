'use client';

import { useEffect, useState } from 'react';
import { ALL_BRANDS, BRAND_META, type Brand } from '@/lib/design-tokens';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'virya-brand';

export function BrandSwitcher({ className }: { className?: string }) {
  const [brand, setBrand] = useState<Brand>('kbz-bank');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Brand | null;
    const initial = stored && ALL_BRANDS.includes(stored) ? stored : 'kbz-bank';
    setBrand(initial);
    document.documentElement.setAttribute('data-brand', initial);
  }, []);

  const select = (next: Brand) => {
    setBrand(next);
    document.documentElement.setAttribute('data-brand', next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {ALL_BRANDS.map((b) => {
        const meta = BRAND_META[b];
        const active = brand === b;
        return (
          <button
            key={b}
            type="button"
            onClick={() => select(b)}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
              active
                ? 'bg-[#002c76] text-white border-[#002c76] shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-[#3d5070] dark:text-zinc-400 border-[#c9d5e8] dark:border-zinc-700 hover:border-[#002c76]/40'
            )}
          >
            <span className="flex gap-0.5">
              <span className="w-3 h-3 rounded-full border border-black/10" style={{ background: meta.primaryHex }} />
              <span className="w-3 h-3 rounded-full border border-black/10" style={{ background: meta.secondaryHex }} />
            </span>
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
