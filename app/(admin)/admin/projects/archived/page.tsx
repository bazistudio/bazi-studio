import { getProjects } from "@/lib/actions/projects";
import PageHeader from "@/components/admin/PageHeader";
import ProjectsManagerView from "@/components/admin/ProjectsManagerView";

export default async function ArchivedProjectsPage() {
  const projects = await getProjects();
  const archived = projects.filter((p) => p.status === "archived");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Archived Projects"
        description="Historical or retired projects preserved in archive status."
        badge={`${archived.length} Archived`}
      />

      <ProjectsManagerView initialProjects={projects} currentTab="archived" />
    </div>
  );
}
