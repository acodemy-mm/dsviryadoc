import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { DSComponent } from '@/lib/types';
import { ComponentForm } from '@/components/ComponentForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function EnvSetupMessage() {
  return (
    <div className="p-8 max-w-lg">
      <p className="text-zinc-300 font-medium mb-2">Configure Supabase</p>
      <p className="text-zinc-500 text-sm">
        Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel → Project Settings → Environment Variables.
      </p>
    </div>
  );
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditComponentPage({ params }: Props) {
  const { id } = await params;
  if (!isSupabaseConfigured()) return <EnvSetupMessage />;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('ds_components')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) notFound();

  const component = data as DSComponent;

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Dashboard
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Edit Component</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Editing <span className="text-zinc-300 font-medium">{component.name}</span>
        </p>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <ComponentForm component={component} />
      </div>
    </div>
  );
}
