'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { CategoryBadge } from '@/components/ui/Badge';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { TableOfContents } from '@/components/TableOfContents';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { extractHeadings } from '@/lib/headings';
import type { DSComponent } from '@/lib/types';
import { cn } from '@/lib/utils';

const TABS = ['Preview', 'Usage', 'Props', 'Code', 'Accessibility'] as const;
type Tab = (typeof TABS)[number];

interface ComponentDetailViewProps {
  component: DSComponent;
}

export function ComponentDetailView({ component }: ComponentDetailViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Preview');
  const a11yContent =
    component.accessibility_markdown?.trim() ||
    extractSection(component.usage_markdown, 'Accessibility') ||
    '';
  const headings = extractHeadings(component.usage_markdown ?? '');
  const a11yHeadings = extractHeadings(a11yContent);
  const tocHeadings = activeTab === 'Usage' ? headings : activeTab === 'Accessibility' ? a11yHeadings : [];

  const defaultProps = component.props_json ?? getDefaultProps(component.slug);

  const visibleTabs = TABS.filter((tab) => {
    if (tab === 'Preview') return true;
    if (tab === 'Usage') return !!component.usage_markdown;
    if (tab === 'Props') return !!defaultProps?.length;
    if (tab === 'Code') return !!component.code;
    if (tab === 'Accessibility') return !!a11yContent;
    return false;
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: component.category, href: `/components?category=${component.category}` },
          { label: component.name },
        ]}
      />

      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-[#0a1628] dark:text-zinc-100 tracking-tight">{component.name}</h1>
          <CategoryBadge label={component.category} />
        </div>
        {component.description && (
          <p className="text-[#3d5070] dark:text-zinc-400 text-sm leading-relaxed">{component.description}</p>
        )}
        {component.figma_node_url && (
          <a
            href={component.figma_node_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-[#002c76] dark:text-[#1464eb] hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in Figma
          </a>
        )}
      </header>

      <div className="flex gap-1 border-b border-[#c9d5e8] dark:border-zinc-800 mb-6 overflow-x-auto">
        {visibleTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 text-xs font-medium border-b-2 -mb-px transition-colors whitespace-nowrap',
              activeTab === tab
                ? 'border-[#002c76] text-[#002c76] dark:border-[#1464eb] dark:text-[#1464eb]'
                : 'border-transparent text-[#6b82a0] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-8">
        <div>
          {activeTab === 'Preview' && (
            <ComponentPreview
              slug={component.slug}
              name={component.name}
              previewProps={component.preview_props}
              thumbnailUrl={component.thumbnail_url}
            />
          )}

          {activeTab === 'Usage' && component.usage_markdown && (
            <div className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <MarkdownRenderer content={component.usage_markdown} withHeadingIds />
            </div>
          )}

          {activeTab === 'Props' && defaultProps && <PropsTable props={defaultProps} />}

          {activeTab === 'Code' && component.code && (
            <CodeBlock code={component.code.trim()} language="tsx" showCopy />
          )}

          {activeTab === 'Accessibility' && a11yContent && (
            <div className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <MarkdownRenderer content={a11yContent} withHeadingIds />
            </div>
          )}

          {component.image_urls && component.image_urls.length > 0 && activeTab === 'Preview' && (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-[#0a1628] dark:text-zinc-100 mb-3">Additional images</h2>
              <div className="flex flex-col gap-4">
                {component.image_urls.map((url, i) => (
                  <div key={url} className="relative aspect-video max-w-3xl rounded-lg border border-[#c9d5e8] dark:border-zinc-800 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`${component.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {tocHeadings.length > 0 && (
          <aside className="hidden xl:block">
            <TableOfContents headings={tocHeadings} />
          </aside>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-[#c9d5e8] dark:border-zinc-800">
        <Link href="/components" className="text-xs text-[#6b82a0] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300">
          ← Back to gallery
        </Link>
      </div>
    </div>
  );
}

function getDefaultProps(slug: string) {
  const defaults: Record<string, { name: string; type: string; default?: string; required?: boolean; description: string }[]> = {
    button: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual style of the button' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Button label or content' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
    ],
    input: [
      { name: 'label', type: 'string', description: 'Visible field label' },
      { name: 'error', type: 'string', description: 'Error message shown below the field' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    ],
    badge: [
      { name: 'label', type: 'string', required: true, description: 'Badge text' },
    ],
  };
  return defaults[slug] ?? null;
}

function extractSection(markdown: string, heading: string): string | null {
  const regex = new RegExp(`## ${heading}[\\s\\S]*?(?=\\n## |$)`, 'i');
  const match = markdown.match(regex);
  return match ? match[0].trim() : null;
}
