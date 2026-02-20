/**
 * Database Setup Script
 * 
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=<your-secret-key> node scripts/setup-db.mjs
 * 
 * Get your secret key from:
 *   https://supabase.com/dashboard/project/gyouzknxbjjwdxnswnex/settings/api
 *   → Project API Keys → "service_role" → Reveal
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gyouzknxbjjwdxnswnex.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY || SERVICE_KEY === 'REPLACE_WITH_SECRET_KEY') {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable.');
  console.error('');
  console.error('  Get it from:');
  console.error('  https://supabase.com/dashboard/project/gyouzknxbjjwdxnswnex/settings/api');
  console.error('  → Project API Keys → service_role → Reveal');
  console.error('');
  console.error('  Then run:');
  console.error('  SUPABASE_SERVICE_ROLE_KEY=sb_secret_... node scripts/setup-db.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const SQL = `
CREATE TABLE IF NOT EXISTS ds_components (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages')),
  description TEXT NOT NULL DEFAULT '',
  usage_markdown TEXT NOT NULL DEFAULT '',
  code TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ds_components_updated_at ON ds_components;
CREATE TRIGGER ds_components_updated_at
  BEFORE UPDATE ON ds_components
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_ds_components_slug ON ds_components(slug);
CREATE INDEX IF NOT EXISTS idx_ds_components_category ON ds_components(category);

ALTER TABLE ds_components ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access" ON ds_components;
CREATE POLICY "Public read access" ON ds_components
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated write access" ON ds_components;
CREATE POLICY "Authenticated write access" ON ds_components
  FOR ALL USING (auth.role() = 'authenticated');
`;

const SAMPLE_DATA = [
  {
    name: 'Button',
    slug: 'button',
    category: 'Atoms',
    description: 'A versatile button component with multiple variants and sizes.',
    usage_markdown: `## When to use

Use buttons to trigger actions or navigate. Pick the variant that matches the visual hierarchy.

## Variants

- **Primary**: Main call-to-action, use sparingly
- **Secondary**: Supporting actions
- **Ghost**: Tertiary or low-emphasis actions
- **Danger**: Destructive, irreversible actions

## Best practices

- Use clear, action-oriented labels: "Save", "Delete", "Cancel"
- Never use more than one primary button per view
- Disable buttons when the action is unavailable
- Always show loading states for async operations

## Accessibility

- Buttons must have descriptive labels
- Use \`aria-disabled\` instead of \`disabled\` when the button should remain focusable`,
    code: `import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary: 'bg-white text-black hover:bg-zinc-100',
  secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700',
  ghost: 'bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800',
  danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={\`inline-flex items-center justify-center gap-2 rounded-md font-medium
        transition-all duration-150 disabled:opacity-50 \${variants[variant]} \${sizes[size]} \${className ?? ''}\`}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';`,
  },
  {
    name: 'Input',
    slug: 'input',
    category: 'Atoms',
    description: 'A text input field with label, placeholder, and error state support.',
    usage_markdown: `## When to use

Use inputs to collect user-provided text. Always pair with a visible label.

## States

- **Default**: Standard input state
- **Focus**: Clear focus ring for keyboard navigation
- **Error**: Red border and helper text for validation
- **Disabled**: Reduced opacity, no interaction

## Best practices

- Never rely solely on placeholder text as a label
- Show validation errors inline and close to the field
- Use \`autocomplete\` attributes for common fields (email, name, etc.)

## Accessibility

- Link \`<label>\` to input via \`htmlFor\` / \`id\`
- Use \`aria-describedby\` to associate error messages`,
    code: `import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={\`w-full rounded-md border bg-zinc-900 px-3 py-2 text-sm text-zinc-100
          placeholder:text-zinc-500 focus:outline-none focus:ring-1 transition-colors
          \${error
            ? 'border-red-500/50 focus:ring-red-500/50'
            : 'border-zinc-800 focus:ring-zinc-600 focus:border-zinc-600'
          } \${className ?? ''}\`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';`,
  },
  {
    name: 'Badge',
    slug: 'badge',
    category: 'Atoms',
    description: 'A small status indicator used to label and categorize items.',
    usage_markdown: `## When to use

Badges communicate status, category, or count at a glance. They're supplemental — never the sole carrier of critical information.

## Variants

- **Default**: Neutral / informational
- **Success**: Positive or completed states
- **Warning**: Caution or pending states
- **Danger**: Error or critical states

## Best practices

- Keep badge text concise — one or two words maximum
- Don't use badges alone to convey critical information (add aria-label)
- Limit the number of badges per view to avoid visual noise`,
    code: `interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const variants = {
  default: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  danger:  'bg-red-500/10 text-red-400 border-red-500/20',
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={\`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border \${variants[variant]}\`}
    >
      {label}
    </span>
  );
}`,
  },
  {
    name: 'Card',
    slug: 'card',
    category: 'Molecules',
    description: 'A flexible container for grouping related content in a scannable format.',
    usage_markdown: `## When to use

Cards group related content to make it scannable. Ideal for dashboards, galleries, and data lists.

## Anatomy

- **Header**: Title + optional action button
- **Body**: Main content area (text, images, data)
- **Footer**: Secondary actions or metadata

## Best practices

- Focus each card on a single topic or entity
- Use consistent sizes within a grid layout
- Avoid nesting cards inside cards

## Interaction

If the card is clickable, make the entire surface interactive — not just a button inside it.`,
    code: `interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Card({ title, description, children, footer, className }: CardProps) {
  return (
    <div className={\`rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden \${className ?? ''}\`}>
      <div className="p-5 border-b border-zinc-800">
        <h3 className="font-semibold text-zinc-100 leading-tight">{title}</h3>
        {description && (
          <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{description}</p>
        )}
      </div>
      {children && <div className="p-5">{children}</div>}
      {footer && (
        <div className="px-5 py-3 bg-zinc-950/50 border-t border-zinc-800">
          {footer}
        </div>
      )}
    </div>
  );
}`,
  },
  {
    name: 'Modal',
    slug: 'modal',
    category: 'Molecules',
    description: 'A dialog overlay for critical interactions and confirmation flows.',
    usage_markdown: `## When to use

Use modals for focused tasks requiring immediate attention without leaving the current context.

## When NOT to use

- Complex multi-step flows → use a full page instead
- Non-critical notifications → use a toast or inline message

## Best practices

- Always provide a clear dismiss path (X button + backdrop click + Escape key)
- Trap focus inside the modal when open (accessibility)
- Keep content concise — modals interrupt flow
- Use a descriptive title that explains the action

## Accessibility

- Set \`role="dialog"\` and \`aria-modal="true"\`
- Set \`aria-labelledby\` to the modal's heading ID
- Return focus to the trigger element on close`,
    code: `'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const headingId = 'modal-title';

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id={headingId} className="text-lg font-semibold text-zinc-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}`,
  },
];

async function runSetup() {
  console.log('🚀 Design System DB Setup');
  console.log('━'.repeat(50));
  console.log(`📡 Project: gyouzknxbjjwdxnswnex`);
  console.log('');

  // Test connection
  console.log('1️⃣  Testing connection...');
  const { data: connTest, error: connError } = await supabase.from('ds_components').select('count').limit(1);
  
  if (connError?.code === 'PGRST205') {
    console.log('   Table not found — will create it.');
  } else if (connError) {
    console.error(`   ❌ Connection error: ${connError.message}`);
    console.log('   The service role key may be invalid. Check:');
    console.log('   https://supabase.com/dashboard/project/gyouzknxbjjwdxnswnex/settings/api');
    process.exit(1);
  } else {
    const count = connTest?.[0]?.count ?? 0;
    console.log(`   ✅ Already set up! Found ${count} component(s).`);
    
    const { count: existing } = await supabase.from('ds_components').select('*', { count: 'exact', head: true });
    if ((existing ?? 0) === 0) {
      await seedData();
    }
    
    console.log('');
    console.log('✨ Database is ready!');
    return;
  }

  // Can't run DDL via JS client — use the management API
  console.log('');
  console.log('2️⃣  Running schema migration...');
  
  // Try via pg REST endpoint (requires service_role)
  const res = await fetch(`${SUPABASE_URL}/pg/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'apikey': SERVICE_KEY,
    },
    body: JSON.stringify({ query: SQL }),
  });

  if (!res.ok) {
    // Try via management API
    const projectRef = 'gyouzknxbjjwdxnswnex';
    const mgmtRes = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: SQL }),
    });

    if (!mgmtRes.ok) {
      const mgmtBody = await mgmtRes.text();
      console.log('');
      console.log('⚠️  Cannot run DDL automatically via this API key.');
      console.log('');
      console.log('   Please run the schema manually:');
      console.log('   1. Open: https://supabase.com/dashboard/project/gyouzknxbjjwdxnswnex/sql/new');
      console.log('   2. Paste and run the contents of: supabase-schema.sql');
      console.log('   3. Then re-run this script to seed sample data');
      process.exit(1);
    }
  }

  console.log('   ✅ Schema created successfully');
  
  await seedData();
  
  console.log('');
  console.log('✨ All done! Your design system is ready.');
  console.log('   Start the dev server: npm run dev');
  console.log('   Open: http://localhost:3000');
}

async function seedData() {
  console.log('');
  console.log('3️⃣  Seeding sample components...');
  
  for (const component of SAMPLE_DATA) {
    const { error } = await supabase
      .from('ds_components')
      .upsert(component, { onConflict: 'slug' });
    
    if (error) {
      console.log(`   ⚠️  ${component.name}: ${error.message}`);
    } else {
      console.log(`   ✅ ${component.name}`);
    }
  }
}

runSetup().catch(console.error);
