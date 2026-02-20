import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/Sidebar';
import { DSComponent } from '@/lib/types';

export default async function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: components } = await supabase
    .from('ds_components')
    .select('*')
    .order('name');

  return (
    <div className="flex min-h-screen">
      <Sidebar components={(components as DSComponent[]) ?? []} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
