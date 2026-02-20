import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm max-w-none ${className ?? ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-4 mt-6 first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3 mt-5 first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-semibold text-gray-800 dark:text-zinc-200 mb-2 mt-4 first:mt-0">{children}</h3>,
          p:  ({ children }) => <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mb-3">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside space-y-1.5 mb-3 text-gray-600 dark:text-zinc-400">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-1.5 mb-3 text-gray-600 dark:text-zinc-400">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline
              ? <code className="bg-gray-100 dark:bg-zinc-800 text-[#1464eb] dark:text-[#1464eb] px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
              : <code className="block bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md p-4 text-sm font-mono text-gray-700 dark:text-zinc-300 overflow-x-auto">{children}</code>;
          },
          pre: ({ children }) => <pre className="not-prose mb-4">{children}</pre>,
          blockquote: ({ children }) => <blockquote className="border-l-2 border-gray-200 dark:border-zinc-700 pl-4 text-gray-500 dark:text-zinc-500 italic mb-3">{children}</blockquote>,
          strong: ({ children }) => <strong className="text-gray-800 dark:text-zinc-200 font-semibold">{children}</strong>,
          a: ({ href, children }) => <a href={href} className="text-[--color-primary-400] hover:text-[--color-primary-500] underline underline-offset-2">{children}</a>,
          hr: () => <hr className="border-gray-200 dark:border-zinc-800 my-6" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
