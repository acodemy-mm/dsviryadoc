'use client';

import { useState, useTransition } from 'react';
import { deleteComponent } from '@/lib/actions';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteButtonProps {
  id: string;
  name: string;
}

export function DeleteButton({ id, name }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    startTransition(async () => {
      await deleteComponent(id);
      setConfirming(false);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`p-1.5 rounded transition-colors ${
        confirming
          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
          : 'text-zinc-600 hover:text-red-400 hover:bg-red-500/10'
      } disabled:opacity-50`}
      title={confirming ? `Click again to delete "${name}"` : 'Delete'}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
