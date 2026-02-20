'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DSComponent } from '@/lib/types';
import { CATEGORIES, cn } from '@/lib/utils';
import { Layers, ChevronRight, Settings, Braces } from 'lucide-react';

interface SidebarProps {
  components: DSComponent[];
}

export function Sidebar({ components }: SidebarProps) {
  const pathname = usePathname();

  const grouped = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = components.filter((c) => c.category === cat);
      return acc;
    },
    {} as Record<string, DSComponent[]>
  );

  const navItem = (href: string, label: string, badge?: string | number, icon?: React.ReactNode) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150',
          isActive
            ? 'bg-[#002c76] text-white shadow-sm'
            : 'text-[#3d5070] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300 hover:bg-[#eef2f7] dark:hover:bg-zinc-900'
        )}
      >
        {icon}
        {label}
        {badge !== undefined && (
          <span className={cn('ml-auto text-[10px] font-mono', isActive ? 'text-blue-200' : 'text-[#9db0c8] dark:text-zinc-600')}>
            {badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="w-60 shrink-0 flex flex-col border-r border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-950 h-screen sticky top-0 overflow-y-auto">

      {/* Logo */}
      <div className="px-4 py-5 border-b border-[#c9d5e8] dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#002c76] flex items-center justify-center shadow-sm shrink-0">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-[#002c76] dark:text-zinc-100 leading-tight block tracking-tight">Virya</span>
            <span className="text-[10px] text-[#6b82a0] dark:text-zinc-600 leading-none font-medium">Design System</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">

        {/* Tokens */}
        {navItem('/tokens', 'Design Tokens', undefined, <Braces className="w-3.5 h-3.5 shrink-0" />)}

        {/* Divider */}
        <div className="pt-3 pb-1">
          <p className="px-2.5 text-[10px] font-bold uppercase tracking-widest text-[#9db0c8] dark:text-zinc-700">
            Components
          </p>
        </div>

        {navItem('/components', 'All Components', components.length)}

        <div className="pt-1">
          {CATEGORIES.map((category) => {
            const items = grouped[category];
            if (items.length === 0) return null;
            return (
              <div key={category} className="mb-2">
                <p className="px-2.5 mb-0.5 mt-2 text-[10px] font-bold uppercase tracking-widest text-[#9db0c8] dark:text-zinc-600">
                  {category}
                </p>
                <div className="space-y-0.5">
                  {items.map((component) => {
                    const isActive = pathname === `/components/${component.slug}`;
                    return (
                      <Link
                        key={component.id}
                        href={`/components/${component.slug}`}
                        className={cn(
                          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all duration-150',
                          isActive
                            ? 'bg-[#002c76] text-white font-medium shadow-sm'
                            : 'text-[#3d5070] dark:text-zinc-500 hover:text-[#002c76] dark:hover:text-zinc-300 hover:bg-[#eef2f7] dark:hover:bg-zinc-900'
                        )}
                      >
                        {isActive && <ChevronRight className="w-3 h-3 shrink-0" />}
                        <span className={isActive ? '' : 'pl-[18px]'}>{component.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#c9d5e8] dark:border-zinc-800 space-y-2">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-[#6b82a0] dark:text-zinc-600 hover:text-[#002c76] dark:hover:text-zinc-400 hover:bg-[#eef2f7] dark:hover:bg-zinc-900 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          Admin
        </Link>
      </div>
    </aside>
  );
}
