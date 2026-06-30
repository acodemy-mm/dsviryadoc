import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-[#6b82a0] dark:text-zinc-500 mb-6">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-[#002c76] dark:hover:text-zinc-300 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-[#0a1628] dark:text-zinc-300 font-medium' : undefined}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
