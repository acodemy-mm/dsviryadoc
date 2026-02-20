export type Category = 'Atoms' | 'Molecules' | 'Organisms' | 'Templates' | 'Pages';

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
}

export interface DSComponentUpdate extends Partial<DSComponentInsert> {
  id: string;
}
