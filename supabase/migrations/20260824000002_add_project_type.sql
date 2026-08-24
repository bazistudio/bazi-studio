-- ============================================================================
-- Migration: 20260824000002_add_project_type.sql
-- Description: Introduces the project_type ENUM to distinguish:
--              1. case_study (Complete in-depth case study)
--              2. shortlist (Quick featured portfolio showcase)
--              3. figma (UI/UX design showcase)
--              Defaults all existing projects safely to 'case_study'.
-- ============================================================================

-- 1. Create project_type ENUM
DO $$ BEGIN
    CREATE TYPE project_type AS ENUM ('case_study', 'shortlist', 'figma');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Add project_type column to projects table with default 'case_study'
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS project_type project_type NOT NULL DEFAULT 'case_study';

-- 3. Create index for type and status querying
CREATE INDEX IF NOT EXISTS idx_projects_type_status ON public.projects(project_type, status);
