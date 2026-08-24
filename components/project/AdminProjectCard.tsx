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
import ConfirmDialog from "@/components/feedback/ConfirmDialog";
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
    case_study: { label: "Case Study", icon: BookOpen, color: "text-primary bg-primary/10 border-primary/20" },
    shortlist: { label: "Shortlisted", icon: Layers, color: "text-success bg-success/10 border-success/20" },
    figma: { label: "Figma Design", icon: Figma, color: "text-secondary bg-secondary/10 border-secondary/20" },
  }[project.project_type as "case_study" | "shortlist" | "figma"] || {
    label: "Case Study",
    icon: BookOpen,
    color: "text-primary bg-primary/10 border-primary/20",
  };

  const TypeIcon = typeConfig.icon;

  // Actions
  const handleToggleVisibility = async () => {
    try {
      setIsTogglingVisibility(true);
      await toggleProjectVisibility(project.id, isVisible);
      router.refresh();
    } catch (err) {
      console.error("Visibility toggle failed:", err);
    } finally {
      setIsTogglingVisibility(false);
    }
  };

  const handleCopy = async () => {
    try {
      setIsCopying(true);
      setIsMenuOpen(false);
      const newProj = await copyProject(project.id);
      router.refresh();
      if (newProj?.id) {
        router.push(`/admin/projects/${newProj.id}`);
      }
    } catch (err) {
      console.error("Copy failed:", err);
    } finally {
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
    } catch (err) {
      console.error("Archive status toggle failed:", err);
    } finally {
      setIsArchiving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProject(project.id);
      setShowDeleteDialog(false);
      if (onDeleted) {
        onDeleted(project.id);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="glass-panel rounded-2xl border border-border/80 bg-card/60 hover:bg-card hover:border-border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-md">
        {/* Card Header & Thumbnail */}
        <div className="relative aspect-video w-full bg-muted/50 border-b border-border/60 overflow-hidden flex items-center justify-center">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <FolderOpen size={32} className="opacity-40" />
              <span className="text-xs">No cover image</span>
            </div>
          )}

          {/* Top Overlays: Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md ${typeConfig.color}`}>
              <TypeIcon size={12} />
              <span>{typeConfig.label}</span>
            </span>

            {project.featured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/90 text-white shadow-sm">
                Featured
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <span>{categoryName || "Uncategorized"}</span>
              {project.display_order !== undefined && (
                <>
                  <span>•</span>
                  <span>Order: {project.display_order}</span>
                </>
              )}
            </div>

            <h3 className="font-bold text-foreground text-base line-clamp-1 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {project.short_description || "No description provided."}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
            {/* Quick Visibility Toggle */}
            <button
              type="button"
              onClick={handleToggleVisibility}
              disabled={isTogglingVisibility || isArchived}
              title={isVisible ? "Unpublish (Set to Draft)" : "Publish Project"}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isVisible
                  ? "bg-success/10 text-success border-success/20 hover:bg-success/20"
                  : "bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground"
              } disabled:opacity-50`}
            >
              {isTogglingVisibility ? (
                <Loader2 size={14} className="animate-spin" />
              ) : isVisible ? (
                <>
                  <Eye size={14} />
                  <span className="hidden sm:inline">Visible</span>
                </>
              ) : (
                <>
                  <EyeOff size={14} />
                  <span className="hidden sm:inline">Hidden</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              {/* Primary Edit Button */}
              <Link
                href={`/admin/projects/${project.id}`}
                className="btn-base bg-primary text-primary-foreground hover:bg-primary/90 px-3.5 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Edit size={13} />
                <span>Edit</span>
              </Link>

              {/* Overflow Action Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="More actions"
                >
                  <MoreVertical size={16} />
                </button>

                {isMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-card border border-border rounded-xl shadow-xl p-1.5 z-30 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      <button
                        type="button"
                        onClick={handleCopy}
                        disabled={isCopying}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        {isCopying ? <Loader2 size={14} className="animate-spin" /> : <Copy size={14} />}
                        <span>Duplicate Project</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleToggleArchive}
                        disabled={isArchiving}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        {isArchiving ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : isArchived ? (
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
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors text-left"
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

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Project"
        description={`Are you sure you want to permanently delete "${project.title}"? All associated sections, media records, and references will be removed. This action cannot be undone.`}
        confirmLabel="Delete Permanently"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
