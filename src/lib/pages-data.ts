import { unstable_cache } from 'next/cache';
import { createPublicClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { DSPage } from '@/lib/types';
import { SEED_PAGES } from '@/lib/pages-seed';

const CACHE_TAG = 'ds-pages';

async function fetchPagesList(): Promise<DSPage[]> {
  if (!isSupabaseConfigured()) return SEED_PAGES;
  const supabase = createPublicClient();
  const { data, error } = await supabase.from('ds_pages').select('*').order('sort_order');
  if (error || !data?.length) return SEED_PAGES;
  return (data as DSPage[]).sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.title.localeCompare(b.title)
  );
}

async function fetchPageBySlug(slug: string): Promise<DSPage | null> {
  if (!isSupabaseConfigured()) {
    return SEED_PAGES.find((p) => p.slug === slug) ?? null;
  }
  const supabase = createPublicClient();
  const { data, error } = await supabase.from('ds_pages').select('*').eq('slug', slug).single();
  if (error || !data) {
    return SEED_PAGES.find((p) => p.slug === slug) ?? null;
  }
  return data as DSPage;
}

export function getCachedPagesList() {
  return unstable_cache(fetchPagesList, [CACHE_TAG], {
    tags: [CACHE_TAG],
    revalidate: 60,
  })();
}

export function getCachedPageBySlug(slug: string) {
  return unstable_cache(
    () => fetchPageBySlug(slug),
    [CACHE_TAG, 'slug', slug],
    { tags: [CACHE_TAG], revalidate: 60 }
  )();
}
