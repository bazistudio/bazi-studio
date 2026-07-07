import { getProjects } from "@/lib/actions/projects";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your portfolio case studies and experimental labs.</p>
        </div>
      </div>
      
      {/* We pass the data to a client component because the table needs interactive features like edit/delete buttons */}
      <ProjectsClient data={projects} />
    </div>
  )
}
