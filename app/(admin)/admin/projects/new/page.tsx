import ProjectForm from "@/components/admin/project-editor/ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 bg-muted text-muted-foreground hover:text-foreground rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Project</h1>
          <p className="text-muted-foreground mt-1">Start a new case study or experiment.</p>
        </div>
      </div>
      
      <ProjectForm />
    </div>
  )
}
