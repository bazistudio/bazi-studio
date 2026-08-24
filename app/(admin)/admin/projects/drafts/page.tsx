import { getProjects } from "@/lib/actions/projects";
import PageHeader from "@/components/admin/PageHeader";
import ProjectsManagerView from "@/components/admin/ProjectsManagerView";

export default async function DraftProjectsPage() {
  const projects = await getProjects();
  const drafts = projects.filter((p) => p.status === "draft");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Draft Projects"
        description="Review and continue working on unpublished project drafts."
        badge={`${drafts.length} Drafts`}
      />

      <ProjectsManagerView initialProjects={projects} currentTab="draft" />
    </div>
  );
}
