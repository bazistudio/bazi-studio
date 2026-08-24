-- ============================================================================
-- Migration: 20260824000005_declarative_storage_configuration.sql
-- Description: Declarative Supabase Storage configuration for portfolio-media:
--              1. Creates/updates portfolio-media bucket with explicit limits
--              2. Configures allowed MIME types and max size limit (100MB)
--              3. Establishes storage.objects RLS policies (Public Read, Admin Write)
-- ============================================================================

-- 1. Ensure portfolio-media bucket exists with declarative limits
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'portfolio-media',
    'portfolio-media',
    true,
    104857600, -- 100MB in bytes
    ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/svg+xml',
        'image/jpg',
        'video/mp4',
        'video/webm',
        'application/pdf'
    ]::text[]
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 104857600,
    allowed_mime_types = ARRAY[
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/svg+xml',
        'image/jpg',
        'video/mp4',
        'video/webm',
        'application/pdf'
    ]::text[];

-- 2. Storage RLS Policies for storage.objects

-- Allow public read on portfolio-media bucket
DROP POLICY IF EXISTS "Allow public read on portfolio-media" ON storage.objects;
CREATE POLICY "Allow public read on portfolio-media" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-media');

-- Allow admins and service role to upload into portfolio-media
DROP POLICY IF EXISTS "Allow admin upload to portfolio-media" ON storage.objects;
CREATE POLICY "Allow admin upload to portfolio-media" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
    bucket_id = 'portfolio-media' 
    AND (public.is_admin() OR public.is_service_role())
);

-- Allow admins and service role to update portfolio-media objects
DROP POLICY IF EXISTS "Allow admin update on portfolio-media" ON storage.objects;
CREATE POLICY "Allow admin update on portfolio-media" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (
    bucket_id = 'portfolio-media' 
    AND (public.is_admin() OR public.is_service_role())
)
WITH CHECK (
    bucket_id = 'portfolio-media' 
    AND (public.is_admin() OR public.is_service_role())
);

-- Allow admins and service role to delete portfolio-media objects
DROP POLICY IF EXISTS "Allow admin delete on portfolio-media" ON storage.objects;
CREATE POLICY "Allow admin delete on portfolio-media" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (
    bucket_id = 'portfolio-media' 
    AND (public.is_admin() OR public.is_service_role())
);
