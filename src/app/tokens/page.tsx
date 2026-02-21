import { ColorSection } from '@/components/tokens/ColorSection';
import {
  TOKEN_GROUPS,
  TYPOGRAPHY_GROUPS,
  BRAND_FONTS,
  type Brand,
  colorInfo,
  colorSuccess,
  colorWarning,
  colorCritical,
  colorNeutral,
  colorAlpha,
} from '@/lib/design-tokens';
import { SwatchRow, AlphaSwatchRow } from '@/components/tokens/ColorSection';

const BRANDS: Brand[] = ['kbz-bank', 'kbz-pay', 'premium-bank'];

export default function DesignTokensPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
          Design Tokens
        </h1>
        <p className="text-gray-500 dark:text-zinc-500 text-sm mt-1">
          Colors, spacing, typography, and elevation — KBZ Bank Design System
        </p>
      </header>

      {/* Brand typography */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Brand typography</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-500 mb-4">
          Each brand uses a distinct typeface. Set <code className="bg-gray-100 dark:bg-zinc-800 px-1 rounded text-xs">data-brand</code> on <code className="bg-gray-100 dark:bg-zinc-800 px-1 rounded text-xs">&lt;html&gt;</code> to switch.
        </p>
        <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <ul className="space-y-3">
            {BRANDS.map((brand) => {
              const font = BRAND_FONTS[brand];
              return (
                <li key={brand} className="flex flex-wrap items-center gap-2">
                  <code className="text-xs font-mono text-gray-500 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
                    data-brand=&quot;{brand}&quot;
                  </code>
                  <span className="text-gray-400 dark:text-zinc-600">→</span>
                  <a
                    href={font.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#002c76] dark:text-[#1464eb] hover:underline"
                  >
                    {font.name}
                  </a>
                  <span className="text-xs text-gray-500 dark:text-zinc-500">({font.cssVar})</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Brand color palettes */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Brand colors</h2>
        <ColorSection />
      </section>

      {/* Semantic colors (shared) */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Semantic colors</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-500 mb-4">
          Shared across all brands: Info, Success, Warning, Critical, Neutral, Alpha
        </p>
        <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-zinc-200 mb-2">Info</h3>
            <SwatchRow scale={colorInfo} prefix="color-info" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-zinc-200 mb-2">Success</h3>
            <SwatchRow scale={colorSuccess} prefix="color-success" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-zinc-200 mb-2">Warning</h3>
            <SwatchRow scale={colorWarning} prefix="color-warning" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-zinc-200 mb-2">Critical</h3>
            <SwatchRow scale={colorCritical} prefix="color-critical" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-zinc-200 mb-2">Neutral</h3>
            <SwatchRow scale={colorNeutral} prefix="color-neutral" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-zinc-200 mb-2">Alpha (overlay)</h3>
            <AlphaSwatchRow scale={colorAlpha} prefix="color-alpha" />
          </div>
        </div>
      </section>

      {/* Numeric token groups */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Numeric tokens</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-500 mb-4">
          Spacing, size, radius, elevation — use in code or map to CSS variables
        </p>
        <div className="space-y-6">
          {TOKEN_GROUPS.map((group) => (
            <div
              key={group.label}
              className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950/50">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">{group.label}</h3>
                <p className="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">{group.description}</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {group.tokens.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-zinc-800 px-3 py-2 bg-gray-50/50 dark:bg-zinc-950/30"
                    >
                      <code className="text-xs font-mono text-gray-700 dark:text-zinc-300 truncate">
                        {t.name}
                      </code>
                      <span className="text-xs font-mono text-gray-500 dark:text-zinc-500 ml-2 shrink-0">
                        {t.value}
                        {t.unit ?? ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-3">Typography (Latin)</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-500 mb-4">
          Font size and line height in px
        </p>
        <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-zinc-800">
            {TYPOGRAPHY_GROUPS.map((group) => (
              <div key={group.label} className="p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-500 mb-3">
                  {group.label}
                </h3>
                <div className="space-y-4">
                  {group.tokens.map((t) => (
                    <div
                      key={t.name}
                      className="flex flex-wrap items-baseline gap-4"
                    >
                      <span className="text-sm font-medium text-gray-600 dark:text-zinc-400 w-24 shrink-0">
                        {t.name}
                      </span>
                      <span
                        className="text-gray-900 dark:text-zinc-100"
                        style={{
                          fontSize: `${t.fontSize}px`,
                          lineHeight: `${t.lineHeight}px`,
                        }}
                      >
                        The quick brown fox
                      </span>
                      <code className="text-xs font-mono text-gray-500 dark:text-zinc-500 ml-auto">
                        {t.fontSize}px / {t.lineHeight}px
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
