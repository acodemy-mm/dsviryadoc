import { ColorSection } from '@/components/tokens/ColorSection';
import { BrandSwitcher } from '@/components/BrandSwitcher';
import { TokenCopyButton } from '@/components/TokenCopyButton';
import { TypographySection } from '@/components/tokens/TypographySection';
import {
  TOKEN_GROUPS,
  ALL_BRANDS,
  BRAND_FONTS,
  colorInfo,
  colorSuccess,
  colorWarning,
  colorCritical,
  colorNeutral,
  colorAlpha,
} from '@/lib/design-tokens';
import { SwatchRow, AlphaSwatchRow } from '@/components/tokens/ColorSection';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function DesignTokensPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Design Tokens' }]} />

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#0a1628] dark:text-zinc-100 tracking-tight">Design Tokens</h1>
        <p className="text-[#6b82a0] dark:text-zinc-500 text-sm mt-1">
          Colors, spacing, typography, and elevation — Virya Design System
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[#0a1628] dark:text-zinc-100 mb-3">Brand preview</h2>
        <p className="text-sm text-[#6b82a0] dark:text-zinc-500 mb-4">
          Switch brand to preview palettes and set <code className="text-xs bg-[#eef2f7] dark:bg-zinc-800 px-1 rounded font-mono">data-brand</code> on the page.
        </p>
        <BrandSwitcher />
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-[#0a1628] dark:text-zinc-100 mb-3">Brand typography</h2>
        <div className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <ul className="space-y-3">
            {ALL_BRANDS.map((brand) => {
              const font = BRAND_FONTS[brand];
              return (
                <li key={brand} className="flex flex-wrap items-center gap-2">
                  <code className="text-xs font-mono text-[#6b82a0] dark:text-zinc-500 bg-[#eef2f7] dark:bg-zinc-800 px-2 py-1 rounded">
                    data-brand=&quot;{brand}&quot;
                  </code>
                  <span className="text-[#9db0c8]">→</span>
                  <a href={font.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#002c76] dark:text-[#1464eb] hover:underline">
                    {font.name}
                  </a>
                  <span className="text-xs text-[#6b82a0] dark:text-zinc-500">({font.cssVar})</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-[#0a1628] dark:text-zinc-100 mb-3">Brand colors</h2>
        <ColorSection />
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-[#0a1628] dark:text-zinc-100 mb-3">Semantic colors</h2>
        <div className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-6">
          {[
            { label: 'Info', scale: colorInfo },
            { label: 'Success', scale: colorSuccess },
            { label: 'Warning', scale: colorWarning },
            { label: 'Critical', scale: colorCritical },
            { label: 'Neutral', scale: colorNeutral },
          ].map(({ label, scale }) => (
            <div key={label}>
              <h3 className="text-sm font-medium text-[#0a1628] dark:text-zinc-200 mb-2">{label}</h3>
              <SwatchRow scale={scale} prefix={`color-${label.toLowerCase()}`} />
            </div>
          ))}
          <div>
            <h3 className="text-sm font-medium text-[#0a1628] dark:text-zinc-200 mb-2">Alpha (overlay)</h3>
            <AlphaSwatchRow scale={colorAlpha} prefix="color-alpha" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-[#0a1628] dark:text-zinc-100 mb-3">Numeric tokens</h2>
        <p className="text-sm text-[#6b82a0] dark:text-zinc-500 mb-4">Click any token to copy its CSS variable declaration.</p>
        <div className="space-y-6">
          {TOKEN_GROUPS.map((group) => (
            <div key={group.label} className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-950/50">
                <h3 className="text-sm font-semibold text-[#0a1628] dark:text-zinc-100">{group.label}</h3>
                <p className="text-xs text-[#6b82a0] dark:text-zinc-500 mt-0.5">{group.description}</p>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {group.tokens.map((t) => (
                  <TokenCopyButton
                    key={t.name}
                    name={t.name}
                    value={`${t.value}${t.unit ?? ''}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <TypographySection />
    </div>
  );
}
