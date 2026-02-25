'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DSComponent } from '@/lib/types';
import { CategoryBadge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/DeleteButton';
import { reorderComponents } from '@/lib/actions';
import { GripVertical, Pencil, ExternalLink, Calendar, Loader2 } from 'lucide-react';

interface DraggableComponentListProps {
  items: DSComponent[];
}

export function DraggableComponentList({ items: initialItems }: DraggableComponentListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState(initialItems);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const initialItemsRef = useRef(initialItems);
  initialItemsRef.current = initialItems;

  const orderKey = initialItems.map((i) => i.id).join(',');
  useEffect(() => {
    setItems(initialItemsRef.current);
  }, [orderKey]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.setData('application/json', JSON.stringify({ index }));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex === null) return;
    if (index !== draggedIndex) setDropTargetIndex(index);
  };

  const handleDragLeave = () => {
    setDropTargetIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDropTargetIndex(null);
    setDraggedIndex(null);
    if (draggedIndex === null || dropIndex === draggedIndex) return;
    const next = [...items];
    const [removed] = next.splice(draggedIndex, 1);
    next.splice(dropIndex, 0, removed);
    setItems(next);
    const orderedIds = next.map((c) => c.id);
    startTransition(async () => {
      await reorderComponents(orderedIds);
      router.refresh();
    });
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  return (
    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
      {items.map((component, index) => (
        <tr
          key={component.id}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          className={`
            transition-colors group bg-white dark:bg-transparent
            ${draggedIndex === index ? 'opacity-50' : 'hover:bg-gray-50 dark:hover:bg-zinc-900/50'}
            ${dropTargetIndex === index ? 'ring-1 ring-inset ring-[#002c76] dark:ring-[#1464eb] bg-[#f0f5ff] dark:bg-[#1464eb]/10' : ''}
          `}
        >
          <td
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            className="px-2 py-4 w-10 cursor-grab active:cursor-grabbing text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-400 touch-none"
          >
            <GripVertical className="w-4 h-4" />
          </td>
          <td className="px-5 py-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-zinc-100">{component.name}</p>
              {component.description && (
                <p className="text-xs text-gray-400 dark:text-zinc-600 mt-0.5 line-clamp-1">{component.description}</p>
              )}
            </div>
          </td>
          <td className="px-5 py-4 hidden sm:table-cell">
            <CategoryBadge label={component.category} />
          </td>
          <td className="px-5 py-4 hidden md:table-cell">
            <code className="text-xs text-gray-500 dark:text-zinc-500 font-mono bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-2 py-0.5 rounded">
              {component.slug}
            </code>
          </td>
          <td className="px-5 py-4 hidden lg:table-cell">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-zinc-600">
              <Calendar className="w-3 h-3" />
              {new Date(component.updated_at).toLocaleDateString()}
            </div>
          </td>
          <td className="px-5 py-4">
            <div className="flex items-center justify-end gap-2">
              {isPending && (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 dark:text-zinc-500" />
              )}
              <Link
                href={`/components/${component.slug}`}
                target="_blank"
                className="p-1.5 rounded text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                title="View"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/admin/dashboard/${component.id}/edit`}
                className="p-1.5 rounded text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                title="Edit"
              >
                <Pencil className="w-3.5 h-3.5" />
              </Link>
              <DeleteButton id={component.id} name={component.name} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
