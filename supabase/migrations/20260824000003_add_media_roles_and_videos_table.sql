-- ============================================================================
-- Migration: 20260824000003_add_media_roles_and_videos_table.sql
-- Description: 1. Adds media_role ENUM ('cover', 'gallery', 'thumbnail')
--              2. Adds 'role' and 'storage_path' to project_media
--              3. Creates dedicated project_videos table for YouTube/video embeds
--              4. Applies RLS and indexes
-- ============================================================================

-- 1. Create media_role ENUM
DO $$ BEGIN
    CREATE TYPE media_role AS ENUM ('cover', 'gallery', 'thumbnail');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Add role and storage_path columns to project_media
ALTER TABLE public.project_media 
ADD COLUMN IF NOT EXISTS role media_role NOT NULL DEFAULT 'gallery',
ADD COLUMN IF NOT EXISTS storage_path TEXT;

-- Index on project_media for fast cover and gallery retrieval
CREATE INDEX IF NOT EXISTS idx_project_media_role ON public.project_media(project_id, role, order_index);

-- 3. Create dedicated project_videos table for YouTube / streaming embeds
CREATE TABLE IF NOT EXISTS public.project_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    provider TEXT NOT NULL DEFAULT 'youtube',
    video_id TEXT NOT NULL,
    url TEXT NOT NULL,
    title TEXT,
    thumbnail_url TEXT,
    caption TEXT,
    duration TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on project_videos for ordered retrieval
CREATE INDEX IF NOT EXISTS idx_project_videos_order ON public.project_videos(project_id, order_index);

-- Trigger to update updated_at on project_videos
DROP TRIGGER IF EXISTS update_project_videos_updated_at ON public.project_videos;
CREATE TRIGGER update_project_videos_updated_at 
BEFORE UPDATE ON public.project_videos 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 4. Row Level Security (RLS) for project_videos
ALTER TABLE public.project_videos ENABLE ROW LEVEL SECURITY;

-- Public read access if parent project is published
DROP POLICY IF EXISTS "Allow public read on published project videos" ON public.project_videos;
CREATE POLICY "Allow public read on published project videos" ON public.project_videos 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE public.projects.id = public.project_videos.project_id 
    AND public.projects.status = 'published'
  )
);

-- Full access for confirmed admins
DROP POLICY IF EXISTS "Admin full access on project_videos" ON public.project_videos;
CREATE POLICY "Admin full access on project_videos" ON public.project_videos 
FOR ALL TO authenticated 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());
