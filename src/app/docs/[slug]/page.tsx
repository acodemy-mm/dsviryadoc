import { getCachedPageBySlug, getCachedPagesList } from '@/lib/pages-data';
import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TableOfContents } from '@/components/TableOfContents';
import { extractHeadings } from '@/lib/headings';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = await getCachedPagesList();
  return pages.map((p) => ({ slug: p.slug }));
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const page = await getCachedPageBySlug(slug);
  if (!page) notFound();

  const headings = extractHeadings(page.content_markdown);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: page.section, href: '/docs' },
          { label: page.title },
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-8">
        <article>
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#002c76] dark:text-[#1464eb] mb-2">
              {page.section}
            </p>
            <h1 className="text-2xl font-bold text-[#0a1628] dark:text-zinc-100 tracking-tight">{page.title}</h1>
          </header>
          <div className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <MarkdownRenderer content={page.content_markdown} withHeadingIds />
          </div>
        </article>
        {headings.length > 0 && (
          <aside className="hidden xl:block">
            <TableOfContents headings={headings} />
          </aside>
        )}
      </div>
    </div>
  );
}
