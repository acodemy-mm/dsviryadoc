import { unstable_cache } from 'next/cache';
import { createPublicClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { DSComponent } from '@/lib/types';

const CACHE_TAG = 'ds-components';

async function fetchComponentsList(): Promise<DSComponent[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data } = await supabase.from('ds_components').select('*').order('name');
  return (data as DSComponent[]) ?? [];
}

async function fetchComponentBySlug(slug: string): Promise<DSComponent | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('ds_components')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error || !data) return null;
  return data as DSComponent;
}

/** Cached list of all components (for sidebar). Revalidates every 60s; use revalidateTag('ds-components') on mutations. */
export function getCachedComponentsList() {
  return unstable_cache(fetchComponentsList, [CACHE_TAG], {
    tags: [CACHE_TAG],
    revalidate: 60,
  })();
}

/** Cached single component by slug (for detail page). */
export function getCachedComponentBySlug(slug: string) {
  return unstable_cache(
    () => fetchComponentBySlug(slug),
    [CACHE_TAG, 'slug', slug],
    { tags: [CACHE_TAG], revalidate: 60 }
  )();
}
