import { slugify } from '@/lib/utils';

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  for (const line of markdown.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const text = match[2].replace(/\*\*/g, '').replace(/`/g, '').trim();
    headings.push({ id: slugify(text), text, level: match[1].length });
  }
  return headings;
}
