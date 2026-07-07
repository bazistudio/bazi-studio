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

  let relatedProjects: any[] = [];

  // 1. Primary Logic: Try to fetch from the same category
  if (categoryId) {
    const { data: sameCategory } = await supabase
      .from('projects')
      .select(`
        *,
        project_media(*),
        categories(*),
        project_technologies(
          technologies(*)
        )
      `)
      .eq('status', 'published')
      .eq('category_id', categoryId)
      .neq('id', currentProjectId)
      .limit(3);
      
    if (sameCategory) relatedProjects = [...sameCategory];
  }

  // 2. Fallback Logic: Recent projects if we don't have enough category matches
  if (relatedProjects.length < 3) {
    const excludeIds = [currentProjectId, ...relatedProjects.map(p => p.id)];
    
    // Construct the filter string for Supabase .not()
    const excludeString = `(${excludeIds.join(',')})`;
    
    const { data: recentFallback } = await supabase
      .from('projects')
      .select(`
        *,
        project_media(*),
        categories(*),
        project_technologies(
          technologies(*)
        )
      `)
      .eq('status', 'published')
      .not('id', 'in', excludeString)
      .order('created_at', { ascending: false })
      .limit(3 - relatedProjects.length);
      
    if (recentFallback) relatedProjects = [...relatedProjects, ...recentFallback];
  }

  if (relatedProjects.length === 0) return null;

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">Explore More Systems</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
