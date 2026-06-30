import type { ComponentType, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CategoryBadge } from '@/components/ui/Badge';
import type { PreviewConfig } from '@/lib/types';

type RegistryEntry = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  defaultPreview: PreviewConfig;
};

export const componentRegistry: Record<string, RegistryEntry> = {
  button: {
    component: Button,
    defaultPreview: {
      defaultProps: { children: 'Button', variant: 'primary', size: 'md' },
      variants: [
        { key: 'primary', label: 'Primary', props: { children: 'Primary', variant: 'primary' } },
        { key: 'secondary', label: 'Secondary', props: { children: 'Secondary', variant: 'secondary' } },
        { key: 'ghost', label: 'Ghost', props: { children: 'Ghost', variant: 'ghost' } },
        { key: 'danger', label: 'Danger', props: { children: 'Delete', variant: 'danger' } },
        { key: 'sm', label: 'Small', props: { children: 'Small', size: 'sm' } },
        { key: 'lg', label: 'Large', props: { children: 'Large', size: 'lg' } },
      ],
    },
  },
  input: {
    component: Input,
    defaultPreview: {
      defaultProps: { label: 'Email', placeholder: 'you@example.com', id: 'preview-input' },
      variants: [
        { key: 'default', label: 'Default', props: { label: 'Email', placeholder: 'you@example.com', id: 'input-default' } },
        { key: 'error', label: 'Error', props: { label: 'Email', placeholder: 'you@example.com', error: 'Invalid email', id: 'input-error' } },
        { key: 'disabled', label: 'Disabled', props: { label: 'Email', placeholder: 'Disabled', disabled: true, id: 'input-disabled' } },
      ],
    },
  },
  badge: {
    component: CategoryBadge,
    defaultPreview: {
      defaultProps: { label: 'Atoms' },
      variants: [
        { key: 'atoms', label: 'Atoms', props: { label: 'Atoms' } },
        { key: 'molecules', label: 'Molecules', props: { label: 'Molecules' } },
        { key: 'organisms', label: 'Organisms', props: { label: 'Organisms' } },
      ],
    },
  },
};

export function getRegistryEntry(slug: string): RegistryEntry | null {
  return componentRegistry[slug] ?? null;
}

export function renderPreviewChildren(props: Record<string, unknown>): ReactNode {
  return props.children as ReactNode;
}
