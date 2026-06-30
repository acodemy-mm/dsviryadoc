import type { DSPage } from '@/lib/types';

export const SEED_PAGES: DSPage[] = [
  {
    id: 'seed-intro',
    title: 'Introduction',
    slug: 'introduction',
    section: 'Getting Started',
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Introduction

Virya is the shared design system for KBZ Bank digital products. It provides tokens, components, and patterns so teams can ship consistent, accessible experiences faster.

## Principles

- **Consistency** — One visual language across KBZ Bank, KBZ Pay, and Premium Bank
- **Efficiency** — Reusable tokens and components reduce design and dev duplication
- **Accessibility** — WCAG 2.2 AA as the baseline for all components

## Audience

This documentation serves product designers, frontend engineers, and QA teams building customer-facing banking applications.

> **Do**
>
> Start with tokens and foundations before composing new screens.

> **Don't**
>
> Introduce one-off colors or spacing values outside the token system.
`,
  },
  {
    id: 'seed-designers',
    title: 'For Designers',
    slug: 'for-designers',
    section: 'Getting Started',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# For Designers

Use the subscribed Virya Figma libraries — never ad-hoc values when a token or component exists.

## Figma libraries

| Library | Purpose |
|---------|---------|
| [Virya Style Guide](https://www.figma.com/design/xwWd70m6yIXVkDID7jgMMa/-Virya--Style-Guide) | Color variables, typography, elevation |
| [Components](https://www.figma.com/design/CjCABootbKlUjl2pTpSguf/Components) | UI component sets |
| [Virya Icons](https://www.figma.com/design/njUEHeHHZ02qyO6zn0SfG0/Virya-Icons) | Line-style icons |
| [Virya Template](https://www.figma.com/design/SplMaZAaA0Fhh3tWlay57d/-Virya--Template) | Page templates |

## Token tiers

- **Core** — primitive ramps (primary, secondary, neutral, semantic)
- **System** — semantic aliases for surface, text, icon, and border

> **Do**
>
> Use published components from the Components library.

> **Don't**
>
> Detach instances or override fills with raw hex values.
`,
  },
  {
    id: 'seed-developers',
    title: 'For Developers',
    slug: 'for-developers',
    section: 'Getting Started',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# For Developers

## Brand setup

Set \`data-brand\` on the \`<html>\` element to switch palettes and fonts:

\`\`\`html
<html data-brand="kbz-bank">
\`\`\`

Supported values: \`kbz-bank\`, \`kbz-pay\`, \`premium-bank\`.

## CSS variables

Tokens are exposed as CSS custom properties in \`globals.css\`. Import the stylesheet and reference variables:

\`\`\`css
.card {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  background: var(--color-primary-50);
}
\`\`\`

## TypeScript tokens

Use \`design-tokens.ts\` for programmatic access to colors, spacing, and typography scales.

Browse the [Design Tokens](/tokens) page to copy any value.
`,
  },
  {
    id: 'seed-brand-setup',
    title: 'Brand Setup',
    slug: 'brand-setup',
    section: 'Getting Started',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Brand Setup

Each brand uses a distinct primary/secondary palette and typeface.

| Brand | \`data-brand\` | Font |
|-------|--------------|------|
| KBZ Bank | \`kbz-bank\` | Poppins |
| KBZ Pay | \`kbz-pay\` | Nunito |
| Premium Bank | \`premium-bank\` | Inter |

## MM locale

Myanmar locale uses a compressed typography scale. See the **MM (Myanmar)** tab on the [Typography section](/tokens) for size tokens.

Use \`typographyMM\` from \`design-tokens.ts\` when rendering Burmese content.
`,
  },
  {
    id: 'seed-icons',
    title: 'Icons',
    slug: 'icons',
    section: 'Foundations',
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Icons

Virya Icons is a line-style icon set used across all brands.

## Library

[Virya Icons on Figma](https://www.figma.com/design/njUEHeHHZ02qyO6zn0SfG0/Virya-Icons)

## Sizes

| Token | Size |
|-------|------|
| \`icon-xs\` | 8px |
| \`icon-sm\` | 16px |
| \`icon-md\` | 24px |
| \`icon-lg\` | 28px |

> **Do**
>
> Match icon size to adjacent text scale.

> **Don't**
>
> Mix filled and line icons in the same view.
`,
  },
  {
    id: 'seed-a11y',
    title: 'Accessibility',
    slug: 'accessibility',
    section: 'Foundations',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Accessibility

Virya targets **WCAG 2.2 AA** compliance.

## Requirements

- Minimum 4.5:1 contrast for body text
- Visible focus indicators on all interactive elements
- Keyboard operability for all actions
- Descriptive labels for form fields and buttons

## Per-component guidance

Each component page includes an **Accessibility** tab with keyboard and ARIA notes.

> **Do**
>
> Test with keyboard-only navigation before shipping.

> **Don't**
>
> Rely on color alone to convey status — pair with text or icons.
`,
  },
  {
    id: 'seed-forms',
    title: 'Forms',
    slug: 'forms',
    section: 'Patterns',
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Forms

Compose forms from Input, Label, Select, and Button atoms.

## Layout

- Stack fields vertically with \`spacing-4\` (16px) gap
- Place primary submit action right-aligned or full-width on mobile
- Show inline validation errors below the field

> **Do**
>
> Provide visible labels for every input.

> **Don't**
>
> Use placeholder text as the only label.
`,
  },
  {
    id: 'seed-figma',
    title: 'Figma Libraries',
    slug: 'figma-libraries',
    section: 'Resources',
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Figma Libraries

All Virya design assets live in team libraries:

- [Virya Style Guide](https://www.figma.com/design/xwWd70m6yIXVkDID7jgMMa/-Virya--Style-Guide)
- [Components](https://www.figma.com/design/CjCABootbKlUjl2pTpSguf/Components)
- [Virya Icons](https://www.figma.com/design/njUEHeHHZ02qyO6zn0SfG0/Virya-Icons)
- [Virya Template](https://www.figma.com/design/SplMaZAaA0Fhh3tWlay57d/-Virya--Template)

Subscribe to these libraries in your Figma project before designing new screens.
`,
  },
  {
    id: 'seed-contributing',
    title: 'Contributing',
    slug: 'contributing',
    section: 'Resources',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Contributing

## Adding components

1. Design in Figma using Virya libraries
2. Implement in \`src/components/ui/\`
3. Add to the component registry
4. Document via Admin → Add Component

## Token changes

Update Figma variables first, then run \`npm run sync:tokens\` to regenerate \`design-tokens.ts\`.
`,
  },
];
