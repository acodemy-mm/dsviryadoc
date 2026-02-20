import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  /* Brand #002c76 in light, white in dark */
  primary: [
    'bg-[#002c76] text-white border border-[#002c76]',
    'hover:bg-[#011b47] hover:border-[#011b47]',
    'dark:bg-white dark:text-black dark:border-white/10',
    'dark:hover:bg-zinc-100',
    'focus-visible:ring-2 focus-visible:ring-[#002c76]/50 dark:focus-visible:ring-white/30',
  ].join(' '),
  secondary: [
    'bg-[#eef2f7] text-[#002c76] border border-[#c9d5e8]',
    'hover:bg-[#dce6f0] hover:border-[#b0c0d8]',
    'dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700',
    'dark:hover:bg-zinc-700',
  ].join(' '),
  ghost: [
    'bg-transparent text-[#3d5070] border border-transparent',
    'hover:text-[#002c76] hover:bg-[#eef2f7]',
    'dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800',
  ].join(' '),
  danger: [
    'bg-red-50 text-red-700 border border-red-200',
    'hover:bg-red-100 hover:border-red-300',
    'dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
    'dark:hover:bg-red-500/20',
  ].join(' '),
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';
