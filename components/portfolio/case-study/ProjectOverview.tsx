import Image from "next/image";

export default function ProjectOverview({ project }: { project: any }) {
  // Try to find a hero image, fallback to first image
  const coverMedia = project.project_media?.find((m: any) => m.type === "image" && m.role === "hero") 
    || project.project_media?.find((m: any) => m.type === "image") 
    || project.project_media?.[0];

  return (
    <section>
      {coverMedia && (
        <div className="relative aspect-video rounded-3xl overflow-hidden glass-panel border border-border/50 mb-16 shadow-2xl shadow-primary/5">
          <Image 
            src={coverMedia.url} 
            alt={project.title} 
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      )}
      
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="w-8 h-px bg-primary block" /> Overview
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {project.full_description || project.short_description}
        </p>
      </div>
    </section>
  )
}
