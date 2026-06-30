import { DSComponent } from '@/lib/types';

export function normalizeComponent(raw: Record<string, unknown>): DSComponent {
  return {
    id: raw.id as string,
    name: raw.name as string,
    slug: raw.slug as string,
    category: raw.category as DSComponent['category'],
    description: (raw.description as string) ?? '',
    usage_markdown: (raw.usage_markdown as string) ?? '',
    code: (raw.code as string) ?? '',
    thumbnail_url: (raw.thumbnail_url as string | null) ?? null,
    image_urls: (raw.image_urls as string[] | null) ?? null,
    props_json: (raw.props_json as DSComponent['props_json']) ?? null,
    preview_props: (raw.preview_props as DSComponent['preview_props']) ?? null,
    figma_node_url: (raw.figma_node_url as string | null) ?? null,
    accessibility_markdown: (raw.accessibility_markdown as string | null) ?? null,
    sort_order: raw.sort_order as number | undefined,
    created_at: raw.created_at as string,
    updated_at: raw.updated_at as string,
  };
}
