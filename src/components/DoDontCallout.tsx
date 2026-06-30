import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isValidElement, type ReactNode } from 'react';

export function DoCallout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex gap-3 rounded-lg border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 p-4 mb-4', className)}>
      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
      <div className="text-sm text-emerald-900 dark:text-emerald-200 [&>p]:mb-0">{children}</div>
    </div>
  );
}

export function DontCallout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex gap-3 rounded-lg border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 p-4 mb-4', className)}>
      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
      <div className="text-sm text-red-900 dark:text-red-200 [&>p]:mb-0">{children}</div>
    </div>
  );
}

function getPlainText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getPlainText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return getPlainText(node.props.children);
  return '';
}

export function resolveBlockquoteVariant(children: React.ReactNode): 'do' | 'dont' | null {
  const text = getPlainText(children).trim();
  if (/^(\*\*)?Do(\*\*)?:/i.test(text) || /^(\*\*)?Do(\*\*)?\s/i.test(text)) return 'do';
  if (/^(\*\*)?Don'?t(\*\*)?:/i.test(text) || /^(\*\*)?Don'?t(\*\*)?\s/i.test(text)) return 'dont';
  return null;
}

export function stripCalloutLabel(children: React.ReactNode): React.ReactNode {
  const text = getPlainText(children).trim();
  const cleaned = text.replace(/^(\*\*)?(Do|Don'?t)(\*\*)?:?\s*/i, '');
  if (cleaned === text) return children;
  return cleaned;
}
