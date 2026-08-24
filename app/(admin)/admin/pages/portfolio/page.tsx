import { createClient } from "@/lib/database/server";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import Link from "next/link";
import { Layers, FolderKanban, Eye, Sparkles, ExternalLink } from "lucide-react";

export default async function AdminPortfolioConfigPage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: publishedProjects }] = await Promise.all([
    supabase.from("categories").select("id, name, slug, display_order, projects(id, title)"),
    supabase.from("projects").select("id, title, project_type, status").eq("status", "published"),
  ]);

  const cats = categories || [];
  const projs = publishedProjects || [];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Pages → Portfolio"
        description="Configure portfolio layout structure, filter categories, and collection displays."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Configuration Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <Layers size={18} className="text-primary" />
                <h3>Portfolio Category Structure</h3>
              </div>
              <Link
                href="/admin/collections"
                className="text-xs text-primary hover:underline font-semibold"
              >
                Edit Collections
              </Link>
            </div>

            {cats.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cats.map((c: any) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{c.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-mono">/{c.slug}</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {c.projects?.length || 0} projects
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Layers}
                title="No collections configured"
                description="Create collections to structure how projects are grouped on the public portfolio page."
                actionLabel="Create Collection"
                actionHref="/admin/collections"
              />
            )}
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <FolderKanban size={18} className="text-primary" />
                <h3>Live Showcase Items ({projs.length})</h3>
              </div>
              <Link
                href="/admin/projects"
                className="text-xs text-primary hover:underline font-semibold"
              >
                All Projects
              </Link>
            </div>

            {projs.length > 0 ? (
              <div className="space-y-2">
                {projs.map((p: any) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-foreground">{p.title}</h4>
                      <span className="text-[10px] uppercase font-mono text-muted-foreground">
                        Type: {p.project_type || "case_study"}
                      </span>
                    </div>
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-primary hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Edit</span>
                      <ExternalLink size={11} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={FolderKanban}
                title="No published projects yet"
                description="Publish a project to display it on the public portfolio."
                actionLabel="View Drafts"
                actionHref="/admin/projects/drafts"
              />
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <h4 className="text-sm font-bold text-foreground">Portfolio Page Metadata</h4>
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex justify-between py-1 border-b border-border/40">
                <span>Public URL:</span>
                <span className="font-mono text-foreground">/portfolio</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span>Total Live:</span>
                <span className="font-mono text-foreground">{projs.length}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Filter Engine:</span>
                <span className="text-emerald-500 font-semibold">Active</span>
              </div>
            </div>

            <Link
              href="/portfolio"
              target="_blank"
              className="w-full btn-base bg-muted hover:bg-muted/80 text-foreground px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 border border-border/80"
            >
              <Eye size={14} />
              <span>Preview Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
