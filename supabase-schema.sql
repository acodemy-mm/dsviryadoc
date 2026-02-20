-- Design System Components Table
CREATE TABLE IF NOT EXISTS ds_components (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages')),
  description TEXT NOT NULL DEFAULT '',
  usage_markdown TEXT NOT NULL DEFAULT '',
  code TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT,
  image_urls JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ds_components_updated_at
  BEFORE UPDATE ON ds_components
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ds_components_slug ON ds_components(slug);
CREATE INDEX IF NOT EXISTS idx_ds_components_category ON ds_components(category);

-- Row Level Security
ALTER TABLE ds_components ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public read access" ON ds_components
  FOR SELECT USING (true);

-- Allow authenticated users to write
CREATE POLICY "Authenticated write access" ON ds_components
  FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public) 
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT DO NOTHING;

-- Storage policy
CREATE POLICY "Public read thumbnails" ON storage.objects
  FOR SELECT USING (bucket_id = 'thumbnails');

CREATE POLICY "Authenticated upload thumbnails" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete thumbnails" ON storage.objects
  FOR DELETE USING (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');

-- Sample Data (optional - remove in production)
INSERT INTO ds_components (name, slug, category, description, usage_markdown, code) VALUES
(
  'Button',
  'button',
  'Atoms',
  'A versatile button component with multiple variants and sizes.',
  E'## When to use\n\nUse buttons to trigger actions or navigate to other pages. Choose the variant that matches the visual hierarchy.\n\n## Variants\n\n- **Primary**: Main call-to-action, use sparingly\n- **Secondary**: Supporting actions\n- **Ghost**: Tertiary or destructive actions\n- **Danger**: Destructive, irreversible actions\n\n## Best practices\n\n- Use clear, action-oriented labels like "Save", "Delete", "Cancel"\n- Avoid using more than one primary button per view\n- Disable buttons when an action is unavailable\n- Always provide loading states for async actions\n\n## Accessibility\n\n- Buttons must have descriptive labels\n- Disabled buttons should still be focusable with `aria-disabled`',
  E'import { forwardRef } from ''react'';\n\ntype Variant = ''primary'' | ''secondary'' | ''ghost'' | ''danger'';\ntype Size = ''sm'' | ''md'' | ''lg'';\n\ninterface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  variant?: Variant;\n  size?: Size;\n}\n\nconst variants: Record<Variant, string> = {\n  primary: ''bg-white text-black hover:bg-zinc-100'',\n  secondary: ''bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700'',\n  ghost: ''bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'',\n  danger: ''bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'',\n};\n\nconst sizes: Record<Size, string> = {\n  sm: ''px-3 py-1.5 text-xs'',\n  md: ''px-4 py-2 text-sm'',\n  lg: ''px-6 py-3 text-base'',\n};\n\nexport const Button = forwardRef<HTMLButtonElement, ButtonProps>(\n  ({ variant = ''primary'', size = ''md'', className, children, ...props }, ref) => (\n    <button\n      ref={ref}\n      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium\n        transition-all duration-150 disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className ?? ''''}`}\n      {...props}\n    >\n      {children}\n    </button>\n  )\n);\n\nButton.displayName = ''Button'';'
),
(
  'Input',
  'input',
  'Atoms',
  'A text input field with label, placeholder, and error state support.',
  E'## When to use\n\nUse inputs to collect user-provided text data. Always pair with a visible label.\n\n## States\n\n- **Default**: Standard input state\n- **Focus**: Clear focus ring for keyboard navigation\n- **Error**: Red border and helper text for validation errors\n- **Disabled**: Reduced opacity, no interaction\n\n## Best practices\n\n- Always include a label — never rely on placeholder text alone\n- Show validation errors inline, close to the field\n- Use `autocomplete` attributes for common fields\n- Keep placeholder text brief and supplemental\n\n## Accessibility\n\n- Link `<label>` to input with matching `htmlFor` / `id`\n- Use `aria-describedby` for error messages\n- Ensure sufficient color contrast on all states',
  E'import { forwardRef } from ''react'';\n\ninterface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {\n  label?: string;\n  error?: string;\n}\n\nexport const Input = forwardRef<HTMLInputElement, InputProps>(\n  ({ label, error, id, className, ...props }, ref) => (\n    <div className="flex flex-col gap-1.5">\n      {label && (\n        <label htmlFor={id} className="text-sm font-medium text-zinc-300">\n          {label}\n        </label>\n      )}\n      <input\n        ref={ref}\n        id={id}\n        className={`w-full rounded-md border bg-zinc-900 px-3 py-2 text-sm text-zinc-100\n          placeholder:text-zinc-500 focus:outline-none focus:ring-1 transition-colors\n          ${error\n            ? ''border-red-500/50 focus:ring-red-500/50''\n            : ''border-zinc-800 focus:ring-zinc-600 focus:border-zinc-600''\n          } ${className ?? ''''}`}\n        {...props}\n      />\n      {error && <p className="text-xs text-red-400">{error}</p>}\n    </div>\n  )\n);\n\nInput.displayName = ''Input'';'
),
(
  'Badge',
  'badge',
  'Atoms',
  'A small status indicator used to label and categorize items.',
  E'## When to use\n\nUse badges to communicate status, category, or count at a glance. They work best as supplemental information.\n\n## Variants\n\n- **Neutral**: Default state\n- **Success**: Positive outcomes\n- **Warning**: Caution states\n- **Danger**: Error or critical states\n- **Category**: Component categories (Atoms, Molecules, etc.)\n\n## Best practices\n\n- Keep badge text concise — ideally one or two words\n- Do not use badges as the sole method of conveying critical information\n- Limit the number of badges visible at one time to avoid visual noise',
  E'interface BadgeProps {\n  label: string;\n  variant?: ''default'' | ''success'' | ''warning'' | ''danger'';\n}\n\nconst variants = {\n  default: ''bg-zinc-800 text-zinc-300 border-zinc-700'',\n  success: ''bg-emerald-500/10 text-emerald-400 border-emerald-500/20'',\n  warning: ''bg-amber-500/10 text-amber-400 border-amber-500/20'',\n  danger: ''bg-red-500/10 text-red-400 border-red-500/20'',\n};\n\nexport function Badge({ label, variant = ''default'' }: BadgeProps) {\n  return (\n    <span\n      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border\n        ${variants[variant]}`}\n    >\n      {label}\n    </span>\n  );\n}'
)
ON CONFLICT (slug) DO NOTHING;
