import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-bold text-gray-200 dark:text-zinc-800 mb-4 font-mono">404</p>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100 mb-2">Page not found</h1>
        <p className="text-gray-500 dark:text-zinc-500 mb-8">This component or page doesn&apos;t exist.</p>
        <Link
          href="/components"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-700 dark:hover:bg-zinc-100 transition-colors"
        >
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}
