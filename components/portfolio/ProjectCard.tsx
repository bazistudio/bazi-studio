import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FolderOpen, Figma, Layers, BookOpen } from "lucide-react";

export default function ProjectCard({ project }: { project?: any }) {
  if (!project) return null;

  // 1. Find cover image (prefer role === 'cover', fallback to first image, fallback to image prop, fallback to placeholder)
  const coverMedia = 
    project.project_media?.find((m: any) => m.type === "image" && m.role === "cover") ||
    project.project_media?.find((m: any) => m.type === "image") ||
    project.project_media?.[0];

  const coverUrl = coverMedia?.url || project.image || "/images/placeholder-project.svg";
  
  // 2. Extract category
  const categoryName = project.categories?.name || project.category || "Portfolio";

  // 3. Extract technologies (handle both DB relational object array and flat string array)
  let techList: string[] = [];
  if (Array.isArray(project.technologies)) {
    techList = project.technologies.filter(Boolean);
  } else if (Array.isArray(project.project_technologies)) {
    techList = project.project_technologies
      .map((pt: any) => pt.technologies?.name)
      .filter(Boolean);
  }

  // 4. Project Type Badge details
  const projectType = project.project_type || "case_study";
  const typeConfig = {
    case_study: { label: "Case Study", icon: BookOpen, color: "text-primary bg-primary/10 border-primary/20" },
    shortlist: { label: "Shortlisted", icon: Layers, color: "text-success bg-success/10 border-success/20" },
    figma: { label: "Figma Design", icon: Figma, color: "text-secondary bg-secondary/10 border-secondary/20" },
  }[projectType as "case_study" | "shortlist" | "figma"] || {
    label: "Case Study",
    icon: BookOpen,
    color: "text-primary bg-primary/10 border-primary/20",
  };

  const TypeIcon = typeConfig.icon;
  const projectSlug = project.slug || (project.title ? project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") : "project");

  return (
    <div className="group relative flex flex-col glass-panel rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
        
        {coverUrl && coverUrl !== "/images/placeholder-project.svg" ? (
          <Image 
            src={coverUrl} 
            alt={project.title || "Project"} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/40 p-6 text-center">
            <TypeIcon size={36} className="text-primary/40 mb-2" />
            <span className="text-xs font-medium tracking-wide uppercase">{project.title || "Project"}</span>
          </div>
        )}
        
        {/* Project Type Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur border text-xs font-semibold ${typeConfig.color}`}>
            <TypeIcon size={12} />
            <span>{typeConfig.label}</span>
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
          {project.short_description || project.description}
        </p>

        {/* Tech Chips */}
        {techList.length > 0 && (
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
        )}

        {/* Action Link */}
        <Link href={`/projects/${projectSlug}`} className="inline-flex items-center justify-between w-full pt-4 border-t border-border/50 text-sm font-semibold text-foreground group/link">
          <span>{projectType === "figma" ? "View Design Showcase" : projectType === "shortlist" ? "View Project Details" : "Read Case Study"}</span>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all">
            <ArrowUpRight size={16} />
          </div>
        </Link>
      </div>
    </div>
  );
}
