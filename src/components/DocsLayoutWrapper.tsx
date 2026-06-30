import { DocsShell } from '@/components/DocsShell';
import { getCachedComponentsList } from '@/lib/components-data';
import { getCachedPagesList } from '@/lib/pages-data';

export default async function DocsLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [components, pages] = await Promise.all([
    getCachedComponentsList(),
    getCachedPagesList(),
  ]);

  return (
    <DocsShell components={components} pages={pages}>
      {children}
    </DocsShell>
  );
}
