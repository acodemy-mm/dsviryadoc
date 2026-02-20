'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const THEMES = [
  { value: 'light',  label: 'Light',  icon: Sun },
  { value: 'dark',   label: 'Dark',   icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-8 w-24 rounded-lg bg-[#dce6f0] dark:bg-zinc-800 animate-pulse" />;

  return (
    <div className={cn(
      'flex items-center gap-0.5 p-0.5 rounded-lg',
      'bg-[#dce6f0] dark:bg-zinc-800 border border-[#c9d5e8] dark:border-zinc-700',
      className
    )}>
      {THEMES.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            title={label}
            className={cn(
              'flex items-center justify-center w-7 h-7 rounded-md transition-all duration-150',
              isActive
                ? 'bg-[#002c76] text-white shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                : 'text-[#6b82a0] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300 hover:bg-[#eef2f7] dark:hover:bg-zinc-700'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
}

export function ThemeToggleCompact({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8 rounded-md bg-[#dce6f0] dark:bg-zinc-800 animate-pulse" />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-150',
        'bg-[#dce6f0] dark:bg-zinc-800 border border-[#c9d5e8] dark:border-zinc-700',
        'text-[#3d5070] dark:text-zinc-400',
        'hover:bg-[#002c76] hover:text-white hover:border-[#002c76]',
        'dark:hover:bg-zinc-700 dark:hover:text-zinc-200',
        className
      )}
    >
      {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
    </button>
  );
}
