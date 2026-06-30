import { TOKEN_GROUPS } from '@/lib/design-tokens';
import type { DSComponent, DSPage } from '@/lib/types';

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  group: 'Components' | 'Docs' | 'Tokens';
}

export function buildSearchIndex(components: DSComponent[], pages: DSPage[]): SearchResult[] {
  const results: SearchResult[] = [];

  for (const c of components) {
    results.push({
      id: `component-${c.slug}`,
      title: c.name,
      subtitle: c.description,
      href: `/components/${c.slug}`,
      group: 'Components',
    });
  }

  for (const p of pages) {
    results.push({
      id: `page-${p.slug}`,
      title: p.title,
      subtitle: p.section,
      href: `/docs/${p.slug}`,
      group: 'Docs',
    });
  }

  for (const group of TOKEN_GROUPS) {
    for (const t of group.tokens) {
      results.push({
        id: `token-${t.name}`,
        title: t.name,
        subtitle: `${group.label} — ${t.value}${t.unit ?? ''}`,
        href: '/tokens',
        group: 'Tokens',
      });
    }
  }

  results.push({
    id: 'tokens-page',
    title: 'Design Tokens',
    subtitle: 'Colors, spacing, typography',
    href: '/tokens',
    group: 'Tokens',
  });

  results.push({
    id: 'changelog',
    title: 'Changelog',
    subtitle: 'Release history',
    href: '/changelog',
    group: 'Docs',
  });

  return results;
}

export function filterSearchIndex(index: SearchResult[], query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return index.slice(0, 12);
  return index
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    )
    .slice(0, 12);
}
