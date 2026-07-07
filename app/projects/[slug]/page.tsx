import { createClient } from "@/lib/database/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Components to be implemented
import CaseStudyHero from "@/components/portfolio/case-study/CaseStudyHero";
import ProjectOverview from "@/components/portfolio/case-study/ProjectOverview";
import ProblemSolution from "@/components/portfolio/case-study/ProblemSolution";
import SectionRenderer from "@/components/portfolio/case-study/SectionRenderer";
import MediaGallery from "@/components/portfolio/case-study/MediaGallery";
import BuildTimeline from "@/components/portfolio/case-study/BuildTimeline";
import ProjectLinks from "@/components/portfolio/case-study/ProjectLinks";
import RelatedProjects from "@/components/portfolio/case-study/RelatedProjects";
import ProjectNavigation from "@/components/portfolio/case-study/ProjectNavigation";

export const revalidate = 3600; // Cache for 1 hour

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('title, short_description, seo_metadata(meta_title, meta_description, og_image_url)')
    .eq('slug', params.slug)
    .single();

  if (!project) return { title: "Project Not Found" };

  const seo = Array.isArray(project.seo_metadata) ? project.seo_metadata[0] : project.seo_metadata;
  
  return {
    title: seo?.meta_title || `${project.title} | BaziStudio Case Study`,
    description: seo?.meta_description || project.short_description,
    openGraph: {
      title: seo?.meta_title || project.title,
      description: seo?.meta_description || project.short_description,
      images: seo?.og_image_url ? [seo.og_image_url] : [],
    }
  };
}

export default async function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      categories(*),
      project_media(*),
      project_sections(*),
      build_logs(*),
      seo_metadata(*),
      project_technologies(
        technologies(*)
      )
    `)
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (error || !project) {
    notFound();
  }

  // Pre-sort relations
  project.project_sections?.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0));
  project.build_logs?.sort((a: any, b: any) => (a.day_number || 0) - (b.day_number || 0));
  
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <ProjectNavigation />
      
      <CaseStudyHero project={project} />
      
      <div className="max-w-4xl mx-auto px-6 space-y-32 mt-32 relative z-10">
        <ProjectOverview project={project} />
        <ProblemSolution project={project} />
        <SectionRenderer sections={project.project_sections || []} />
        <MediaGallery media={project.project_media || []} />
        <BuildTimeline logs={project.build_logs || []} />
        <ProjectLinks project={project} />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 border-t border-border pt-24">
        <RelatedProjects currentProjectId={project.id} categoryId={project.category_id} />
      </div>
    </main>
  )
}
