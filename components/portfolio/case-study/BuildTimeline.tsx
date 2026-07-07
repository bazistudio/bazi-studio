import { Terminal, Activity } from "lucide-react";

export default function BuildTimeline({ logs }: { logs: any[] }) {
  if (!logs || logs.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
          <Activity size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Developer Journey</h2>
          <p className="text-muted-foreground">The day-by-day log of building this system.</p>
        </div>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/30 before:via-border before:to-transparent">
        {logs.map((log) => (
          <div key={log.id} className="relative flex items-start gap-6 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-primary/30 text-primary z-10 shrink-0 shadow-[0_0_15px_rgba(16,3,232,0.2)] group-hover:border-primary transition-colors">
              <span className="text-xs font-bold">{log.day_number}</span>
            </div>
            
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-border/50 group-hover:border-primary/30 transition-colors w-full">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-foreground">{log.title}</h4>
                <span className="text-xs font-mono text-muted-foreground">
                  {new Date(log.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {log.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
