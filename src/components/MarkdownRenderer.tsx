import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slugify } from '@/lib/utils';
import { DoCallout, DontCallout, resolveBlockquoteVariant, stripCalloutLabel } from '@/components/DoDontCallout';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  withHeadingIds?: boolean;
}

function headingId(text: React.ReactNode): string {
  return slugify(String(text).replace(/\*\*/g, ''));
}

export function MarkdownRenderer({ content, className, withHeadingIds }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm max-w-none ${className ?? ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              id={withHeadingIds ? headingId(children) : undefined}
              className="text-xl font-semibold text-[#0a1628] dark:text-zinc-100 mb-4 mt-6 first:mt-0"
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              id={withHeadingIds ? headingId(children) : undefined}
              className="text-lg font-semibold text-[#0a1628] dark:text-zinc-100 mb-3 mt-5 first:mt-0 scroll-mt-24"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={withHeadingIds ? headingId(children) : undefined}
              className="text-base font-semibold text-[#0a1628] dark:text-zinc-200 mb-2 mt-4 first:mt-0 scroll-mt-24"
            >
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="text-[#3d5070] dark:text-zinc-400 leading-relaxed mb-3">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside space-y-1.5 mb-3 text-[#3d5070] dark:text-zinc-400">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-1.5 mb-3 text-[#3d5070] dark:text-zinc-400">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          code: ({ children, className: codeClassName }) => {
            const isInline = !codeClassName;
            return isInline ? (
              <code className="bg-[#eef2f7] dark:bg-zinc-800 text-[#002c76] dark:text-[#1464eb] px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
            ) : (
              <code className="block bg-[#f8fafc] dark:bg-zinc-900 border border-[#c9d5e8] dark:border-zinc-800 rounded-md p-4 text-sm font-mono text-[#3d5070] dark:text-zinc-300 overflow-x-auto">{children}</code>
            );
          },
          pre: ({ children }) => <pre className="not-prose mb-4">{children}</pre>,
          blockquote: ({ children }) => {
            const variant = resolveBlockquoteVariant(children);
            if (variant === 'do') return <DoCallout>{stripCalloutLabel(children)}</DoCallout>;
            if (variant === 'dont') return <DontCallout>{stripCalloutLabel(children)}</DontCallout>;
            return (
              <blockquote className="border-l-2 border-[#c9d5e8] dark:border-zinc-700 pl-4 text-[#6b82a0] dark:text-zinc-500 italic mb-3">
                {children}
              </blockquote>
            );
          },
          strong: ({ children }) => <strong className="text-[#0a1628] dark:text-zinc-200 font-semibold">{children}</strong>,
          a: ({ href, children }) => (
            <a href={href} className="text-[#002c76] dark:text-[#1464eb] hover:underline underline-offset-2" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
              {children}
            </a>
          ),
          hr: () => <hr className="border-[#c9d5e8] dark:border-zinc-800 my-6" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
