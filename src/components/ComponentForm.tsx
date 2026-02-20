'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { DSComponent, DSComponentInsert, Category } from '@/lib/types';
import { createComponent, updateComponent, uploadThumbnail } from '@/lib/actions';
import { slugify, CATEGORIES } from '@/lib/utils';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/CodeBlock';
import { Upload, Eye, Code2, FileText, Loader2, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ComponentFormProps {
  component?: DSComponent;
}

type TabId = 'details' | 'usage' | 'code' | 'preview';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'details', label: 'Details', icon: FileText },
  { id: 'usage', label: 'Usage', icon: Eye },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'preview', label: 'Preview', icon: Eye },
];

export function ComponentForm({ component }: ComponentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<TabId>('details');
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(component?.name ?? '');
  const [slug, setSlug] = useState(component?.slug ?? '');
  const [category, setCategory] = useState<Category>(component?.category ?? 'Atoms');
  const [description, setDescription] = useState(component?.description ?? '');
  const [usageMarkdown, setUsageMarkdown] = useState(component?.usage_markdown ?? '');
  const [code, setCode] = useState(component?.code ?? '');
  const [thumbnailUrl, setThumbnailUrl] = useState(component?.thumbnail_url ?? '');
  const [imageUrls, setImageUrls] = useState<string[]>(component?.image_urls ?? []);
  const [isUploading, setIsUploading] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!slugManuallyEdited) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setSlugManuallyEdited(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setIsUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.set('file', files[i]);
        const url = await uploadThumbnail(formData);
        urls.push(url);
      }
      setImageUrls((prev) => [...prev, ...urls]);
      if (!thumbnailUrl && urls[0]) setThumbnailUrl(urls[0]);
    } catch (err) {
      setError('Failed to upload image(s). Please try again.');
    } finally {
      setIsUploading(false);
    }
    e.target.value = '';
  };

  const removeImageUrl = (index: number) => {
    setImageUrls((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (thumbnailUrl === prev[index] && next[0]) setThumbnailUrl(next[0]);
      else if (thumbnailUrl === prev[index]) setThumbnailUrl('');
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !slug.trim() || !code.trim()) {
      setError('Name, slug, and code are required.');
      return;
    }

    const data: DSComponentInsert = {
      name: name.trim(),
      slug: slug.trim(),
      category,
      description: description.trim(),
      usage_markdown: usageMarkdown.trim(),
      code: code.trim(),
      thumbnail_url: thumbnailUrl || null,
      image_urls: imageUrls.length ? imageUrls : null,
    };

    startTransition(async () => {
      try {
        if (component) {
          await updateComponent(component.id, data);
        } else {
          await createComponent(data);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex border-b border-zinc-800">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors duration-150 ${
              activeTab === id
                ? 'border-zinc-100 text-zinc-100'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'details' && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="name"
              label="Component Name *"
              placeholder="e.g. Button"
              value={name}
              onChange={handleNameChange}
              required
            />
            <Input
              id="slug"
              label="Slug *"
              placeholder="e.g. button"
              value={slug}
              onChange={handleSlugChange}
              required
            />
          </div>
          <Select
            id="category"
            label="Category *"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          />
          <Textarea
            id="description"
            label="Short Description"
            placeholder="A brief one-liner describing this component..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[80px]"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Thumbnail (main preview)</label>
            <div className="flex items-start gap-4">
              <div className="relative w-32 h-20 rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden flex items-center justify-center shrink-0">
                {thumbnailUrl ? (
                  <Image src={thumbnailUrl} alt="Thumbnail" fill className="object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-zinc-700" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-zinc-900/80 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="Thumbnail URL or pick from gallery below"
                  className="text-xs"
                />
                <p className="text-xs text-zinc-600">First uploaded image becomes thumbnail by default.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Gallery (multi-photo)</label>
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700 hover:bg-zinc-700 cursor-pointer transition-colors w-fit">
              <Upload className="w-3.5 h-3.5" />
              Upload multiple images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>
            {imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imageUrls.map((url, i) => (
                  <div key={url} className="relative group">
                    <div className="relative w-24 h-16 rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
                      <Image src={url} alt={`Preview ${i + 1}`} fill className="object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImageUrl(i)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500/90 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove"
                    >
                      ×
                    </button>
                    {url === thumbnailUrl && (
                      <span className="absolute bottom-0 left-0 right-0 bg-[#002c76] text-white text-[10px] py-0.5 text-center">Main</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-zinc-600">PNG, JPG, WebP. All photos shown in a vertically scrollable gallery on the component page.</p>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-zinc-500">
            Write usage guidelines using Markdown. Explain when to use this component, best practices, and accessibility notes.
          </p>
          <Textarea
            id="usage"
            label="Usage & Guidelines (Markdown)"
            placeholder={`## When to use\n\nDescribe the scenarios where this component is appropriate.\n\n## Best practices\n\n- Keep it simple\n- Follow accessibility guidelines`}
            value={usageMarkdown}
            onChange={(e) => setUsageMarkdown(e.target.value)}
            className="min-h-[360px] font-mono text-xs"
          />
        </div>
      )}

      {activeTab === 'code' && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-zinc-500">
            Paste the component's source code. This will be displayed in the syntax-highlighted code playground.
          </p>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">Source Code *</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`import React from 'react';\n\nexport function MyComponent() {\n  return <div>Hello World</div>;\n}`}
              className="w-full min-h-[360px] rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-zinc-300 font-mono placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors resize-y"
            />
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="flex flex-col gap-4">
          <p className="text-xs text-zinc-500">Preview how the code will appear in the documentation.</p>
          {code ? (
            <CodeBlock code={code} language="tsx" showCopy={false} />
          ) : (
            <div className="flex items-center justify-center h-40 rounded-lg border border-dashed border-zinc-800 text-zinc-600 text-sm">
              No code added yet. Switch to the Code tab.
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/admin/dashboard')}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending || isUploading}>
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : component ? (
            'Save Changes'
          ) : (
            'Create Component'
          )}
        </Button>
      </div>
    </form>
  );
}
