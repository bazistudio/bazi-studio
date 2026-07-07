-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. ENUMS
-- ==========================================
CREATE TYPE project_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE media_type AS ENUM ('image', 'video', 'document');
CREATE TYPE section_type AS ENUM ('text', 'code_showcase', 'architecture', 'quote');

-- ==========================================
-- 2. PROFILES & AUTHENTICATION
-- ==========================================
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Helper function for RLS Admin Check
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (new.id, 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================
-- 3. CORE TABLES
-- ==========================================

-- Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Technologies
CREATE TABLE technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    status project_status DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    short_description TEXT NOT NULL,
    full_description TEXT,
    problem TEXT,
    solution TEXT,
    github_url TEXT,
    demo_url TEXT,
    figma_url TEXT,
    started_at DATE,
    completed_at DATE,
    duration TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Sections (Deep case studies & Code Showcases)
CREATE TABLE project_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    type section_type DEFAULT 'text',
    title TEXT,
    content TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Media
CREATE TABLE project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    type media_type DEFAULT 'image',
    url TEXT NOT NULL,
    caption TEXT,
    alt_text TEXT,
    file_name TEXT,
    file_size INTEGER,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Build Logs (Developer Journey)
CREATE TABLE build_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    day_number INTEGER,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO Metadata
CREATE TABLE seo_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE UNIQUE,
    meta_title TEXT,
    meta_description TEXT,
    og_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction: Project Technologies
CREATE TABLE project_technologies (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    technology_id UUID REFERENCES technologies(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, technology_id)
);

-- Junction: Project Tags
CREATE TABLE project_tags (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tag_id)
);

-- ==========================================
-- 4. INDEXES
-- ==========================================
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_project_sections_order ON project_sections(project_id, order_index);
CREATE INDEX idx_project_media_order ON project_media(project_id, order_index);
CREATE INDEX idx_build_logs_project ON build_logs(project_id, day_number);

-- ==========================================
-- 5. TRIGGERS
-- ==========================================
-- Automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_project_sections_updated_at BEFORE UPDATE ON project_sections FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_seo_metadata_updated_at BEFORE UPDATE ON seo_metadata FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE build_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;

-- Profiles: User can read and update their own profile
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- PUBLIC READ POLICIES
CREATE POLICY "Allow public read on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read on technologies" ON technologies FOR SELECT USING (true);
CREATE POLICY "Allow public read on tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Allow public read on published projects" ON projects FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read on published project sections" ON project_sections FOR SELECT USING (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = project_sections.project_id AND projects.status = 'published')
);

CREATE POLICY "Allow public read on published project media" ON project_media FOR SELECT USING (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = project_media.project_id AND projects.status = 'published')
);

CREATE POLICY "Allow public read on published project build logs" ON build_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = build_logs.project_id AND projects.status = 'published')
);

CREATE POLICY "Allow public read on published project SEO" ON seo_metadata FOR SELECT USING (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = seo_metadata.project_id AND projects.status = 'published')
);

CREATE POLICY "Allow public read on published project technologies" ON project_technologies FOR SELECT USING (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = project_technologies.project_id AND projects.status = 'published')
);

CREATE POLICY "Allow public read on published project tags" ON project_tags FOR SELECT USING (
  EXISTS (SELECT 1 FROM projects WHERE projects.id = project_tags.project_id AND projects.status = 'published')
);

-- ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admin full access on categories" ON categories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on technologies" ON technologies FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on tags" ON tags FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on projects" ON projects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on project_sections" ON project_sections FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on project_media" ON project_media FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on build_logs" ON build_logs FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on seo_metadata" ON seo_metadata FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on project_technologies" ON project_technologies FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on project_tags" ON project_tags FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
