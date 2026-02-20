'use client';

import { useState, useCallback } from 'react';
import { BRAND_META, brandColors, type Brand, type ColorScale } from '@/lib/design-tokens';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

const BRANDS: Brand[] = ['kbz-bank', 'kbz-pay', 'premium-bank'];
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

function useCopyHex() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = useCallback(async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1800);
  }, []);
  return { copied, copy };
}

export function ColorSection() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-[#9db0c8] dark:text-zinc-500">All brand palettes below.</p>
      <div className="border border-[#c9d5e8] dark:border-zinc-800 rounded-xl p-4 bg-[#f8fafc] dark:bg-zinc-950/50 space-y-8">
        {BRANDS.map((brand) => {
          const palette = brandColors[brand];
          const meta = BRAND_META[brand];
          return (
            <div key={brand} className="space-y-4">
              <div className="flex items-center gap-2 py-1 border-b border-[#c9d5e8] dark:border-zinc-800 -mx-4 px-4 -mt-1">
                <div className="flex gap-1">
                  <span className="w-4 h-4 rounded-full border border-black/10" style={{ background: meta.primaryHex }} />
                  <span className="w-4 h-4 rounded-full border border-black/10" style={{ background: meta.secondaryHex }} />
                </div>
                <span className="text-sm font-semibold text-[#0a1628] dark:text-zinc-200">{meta.label}</span>
                <code className="text-[10px] font-mono text-[#9db0c8] dark:text-zinc-600 ml-2">data-brand=&quot;{brand}&quot;</code>
              </div>
              <BrandPalette label="Primary" scale={palette.primary} prefix="color-primary" accent={meta.primaryHex} />
              <BrandPalette label="Secondary" scale={palette.secondary} prefix="color-secondary" accent={meta.secondaryHex} />
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-[#c9d5e8] dark:border-zinc-800 bg-[#f0f4fa] dark:bg-zinc-900/60 text-xs font-mono text-[#6b82a0] dark:text-zinc-500">
                <span className="text-[#9db0c8] dark:text-zinc-700">Activate:</span>
                <code className="text-[#002c76] dark:text-[#1464eb]">{'<html data-brand="'}{brand}{'">'}</code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BrandPalette({ label, scale, prefix, accent }: {
  label: string;
  scale: ColorScale;
  prefix: string;
  accent: string;
}) {
  const { copied, copy } = useCopyHex();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0" style={{ background: accent }} />
        <h3 className="text-sm font-semibold text-[#0a1628] dark:text-zinc-200">{label}</h3>
        <code className="text-[10px] font-mono text-[#9db0c8] dark:text-zinc-600 ml-1">--{prefix}-*</code>
        <span className="text-[10px] text-[#9db0c8] dark:text-zinc-600 ml-auto">Click any swatch to copy hex</span>
      </div>

      <div className="grid grid-cols-10 gap-1.5">
        {STEPS.map((step) => {
          const hex = scale[step];
          const isCopied = copied === hex;
          const isHighlight = step === 500;
          const isLight = step <= 200;

          return (
            <button
              key={step}
              onClick={() => copy(hex)}
              title={`${hex} — click to copy`}
              className="group relative flex flex-col gap-1 focus:outline-none"
            >
              <div
                className={cn(
                  'h-14 w-full rounded-lg border transition-all duration-150',
                  'group-hover:scale-105 group-hover:shadow-lg',
                  'focus-visible:ring-2 focus-visible:ring-[#002c76]',
                  isHighlight
                    ? 'ring-2 ring-[#002c76]/30 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 border-transparent'
                    : 'border-black/8'
                )}
                style={{ background: hex }}
              >
                {/* Copy feedback overlay */}
                {isCopied && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20">
                    <Check className={cn('w-4 h-4', isLight ? 'text-black' : 'text-white')} />
                  </div>
                )}
                {/* Hover copy icon */}
                {!isCopied && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                    <Copy className={cn('w-3.5 h-3.5', isLight ? 'text-black/60' : 'text-white/80')} />
                  </div>
                )}
              </div>

              {/* Step label */}
              <p className={cn(
                'text-[10px] font-mono text-center transition-colors',
                isCopied
                  ? 'text-[#002c76] dark:text-[#1464eb] font-semibold'
                  : 'text-[#9db0c8] dark:text-zinc-600'
              )}>
                {isCopied ? '✓' : step}
              </p>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-[#0a1628] dark:bg-zinc-900 border border-[#c9d5e8] dark:border-zinc-700 rounded-lg px-2.5 py-1.5 shadow-xl whitespace-nowrap">
                  <p className="text-[10px] font-mono text-[#9db0c8] dark:text-zinc-400 mb-0.5">--{prefix}-{step}</p>
                  <p className="text-xs font-mono text-white dark:text-zinc-100 font-semibold">{hex}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Exported reusable swatch rows for the tokens page ─────────────────── */

export function SwatchRow({ scale, prefix, onCopy }: {
  scale: ColorScale;
  prefix: string;
  onCopy?: (hex: string) => void;
}) {
  const { copied, copy } = useCopyHex();

  return (
    <div className="grid grid-cols-10 gap-1">
      {(Object.entries(scale) as [string, string][]).map(([step, hex]) => {
        const isCopied = copied === hex;
        const isLight = parseInt(step) <= 200;
        return (
          <button
            key={step}
            onClick={() => copy(hex)}
            title={`${hex} — click to copy`}
            className="group relative flex flex-col gap-1 focus:outline-none"
          >
            <div
              className="h-10 w-full rounded-md border border-black/8 transition-all duration-150 group-hover:scale-105 group-hover:shadow-md relative overflow-hidden"
              style={{ background: hex }}
            >
              {isCopied && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/15 rounded-md">
                  <Check className={cn('w-3.5 h-3.5', isLight ? 'text-black' : 'text-white')} />
                </div>
              )}
              {!isCopied && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className={cn('w-3 h-3', isLight ? 'text-black/60' : 'text-white/80')} />
                </div>
              )}
            </div>
            <p className={cn(
              'text-[9px] font-mono text-center',
              isCopied ? 'text-[#002c76] dark:text-[#1464eb]' : 'text-[#9db0c8] dark:text-zinc-600'
            )}>
              {isCopied ? '✓' : step}
            </p>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-[#0a1628] dark:bg-zinc-900 border border-[#c9d5e8] dark:border-zinc-700 rounded-md px-2 py-1 shadow-lg whitespace-nowrap">
                <p className="text-[9px] font-mono text-[#9db0c8] dark:text-zinc-400">{step}</p>
                <p className="text-[10px] font-mono text-white dark:text-zinc-100 font-semibold">{hex}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function AlphaSwatchRow({ scale, prefix }: {
  scale: Record<string, string>;
  prefix: string;
}) {
  const { copied, copy } = useCopyHex();

  return (
    <div className="grid grid-cols-10 gap-1">
      {Object.entries(scale).map(([step, val]) => {
        const isCopied = copied === val;
        return (
          <button
            key={step}
            onClick={() => copy(val)}
            title={`${val} — click to copy`}
            className="group relative flex flex-col gap-1 focus:outline-none"
          >
            <div className="relative h-10 w-full rounded-md border border-[#c9d5e8] dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-800">
              <div className="absolute inset-0 rounded-md" style={{ background: val }} />
              {isCopied && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md">
                  <Check className="w-3.5 h-3.5 text-black" />
                </div>
              )}
              {!isCopied && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 rounded-md">
                  <Copy className="w-3 h-3 text-black/40" />
                </div>
              )}
            </div>
            <p className={cn(
              'text-[9px] font-mono text-center',
              isCopied ? 'text-[#002c76] dark:text-[#1464eb]' : 'text-[#9db0c8] dark:text-zinc-600'
            )}>
              {isCopied ? '✓' : step.replace('A', '')}
            </p>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-[#0a1628] dark:bg-zinc-900 border border-[#c9d5e8] dark:border-zinc-700 rounded-md px-2 py-1 shadow-lg whitespace-nowrap">
                <p className="text-[9px] font-mono text-[#9db0c8] dark:text-zinc-400">{step}</p>
                <p className="text-[10px] font-mono text-white dark:text-zinc-100 font-semibold">{val}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
