import { createClient } from '@/lib/database/server'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch some quick stats
  const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true })
  const { count: mediaCount } = await supabase.from('project_media').select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome to the BaziStudio Control Center.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">Total Projects</h3>
          <div className="text-3xl font-bold mt-2">{projectsCount || 0}</div>
        </div>
        
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">Media Assets</h3>
          <div className="text-3xl font-bold mt-2">{mediaCount || 0}</div>
        </div>
        
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">System Status</h3>
          <div className="text-3xl font-bold mt-2 text-green-500">Online</div>
        </div>
      </div>
      
      <div className="glass-panel p-8 rounded-xl min-h-[400px]">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground text-sm">No recent activity found. Initialize your first project to begin tracking logs.</p>
      </div>
    </div>
  )
}
