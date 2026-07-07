import { AlertTriangle, Lightbulb } from "lucide-react"

export default function ProblemSolution({ project }: { project: any }) {
  if (!project.problem && !project.solution) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {project.problem && (
        <div className="glass-panel p-8 rounded-2xl border border-destructive/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <AlertTriangle size={120} className="text-destructive" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-destructive font-semibold mb-4 bg-destructive/10 px-3 py-1 rounded-full text-sm">
              <AlertTriangle size={16} /> The Challenge
            </div>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.problem}
            </p>
          </div>
        </div>
      )}

      {project.solution && (
        <div className="glass-panel p-8 rounded-2xl border border-primary/20 relative overflow-hidden group bg-gradient-to-br from-background to-primary/5">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Lightbulb size={120} className="text-primary" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-primary font-semibold mb-4 bg-primary/10 px-3 py-1 rounded-full text-sm">
              <Lightbulb size={16} /> The Solution
            </div>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.solution}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
