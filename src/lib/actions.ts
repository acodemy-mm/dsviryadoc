'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DSComponentInsert } from '@/lib/types';

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }

  redirect('/admin/dashboard');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function createComponent(data: DSComponentInsert) {
  const supabase = await createClient();
  const { error } = await supabase.from('ds_components').insert(data);
  if (error) throw new Error(error.message);
  revalidatePath('/components');
  revalidatePath('/admin/dashboard');
  redirect('/admin/dashboard');
}

export async function updateComponent(id: string, data: Partial<DSComponentInsert>) {
  const supabase = await createClient();
  const { error } = await supabase.from('ds_components').update(data).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/components');
  revalidatePath('/admin/dashboard');
  redirect('/admin/dashboard');
}

export async function deleteComponent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('ds_components').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/components');
  revalidatePath('/admin/dashboard');
}

export async function uploadThumbnail(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const file = formData.get('file') as File;
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error, data } = await supabase.storage
    .from('thumbnails')
    .upload(fileName, file, { upsert: true });

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage.from('thumbnails').getPublicUrl(data.path);
  return urlData.publicUrl;
}
