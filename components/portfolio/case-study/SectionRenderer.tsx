import { Terminal, Layout } from "lucide-react";

const TextBlock = ({ content, title }: { content: string; title?: string }) => (
  <div className="mb-12">
    {title && <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>}
    <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">{content}</div>
  </div>
);

const CodeShowcase = ({ content, title }: { content: string; title?: string }) => (
  <div className="my-12">
    {title && (
      <h4 className="text-sm font-mono text-primary mb-3 flex items-center gap-2">
        <Terminal size={14} /> {title}
      </h4>
    )}
    <div className="bg-background border border-border rounded-xl p-6 overflow-x-auto font-mono text-sm shadow-2xl">
      <pre>
        <code className="text-primary font-mono">{content}</code>
      </pre>
    </div>
  </div>
);

const ArchitectureBlock = ({ content, title }: { content: string; title?: string }) => (
  <div className="my-12 glass-panel border border-secondary/30 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-secondary/10 to-transparent relative overflow-hidden">
    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
      <Layout size={100} className="text-secondary" />
    </div>
    <div className="relative z-10">
      {title && (
        <h4 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
          <Layout size={20} /> {title}
        </h4>
      )}
      <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{content}</div>
    </div>
  </div>
);

const QuoteBlock = ({ content, title }: { content: string; title?: string }) => (
  <blockquote className="my-16 border-l-4 border-primary pl-6 md:pl-10 py-2">
    <p className="text-2xl md:text-3xl italic text-foreground leading-snug">
      &ldquo;{content}&rdquo;
    </p>
    {title && (
      <footer className="text-sm font-semibold text-primary mt-6 tracking-widest uppercase">
        — {title}
      </footer>
    )}
  </blockquote>
);

export default function SectionRenderer({ sections }: { sections: any[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <section className="space-y-6">
      {sections.map((section) => {
        switch (section.type) {
          case "text":
            return <TextBlock key={section.id} content={section.content} title={section.title} />;
          case "code_showcase":
            return <CodeShowcase key={section.id} content={section.content} title={section.title} />;
          case "architecture":
            return <ArchitectureBlock key={section.id} content={section.content} title={section.title} />;
          case "quote":
            return <QuoteBlock key={section.id} content={section.content} title={section.title} />;
          default:
            return <TextBlock key={section.id} content={section.content} title={section.title} />;
        }
      })}
    </section>
  );
}
