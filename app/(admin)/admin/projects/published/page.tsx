import { getProjects } from "@/lib/actions/projects";
import PageHeader from "@/components/admin/PageHeader";
import ProjectsManagerView from "@/components/admin/ProjectsManagerView";

export default async function PublishedProjectsPage() {
  const projects = await getProjects();
  const published = projects.filter((p) => p.status === "published");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Published Projects"
        description="Projects currently live and visible on your public portfolio."
        badge={`${published.length} Live`}
      />

      <ProjectsManagerView initialProjects={projects} currentTab="published" />
    </div>
  );
}
