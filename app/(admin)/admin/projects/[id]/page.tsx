import { getProjects } from "@/lib/actions/projects";
import { createClient } from "@/lib/database/server";
import { notFound } from "next/navigation";
import ProjectEditorClient from "./ProjectEditorClient";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  // We use Supabase joins to fetch the core project and all relational data in one query
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_sections(*),
      project_media(*),
      build_logs(*),
      seo_metadata(*)
    `)
    .eq('id', params.id)
    .single();

  if (error || !project) {
    console.error("Failed to fetch project detail:", error);
    notFound();
  }

  // Pre-sort relational data locally if needed or rely on order_index / day_number
  project.project_sections?.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0));
  project.project_media?.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0));
  project.build_logs?.sort((a: any, b: any) => (a.day_number || 0) - (b.day_number || 0));

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-20">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Project: <span className="text-primary">{project.title}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage the full case study, media assets, and developer logs.
          </p>
        </div>
      </div>
      
      <ProjectEditorClient project={project} />
    </div>
  );
}
