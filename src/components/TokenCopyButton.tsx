'use client';

import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { cn } from '@/lib/utils';

interface TokenCopyButtonProps {
  name: string;
  value: string;
  className?: string;
}

export function TokenCopyButton({ name, value, className }: TokenCopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  const tokenValue = `--${name}: ${value}`;
  const isCopied = copied === tokenValue;

  return (
    <button
      type="button"
      onClick={() => copy(tokenValue)}
      title={`Copy ${tokenValue}`}
      className={cn(
        'group flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-all',
        'border-[#c9d5e8] dark:border-zinc-800 bg-[#f8fafc] dark:bg-zinc-950/30',
        'hover:border-[#002c76]/40 hover:bg-[#eef2f7] dark:hover:bg-zinc-900',
        className
      )}
    >
      <code className="text-xs font-mono text-[#0a1628] dark:text-zinc-300 truncate">{name}</code>
      <span className="flex items-center gap-1.5 shrink-0">
        <span className="text-xs font-mono text-[#6b82a0] dark:text-zinc-500">{value}</span>
        {isCopied ? (
          <Check className="w-3.5 h-3.5 text-[#002c76] dark:text-[#1464eb]" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-[#9db0c8] dark:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </span>
    </button>
  );
}
