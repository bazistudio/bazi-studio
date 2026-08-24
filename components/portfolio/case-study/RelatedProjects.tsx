import { createClient } from "@/lib/database/server";
import ProjectCard from "../ProjectCard";

export default async function RelatedProjects({ 
  currentProjectId, 
  categoryId 
}: { 
  currentProjectId: string, 
  categoryId: string | null 
}) {
  const supabase = await createClient();

  const { data: relatedProjects } = await supabase
    .from('projects')
    .select(`
      *,
      project_media(*),
      categories(*),
      project_technologies(
        technologies(*)
      ),
      project_tags(
        tags(*)
      )
    `)
    .eq('status', 'published')
    .neq('id', currentProjectId)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(3);

  if (!relatedProjects || relatedProjects.length === 0) return null;

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">Explore More Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
