-- Migration: extend ds_components + add ds_pages
-- Run in Supabase SQL Editor after initial schema

-- New component columns
ALTER TABLE ds_components ADD COLUMN IF NOT EXISTS props_json JSONB DEFAULT NULL;
ALTER TABLE ds_components ADD COLUMN IF NOT EXISTS preview_props JSONB DEFAULT NULL;
ALTER TABLE ds_components ADD COLUMN IF NOT EXISTS figma_node_url TEXT DEFAULT NULL;
ALTER TABLE ds_components ADD COLUMN IF NOT EXISTS accessibility_markdown TEXT NOT NULL DEFAULT '';
ALTER TABLE ds_components ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Static documentation pages
CREATE TABLE IF NOT EXISTS ds_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  section TEXT NOT NULL CHECK (section IN ('Getting Started', 'Foundations', 'Patterns', 'Resources')),
  content_markdown TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ds_pages_slug ON ds_pages(slug);
CREATE INDEX IF NOT EXISTS idx_ds_pages_section ON ds_pages(section);

ALTER TABLE ds_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read ds_pages" ON ds_pages FOR SELECT USING (true);
CREATE POLICY "Authenticated write ds_pages" ON ds_pages FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER ds_pages_updated_at
  BEFORE UPDATE ON ds_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Seed documentation pages
INSERT INTO ds_pages (title, slug, section, content_markdown, sort_order) VALUES
(
  'Introduction',
  'introduction',
  'Getting Started',
  E'# Introduction\n\nVirya is the shared design system for KBZ Bank digital products.\n\n## Principles\n\n- **Consistency**\n- **Efficiency**\n- **Accessibility**',
  0
),
(
  'For Designers',
  'for-designers',
  'Getting Started',
  E'# For Designers\n\nUse Virya Figma libraries: Style Guide, Components, Icons, Template.',
  1
),
(
  'For Developers',
  'for-developers',
  'Getting Started',
  E'# For Developers\n\nSet `data-brand` on `<html>` and use CSS variables from globals.css.',
  2
),
(
  'Brand Setup',
  'brand-setup',
  'Getting Started',
  E'# Brand Setup\n\n| Brand | data-brand | Font |\n| KBZ Bank | kbz-bank | Poppins |',
  3
),
(
  'Icons',
  'icons',
  'Foundations',
  E'# Icons\n\n[Virya Icons](https://www.figma.com/design/njUEHeHHZ02qyO6zn0SfG0/Virya-Icons)',
  0
),
(
  'Accessibility',
  'accessibility',
  'Foundations',
  E'# Accessibility\n\nVirya targets WCAG 2.2 AA.',
  1
),
(
  'Forms',
  'forms',
  'Patterns',
  E'# Forms\n\nCompose forms from Input, Label, Select, and Button.',
  0
),
(
  'Figma Libraries',
  'figma-libraries',
  'Resources',
  E'# Figma Libraries\n\nSubscribe to Virya team libraries in Figma.',
  0
),
(
  'Contributing',
  'contributing',
  'Resources',
  E'# Contributing\n\nAdd components via Admin dashboard.',
  1
)
ON CONFLICT (slug) DO NOTHING;

-- Sample props for Button
UPDATE ds_components SET
  props_json = '[
    {"name":"variant","type":"''primary'' | ''secondary'' | ''ghost'' | ''danger''","default":"''primary''","description":"Visual style"},
    {"name":"size","type":"''sm'' | ''md'' | ''lg''","default":"''md''","description":"Button size"},
    {"name":"children","type":"ReactNode","required":true,"description":"Button content"}
  ]'::jsonb,
  figma_node_url = 'https://www.figma.com/design/CjCABootbKlUjl2pTpSguf/Components'
WHERE slug = 'button';

-- Additional foundation and pattern pages (v0.2.0)
INSERT INTO ds_pages (title, slug, section, content_markdown, sort_order) VALUES
(
  'Spacing & Layout',
  'spacing-layout',
  'Foundations',
  E'# Spacing & Layout\n\nUse numeric spacing tokens. See [Design Tokens](/tokens).',
  2
),
(
  'Elevation & Shadows',
  'elevation',
  'Foundations',
  E'# Elevation & Shadows\n\nElevation tokens define shadow depth for cards, modals, and popovers.',
  3
),
(
  'Motion',
  'motion',
  'Foundations',
  E'# Motion\n\nVirya uses subtle, purposeful motion. Honor prefers-reduced-motion.',
  4
),
(
  'Tables',
  'tables',
  'Patterns',
  E'# Tables\n\nUse tables for structured, comparable data.',
  1
),
(
  'Navigation',
  'navigation',
  'Patterns',
  E'# Navigation\n\nPrimary navigation patterns for banking dashboards.',
  2
),
(
  'Empty States',
  'empty-states',
  'Patterns',
  E'# Empty States\n\nGuide users when a view has no content yet.',
  3
)
ON CONFLICT (slug) DO NOTHING;
