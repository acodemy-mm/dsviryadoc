import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { DSComponent } from '@/lib/types';
import { CategoryBadge } from '@/components/ui/Badge';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { CodeBlock } from '@/components/CodeBlock';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Pencil, Calendar, ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('ds_components')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) notFound();

  const component = data as DSComponent;
  const formattedDate = new Date(component.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/components" className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All Components
        </Link>
        <span className="text-gray-300 dark:text-zinc-700">/</span>
        <span className="text-xs text-gray-500 dark:text-zinc-400">{component.name}</span>
      </div>

      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <CategoryBadge label={component.category} />
              <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-zinc-600">
                <Calendar className="w-3 h-3" />{formattedDate}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight mb-2">{component.name}</h1>
            {component.description && (
              <p className="text-gray-500 dark:text-zinc-400 text-base leading-relaxed max-w-2xl">{component.description}</p>
            )}
          </div>
          <Link
            href={`/admin/dashboard/${component.id}/edit`}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 text-xs font-medium border border-gray-200 dark:border-zinc-700 hover:text-gray-700 dark:hover:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Pencil className="w-3 h-3" />Edit
          </Link>
        </div>

        {/* Preview — vertically scrollable gallery */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-600">Preview</h2>
          <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 overflow-hidden">
            {(() => {
              const allUrls = [
                ...(component.thumbnail_url ? [component.thumbnail_url] : []),
                ...(component.image_urls ?? []).filter((u) => u !== component.thumbnail_url),
              ];
              if (allUrls.length === 0) {
                return (
                  <div className="aspect-video flex flex-col items-center justify-center gap-3 text-gray-300 dark:text-zinc-700">
                    <ImageIcon className="w-12 h-12" />
                    <p className="text-sm font-mono">No preview available</p>
                  </div>
                );
              }
              return (
                <div className="max-h-[70vh] overflow-y-auto flex flex-col gap-3 p-3">
                  {allUrls.map((url, i) => (
                    <div key={url} className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                      <Image src={url} alt={`${component.name} preview ${i + 1}`} fill className="object-contain" />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* Usage */}
        {component.usage_markdown && (
          <section className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-600">Usage</h2>
            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <MarkdownRenderer content={component.usage_markdown} />
            </div>
          </section>
        )}

        {/* Code */}
        {component.code && (
          <section className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-zinc-600">Code Playground</h2>
            <CodeBlock code={component.code} language="tsx" showCopy />
          </section>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 flex items-center justify-between text-xs text-gray-400 dark:text-zinc-600">
          <code className="font-mono">{component.slug}</code>
          <p>Updated {new Date(component.updated_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
