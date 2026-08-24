"use client"

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  BarChart3,
  Home,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  icon: any;
  href?: string;
  children?: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    children: [
      { label: "All Projects", href: "/admin/projects" },
      { label: "Create Project", href: "/admin/projects/new" },
      { label: "Drafts", href: "/admin/projects/drafts" },
      { label: "Published", href: "/admin/projects/published" },
      { label: "Archived", href: "/admin/projects/archived" },
    ],
  },
  {
    label: "Collections",
    icon: Layers,
    children: [
      { label: "All Collections", href: "/admin/collections" },
      { label: "Create Collection", href: "/admin/collections/create" },
    ],
  },
  {
    label: "Pages",
    icon: FileText,
    children: [
      { label: "Home", href: "/admin/pages/home" },
      { label: "Portfolio", href: "/admin/pages/portfolio" },
      { label: "Projects", href: "/admin/pages/projects" },
    ],
  },
  {
    label: "Media",
    icon: ImageIcon,
    href: "/admin/media",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/admin/messages",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    children: [
      { label: "Website", href: "/admin/analytics" },
      { label: "Projects", href: "/admin/analytics/projects" },
      { label: "Traffic Sources", href: "/admin/analytics/traffic-sources" },
    ],
  },
  {
    label: "Homepage",
    icon: Home,
    href: "/admin/homepage",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminSidebar({
  onCloseMobile,
}: {
  onCloseMobile?: () => void;
}) {
  const pathname = usePathname();

  // Keep groups open if active page belongs to them
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Projects: true,
    Collections: true,
    Pages: false,
    Analytics: false,
  });

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }));
  };

  const isLinkActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="w-64 h-full bg-card/95 backdrop-blur-md border-r border-border flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-border/80 flex items-center justify-between">
        <Link
          href="/admin"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 font-bold text-lg text-foreground group"
        >
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <Sparkles size={18} />
          </div>
          <span>BaziStudio <span className="text-primary text-xs font-mono uppercase px-1.5 py-0.5 rounded bg-primary/10 ml-1">CMS</span></span>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
        {navGroups.map((group) => {
          const GroupIcon = group.icon;
          const hasChildren = !!group.children;
          const isGroupActive = hasChildren
            ? group.children!.some((child) => isLinkActive(child.href))
            : isLinkActive(group.href!);
          const isOpen = openGroups[group.label] ?? isGroupActive;

          if (!hasChildren) {
            return (
              <Link
                key={group.label}
                href={group.href!}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isGroupActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <GroupIcon size={18} />
                <span>{group.label}</span>
              </Link>
            );
          }

          return (
            <div key={group.label} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isGroupActive && !isOpen
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GroupIcon size={18} />
                  <span>{group.label}</span>
                </div>
                {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>

              {isOpen && (
                <div className="pl-9 pr-2 space-y-1 pt-0.5 animate-in slide-in-from-top-1 duration-150">
                  {group.children!.map((child) => {
                    const isChildActive = isLinkActive(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onCloseMobile}
                        className={`block px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isChildActive
                            ? "bg-primary/15 text-primary font-semibold border-l-2 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User / Sign Out Footer */}
      <div className="p-4 border-t border-border/80">
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
