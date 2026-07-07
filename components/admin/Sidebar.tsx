"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, LayoutDashboard, FolderKanban, Image as ImageIcon, Settings, Tags } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Categories & Tags", href: "/admin/taxonomy", icon: Tags },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card hidden md:block">
      <div className="p-6 h-full flex flex-col">
        <h2 className="text-xl font-bold mb-8 text-primary">BaziStudio Lab</h2>
        
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted text-foreground/80 hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <form action="/api/auth/signout" method="post">
          <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-destructive/10 text-destructive mt-auto transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
