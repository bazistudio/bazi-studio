"use client"

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus, FolderKanban, FileEdit, CheckCircle2, Archive, Filter } from "lucide-react";
import AdminProjectCard from "./AdminProjectCard";
import EmptyState from "./EmptyState";

interface ProjectsManagerViewProps {
  initialProjects: any[];
  currentTab?: "all" | "draft" | "published" | "archived";
}

export default function ProjectsManagerView({
  initialProjects,
  currentTab = "all",
}: ProjectsManagerViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "draft" | "published" | "archived">(currentTab);
  const [projectsList, setProjectsList] = useState(initialProjects);

  // Filter projects by status tab and search query
  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      // 1. Status Filter
      if (activeTab === "draft" && project.status !== "draft") return false;
      if (activeTab === "published" && project.status !== "published") return false;
      if (activeTab === "archived" && project.status !== "archived") return false;

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = project.title?.toLowerCase().includes(query);
        const descMatch = project.short_description?.toLowerCase().includes(query);
        const catMatch = project.categories?.name?.toLowerCase().includes(query);
        return titleMatch || descMatch || catMatch;
      }

      return true;
    });
  }, [projectsList, activeTab, searchQuery]);

  const handleDeleted = (id: string) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== id));
  };

  // Dynamic empty state content per tab
  const emptyStateConfig = {
    all: {
      title: "No projects yet",
      description: "Create your first project to start building your portfolio.",
      icon: FolderKanban,
      actionLabel: "Create Project",
      actionHref: "/admin/projects/new",
    },
    draft: {
      title: "No drafts",
      description: "Draft projects will appear here when you save unfinished work.",
      icon: FileEdit,
      actionLabel: "Create New Draft",
      actionHref: "/admin/projects/new",
    },
    published: {
      title: "No published projects",
      description: "Publish a project and it will appear here.",
      icon: CheckCircle2,
      actionLabel: "View All Projects",
      onAction: () => setActiveTab("all"),
    },
    archived: {
      title: "No archived projects",
      description: "Archived projects will appear here.",
      icon: Archive,
      actionLabel: "View All Projects",
      onAction: () => setActiveTab("all"),
    },
  }[activeTab];

  return (
    <div className="space-y-6">
      {/* Top Action & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, description, or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-primary text-sm outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {/* Create Project Button */}
        <Link
          href="/admin/projects/new"
          className="btn-base bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          <span>Create Project</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto hide-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "all"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          All ({projectsList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("draft")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "draft"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          Drafts ({projectsList.filter((p) => p.status === "draft").length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("published")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "published"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          Published ({projectsList.filter((p) => p.status === "published").length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("archived")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "archived"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          Archived ({projectsList.filter((p) => p.status === "archived").length})
        </button>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        searchQuery ? (
          <EmptyState
            icon={Filter}
            title="No matching projects"
            description={`No projects found matching "${searchQuery}". Try a different search term or clear filters.`}
            actionLabel="Clear Search"
            onAction={() => setSearchQuery("")}
          />
        ) : (
          <EmptyState
            icon={emptyStateConfig.icon}
            title={emptyStateConfig.title}
            description={emptyStateConfig.description}
            actionLabel={emptyStateConfig.actionLabel}
            actionHref={emptyStateConfig.actionHref}
            onAction={emptyStateConfig.onAction}
          />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <AdminProjectCard
              key={project.id}
              project={project}
              onDeleted={handleDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
