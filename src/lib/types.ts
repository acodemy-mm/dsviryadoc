export type Category = 'Atoms' | 'Molecules' | 'Organisms' | 'Templates' | 'Pages';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface PreviewVariant {
  key: string;
  label: string;
  props: Record<string, unknown>;
}

export interface PreviewConfig {
  variants?: PreviewVariant[];
  defaultProps?: Record<string, unknown>;
}

export interface DSComponent {
  id: string;
  name: string;
  slug: string;
  category: Category;
  description: string;
  usage_markdown: string;
  code: string;
  thumbnail_url: string | null;
  image_urls: string[] | null;
  props_json: PropDefinition[] | null;
  preview_props: PreviewConfig | null;
  figma_node_url: string | null;
  accessibility_markdown: string | null;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface DSComponentInsert {
  name: string;
  slug: string;
  category: Category;
  description: string;
  usage_markdown: string;
  code: string;
  thumbnail_url?: string | null;
  image_urls?: string[] | null;
  props_json?: PropDefinition[] | null;
  preview_props?: PreviewConfig | null;
  figma_node_url?: string | null;
  accessibility_markdown?: string | null;
  sort_order?: number;
}

export interface DSComponentUpdate extends Partial<DSComponentInsert> {
  id: string;
}

export interface DSPage {
  id: string;
  title: string;
  slug: string;
  section: string;
  content_markdown: string;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface DSPageInsert {
  title: string;
  slug: string;
  section: string;
  content_markdown: string;
  sort_order?: number;
}
