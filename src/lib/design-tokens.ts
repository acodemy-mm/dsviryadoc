/**
 * Design Tokens — KBZ Bank Design System
 *
 * Sources:
 *   typo.json       — Core numeric (spacing, size, radius, elevation) + Typography
 *   viryads.json    — Line-height percentage (150%)
 *   Core.tokens.json — Color palettes per brand (W3C Design Token format)
 *
 * Brands: KBZ Bank · KBZ Pay · Premium Bank · MM (Myanmar locale)
 *
 * All values are in px (as-designed). CSS custom properties are generated
 * in globals.css. Use the `tokens` object for programmatic access.
 */

// ─── Color scale type ────────────────────────────────────────────────────────

export interface ColorScale {
  50:  string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface AlphaScale {
  '50A':  string;
  '100A': string;
  '200A': string;
  '300A': string;
  '400A': string;
  '500A': string;
  '600A': string;
  '700A': string;
  '800A': string;
  '900A': string;
}

// ─── Shared semantic colors (identical across all brands) ────────────────────

export const colorInfo: ColorScale = {
  50:  '#fafdfe', 100: '#ecf6fe', 200: '#cee8fd', 300: '#82c3f7',
  400: '#3b91d8', 500: '#0b7ad5', 600: '#024db1', 700: '#01377e',
  800: '#01214c', 900: '#011128',
};

export const colorSuccess: ColorScale = {
  50:  '#fafffa', 100: '#e8fde8', 200: '#b6f7b6', 300: '#88e788',
  400: '#0ab80a', 500: '#008a00', 600: '#016f01', 700: '#015103',
  800: '#013d03', 900: '#001e01',
};

export const colorWarning: ColorScale = {
  50:  '#fffdfa', 100: '#fef7eb', 200: '#fceacf', 300: '#f2c788',
  400: '#eda63b', 500: '#d28107', 600: '#a86706', 700: '#6e4302',
  800: '#3c2401', 900: '#1e1201',
};

export const colorCritical: ColorScale = {
  50:  '#fffafa', 100: '#fef0f0', 200: '#fecdcd', 300: '#fb9d9d',
  400: '#e23c3c', 500: '#b30909', 600: '#950404', 700: '#720303',
  800: '#3c0101', 900: '#1e0101',
};

export const colorNeutral: ColorScale = {
  50:  '#fdfdfd', 100: '#fafafa', 200: '#f5f5f5', 300: '#e6e6e6',
  400: '#d6d6d6', 500: '#b0b0b0', 600: '#949494', 700: '#666666',
  800: '#424242', 900: '#1a1a1a',
};

export const colorAlpha: AlphaScale = {
  '50A':  'rgba(8, 8, 8, 0.02)',
  '100A': 'rgba(8, 8, 8, 0.08)',
  '200A': 'rgba(8, 8, 8, 0.21)',
  '300A': 'rgba(8, 8, 8, 0.32)',
  '400A': 'rgba(8, 8, 8, 0.42)',
  '500A': 'rgba(8, 8, 8, 0.55)',
  '600A': 'rgba(8, 8, 8, 0.67)',
  '700A': 'rgba(8, 8, 8, 0.82)',
  '800A': 'rgba(8, 8, 8, 0.92)',
  '900A': 'rgba(8, 8, 8, 0.96)',
};

// ─── Brand color palettes ────────────────────────────────────────────────────

/** KBZ Bank — Primary: deep navy blue · Secondary: bold red */
export const kbzBankColors = {
  primary: {
    50:  '#fafcff', 100: '#f0f5ff', 200: '#e1ecfe', 300: '#92bafb',
    400: '#1464eb', 500: '#002c76', 600: '#012460', 700: '#011b47',
    800: '#03122b', 900: '#010913',
  } as ColorScale,
  secondary: {
    50:  '#fefbfb', 100: '#fdf2f3', 200: '#f9d2d4', 300: '#f3a5a9',
    400: '#c94a50', 500: '#b51f26', 600: '#911218', 700: '#69070b',
    800: '#3d0104', 900: '#280103',
  } as ColorScale,
};

/** KBZ Pay — Primary: medium blue · Secondary: cyan / teal */
export const kbzPayColors = {
  primary: {
    50:  '#fafdff', 100: '#e5f2ff', 200: '#d7ebfe', 300: '#86c0f9',
    400: '#1371cd', 500: '#0054a6', 600: '#00468a', 700: '#00386f',
    800: '#002a53', 900: '#001c37',
  } as ColorScale,
  secondary: {
    50:  '#fafeff', 100: '#e7f9fe', 200: '#d0f2fb', 300: '#9ae1f4',
    400: '#84d9f0', 500: '#5ad2f2', 600: '#15b9e5', 700: '#13a2c9',
    800: '#0f708a', 900: '#0a4757',
  } as ColorScale,
};

/** Premium Bank — Primary: dark navy-slate · Secondary: gold */
export const premiumBankColors = {
  primary: {
    50:  '#fbfcfe', 100: '#f0f4fa', 200: '#dae2f1', 300: '#b7c5e1',
    400: '#435d89', 500: '#1d2d49', 600: '#152237', 700: '#0e1725',
    800: '#080e16', 900: '#030507',
  } as ColorScale,
  secondary: {
    50:  '#fefdfb', 100: '#f6f3e9', 200: '#ede4cf', 300: '#e2d3b1',
    400: '#d7c293', 500: '#cbb075', 600: '#b99546', 700: '#957737',
    800: '#685427', 900: '#3b3016',
  } as ColorScale,
};

export type BrandColors = typeof kbzBankColors;

export const brandColors: Record<Brand, BrandColors> = {
  'kbz-bank':     kbzBankColors,
  'kbz-pay':      kbzPayColors,
  'premium-bank': premiumBankColors,
};

// ─── Brand metadata ──────────────────────────────────────────────────────────

export const BRAND_META: Record<Brand, { label: string; primaryHex: string; secondaryHex: string }> = {
  'kbz-bank':     { label: 'KBZ Bank',     primaryHex: '#002c76', secondaryHex: '#b51f26' },
  'kbz-pay':      { label: 'KBZ Pay',      primaryHex: '#0054a6', secondaryHex: '#5ad2f2' },
  'premium-bank': { label: 'Premium Bank', primaryHex: '#1d2d49', secondaryHex: '#cbb075' },
};

/** Brand typography — Google Fonts. CSS var --font-sans is set per data-brand. */
export const BRAND_FONTS: Record<Brand, { name: string; url: string; cssVar: string }> = {
  'kbz-bank':     { name: 'Poppins',  url: 'https://fonts.google.com/specimen/Poppins',  cssVar: '--font-poppins' },
  'kbz-pay':      { name: 'Nunito',   url: 'https://fonts.google.com/specimen/Nunito',   cssVar: '--font-nunito' },
  'premium-bank': { name: 'Inter',    url: 'https://fonts.google.com/specimen/Inter',    cssVar: '--font-inter' },
};

// ─── Primitive numeric tokens (shared across all brands) ─────────────────────

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
} as const;

export const size = {
  0: 0,
  1: 8,
  2: 12,
  3: 16,
  4: 24,
  5: 28,
  6: 32,
  7: 44,
  8: 48,
  9: 56,
} as const;

export const borderRadius = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  full: 9999,
} as const;

export const elevation = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 7,
  6: 16,
} as const;

// ─── Semantic system aliases ─────────────────────────────────────────────────

export const semanticSpacing = {
  xs: spacing[1],   // 4px
  sm: spacing[2],   // 8px
  md: spacing[3],   // 12px
  lg: spacing[4],   // 16px
  xl: spacing[6],   // 24px
} as const;

export const semanticRadius = {
  sm: borderRadius[1],  // 4px
  md: borderRadius[2],  // 8px
  lg: borderRadius[4],  // 16px
  full: borderRadius.full,
} as const;

export const iconSize = {
  xs: size[1],   // 8px
  sm: size[3],   // 16px
  md: size[4],   // 24px
  lg: size[5],   // 28px
} as const;

export const avatarSize = {
  sm: size[4],   // 24px
  md: size[5],   // 28px
  lg: size[6],   // 32px
} as const;

/** Shadow values derived from elevation tokens: [x, y, blur] in px */
export const shadowElevation = {
  sm:  { x: elevation[0], y: elevation[1], blur: elevation[3] },  // 0 1 3
  md:  { x: elevation[1], y: elevation[2], blur: elevation[5] },  // 1 2 7
  lg:  { x: elevation[2], y: elevation[4], blur: elevation[6] },  // 2 4 16
} as const;

// ─── Typography — KBZ Bank & KBZ Pay & Premium Bank (Latin) ──────────────────

export const typographyLatin = {
  fontSize: {
    display: { 'display-01': 56, 'display-02': 48 },
    header:  { h1: 40, h2: 36, h3: 32, h4: 28, h5: 24, h6: 22 },
    title:   { 'title-01': 18, 'title-02': 16 },
    body:    { 'body-01': 15, 'body-02': 14 },
    label:   { 'label-01': 13, 'label-02': 12, 'label-03': 11 },
    overline: { 'overline-01': 13, 'overline-02': 12 },
  },
  lineHeight: {
    display: { 'display-01': 91, 'display-02': 78 },
    header:  { h1: 65, h2: 58, h3: 52, h4: 45, h5: 39, h6: 36 },
    title:   { 'title-01': 29, 'title-02': 26 },
    body:    { 'body-01': 24, 'body-02': 23 },
    label:   { 'label-01': 21, 'label-02': 19, 'label-03': 18 },
    overline: { 'overline-01': 21, 'overline-02': 19 },
  },
  /** Line height as percentage (from viryads.json) */
  lineHeightPct: '150%',
} as const;

// ─── Typography — MM (Myanmar locale, slightly compressed scale) ──────────────

export const typographyMM = {
  fontSize: {
    display: { 'display-01': 50, 'display-02': 44 },
    header:  { h1: 37, h2: 34, h3: 30, h4: 26, h5: 22, h6: 20 },
    title:   { 'title-01': 16, 'title-02': 14 },
    body:    { 'body-01': 13, 'body-02': 12 },
    label:   { 'label-01': 11, 'label-02': 10, 'label-03': 9 },
    overline: { 'overline-01': 11, 'overline-02': 10 },
  },
  lineHeight: {
    display: { 'display-01': 91, 'display-02': 78 },
    header:  { h1: 65, h2: 58, h3: 52, h4: 45, h5: 39, h6: 36 },
    title:   { 'title-01': 29, 'title-02': 26 },
    body:    { 'body-01': 24, 'body-02': 23 },
    label:   { 'label-01': 21, 'label-02': 19, 'label-03': 18 },
    overline: { 'overline-01': 21, 'overline-02': 19 },
  },
} as const;

// ─── Brand-keyed token map ───────────────────────────────────────────────────

export type Brand = 'kbz-bank' | 'kbz-pay' | 'premium-bank';

export const brandTypography: Record<Brand, typeof typographyLatin> = {
  'kbz-bank':     typographyLatin,
  'kbz-pay':      typographyLatin,
  'premium-bank': typographyLatin,
};

// ─── Flat token map (for CSS var generation & token preview UI) ───────────────

export type TokenGroup = {
  label: string;
  description: string;
  tokens: { name: string; value: number | string; unit?: string }[];
};

export const TOKEN_GROUPS: TokenGroup[] = [
  {
    label: 'Spacing',
    description: 'Base spacing scale — 4px grid',
    tokens: Object.entries(spacing).map(([k, v]) => ({
      name: `spacing-${k}`,
      value: v,
      unit: 'px',
    })),
  },
  {
    label: 'Size',
    description: 'Component size scale — used for icons, avatars, touch targets',
    tokens: Object.entries(size).map(([k, v]) => ({
      name: `size-${k}`,
      value: v,
      unit: 'px',
    })),
  },
  {
    label: 'Border Radius',
    description: 'Corner radius tokens from sharp to pill',
    tokens: Object.entries(borderRadius).map(([k, v]) => ({
      name: `radius-${k}`,
      value: v,
      unit: 'px',
    })),
  },
  {
    label: 'Elevation',
    description: 'Shadow depth levels — maps to shadow x/y/blur offsets',
    tokens: Object.entries(elevation).map(([k, v]) => ({
      name: `elevation-${k}`,
      value: v,
      unit: 'px',
    })),
  },
  {
    label: 'Semantic Spacing',
    description: 'Named aliases for common spacing needs',
    tokens: Object.entries(semanticSpacing).map(([k, v]) => ({
      name: `spacing-${k}`,
      value: v,
      unit: 'px',
    })),
  },
  {
    label: 'Semantic Radius',
    description: 'Named aliases for common radius needs',
    tokens: Object.entries(semanticRadius).map(([k, v]) => ({
      name: `radius-${k}`,
      value: v,
      unit: 'px',
    })),
  },
  {
    label: 'Icon Sizes',
    description: 'Standardised icon dimensions',
    tokens: Object.entries(iconSize).map(([k, v]) => ({
      name: `icon-${k}`,
      value: v,
      unit: 'px',
    })),
  },
  {
    label: 'Avatar Sizes',
    description: 'Standardised avatar dimensions',
    tokens: Object.entries(avatarSize).map(([k, v]) => ({
      name: `avatar-${k}`,
      value: v,
      unit: 'px',
    })),
  },
];

export const TYPOGRAPHY_GROUPS = [
  {
    label: 'Display',
    tokens: [
      { name: 'Display 01', fontSize: typographyLatin.fontSize.display['display-01'], lineHeight: typographyLatin.lineHeight.display['display-01'] },
      { name: 'Display 02', fontSize: typographyLatin.fontSize.display['display-02'], lineHeight: typographyLatin.lineHeight.display['display-02'] },
    ],
  },
  {
    label: 'Header',
    tokens: [
      { name: 'H1', fontSize: typographyLatin.fontSize.header.h1, lineHeight: typographyLatin.lineHeight.header.h1 },
      { name: 'H2', fontSize: typographyLatin.fontSize.header.h2, lineHeight: typographyLatin.lineHeight.header.h2 },
      { name: 'H3', fontSize: typographyLatin.fontSize.header.h3, lineHeight: typographyLatin.lineHeight.header.h3 },
      { name: 'H4', fontSize: typographyLatin.fontSize.header.h4, lineHeight: typographyLatin.lineHeight.header.h4 },
      { name: 'H5', fontSize: typographyLatin.fontSize.header.h5, lineHeight: typographyLatin.lineHeight.header.h5 },
      { name: 'H6', fontSize: typographyLatin.fontSize.header.h6, lineHeight: typographyLatin.lineHeight.header.h6 },
    ],
  },
  {
    label: 'Title',
    tokens: [
      { name: 'Title 01', fontSize: typographyLatin.fontSize.title['title-01'], lineHeight: typographyLatin.lineHeight.title['title-01'] },
      { name: 'Title 02', fontSize: typographyLatin.fontSize.title['title-02'], lineHeight: typographyLatin.lineHeight.title['title-02'] },
    ],
  },
  {
    label: 'Body',
    tokens: [
      { name: 'Body 01', fontSize: typographyLatin.fontSize.body['body-01'], lineHeight: typographyLatin.lineHeight.body['body-01'] },
      { name: 'Body 02', fontSize: typographyLatin.fontSize.body['body-02'], lineHeight: typographyLatin.lineHeight.body['body-02'] },
    ],
  },
  {
    label: 'Label',
    tokens: [
      { name: 'Label 01', fontSize: typographyLatin.fontSize.label['label-01'], lineHeight: typographyLatin.lineHeight.label['label-01'] },
      { name: 'Label 02', fontSize: typographyLatin.fontSize.label['label-02'], lineHeight: typographyLatin.lineHeight.label['label-02'] },
      { name: 'Label 03', fontSize: typographyLatin.fontSize.label['label-03'], lineHeight: typographyLatin.lineHeight.label['label-03'] },
    ],
  },
  {
    label: 'Overline',
    tokens: [
      { name: 'Overline 01', fontSize: typographyLatin.fontSize.overline['overline-01'], lineHeight: typographyLatin.lineHeight.overline['overline-01'] },
      { name: 'Overline 02', fontSize: typographyLatin.fontSize.overline['overline-02'], lineHeight: typographyLatin.lineHeight.overline['overline-02'] },
    ],
  },
];

export const TYPOGRAPHY_GROUPS_MM = [
  {
    label: 'Display (MM)',
    tokens: [
      { name: 'Display 01', fontSize: typographyMM.fontSize.display['display-01'], lineHeight: typographyMM.lineHeight.display['display-01'] },
      { name: 'Display 02', fontSize: typographyMM.fontSize.display['display-02'], lineHeight: typographyMM.lineHeight.display['display-02'] },
    ],
  },
  {
    label: 'Header (MM)',
    tokens: [
      { name: 'H1', fontSize: typographyMM.fontSize.header.h1, lineHeight: typographyMM.lineHeight.header.h1 },
      { name: 'H2', fontSize: typographyMM.fontSize.header.h2, lineHeight: typographyMM.lineHeight.header.h2 },
      { name: 'H3', fontSize: typographyMM.fontSize.header.h3, lineHeight: typographyMM.lineHeight.header.h3 },
      { name: 'H4', fontSize: typographyMM.fontSize.header.h4, lineHeight: typographyMM.lineHeight.header.h4 },
      { name: 'H5', fontSize: typographyMM.fontSize.header.h5, lineHeight: typographyMM.lineHeight.header.h5 },
      { name: 'H6', fontSize: typographyMM.fontSize.header.h6, lineHeight: typographyMM.lineHeight.header.h6 },
    ],
  },
  {
    label: 'Title (MM)',
    tokens: [
      { name: 'Title 01', fontSize: typographyMM.fontSize.title['title-01'], lineHeight: typographyMM.lineHeight.title['title-01'] },
      { name: 'Title 02', fontSize: typographyMM.fontSize.title['title-02'], lineHeight: typographyMM.lineHeight.title['title-02'] },
    ],
  },
  {
    label: 'Body (MM)',
    tokens: [
      { name: 'Body 01', fontSize: typographyMM.fontSize.body['body-01'], lineHeight: typographyMM.lineHeight.body['body-01'] },
      { name: 'Body 02', fontSize: typographyMM.fontSize.body['body-02'], lineHeight: typographyMM.lineHeight.body['body-02'] },
    ],
  },
  {
    label: 'Label (MM)',
    tokens: [
      { name: 'Label 01', fontSize: typographyMM.fontSize.label['label-01'], lineHeight: typographyMM.lineHeight.label['label-01'] },
      { name: 'Label 02', fontSize: typographyMM.fontSize.label['label-02'], lineHeight: typographyMM.lineHeight.label['label-02'] },
      { name: 'Label 03', fontSize: typographyMM.fontSize.label['label-03'], lineHeight: typographyMM.lineHeight.label['label-03'] },
    ],
  },
  {
    label: 'Overline (MM)',
    tokens: [
      { name: 'Overline 01', fontSize: typographyMM.fontSize.overline['overline-01'], lineHeight: typographyMM.lineHeight.overline['overline-01'] },
      { name: 'Overline 02', fontSize: typographyMM.fontSize.overline['overline-02'], lineHeight: typographyMM.lineHeight.overline['overline-02'] },
    ],
  },
];
