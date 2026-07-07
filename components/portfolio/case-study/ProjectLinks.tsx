import { Github, Globe, Figma, ArrowRight } from "lucide-react";

export default function ProjectLinks({ project }: { project: any }) {
  if (!project.demo_url && !project.github_url && !project.figma_url) return null;

  return (
    <section className="bg-primary/5 border border-primary/20 rounded-3xl p-10 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-8">Access the Build</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-primary text-primary-foreground px-8 py-3 flex items-center gap-2 shadow-[0_0_20px_rgba(16,3,232,0.3)] hover:-translate-y-1 transition-transform">
              <Globe size={18} /> Visit Live System <ArrowRight size={16} />
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-background border border-border text-foreground px-8 py-3 flex items-center gap-2 hover:bg-muted hover:-translate-y-1 transition-transform">
              <Github size={18} /> View Repository
            </a>
          )}
          {project.figma_url && (
            <a href={project.figma_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-background border border-border text-foreground px-8 py-3 flex items-center gap-2 hover:bg-muted hover:-translate-y-1 transition-transform">
              <Figma size={18} /> Design Files
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
