import { createClient } from "@/lib/database/server";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import Link from "next/link";
import { Home, Sparkles, LayoutGrid, Layers, ArrowRight, Eye } from "lucide-react";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const { data: featuredProjects } = await supabase
    .from("projects")
    .select("id, title, status, project_type, featured")
    .eq("featured", true)
    .limit(4);

  const hasFeatured = featuredProjects && featuredProjects.length > 0;

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Pages → Home"
        description="Configure homepage presentation, hero section, and featured spotlight showcases."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section Config Panel */}
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5 font-bold text-foreground">
                <Sparkles size={18} className="text-primary" />
                <h3>Hero Section Banner</h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">Live</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The primary visual hero introduces Bazi Studio with interactive typography, animated background canvas, and direct CTAs.
            </p>
            <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Title:</span>
                <span className="font-semibold text-foreground">Next-Gen Digital Solutions & Design</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Action Link:</span>
                <span className="font-mono text-primary">/portfolio</span>
              </div>
            </div>
          </div>

          {/* Featured Content & Selected Projects */}
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5 font-bold text-foreground">
                <LayoutGrid size={18} className="text-primary" />
                <h3>Featured Work Spotlight</h3>
              </div>
              <Link
                href="/admin/projects"
                className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <span>Manage Featured</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {hasFeatured ? (
              <div className="space-y-2.5">
                {featuredProjects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{p.title}</h4>
                      <span className="text-[10px] uppercase font-mono text-muted-foreground">
                        Type: {p.project_type || "case_study"} • Status: {p.status}
                      </span>
                    </div>
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Edit Project
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center bg-muted/20 border border-dashed border-border/60 rounded-xl p-6">
                <p className="text-sm font-semibold text-foreground mb-1">No featured content configured</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Select projects in the Projects Manager and enable &apos;Featured Project&apos; to showcase them on the homepage.
                </p>
                <Link
                  href="/admin/projects"
                  className="btn-base bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold"
                >
                  Go to Projects
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <h4 className="text-sm font-bold text-foreground">Page Overview</h4>
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex justify-between py-1 border-b border-border/40">
                <span>Route:</span>
                <span className="font-mono text-foreground">/</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span>Featured Limit:</span>
                <span className="font-mono text-foreground">4 items</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Status:</span>
                <span className="text-emerald-500 font-semibold">Active</span>
              </div>
            </div>

            <Link
              href="/"
              target="_blank"
              className="w-full btn-base bg-muted hover:bg-muted/80 text-foreground px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 border border-border/80"
            >
              <Eye size={14} />
              <span>Preview Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
