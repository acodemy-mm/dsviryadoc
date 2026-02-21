import { isSupabaseConfigured } from '@/lib/supabase/server';
import { getCachedComponentBySlug } from '@/lib/components-data';
import { notFound } from 'next/navigation';
import { CategoryBadge } from '@/components/ui/Badge';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { CodeBlock } from '@/components/CodeBlock';
import Link from 'next/link';
import { ImagePreview } from '@/components/ImagePreview';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ComponentDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) notFound();

  if (!isSupabaseConfigured()) {
    return (
      <div className="p-8 max-w-3xl">
        <p className="text-amber-600 dark:text-amber-400 text-sm">
          Configure Supabase (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) to view components.
        </p>
      </div>
    );
  }

  const component = await getCachedComponentBySlug(slug);
  if (!component) notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/components"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Gallery
        </Link>
      </div>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
            {component.name}
          </h1>
          <CategoryBadge label={component.category} />
        </div>
        {component.description && (
          <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
            {component.description}
          </p>
        )}
      </header>

      {component.thumbnail_url && (
        <div className="relative aspect-video rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden bg-gray-50 dark:bg-zinc-950 mb-8">
          <ImagePreview
            src={component.thumbnail_url}
            alt={component.name}
            fill
          />
        </div>
      )}

      {component.image_urls && component.image_urls.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Images</h2>
          <div className="flex flex-col gap-4">
            {component.image_urls.map((url, i) => (
              <div
                key={url}
                className="relative aspect-video max-w-3xl rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden bg-gray-50 dark:bg-zinc-950"
              >
                <ImagePreview
                  src={url}
                  alt={`${component.name} image ${i + 1}`}
                  fill
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {component.usage_markdown && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Usage</h2>
          <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
            <MarkdownRenderer content={component.usage_markdown} />
          </div>
        </section>
      )}

      {component.code && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Code</h2>
          <CodeBlock code={component.code.trim()} language="tsx" showCopy />
        </section>
      )}
    </div>
  );
}
