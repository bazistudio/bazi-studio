-- ============================================================================
-- Migration: 20260824000004_add_figma_resources.sql
-- Description: Adds figma_prototype_url and figma_community_url to projects table.
--              Both are nullable, supporting both standalone Figma projects
--              and software projects with attached design/prototype resources.
-- ============================================================================

ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS figma_prototype_url TEXT,
ADD COLUMN IF NOT EXISTS figma_community_url TEXT;
