import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FolderOpen, Activity } from "lucide-react";

export default function ProjectCard({ project }: { project: any }) {
  // Find cover image (fallback to first image or placeholder)
  const coverMedia = project.project_media?.find((m: any) => m.type === "image") || project.project_media?.[0];
  const coverUrl = coverMedia?.url || "https://placehold.co/800x500/1003E8/FFF?text=BaziStudio";
  
  // Extract category
  const categoryName = project.categories?.name || "Experiment";

  // Extract technologies
  const techList = project.project_technologies?.map((pt: any) => pt.technologies?.name).filter(Boolean) || [];

  return (
    <div className="group relative flex flex-col glass-panel rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
        <Image 
          src={coverUrl} 
          alt={project.title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur border border-border/50 text-xs font-medium text-foreground">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${project.status === 'published' ? 'bg-green-400' : 'bg-orange-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${project.status === 'published' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
            </span>
            {project.status === 'published' ? 'Live' : 'Building'}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 backdrop-blur border border-primary/30 text-xs font-medium text-primary">
            <FolderOpen size={12} />
            {categoryName}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {project.short_description}
        </p>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techList.slice(0, 4).map((tech: string) => (
            <span key={tech} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-mono border border-border/50">
              {tech}
            </span>
          ))}
          {techList.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-mono border border-border/50">
              +{techList.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link href={`/projects/${project.slug}`} className="inline-flex items-center justify-between w-full pt-4 border-t border-border/50 text-sm font-semibold text-foreground group/link">
          <span>Read Case Study</span>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all">
            <ArrowUpRight size={16} />
          </div>
        </Link>
      </div>
    </div>
  )
}
