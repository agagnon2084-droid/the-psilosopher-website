-- Add text content column to lessons for rich lesson body content
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS content text;
