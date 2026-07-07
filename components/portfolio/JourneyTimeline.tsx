import { Activity, Terminal } from "lucide-react";
import Link from "next/link";

export default function JourneyTimeline({ logs }: { logs: any[] }) {
  if (!logs?.length) return null;

  return (
    <section className="py-24 relative max-w-4xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
          <Activity size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Lab Activity</h2>
          <p className="text-muted-foreground">Live transmission from the developer journey.</p>
        </div>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/30 before:via-border before:to-transparent">
        {logs.map((log, i) => (
          <div key={log.id} className="relative flex items-start gap-6 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-primary/30 text-primary z-10 shrink-0 shadow-[0_0_15px_rgba(16,3,232,0.2)] group-hover:border-primary transition-colors">
              <Terminal size={16} />
            </div>
            
            <div className="glass-panel p-6 rounded-xl border border-border/50 group-hover:border-primary/30 transition-colors w-full">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Day {log.day_number}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {new Date(log.created_at).toLocaleDateString()}
                </span>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">{log.title}</h4>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {log.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 flex justify-center">
        <Link href="/journey" className="text-primary font-medium hover:underline inline-flex items-center gap-2">
          View full transmission log &rarr;
        </Link>
      </div>
    </section>
  )
}
