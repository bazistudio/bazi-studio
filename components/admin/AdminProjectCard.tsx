"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Edit,
  MoreVertical,
  Copy,
  Archive,
  ArchiveRestore,
  Trash2,
  BookOpen,
  Layers,
  Figma,
  FolderOpen,
  Loader2,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import ConfirmDialog from "./ConfirmDialog";
import { toggleProjectVisibility, setProjectStatus, copyProject, deleteProject } from "@/lib/actions/projects";

interface AdminProjectCardProps {
  project: any;
  onDeleted?: (id: string) => void;
}

export default function AdminProjectCard({
  project,
  onDeleted,
}: AdminProjectCardProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTogglingVisibility, setIsTogglingVisibility] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isVisible = project.status === "published";
  const isArchived = project.status === "archived";

  // Cover image resolution
  const coverMedia =
    project.project_media?.find((m: any) => m.type === "image" && m.role === "cover") ||
    project.project_media?.find((m: any) => m.type === "image") ||
    project.project_media?.[0];

  const coverUrl = coverMedia?.url;
  const categoryName = project.categories?.name;

  const typeConfig = {
    case_study: { label: "Case Study", icon: BookOpen, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    shortlist: { label: "Shortlisted", icon: Layers, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    figma: { label: "Figma Design", icon: Figma, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  }[project.project_type as "case_study" | "shortlist" | "figma"] || {
    label: "Case Study",
    icon: BookOpen,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  };

  const TypeIcon = typeConfig.icon;

  const handleToggleVisibility = async () => {
    try {
      setIsTogglingVisibility(true);
      await toggleProjectVisibility(project.id, isVisible);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to update visibility.");
    } finally {
      setIsTogglingVisibility(false);
    }
  };

  const handleCopy = async () => {
    try {
      setIsCopying(true);
      setIsMenuOpen(false);
      const copied = await copyProject(project.id);
      router.refresh();
      router.push(`/admin/projects/${copied.id}`);
    } catch (e: any) {
      alert(e.message || "Failed to duplicate project.");
      setIsCopying(false);
    }
  };

  const handleToggleArchive = async () => {
    try {
      setIsArchiving(true);
      setIsMenuOpen(false);
      const nextStatus = isArchived ? "draft" : "archived";
      await setProjectStatus(project.id, nextStatus);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to update archive status.");
    } finally {
      setIsArchiving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await deleteProject(project.id);
      setShowDeleteDialog(false);
      if (onDeleted) onDeleted(project.id);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to delete project.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="glass-panel rounded-2xl overflow-hidden border border-border/80 hover:border-primary/40 transition-all flex flex-col bg-card/60 group shadow-sm hover:shadow-md">
        {/* Thumbnail Preview */}
        <div className="relative aspect-[16/10] bg-muted/40 overflow-hidden border-b border-border/50">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
              <TypeIcon size={32} className="text-primary/30 mb-1" />
              <span className="text-xs font-mono text-muted-foreground/80">No image uploaded</span>
            </div>
          )}

          {/* Project Type Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm ${typeConfig.color}`}>
              <TypeIcon size={12} />
              <span>{typeConfig.label}</span>
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            {categoryName && (
              <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                <FolderOpen size={12} />
                <span>{categoryName}</span>
              </div>
            )}
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {project.short_description || "No description provided."}
            </p>
          </div>

          {/* Consistent Control Strip */}
          <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
            {/* Visibility Toggle Button */}
            <button
              type="button"
              onClick={handleToggleVisibility}
              disabled={isTogglingVisibility}
              title={isVisible ? "Currently Visible on Public Site (Click to Hide)" : "Currently Hidden/Draft (Click to Publish)"}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                isVisible
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20"
                  : "bg-muted border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {isTogglingVisibility ? (
                <Loader2 size={15} className="animate-spin" />
              ) : isVisible ? (
                <Eye size={15} />
              ) : (
                <EyeOff size={15} />
              )}
              <span className="hidden sm:inline text-xs">{isVisible ? "Visible" : "Hidden"}</span>
            </button>

            {/* Edit & More Controls */}
            <div className="flex items-center gap-1 relative">
              <Link
                href={`/admin/projects/${project.id}`}
                className="btn-base bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Edit Project"
              >
                <Edit size={14} />
                <span className="hidden sm:inline">Edit</span>
              </Link>

              {/* More Menu (⋮) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent hover:border-border transition-colors"
                  title="More actions"
                >
                  <MoreVertical size={16} />
                </button>

                {isMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="absolute right-0 bottom-full mb-1 w-44 rounded-xl bg-card border border-border shadow-xl p-1 z-30 animate-in zoom-in-95 duration-100">
                      <button
                        type="button"
                        onClick={handleCopy}
                        disabled={isCopying}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        {isCopying ? <Loader2 size={14} className="animate-spin" /> : <Copy size={14} />}
                        <span>Copy Project</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleToggleArchive}
                        disabled={isArchiving}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        {isArchived ? (
                          <>
                            <ArchiveRestore size={14} />
                            <span>Unarchive Project</span>
                          </>
                        ) : (
                          <>
                            <Archive size={14} />
                            <span>Archive Project</span>
                          </>
                        )}
                      </button>

                      <div className="h-px bg-border my-1" />

                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setShowDeleteDialog(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors text-left"
                      >
                        <Trash2 size={14} />
                        <span>Delete Project</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Project?"
        description={`Are you sure you want to permanently delete "${project.title}"? This action will remove all attached media records, video links, sections, and logs, and cannot be undone.`}
        confirmLabel="Delete Project"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
