import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { DSComponent } from '@/lib/types';
import { CategoryBadge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Plus, LayoutGrid } from 'lucide-react';
import { DraggableComponentList } from '@/components/DraggableComponentList';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

function EnvSetupMessage() {
  return (
    <div className="p-8 max-w-lg">
      <p className="text-zinc-300 font-medium mb-2">Configure Supabase</p>
      <p className="text-zinc-500 text-sm">
        Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel → Project Settings → Environment Variables, then redeploy.
      </p>
    </div>
  );
}

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) return <EnvSetupMessage />;

  const supabase = await createClient();
  const { data: components, error } = await supabase
    .from('ds_components')
    .select('*')
    .order('name');

  if (error?.code === 'PGRST205') {
    redirect('/admin/setup');
  }

  const raw = (components as DSComponent[]) ?? [];
  const items = [...raw].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.name.localeCompare(b.name)
  );

  const statsByCategory = items.reduce(
    (acc, c) => { acc[c.category] = (acc[c.category] ?? 0) + 1; return acc; },
    {} as Record<string, number>
  );

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 dark:text-zinc-500 text-sm mt-1">Manage your design system components</p>
        </div>
        <Link
          href="/admin/dashboard/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-700 dark:hover:bg-zinc-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Component
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          <div className="flex items-center gap-2 mb-1">
            <LayoutGrid className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <span className="text-xs text-gray-500 dark:text-zinc-500 font-medium">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-zinc-100">{items.length}</p>
        </div>
        {Object.entries(statsByCategory).map(([cat, count]) => (
          <div key={cat} className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
            <div className="flex items-center gap-2 mb-1">
              <CategoryBadge label={cat} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-zinc-100">{count}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-lg border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm">
          <p className="font-medium">Database not configured</p>
          <p className="text-xs mt-0.5 opacity-70">Add your Supabase credentials to .env.local to get started.</p>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
          <LayoutGrid className="w-10 h-10 text-gray-300 dark:text-zinc-700 mb-4" />
          <p className="text-gray-600 dark:text-zinc-400 font-medium mb-1">No components yet</p>
          <p className="text-gray-400 dark:text-zinc-600 text-sm mb-5">Create your first component to get started.</p>
          <Link
            href="/admin/dashboard/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-700 dark:hover:bg-zinc-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Component
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <p className="px-4 py-2 text-xs text-gray-500 dark:text-zinc-500 bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-200 dark:border-zinc-800">
            Drag the grip to reorder. Order is saved and reflected on the Components page and sidebar.
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                <th className="w-10 px-2 py-3.5" aria-label="Drag to reorder" />
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Component</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider hidden lg:table-cell">Updated</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <DraggableComponentList items={items} />
          </table>
        </div>
      )}
    </div>
  );
}
