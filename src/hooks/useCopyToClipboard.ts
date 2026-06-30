'use client';

import { useCallback, useState } from 'react';

export function useCopyToClipboard(resetMs = 1800) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(
    async (value: string) => {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), resetMs);
    },
    [resetMs]
  );

  return { copied, copy };
}
