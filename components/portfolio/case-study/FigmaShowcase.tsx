import { Figma, ExternalLink, Sparkles } from "lucide-react";

export default function FigmaShowcase({ project }: { project: any }) {
  const hasFigmaUrl = !!project.figma_url;
  const hasPrototype = !!project.figma_prototype_url;
  const hasCommunity = !!project.figma_community_url;

  if (!hasFigmaUrl && !hasPrototype && !hasCommunity) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        <span className="w-8 h-px bg-primary block" /> UI/UX Design & Prototype
      </h2>

      {/* Interactive Figma Embed (if prototype URL or Figma file URL exists) */}
      {(hasPrototype || hasFigmaUrl) && (
        <div className="glass-panel p-2 md:p-4 rounded-2xl border border-border/60 overflow-hidden shadow-2xl space-y-3">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/20 border border-border/40">
            <iframe
              src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
                project.figma_prototype_url || project.figma_url
              )}`}
              title="Figma Prototype Embed"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Sparkles size={14} className="text-primary" /> Interactive Figma Canvas / Prototype
            </span>
            <a
              href={project.figma_prototype_url || project.figma_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 font-semibold"
            >
              Open in Figma <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}

      {/* Figma Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {project.figma_url && (
          <a
            href={project.figma_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-background border border-border text-foreground px-5 py-2.5 flex items-center gap-2 hover:bg-muted text-sm font-medium"
          >
            <Figma size={16} className="text-purple-500" /> Figma Design File
          </a>
        )}
        {project.figma_prototype_url && (
          <a
            href={project.figma_prototype_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-primary/10 border border-primary/30 text-primary px-5 py-2.5 flex items-center gap-2 hover:bg-primary/20 text-sm font-medium"
          >
            <Figma size={16} /> Live Prototype Experience <ExternalLink size={14} />
          </a>
        )}
        {project.figma_community_url && (
          <a
            href={project.figma_community_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-background border border-border text-foreground px-5 py-2.5 flex items-center gap-2 hover:bg-muted text-sm font-medium"
          >
            <Figma size={16} className="text-pink-500" /> Figma Community Resource <ExternalLink size={14} />
          </a>
        )}
      </div>
    </section>
  );
}
