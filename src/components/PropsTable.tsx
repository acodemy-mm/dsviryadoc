import type { PropDefinition } from '@/lib/types';

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (!props.length) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-[#c9d5e8] dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-950/50">
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#0a1628] dark:text-zinc-300">Prop</th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#0a1628] dark:text-zinc-300">Type</th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#0a1628] dark:text-zinc-300">Default</th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#0a1628] dark:text-zinc-300">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#c9d5e8] dark:divide-zinc-800">
          {props.map((prop) => (
            <tr key={prop.name} className="bg-white dark:bg-zinc-900">
              <td className="px-4 py-2.5 font-mono text-xs text-[#002c76] dark:text-[#1464eb]">
                {prop.name}
                {prop.required && <span className="text-red-500 ml-0.5">*</span>}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-[#6b82a0] dark:text-zinc-500">{prop.type}</td>
              <td className="px-4 py-2.5 font-mono text-xs text-[#6b82a0] dark:text-zinc-500">{prop.default ?? '—'}</td>
              <td className="px-4 py-2.5 text-xs text-[#3d5070] dark:text-zinc-400">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
