-- Add mime_type to project_media for better asset filtering
ALTER TABLE public.project_media ADD COLUMN mime_type TEXT;
