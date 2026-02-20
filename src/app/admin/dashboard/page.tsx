import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { DSComponent } from '@/lib/types';
import { CategoryBadge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Plus, Pencil, ExternalLink, LayoutGrid, Calendar } from 'lucide-react';
import { DeleteButton } from '@/components/DeleteButton';
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
    .order('category')
    .order('name');

  if (error?.code === 'PGRST205') {
    redirect('/admin/setup');
  }

  const items = (components as DSComponent[]) ?? [];

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
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Component</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider hidden lg:table-cell">Updated</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {items.map((component) => (
                <tr key={component.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors group bg-white dark:bg-transparent">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-zinc-100">{component.name}</p>
                      {component.description && (
                        <p className="text-xs text-gray-400 dark:text-zinc-600 mt-0.5 line-clamp-1">{component.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <CategoryBadge label={component.category} />
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <code className="text-xs text-gray-500 dark:text-zinc-500 font-mono bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-2 py-0.5 rounded">
                      {component.slug}
                    </code>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-zinc-600">
                      <Calendar className="w-3 h-3" />
                      {new Date(component.updated_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/components/${component.slug}`}
                        target="_blank"
                        className="p-1.5 rounded text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        title="View"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/dashboard/${component.id}/edit`}
                        className="p-1.5 rounded text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <DeleteButton id={component.id} name={component.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
