'use client';

import { useState } from 'react';
import { CheckCircle2, Check, Copy, ExternalLink, Terminal } from 'lucide-react';
import Link from 'next/link';

const SQL = `-- Run this in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/gyouzknxbjjwdxnswnex/sql/new

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

-- Sample components
INSERT INTO ds_components (name, slug, category, description, usage_markdown, code) VALUES
('Button', 'button', 'Atoms',
  'A versatile button component with multiple variants and sizes.',
  E'## When to use\n\nUse buttons to trigger actions or navigate.\n\n## Variants\n\n- **Primary**: Main CTA\n- **Secondary**: Supporting actions\n- **Ghost**: Low emphasis\n- **Danger**: Destructive actions\n\n## Best practices\n\n- Use clear action-oriented labels\n- One primary button per view\n- Always show loading states',
  E'import { forwardRef } from ''react'';\n\ntype Variant = ''primary'' | ''secondary'' | ''ghost'' | ''danger'';\n\nexport const Button = forwardRef<HTMLButtonElement, {\n  variant?: Variant;\n  children: React.ReactNode;\n} & React.ButtonHTMLAttributes<HTMLButtonElement>>(\n  ({ variant = ''primary'', children, ...props }, ref) => (\n    <button ref={ref} data-variant={variant} {...props}>\n      {children}\n    </button>\n  )\n);\n\nButton.displayName = ''Button'';'
),
('Input', 'input', 'Atoms',
  'A text input field with label, placeholder, and error state support.',
  E'## When to use\n\nCollect user text. Always pair with a visible label.\n\n## States\n\n- Default\n- Focus\n- Error\n- Disabled\n\n## Best practices\n\n- Never rely on placeholder alone as a label\n- Show validation errors inline',
  E'import { forwardRef } from ''react'';\n\ninterface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {\n  label?: string;\n  error?: string;\n}\n\nexport const Input = forwardRef<HTMLInputElement, InputProps>(\n  ({ label, error, id, ...props }, ref) => (\n    <div className="flex flex-col gap-1.5">\n      {label && <label htmlFor={id}>{label}</label>}\n      <input ref={ref} id={id} {...props} />\n      {error && <p role="alert">{error}</p>}\n    </div>\n  )\n);\n\nInput.displayName = ''Input'';'
),
('Badge', 'badge', 'Atoms',
  'A small status indicator used to label and categorize items.',
  E'## When to use\n\nBadges communicate status at a glance.\n\n## Variants\n\n- Default, Success, Warning, Danger\n\n## Best practices\n\n- Keep text to 1-2 words\n- Never the sole carrier of critical info',
  E'interface BadgeProps {\n  label: string;\n  variant?: ''default'' | ''success'' | ''warning'' | ''danger'';\n}\n\nexport function Badge({ label, variant = ''default'' }: BadgeProps) {\n  return <span data-variant={variant}>{label}</span>;\n}'
)
ON CONFLICT (slug) DO NOTHING;`;

const steps = [
  {
    number: '1',
    title: 'Get your Service Role Key',
    description: 'Open your Supabase project settings to find the secret key.',
    action: {
      label: 'Open API Settings',
      href: 'https://supabase.com/dashboard/project/gyouzknxbjjwdxnswnex/settings/api',
    },
    detail: 'Project Settings → API → Project API Keys → service_role → click Reveal',
  },
  {
    number: '2',
    title: 'Update .env.local',
    description: 'Replace SUPABASE_SERVICE_ROLE_KEY with the service_role value.',
    detail: 'SUPABASE_SERVICE_ROLE_KEY=sb_secret_...',
    isCode: true,
  },
  {
    number: '3',
    title: 'Run the SQL schema',
    description: 'Open the SQL Editor and paste + run the schema below.',
    action: {
      label: 'Open SQL Editor',
      href: 'https://supabase.com/dashboard/project/gyouzknxbjjwdxnswnex/sql/new',
    },
    detail: 'Copy the SQL, paste it in the editor, click Run.',
  },
  {
    number: '4',
    title: 'Create an admin user',
    description: 'Add a user via Supabase Auth to log into the admin dashboard.',
    action: {
      label: 'Open Auth Users',
      href: 'https://supabase.com/dashboard/project/gyouzknxbjjwdxnswnex/auth/users',
    },
    detail: 'Click "Add User" and set an email + password. Use these at /admin/login.',
  },
];

export default function SetupPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            ⚡ One-time setup required
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight mb-3">
            Connect Your Database
          </h1>
          <p className="text-zinc-400 leading-relaxed max-w-xl">
            Supabase is connected{' '}
            <span className="text-emerald-400 font-mono text-sm">gyouzknxbjjwdxnswnex</span>{' '}
            — the tables just need to be created. Follow these 4 steps and you&apos;re live.
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-10">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors">
              <div className="shrink-0 w-7 h-7 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                {step.number}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-zinc-100 mb-1">{step.title}</h3>
                <p className="text-sm text-zinc-500 mb-2">{step.description}</p>
                {step.isCode ? (
                  <code className="block text-xs font-mono text-violet-300 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-md">
                    {step.detail}
                  </code>
                ) : (
                  <p className="text-xs text-zinc-600">{step.detail}</p>
                )}
                {step.action && (
                  <a
                    href={step.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {step.action.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-800 overflow-hidden mb-8">
          <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-medium text-zinc-300">supabase-schema.sql</span>
              <span className="text-xs text-zinc-600 font-mono">— paste this in the SQL Editor</span>
            </div>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-all duration-150 ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-100 hover:bg-zinc-700'
              }`}
            >
              {copied ? (
                <><Check className="w-3.5 h-3.5" /> Copied!</>
              ) : (
                <><Copy className="w-3.5 h-3.5" /> Copy SQL</>
              )}
            </button>
          </div>
          <pre className="bg-zinc-950 p-5 text-xs text-zinc-400 font-mono overflow-x-auto leading-relaxed max-h-96 whitespace-pre">
            {SQL}
          </pre>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-zinc-600" />
            <div>
              <p className="text-sm font-medium text-zinc-300">Done? Refresh the dashboard.</p>
              <p className="text-xs text-zinc-600">Log in with the auth user you created in step 4.</p>
            </div>
          </div>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-100 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
