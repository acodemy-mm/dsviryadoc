import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const CATEGORIES = ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'] as const;

/* Category badge colors — readable in both light and dark mode */
export const CATEGORY_COLORS: Record<string, string> = {
  Atoms:     'bg-blue-100  text-blue-700  border-blue-200  dark:bg-[#1464eb]/10  dark:text-[#1464eb]  dark:border-[#1464eb]/20',
  Molecules: 'bg-blue-100    text-blue-700    border-blue-200    dark:bg-blue-500/10    dark:text-blue-400    dark:border-blue-500/20',
  Organisms: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
  Templates: 'bg-amber-100   text-amber-700   border-amber-200   dark:bg-amber-500/10   dark:text-amber-400   dark:border-amber-500/20',
  Pages:     'bg-rose-100    text-rose-700    border-rose-200    dark:bg-rose-500/10    dark:text-rose-400    dark:border-rose-500/20',
};
