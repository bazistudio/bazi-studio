import { getProjects } from "@/lib/actions/projects";
import PageHeader from "@/components/admin/PageHeader";
import ProjectsManagerView from "@/components/project/ProjectsManagerView";

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        description="Manage your portfolio case studies, shortlisted works, and Figma showcases."
        badge={`${projects.length} Total`}
      />
      
      <ProjectsManagerView initialProjects={projects} currentTab="all" />
    </div>
  );
}
