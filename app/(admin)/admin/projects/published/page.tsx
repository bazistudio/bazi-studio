import { getProjects } from "@/lib/actions/projects";
import PageHeader from "@/components/admin/PageHeader";
import ProjectsManagerView from "@/components/project/ProjectsManagerView";

export default async function PublishedProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="Published Projects"
        description="Projects actively visible across the public website."
        badge={`${projects.filter((p) => p.status === "published").length} Live`}
      />
      
      <ProjectsManagerView initialProjects={projects} currentTab="published" />
    </div>
  );
}
