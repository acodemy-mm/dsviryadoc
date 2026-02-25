'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { reorderComponent } from '@/lib/actions';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';

interface ReorderButtonsProps {
  id: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export function ReorderButtons({ id, canMoveUp, canMoveDown }: ReorderButtonsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handle = (direction: 'up' | 'down') => {
    startTransition(async () => {
      await reorderComponent(id, direction);
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        onClick={() => handle('up')}
        disabled={!canMoveUp || isPending}
        className="p-1 rounded text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        title="Move up"
      >
        {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
      <button
        type="button"
        onClick={() => handle('down')}
        disabled={!canMoveDown || isPending}
        className="p-1 rounded text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        title="Move down"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
