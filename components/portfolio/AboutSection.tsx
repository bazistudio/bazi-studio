import { Fingerprint } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 relative max-w-7xl mx-auto px-6" id="about">
      <div className="glass-panel p-8 md:p-16 rounded-3xl border border-border/50 relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-primary pointer-events-none">
          <Fingerprint size={200} />
        </div>
        
        <div className="max-w-3xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Intelligent Systems</span>
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              BaziStudio is not a standard design agency. It operates as a focused development lab where creative ambition meets rigorous software engineering. 
            </p>
            <p>
              The philosophy is simple: beautiful interfaces are useless without scalable, secure, and highly-performant backend architectures. Here, we build end-to-end digital products that solve real problems, experimenting with AI integrations, robust APIs, and fluid frontends.
            </p>
            <p className="font-mono text-sm text-primary/80 border-l-2 border-primary pl-4 py-2 bg-primary/5">
              // System Protocol: Design with empathy. Code with precision. Deploy with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
