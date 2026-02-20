import {
  TOKEN_GROUPS,
  TYPOGRAPHY_GROUPS,
  TYPOGRAPHY_GROUPS_MM,
  colorInfo, colorSuccess, colorWarning, colorCritical, colorNeutral, colorAlpha,
  shadowElevation,
  type ColorScale,
  type AlphaScale,
} from '@/lib/design-tokens';
import { ColorSection, SwatchRow, AlphaSwatchRow } from '@/components/tokens/ColorSection';
import { CopyButton } from '@/components/CopyButton';

export default function TokensPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-16">

      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#9db0c8] dark:text-zinc-600 mb-2">Foundation</p>
        <h1 className="text-3xl font-bold text-[#0a1628] dark:text-zinc-100 tracking-tight mb-3">Design Tokens</h1>
        <p className="text-[#3d5070] dark:text-zinc-400 leading-relaxed max-w-2xl">
          Primitive and semantic variables sourced from{' '}
          <Chip>typo.json</Chip>, <Chip>viryads.json</Chip>, and <Chip>Core.tokens.json</Chip>.
          Covering <strong className="text-[#002c76] dark:text-zinc-300">KBZ Bank</strong>,{' '}
          <strong className="text-[#002c76] dark:text-zinc-300">KBZ Pay</strong>,{' '}
          <strong className="text-[#002c76] dark:text-zinc-300">Premium Bank</strong>, and{' '}
          <strong className="text-[#002c76] dark:text-zinc-300">MM locale</strong>.
        </p>
      </div>

      {/* Brand Palettes */}
      <section className="space-y-4">
        <SectionHeader title="Brand Color Palettes" subtitle="Primary and Secondary — unique per brand. Click any swatch to copy its hex value." tag="Core.tokens.json" />
        <ColorSection />
      </section>

      {/* Semantic Colors */}
      <section className="space-y-6">
        <SectionHeader title="Semantic Colors" subtitle="Shared across all brands — Info, Success, Warning, Critical, Neutral, Alpha. Click to copy." tag="Core.tokens.json" />

        {[
          { label: 'Info',     accent: '#0b7ad5', scale: colorInfo },
          { label: 'Success',  accent: '#008a00', scale: colorSuccess },
          { label: 'Warning',  accent: '#d28107', scale: colorWarning },
          { label: 'Critical', accent: '#b30909', scale: colorCritical },
          { label: 'Neutral',  accent: '#666666', scale: colorNeutral },
        ].map(({ label, accent, scale }) => (
          <div key={label} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0" style={{ background: accent }} />
              <h3 className="text-sm font-semibold text-[#0a1628] dark:text-zinc-200">{label}</h3>
            </div>
            <SwatchRow scale={scale} prefix={`color-${label.toLowerCase()}`} />
          </div>
        ))}

        {/* Alpha */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-[#c9d5e8] dark:border-zinc-600 bg-transparent flex-shrink-0" />
            <h3 className="text-sm font-semibold text-[#0a1628] dark:text-zinc-200">Alpha</h3>
            <span className="text-xs text-[#9db0c8] dark:text-zinc-600">rgba(8, 8, 8, α) overlays</span>
          </div>
          <AlphaSwatchRow scale={colorAlpha as unknown as Record<string, string>} prefix="color-alpha" />
        </div>
      </section>

      {/* Numeric Tokens */}
      {TOKEN_GROUPS.map((group) => (
        <section key={group.label} className="space-y-4">
          <SectionHeader title={group.label} subtitle={group.description} tag="typo.json" />
          <div className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-900/60">
                  <th className="text-left px-5 py-3 text-xs font-bold text-[#9db0c8] dark:text-zinc-500 uppercase tracking-wider w-48">Token</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-[#9db0c8] dark:text-zinc-500 uppercase tracking-wider w-24">Value</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-[#9db0c8] dark:text-zinc-500 uppercase tracking-wider">Visual</th>
                  <th className="px-5 py-3 w-28" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dce6f0] dark:divide-zinc-800/60 bg-white dark:bg-transparent">
                {group.tokens.map((token) => (
                  <tr key={token.name} className="hover:bg-[#f8fafc] dark:hover:bg-zinc-900/40 transition-colors group">
                    <td className="px-5 py-3.5">
                      <code className="text-xs text-[#002c76] dark:text-[#1464eb] font-mono">--{token.name}</code>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-mono text-[#3d5070] dark:text-zinc-300">{token.value}{token.unit ?? ''}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <TokenVisual group={group.label} value={Number(token.value)} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <CopyButton code={`var(--${token.name})`} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Shadows */}
      <section className="space-y-4">
        <SectionHeader title="Shadows" subtitle="Composite shadows assembled from elevation primitives." tag="typo.json" />
        <div className="grid grid-cols-3 gap-4">
          {(Object.entries(shadowElevation) as [string, { x: number; y: number; blur: number }][]).map(
            ([level, { x, y, blur }]) => (
              <div key={level} className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
                <div
                  className="w-full h-14 rounded-lg bg-[#eef2f7] dark:bg-zinc-800"
                  style={{ boxShadow: `${x}px ${y}px ${blur}px rgba(0,44,118,0.15)` }}
                />
                <div>
                  <p className="text-sm font-semibold text-[#0a1628] dark:text-zinc-100">shadow-{level}</p>
                  <code className="text-xs text-[#6b82a0] dark:text-zinc-500 font-mono">{x}px {y}px {blur}px</code>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Typography — Latin */}
      <section className="space-y-4">
        <SectionHeader
          title="Typography Scale — Latin"
          subtitle="KBZ Bank · KBZ Pay · Premium Bank. Line-height percentage: 150%."
          tag="typo.json"
        />
        <div className="space-y-5">
          {TYPOGRAPHY_GROUPS.map((group) => (
            <div key={group.label} className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 overflow-hidden">
              <div className="px-5 py-3 border-b border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-900/60">
                <p className="text-xs font-bold text-[#9db0c8] dark:text-zinc-500 uppercase tracking-wider">{group.label}</p>
              </div>
              <div className="divide-y divide-[#dce6f0] dark:divide-zinc-800/60 bg-white dark:bg-transparent">
                {group.tokens.map((t) => (
                  <div
                    key={t.name}
                    className="px-5 py-4 flex items-center gap-6 hover:bg-[#f8fafc] dark:hover:bg-zinc-900/40 transition-colors group"
                  >
                    <div className="w-44 shrink-0">
                      <p className="text-xs text-[#6b82a0] dark:text-zinc-500 font-mono">{t.name}</p>
                      <p className="text-xs text-[#9db0c8] dark:text-zinc-600 font-mono mt-0.5">{t.fontSize}px / {t.lineHeight}px</p>
                    </div>
                    <p
                      className="text-[#0a1628] dark:text-zinc-100 leading-none truncate flex-1 font-medium"
                      style={{ fontSize: `${Math.min(t.fontSize, 36)}px` }}
                    >
                      The quick brown fox
                    </p>
                    <CopyButton
                      code={`font-size: var(--font-size-${t.name.toLowerCase().replace(' ', '-')});`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography — MM */}
      <section className="space-y-4">
        <SectionHeader
          title="Typography Scale — MM"
          subtitle="Myanmar locale — compressed font sizes, identical line heights."
          tag="typo.json"
        />
        <div className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-900/60">
                {['Token', 'MM size', 'Latin size', 'Δ Diff'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-bold text-[#9db0c8] dark:text-zinc-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dce6f0] dark:divide-zinc-800/60 bg-white dark:bg-transparent">
              {TYPOGRAPHY_GROUPS_MM.flatMap((g) =>
                g.tokens.map((t) => {
                  const baseName = g.label.replace(' (MM)', '');
                  const latinGroup = TYPOGRAPHY_GROUPS.find((lg) => lg.label === baseName);
                  const latinToken = latinGroup?.tokens.find((lt) => lt.name === t.name);
                  const diff = latinToken ? t.fontSize - latinToken.fontSize : 0;
                  return (
                    <tr key={`${g.label}-${t.name}`} className="hover:bg-[#f8fafc] dark:hover:bg-zinc-900/40 transition-colors">
                      <td className="px-5 py-3">
                        <span className="text-xs font-mono text-[#3d5070] dark:text-zinc-400">{baseName} / {t.name}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs font-mono font-semibold text-[#0a1628] dark:text-zinc-200">{t.fontSize}px</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs font-mono text-[#6b82a0] dark:text-zinc-500">{latinToken?.fontSize ?? '—'}px</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-mono font-medium ${diff < 0 ? 'text-rose-600 dark:text-rose-400' : diff > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#9db0c8] dark:text-zinc-600'}`}>
                          {diff !== 0 ? `${diff > 0 ? '+' : ''}${diff}px` : '—'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage */}
      <section className="rounded-xl border border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-900/50 p-6 space-y-3">
        <h3 className="text-sm font-semibold text-[#0a1628] dark:text-zinc-200">Using tokens in code</h3>
        <div className="bg-[#0a1628] rounded-lg p-4 font-mono text-xs space-y-1">
          <p><span className="text-[#6b82a0]">/* CSS — use brand + semantic vars */</span></p>
          <p><span className="text-[#92bafb]">.btn-primary</span> {'{'}</p>
          <p className="pl-4">background: <span className="text-[#88e788]">var(--color-primary-500)</span>;</p>
          <p className="pl-4">padding: <span className="text-[#88e788]">var(--spacing-sm) var(--spacing-lg)</span>;</p>
          <p className="pl-4">border-radius: <span className="text-[#88e788]">var(--radius-md)</span>;</p>
          <p className="pl-4">font-size: <span className="text-[#88e788]">var(--font-size-label-01)</span>;</p>
          <p>{'}'}</p>
          <p className="pt-1 text-[#6b82a0">{'/* Switch brand palette */'}</p>
          <p className="text-[#1464eb]">{'<html data-brand="kbz-pay">'}</p>
          <p className="pt-1 text-[#6b82a0]">{'/* TypeScript */'}</p>
          <p><span className="text-[#f2c788]">import</span> {'{ kbzBankColors, spacing }'} <span className="text-[#f2c788]">from</span> <span className="text-[#88e788]">'@/lib/design-tokens'</span>;</p>
        </div>
      </section>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[#002c76] dark:text-[#1464eb] text-xs bg-[#eef2f7] dark:bg-zinc-900 border border-[#c9d5e8] dark:border-zinc-800 px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

function SectionHeader({ title, subtitle, tag }: { title: string; subtitle: string; tag: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-[#0a1628] dark:text-zinc-100">{title}</h2>
        <p className="text-sm text-[#3d5070] dark:text-zinc-500 mt-0.5">{subtitle}</p>
      </div>
      <span className="shrink-0 text-[10px] font-mono text-[#9db0c8] dark:text-zinc-600 border border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-900 px-2 py-1 rounded mt-0.5">
        {tag}
      </span>
    </div>
  );
}

function TokenVisual({ group, value }: { group: string; value: number }) {
  if (value === 0) return <span className="text-xs text-[#9db0c8] dark:text-zinc-700 font-mono">0</span>;
  if (group === 'Border Radius' || group === 'Semantic Radius') {
    return <div className="w-8 h-8 border-2 border-[#b0c0d8] dark:border-zinc-600 bg-[#eef2f7] dark:bg-zinc-800" style={{ borderRadius: value >= 9999 ? '50%' : `${Math.min(value, 32)}px` }} />;
  }
  if (group === 'Elevation') {
    return <div className="w-8 h-8 rounded-md bg-[#eef2f7] dark:bg-zinc-800" style={{ boxShadow: `0 ${value}px ${value * 2}px rgba(0,44,118,0.15)` }} />;
  }
  if (group === 'Spacing' || group === 'Semantic Spacing') {
    return (
      <div className="flex items-center gap-2">
        <div className="h-3 bg-[#002c76]/30 dark:bg-[#1464eb]/40 border border-[#002c76]/20 dark:border-[#1464eb]/30 rounded-sm" style={{ width: `${Math.min(value * 2, 140)}px` }} />
        <span className="text-xs text-[#9db0c8] dark:text-zinc-600 font-mono">{value}px</span>
      </div>
    );
  }
  if (group === 'Size' || group === 'Icon Sizes' || group === 'Avatar Sizes') {
    const dim = Math.min(value, 48);
    return (
      <div className="rounded bg-[#eef2f7] dark:bg-zinc-700/50 border border-[#b0c0d8] dark:border-zinc-700 flex items-center justify-center text-[9px] text-[#6b82a0] dark:text-zinc-500 font-mono"
        style={{ width: `${dim}px`, height: `${dim}px` }}>
        {value}
      </div>
    );
  }
  return <span className="text-xs text-[#9db0c8] dark:text-zinc-600 font-mono">{value}px</span>;
}
