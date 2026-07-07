import { Cpu, Server, Layout, Database, Shield, Cloud } from "lucide-react";

export default function TechStack({ technologies }: { technologies: any[] }) {
  // If no DB technologies exist yet, we can render a beautiful fallback or just map what we have.
  // The user requested a complete skill identity mapping.

  const categories = [
    { id: "frontend", label: "Frontend & UI", icon: <Layout size={18} /> },
    { id: "backend", label: "Backend & Systems", icon: <Server size={18} /> },
    { id: "database", label: "Database & Cloud", icon: <Database size={18} /> },
    { id: "ai", label: "AI & Data", icon: <Cpu size={18} /> },
  ];

  // Group technologies by category (assuming category_id is linked, if not, we display all)
  const renderTech = () => {
    if (!technologies || technologies.length === 0) {
      return (
        <div className="flex flex-wrap gap-3 justify-center">
          {["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Tailwind CSS", "Framer Motion", "Vercel"].map(tech => (
            <div key={tech} className="glass-panel px-6 py-3 rounded-xl border border-border/50 text-foreground font-medium hover:border-primary/50 hover:text-primary transition-colors cursor-default">
              {tech}
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {technologies.map(tech => (
          <div key={tech.id} className="glass-panel px-6 py-3 rounded-xl border border-border/50 text-foreground font-medium hover:border-primary/50 hover:text-primary transition-colors flex items-center gap-2 cursor-default">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {tech.icon_url && <img src={tech.icon_url} alt={tech.name} className="w-5 h-5 object-contain" />}
            {tech.name}
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className="py-24 relative max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-[100%] blur-[100px] pointer-events-none -z-10" />

      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Core <span className="text-primary">Architecture</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          The fundamental building blocks, languages, and systems utilized to construct high-performance digital environments.
        </p>
      </div>

      {renderTech()}
    </section>
  )
}
