-- ============================================================
-- Migration 00005: Replace Mux video with YouTube URL
-- ============================================================

ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS youtube_url text,
  DROP COLUMN IF EXISTS mux_playback_id,
  DROP COLUMN IF EXISTS mux_asset_id;
