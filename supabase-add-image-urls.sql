-- Run this in Supabase Dashboard → SQL Editor (once per project)
-- Adds the image_urls column required for multi-photo component gallery.

ALTER TABLE ds_components
  ADD COLUMN IF NOT EXISTS image_urls JSONB DEFAULT '[]';

-- Optional: backfill existing rows so image_urls is never null
UPDATE ds_components
  SET image_urls = '[]'
  WHERE image_urls IS NULL;
