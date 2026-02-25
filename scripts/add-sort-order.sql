-- Add sort_order column to ds_components (for custom order in Admin list)
-- Run in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor → New query

ALTER TABLE ds_components ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

-- Optional: add image_urls if you use multiple images per component
ALTER TABLE ds_components ADD COLUMN IF NOT EXISTS image_urls TEXT[];
