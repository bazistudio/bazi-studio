import { redirect } from 'next/navigation'
import { createClient } from '@/lib/database/server'
import Link from 'next/link'
import { LogOut, LayoutDashboard, FolderKanban, Image as ImageIcon, Settings } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // Protect all /admin routes
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  // Double check admin profile role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/') // Or a 403 unauthorized page
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:block">
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-8 text-primary">BaziStudio Lab</h2>
          
          <nav className="space-y-2 flex-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground/80 hover:text-foreground">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground/80 hover:text-foreground">
              <FolderKanban size={18} />
              Projects
            </Link>
            <Link href="/admin/media" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground/80 hover:text-foreground">
              <ImageIcon size={18} />
              Media
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground/80 hover:text-foreground">
              <Settings size={18} />
              Settings
            </Link>
          </nav>

          <form action="/api/auth/signout" method="post">
            <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-destructive/10 text-destructive mt-auto">
              <LogOut size={18} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
