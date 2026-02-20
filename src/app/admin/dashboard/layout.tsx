import { AdminNav } from '@/components/AdminNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
