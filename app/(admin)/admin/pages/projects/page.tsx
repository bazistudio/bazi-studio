import { createClient } from "@/lib/database/server";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import Link from "next/link";
import { FolderKanban, Eye, Plus, ArrowRight } from "lucide-react";

export default async function AdminProjectsPageConfig() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, status, project_type, display_order")
    .order("display_order", { ascending: true })
    .limit(10);

  const pList = projects || [];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Pages → Projects"
        description="Configure the public /projects directory, listing ordering, and filter behavior."
        actionLabel="Manage Projects"
        actionHref="/admin/projects"
        actionIcon={FolderKanban}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <FolderKanban size={18} className="text-primary" />
                <h3>Active Project Feed</h3>
              </div>
              <Link
                href="/admin/projects/new"
                className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
              >
                <Plus size={13} />
                <span>Create New</span>
              </Link>
            </div>

            {pList.length > 0 ? (
              <div className="space-y-2.5">
                {pList.map((p: any) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-foreground">{p.title}</h4>
                      <span className="text-[10px] uppercase font-mono text-muted-foreground">
                        Order #{p.display_order} • Type: {p.project_type || "case_study"} • Status: {p.status}
                      </span>
                    </div>
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-primary hover:underline font-semibold"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={FolderKanban}
                title="No projects available"
                description="Create a project to populate the Projects page."
                actionLabel="Create Project"
                actionHref="/admin/projects/new"
              />
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-4">
            <h4 className="text-sm font-bold text-foreground">Public Projects Directory</h4>
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex justify-between py-1 border-b border-border/40">
                <span>Public Route:</span>
                <span className="font-mono text-foreground">/projects</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span>Catalog Size:</span>
                <span className="font-mono text-foreground">{pList.length} items</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Pagination:</span>
                <span className="text-emerald-500 font-semibold">Enabled</span>
              </div>
            </div>

            <Link
              href="/projects"
              target="_blank"
              className="w-full btn-base bg-muted hover:bg-muted/80 text-foreground px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 border border-border/80"
            >
              <Eye size={14} />
              <span>Preview Projects Page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
