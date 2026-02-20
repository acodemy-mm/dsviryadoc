import Link from 'next/link';
import Image from 'next/image';
import { DSComponent } from '@/lib/types';
import { CategoryBadge } from '@/components/ui/Badge';
import { ImageIcon } from 'lucide-react';

interface ComponentCardProps {
  component: DSComponent;
}

export function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Link
      href={`/components/${component.slug}`}
      className="group flex flex-col rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-gray-300 dark:hover:border-zinc-600 transition-all duration-200 hover:shadow-md dark:hover:shadow-black/30"
    >
      <div className="relative aspect-video bg-gray-50 dark:bg-zinc-950 overflow-hidden flex items-center justify-center">
        {component.thumbnail_url ? (
          <Image
            src={component.thumbnail_url}
            alt={component.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300 dark:text-zinc-700">
            <ImageIcon className="w-8 h-8" />
            <span className="text-xs font-mono">No preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors leading-tight">
            {component.name}
          </h3>
          <CategoryBadge label={component.category} />
        </div>
        {component.description && (
          <p className="text-xs text-gray-500 dark:text-zinc-500 leading-relaxed line-clamp-2">{component.description}</p>
        )}
      </div>
    </Link>
  );
}
