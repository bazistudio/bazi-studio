import { Github, Globe, Figma, ArrowRight, Sparkles } from "lucide-react";

export default function ProjectLinks({ project }: { project: any }) {
  const hasLinks = 
    project.demo_url || 
    project.github_url || 
    project.figma_url || 
    project.figma_prototype_url || 
    project.figma_community_url;

  if (!hasLinks) return null;

  return (
    <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="relative z-10 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Access Resources & Deployments</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Explore source code repositories, live production environments, interactive Figma prototypes, and community design assets.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-primary text-primary-foreground px-7 py-3 flex items-center gap-2 shadow-[0_0_20px_rgba(16,3,232,0.3)] hover:-translate-y-1 transition-transform font-medium">
              <Globe size={18} /> Visit Live Deployment <ArrowRight size={16} />
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-background border border-border text-foreground px-7 py-3 flex items-center gap-2 hover:bg-muted hover:-translate-y-1 transition-transform font-medium">
              <Github size={18} /> View GitHub Repository
            </a>
          )}
          {project.figma_prototype_url && (
            <a href={project.figma_prototype_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-purple-600 text-white px-7 py-3 flex items-center gap-2 hover:bg-purple-700 hover:-translate-y-1 transition-transform font-medium">
              <Sparkles size={18} /> Run Interactive Prototype
            </a>
          )}
          {project.figma_url && (
            <a href={project.figma_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-background border border-border text-foreground px-7 py-3 flex items-center gap-2 hover:bg-muted hover:-translate-y-1 transition-transform font-medium">
              <Figma size={18} className="text-purple-500" /> Figma Design Files
            </a>
          )}
          {project.figma_community_url && (
            <a href={project.figma_community_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-background border border-border text-foreground px-7 py-3 flex items-center gap-2 hover:bg-muted hover:-translate-y-1 transition-transform font-medium">
              <Figma size={18} className="text-pink-500" /> Figma Community Asset
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
