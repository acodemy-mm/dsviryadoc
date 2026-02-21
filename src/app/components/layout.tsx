import { Sidebar } from '@/components/Sidebar';
import { getCachedComponentsList } from '@/lib/components-data';

export default async function ComponentsLayout({ children }: { children: React.ReactNode }) {
  const components = await getCachedComponentsList();

  return (
    <div className="flex min-h-screen">
      <Sidebar components={components} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
