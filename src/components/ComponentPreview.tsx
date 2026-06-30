'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getRegistryEntry } from '@/components/registry';
import type { PreviewConfig } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ComponentPreviewProps {
  slug: string;
  name: string;
  previewProps?: PreviewConfig | null;
  thumbnailUrl?: string | null;
  className?: string;
}

export function ComponentPreview({
  slug,
  name,
  previewProps,
  thumbnailUrl,
  className,
}: ComponentPreviewProps) {
  const entry = getRegistryEntry(slug);
  const config = previewProps ?? entry?.defaultPreview;
  const variants = config?.variants ?? [];
  const [activeKey, setActiveKey] = useState(variants[0]?.key ?? 'default');

  const activeVariant = variants.find((v) => v.key === activeKey);
  const props = activeVariant?.props ?? config?.defaultProps ?? {};

  if (entry) {
    const Component = entry.component;
    return (
      <div className={cn('rounded-xl border border-[#c9d5e8] dark:border-zinc-800 overflow-hidden', className)}>
        {variants.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 py-3 border-b border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-950/50">
            {variants.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => setActiveKey(v.key)}
                className={cn(
                  'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                  activeKey === v.key
                    ? 'bg-[#002c76] text-white'
                    : 'text-[#3d5070] dark:text-zinc-500 hover:bg-[#eef2f7] dark:hover:bg-zinc-900'
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center min-h-[160px] p-8 bg-white dark:bg-zinc-900">
          <Component {...props} />
        </div>
      </div>
    );
  }

  if (thumbnailUrl) {
    return (
      <div className={cn('relative aspect-video rounded-xl border border-[#c9d5e8] dark:border-zinc-800 overflow-hidden bg-[#f8fafc] dark:bg-zinc-950', className)}>
        <Image src={thumbnailUrl} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[160px] rounded-xl border border-dashed border-[#c9d5e8] dark:border-zinc-800 bg-[#f8fafc] dark:bg-zinc-950 text-[#9db0c8] dark:text-zinc-600', className)}>
      <ImageIcon className="w-8 h-8 mb-2" />
      <p className="text-xs">No live preview available for this component</p>
    </div>
  );
}
