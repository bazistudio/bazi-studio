import { createClient } from "@/lib/database/server";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import Link from "next/link";
import { Home, Sparkles, LayoutGrid, Eye, ArrowRight } from "lucide-react";

export default async function AdminHomepageConfig() {
  const supabase = await createClient();
  const { data: featuredProjects } = await supabase
    .from("projects")
    .select("id, title, status, project_type, featured")
    .eq("featured", true);

  const hasFeatured = featuredProjects && featuredProjects.length > 0;

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Homepage → Hero & Featured"
        description="Specifically manage the homepage hero statement, value propositions, and featured projects spotlight."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Statement */}
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <Sparkles size={18} className="text-primary" />
                <h3>Hero Value Proposition</h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">Configured</span>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-muted-foreground font-medium">Main Headline</label>
                <input
                  type="text"
                  readOnly
                  value="Engineering Premium Web Apps & Scalable Systems"
                  className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-foreground font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted-foreground font-medium">Subheadline</label>
                <textarea
                  readOnly
                  rows={2}
                  value="Bazi Studio specializes in high-performance full-stack architectures, interactive UI/UX designs, and enterprise AI integrations."
                  className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-muted-foreground resize-none"
                />
              </div>
            </div>
          </div>

          {/* Featured Spotlight Grid */}
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <LayoutGrid size={18} className="text-primary" />
                <h3>Featured Work Spotlight ({featuredProjects?.length || 0})</h3>
              </div>
              <Link
                href="/admin/projects"
                className="text-xs text-primary hover:underline font-semibold"
              >
                Manage Projects
              </Link>
            </div>

            {hasFeatured ? (
              <div className="space-y-2.5">
                {featuredProjects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-foreground">{p.title}</h4>
                      <span className="text-[10px] uppercase font-mono text-muted-foreground">
                        Type: {p.project_type || "case_study"} • Status: {p.status}
                      </span>
                    </div>
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-primary hover:underline font-semibold"
                    >
                      Edit Project
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={LayoutGrid}
                title="No featured projects configured"
                description="Toggle 'Featured Project' on any project in the editor to spotlight it here on the homepage."
                actionLabel="Browse Projects"
                actionHref="/admin/projects"
              />
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <h4 className="text-sm font-bold text-foreground">Homepage Controls</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Featured items are dynamically queried based on the &apos;featured&apos; flag in the database.
            </p>
            <Link
              href="/"
              target="_blank"
              className="w-full btn-base bg-muted hover:bg-muted/80 text-foreground px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 border border-border/80"
            >
              <Eye size={14} />
              <span>Preview Live Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
