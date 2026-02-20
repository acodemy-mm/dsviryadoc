'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/actions';
import { Layers, LayoutDashboard, Plus, LogOut, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/dashboard/new', label: 'New Component', icon: Plus },
  ];

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-950 h-screen sticky top-0">
      <div className="px-4 py-5 border-b border-[#c9d5e8] dark:border-zinc-800 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#002c76] flex items-center justify-center shadow-sm">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#002c76] dark:text-zinc-100 leading-tight tracking-tight">Virya</p>
            <p className="text-[10px] text-[#6b82a0] dark:text-zinc-600 font-medium">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-all duration-150',
                isActive
                  ? 'bg-[#002c76] text-white shadow-sm'
                  : 'text-[#3d5070] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300 hover:bg-[#eef2f7] dark:hover:bg-zinc-900'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-[#c9d5e8] dark:border-zinc-800 space-y-0.5">
        <Link
          href="/components"
          target="_blank"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs text-[#6b82a0] dark:text-zinc-600 hover:text-[#002c76] dark:hover:text-zinc-400 hover:bg-[#eef2f7] dark:hover:bg-zinc-900 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Site
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-md text-xs text-[#6b82a0] dark:text-zinc-600 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
