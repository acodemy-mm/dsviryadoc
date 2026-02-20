import { cn, CATEGORY_COLORS } from '@/lib/utils';

interface BadgeProps {
  label: string;
  className?: string;
}

export function CategoryBadge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        CATEGORY_COLORS[label] ?? 'bg-zinc-800 text-zinc-400 border-zinc-700',
        className
      )}
    >
      {label}
    </span>
  );
}
