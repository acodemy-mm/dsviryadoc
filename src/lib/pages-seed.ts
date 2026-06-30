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
    id: 'seed-spacing',
    title: 'Spacing & Layout',
    slug: 'spacing-layout',
    section: 'Foundations',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Spacing & Layout

Use numeric spacing tokens for padding, margin, and gap. See the [Design Tokens](/tokens) page for the full scale.

## Grid

- Use \`spacing-4\` (16px) as the default gap between form fields
- Page content max-width: 1280px (\`max-w-7xl\`)
- Sidebar width: 240px on desktop

## Common tokens

| Token | Value | Use |
|-------|-------|-----|
| \`spacing-2\` | 8px | Tight inline gaps |
| \`spacing-4\` | 16px | Form field spacing |
| \`spacing-6\` | 24px | Section padding |
| \`spacing-8\` | 32px | Page section gaps |

> **Do**
>
> Use spacing tokens from the design system.

> **Don't**
>
> Use arbitrary pixel values like \`13px\` or \`17px\`.
`,
  },
  {
    id: 'seed-elevation',
    title: 'Elevation & Shadows',
    slug: 'elevation',
    section: 'Foundations',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Elevation & Shadows

Elevation tokens define shadow depth for cards, modals, and popovers.

Browse elevation values on the [Design Tokens](/tokens) page under **Elevation**.

## Usage

- **Level 1** — Cards at rest, subtle separation from background
- **Level 2** — Dropdowns, tooltips
- **Level 3** — Modals, dialogs

> **Do**
>
> Match elevation level to UI hierarchy — higher layers get stronger shadows.

> **Don't**
>
> Stack multiple shadow levels on the same element.
`,
  },
  {
    id: 'seed-motion',
    title: 'Motion',
    slug: 'motion',
    section: 'Foundations',
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Motion

Virya uses subtle, purposeful motion to reinforce hierarchy and feedback.

## Principles

- **Fast** — UI transitions 150–200ms
- **Purposeful** — Motion guides attention, never decorates
- **Respectful** — Honor \`prefers-reduced-motion\`

## Common patterns

- Button hover: \`transition-all duration-150\`
- Modal enter: fade + scale from 95%
- Sidebar drawer: slide from left

> **Do**
>
> Use CSS transitions on interactive states.

> **Don't**
>
> Animate large layout shifts that cause disorientation.
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
    id: 'seed-tables',
    title: 'Tables',
    slug: 'tables',
    section: 'Patterns',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Tables

Use tables for structured, comparable data — transactions, account lists, audit logs.

## Structure

- Sticky header row on scroll
- Zebra striping optional; prefer subtle row dividers
- Right-align numeric columns
- Include empty state when no rows

> **Do**
>
> Provide sort indicators on sortable columns.

> **Don't**
>
> Use tables for layout — use CSS grid or flex instead.
`,
  },
  {
    id: 'seed-navigation',
    title: 'Navigation',
    slug: 'navigation',
    section: 'Patterns',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Navigation

Primary navigation patterns for banking dashboards.

## Sidebar

- Collapsible on mobile (drawer)
- Active item uses primary brand color
- Group items by section with uppercase labels

## Breadcrumbs

Show path: Home → Section → Page. Use on detail and documentation pages.

> **Do**
>
> Keep primary nav to 5–7 top-level items.

> **Don't**
>
> Nest more than two levels in the sidebar.
`,
  },
  {
    id: 'seed-empty-states',
    title: 'Empty States',
    slug: 'empty-states',
    section: 'Patterns',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    content_markdown: `# Empty States

Guide users when a view has no content yet.

## Anatomy

- Illustration or icon
- Headline explaining the state
- Supporting description (optional)
- Primary action to resolve (e.g. "Add component")

> **Do**
>
> Offer a clear next step.

> **Don't**
>
> Show a blank screen with no explanation.
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
