import fs from 'fs';
import path from 'path';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE_VERSION } from '@/lib/constants';

function getChangelogContent(): string {
  try {
    const filePath = path.join(process.cwd(), 'CHANGELOG.md');
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return `# Changelog\n\n## ${SITE_VERSION}\n\nInitial documentation site improvements.`;
  }
}

export default function ChangelogPage() {
  const content = getChangelogContent();

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Changelog' }]} />
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#0a1628] dark:text-zinc-100 tracking-tight">Changelog</h1>
        <p className="text-sm text-[#6b82a0] dark:text-zinc-500 mt-1">Release history for Virya Design System docs</p>
      </header>
      <div className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
        <MarkdownRenderer content={content} withHeadingIds />
      </div>
    </div>
  );
}
