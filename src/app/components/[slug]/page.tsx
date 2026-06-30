import { isSupabaseConfigured } from '@/lib/supabase/server';
import { getCachedComponentBySlug } from '@/lib/components-data';
import { notFound } from 'next/navigation';
import { ComponentDetailView } from '@/components/ComponentDetailView';

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

  return <ComponentDetailView component={component} />;
}
