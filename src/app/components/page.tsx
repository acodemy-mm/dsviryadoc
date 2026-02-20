import { createClient } from '@/lib/supabase/server';
import { ComponentGallery } from '@/components/SearchBar';
import { DSComponent } from '@/lib/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export default async function ComponentsPage() {
  const supabase = await createClient();
  const { data: components, error } = await supabase
    .from('ds_components')
    .select('*')
    .order('category')
    .order('name');

  const items = (components as DSComponent[]) ?? [];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">Component Gallery</h1>
          <p className="text-gray-500 dark:text-zinc-500 text-sm mt-1">
            {items.length} component{items.length !== 1 ? 's' : ''} across your design system
          </p>
        </div>
        <Link
          href="/admin/dashboard/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-700 dark:hover:bg-zinc-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Component
        </Link>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-lg border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm">
          <p className="font-medium">Database not set up yet</p>
          <p className="text-xs mt-0.5 opacity-70">
            Visit{' '}
            <a href="/admin/setup" className="underline hover:opacity-100">
              /admin/setup
            </a>{' '}
            for one-click setup instructions.
          </p>
        </div>
      )}

      {items.length === 0 && !error ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-16 h-16 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 flex items-center justify-center mb-5">
            <Plus className="w-7 h-7 text-gray-400 dark:text-zinc-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-zinc-300 mb-2">No components yet</h2>
          <p className="text-gray-500 dark:text-zinc-500 text-sm mb-6 max-w-xs">
            Start building your design system by adding your first component.
          </p>
          <Link
            href="/admin/dashboard/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-700 dark:hover:bg-zinc-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add your first component
          </Link>
        </div>
      ) : (
        <ComponentGallery components={items} />
      )}
    </div>
  );
}
