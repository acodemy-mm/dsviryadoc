'use client';

import { HeadingItem } from '@/lib/headings';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: HeadingItem[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={cn('sticky top-24', className)}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9db0c8] dark:text-zinc-600 mb-3">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-[#c9d5e8] dark:border-zinc-800">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                'block text-xs text-[#6b82a0] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300 transition-colors border-l-2 -ml-px pl-3',
                h.level === 3 && 'pl-5',
                'border-transparent hover:border-[#002c76]/50'
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
