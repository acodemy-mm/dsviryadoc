import { getCachedPagesList } from '@/lib/pages-data';
import { redirect } from 'next/navigation';

export default async function DocsIndexPage() {
  const pages = await getCachedPagesList();
  const first = pages.find((p) => p.section === 'Getting Started') ?? pages[0];
  if (first) redirect(`/docs/${first.slug}`);
  redirect('/');
}
