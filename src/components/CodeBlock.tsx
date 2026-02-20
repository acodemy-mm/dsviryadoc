'use client';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  className?: string;
}

export function CodeBlock({ code, language = 'tsx', showCopy = true, className }: CodeBlockProps) {
  return (
    <div className={`relative rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden ${className ?? ''}`}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-zinc-700" />
            <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-zinc-700" />
            <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-zinc-700" />
          </div>
          <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono">{language}</span>
        </div>
        {showCopy && <CopyButton code={code} />}
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          background: '#09090b',
          fontSize: '0.8125rem',
          lineHeight: '1.6',
          borderRadius: 0,
        }}
        showLineNumbers
        lineNumberStyle={{
          color: '#3f3f46',
          minWidth: '2.5rem',
          paddingRight: '1rem',
          userSelect: 'none',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
