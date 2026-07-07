import { Mail, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-24 relative" id="contact">
      <div className="absolute inset-0 bg-primary/5 [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20">
          <Mail size={32} />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Initialize <span className="text-primary">Connection</span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Currently exploring new opportunities and open to discussing systems architecture, product development, or AI engineering roles.
        </p>
        
        <a 
          href="mailto:contact@bazistudio.com" 
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,3,232,0.3)] hover:-translate-y-1"
        >
          <span>Establish Secure Channel</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}
