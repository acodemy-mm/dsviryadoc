import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { Sidebar } from '@/components/Sidebar';
import { DSComponent } from '@/lib/types';

export default async function TokensLayout({ children }: { children: React.ReactNode }) {
  let components: DSComponent[] = [];
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase.from('ds_components').select('*').order('name');
    components = (data as DSComponent[]) ?? [];
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar components={components} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
