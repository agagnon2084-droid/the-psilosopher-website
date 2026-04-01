-- ============================================================
-- Replace Mux video fields with YouTube URL on lessons table
-- Swaps mux_playback_id and mux_asset_id for a simple youtube_url
-- text column that accepts any standard YouTube URL format.
-- ============================================================

ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS youtube_url text,
  DROP COLUMN IF EXISTS mux_playback_id,
  DROP COLUMN IF EXISTS mux_asset_id;
