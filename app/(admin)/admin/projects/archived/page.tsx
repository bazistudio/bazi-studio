import { getProjects } from "@/lib/actions/projects";
import PageHeader from "@/components/admin/PageHeader";
import ProjectsManagerView from "@/components/project/ProjectsManagerView";

export default async function ArchivedProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="Archived Projects"
        description="Completed, retired, or historical portfolio projects."
        badge={`${projects.filter((p) => p.status === "archived").length} Archived`}
      />
      
      <ProjectsManagerView initialProjects={projects} currentTab="archived" />
    </div>
  );
}
