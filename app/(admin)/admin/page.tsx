import { createClient } from '@/lib/database/server';
import Link from 'next/link';
import { 
  FolderKanban, 
  Layers, 
  Image as ImageIcon, 
  MessageSquare, 
  Plus, 
  Settings, 
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import EmptyState from '@/components/feedback/EmptyState';
import AdminProjectCard from '@/components/project/AdminProjectCard';

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Real database counts
  const [
    { count: totalProjects },
    { count: publishedProjects },
    { count: draftProjects },
    { count: totalCollections },
    { count: totalMedia },
    { data: recentProjects },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('project_media').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select(`
      *,
      categories(*),
      project_media(*),
      project_videos(*),
      project_technologies(technologies(*)),
      project_tags(tags(*))
    `).order('created_at', { ascending: false }).limit(3),
  ]);

  const pCount = totalProjects || 0;
  const pubCount = publishedProjects || 0;
  const dCount = draftProjects || 0;
  const cCount = totalCollections || 0;
  const mCount = totalMedia || 0;

  return (
    <div className="space-y-10 pb-12">
      {/* Top Header */}
      <PageHeader
        title="Dashboard Overview"
        description="Welcome to the Bazi Studio Control Center. Manage projects, collections, and portfolio content."
        actionLabel="Create Project"
        actionHref="/admin/projects/new"
        actionIcon={Plus}
      />

      {/* Real Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projects Card */}
        <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects</span>
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FolderKanban size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{pCount}</span>
            <span className="text-xs text-muted-foreground">total</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/50">
            <span className="text-success font-medium">{pubCount} Published</span>
            <span>•</span>
            <span>{dCount} Drafts</span>
          </div>
        </div>

        {/* Collections Card */}
        <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Collections</span>
            <div className="w-8 h-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Layers size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{cCount}</span>
            <span className="text-xs text-muted-foreground">categories</span>
          </div>
          <p className="text-xs text-muted-foreground pt-1 border-t border-border/50">
            Organizing portfolio structure
          </p>
        </div>

        {/* Media Storage Card */}
        <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Media Assets</span>
            <div className="w-8 h-8 rounded-xl bg-success/10 text-success flex items-center justify-center">
              <ImageIcon size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{mCount}</span>
            <span className="text-xs text-muted-foreground">files in storage</span>
          </div>
          <p className="text-xs text-muted-foreground pt-1 border-t border-border/50">
            portfolio-media bucket
          </p>
        </div>

        {/* Messages Card */}
        <div className="glass-panel p-6 rounded-2xl border border-border/80 bg-card/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Inbox</span>
            <div className="w-8 h-8 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">0</span>
            <span className="text-xs text-muted-foreground">new messages</span>
          </div>
          <p className="text-xs text-muted-foreground pt-1 border-t border-border/50">
            All caught up
          </p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles size={18} className="text-primary" />
          <span>Quick Actions</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/projects/new"
            className="glass-panel p-4 rounded-xl border border-border/80 hover:border-primary/50 flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Plus size={18} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Create Project</h4>
                <p className="text-xs text-muted-foreground">New case study or lab</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/collections"
            className="glass-panel p-4 rounded-xl border border-border/80 hover:border-primary/50 flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                <Layers size={18} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Collections</h4>
                <p className="text-xs text-muted-foreground">Organize project taxonomy</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/media"
            className="glass-panel p-4 rounded-xl border border-border/80 hover:border-primary/50 flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-success/10 text-success flex items-center justify-center">
                <ImageIcon size={18} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Media Assets</h4>
                <p className="text-xs text-muted-foreground">Upload and manage files</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/settings"
            className="glass-panel p-4 rounded-xl border border-border/80 hover:border-primary/50 flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-muted text-muted-foreground flex items-center justify-center">
                <Settings size={18} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Site Settings</h4>
                <p className="text-xs text-muted-foreground">SEO & brand preferences</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <FolderKanban size={18} className="text-primary" />
            <span>Recent Projects</span>
          </h2>
          {pCount > 0 && (
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View all ({pCount})</span>
              <ArrowRight size={13} />
            </Link>
          )}
        </div>

        {recentProjects && recentProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <AdminProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FolderKanban}
            title="No project data yet"
            description="Create your first project to start building your portfolio."
            actionLabel="Create Project"
            actionHref="/admin/projects/new"
          />
        )}
      </div>
    </div>
  );
}
