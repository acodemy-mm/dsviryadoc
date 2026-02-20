'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { DSComponent } from '@/lib/types';
import { ComponentCard } from '@/components/ComponentCard';
import { CATEGORIES } from '@/lib/utils';

interface SearchBarProps {
  components: DSComponent[];
}

export function ComponentGallery({ components }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return components.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !activeCategory || c.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [components, query, activeCategory]);

  const categoryCounts = useMemo(() => {
    return CATEGORIES.reduce(
      (acc, cat) => {
        acc[cat] = components.filter((c) => c.category === cat).length;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [components]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search components..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-zinc-600 focus:border-gray-300 dark:focus:border-zinc-600 transition-colors"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              !activeCategory
                ? 'bg-gray-900 dark:bg-zinc-100 text-white dark:text-black'
                : 'bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-800 hover:text-gray-700 dark:hover:text-zinc-200'
            }`}
          >
            All ({components.length})
          </button>
          {CATEGORIES.filter((cat) => categoryCounts[cat] > 0).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-gray-900 dark:bg-zinc-100 text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-800 hover:text-gray-700 dark:hover:text-zinc-200'
              }`}
            >
              {cat} ({categoryCounts[cat]})
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="w-10 h-10 text-gray-300 dark:text-zinc-700 mb-4" />
          <p className="text-gray-500 dark:text-zinc-400 font-medium">No components found</p>
          <p className="text-gray-400 dark:text-zinc-600 text-sm mt-1">Try a different search term or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-xs text-gray-400 dark:text-zinc-600 text-center">
          Showing {filtered.length} of {components.length} components
        </p>
      )}
    </div>
  );
}
