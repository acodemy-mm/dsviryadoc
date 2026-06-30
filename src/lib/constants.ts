export const SITE_VERSION = '0.2.0';

export const PAGE_SECTIONS = [
  'Getting Started',
  'Foundations',
  'Patterns',
  'Resources',
] as const;

export type PageSection = (typeof PAGE_SECTIONS)[number];

export const FIGMA_LIBRARIES = [
  {
    name: 'Virya Style Guide',
    url: 'https://www.figma.com/design/xwWd70m6yIXVkDID7jgMMa/-Virya--Style-Guide',
    description: 'Color variables, typography, elevation',
  },
  {
    name: 'Components',
    url: 'https://www.figma.com/design/CjCABootbKlUjl2pTpSguf/Components',
    description: 'UI component sets',
  },
  {
    name: 'Virya Icons',
    url: 'https://www.figma.com/design/njUEHeHHZ02qyO6zn0SfG0/Virya-Icons',
    description: 'Line-style icon library',
  },
  {
    name: 'Virya Template',
    url: 'https://www.figma.com/design/SplMaZAaA0Fhh3tWlay57d/-Virya--Template',
    description: 'Page and layout templates',
  },
] as const;
