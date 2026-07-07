"use client"

import { ArrowRight, Terminal, Code2, Database, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium backdrop-blur-md mb-4">
          <Terminal size={14} />
          <span>BaziStudio Lab &mdash; v2.0 Online</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          Building Digital{" "}
          <span className="bg-gradient-to-r from-primary via-[#463261] to-[#F2730A] bg-clip-text text-transparent block mt-2">
            Ecosystems
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          More than just a portfolio. This is a developer identity platform engineering scalable architectures, AI experiments, and production-ready applications.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,3,232,0.4)]">
            <span className="relative z-10 flex items-center gap-2">
              Explore Case Studies <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
          
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors">
            <Code2 size={18} />
            View Source Code
          </button>
        </div>

        {/* Mini stats / identity bar */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto opacity-70">
          <div className="flex flex-col items-center gap-2">
            <Database size={24} className="text-muted-foreground" />
            <span className="text-sm font-medium">Headless CMS</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Code2 size={24} className="text-muted-foreground" />
            <span className="text-sm font-medium">Next.js App Router</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles size={24} className="text-muted-foreground" />
            <span className="text-sm font-medium">Framer Motion UI</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Terminal size={24} className="text-muted-foreground" />
            <span className="text-sm font-medium">Type-Safe DB</span>
          </div>
        </div>
      </div>
    </section>
  )
}
