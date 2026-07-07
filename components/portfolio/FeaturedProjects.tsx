import ProjectCard from "./ProjectCard";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedProjects({ projects }: { projects: any[] }) {
  if (!projects?.length) return null;

  return (
    <section className="py-24 relative max-w-7xl mx-auto px-6" id="projects">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles size={14} />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Engineering <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A curated selection of products and systems designed, built, and deployed to production.
          </p>
        </div>
        
        <Link href="/projects" className="group hidden md:flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
          View All Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      <div className="mt-12 md:hidden flex justify-center">
        <Link href="/projects" className="btn-base bg-secondary text-secondary-foreground px-8 py-3 w-full sm:w-auto text-center">
          View All Projects
        </Link>
      </div>
    </section>
  )
}
