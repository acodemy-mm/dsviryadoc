import { ComponentForm } from '@/components/ComponentForm';

export default function NewComponentPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">New Component</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Add a new component to your design system
        </p>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <ComponentForm />
      </div>
    </div>
  );
}
