"use client"

import ProjectForm from "@/components/admin/project-editor/ProjectForm"

export default function ProjectOverviewTab({ project }: { project: any }) {
  // Strip out nested relational data when passing to the form,
  // we only want the base projects table columns
  const initialData = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    project_type: project.project_type || "case_study",
    category_id: project.category_id,
    status: project.status,
    featured: project.featured,
    display_order: project.display_order,
    short_description: project.short_description || "",
    full_description: project.full_description || "",
    problem: project.problem || "",
    solution: project.solution || "",
    github_url: project.github_url || "",
    demo_url: project.demo_url || "",
    figma_url: project.figma_url || "",
    figma_prototype_url: project.figma_prototype_url || "",
    figma_community_url: project.figma_community_url || "",
    started_at: project.started_at || "",
    completed_at: project.completed_at || "",
    duration: project.duration || "",
    role: project.role || "",
    team_size: project.team_size || "",
    client_name: project.client_name || "",
    is_personal_project: !!project.is_personal_project,
    impact_summary: project.impact_summary || "",
    featured_reason: project.featured_reason || "",
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-primary mb-1">Project Core Metadata</h3>
        <p className="text-sm text-foreground/80">
          Update the fundamental properties of this project. Relational data (Media, Sections) is managed in the other tabs.
        </p>
      </div>
      
      {/* We reuse the exact same ProjectForm we built in Step 2 */}
      <ProjectForm initialData={initialData} />
    </div>
  )
}
