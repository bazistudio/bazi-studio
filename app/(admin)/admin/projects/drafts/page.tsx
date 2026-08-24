import { getProjects } from "@/lib/actions/projects";
import PageHeader from "@/components/admin/PageHeader";
import ProjectsManagerView from "@/components/project/ProjectsManagerView";

export default async function DraftProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="Draft Projects"
        description="Work-in-progress projects not yet visible to the public."
        badge={`${projects.filter((p) => p.status === "draft").length} Drafts`}
      />
      
      <ProjectsManagerView initialProjects={projects} currentTab="draft" />
    </div>
  );
}
