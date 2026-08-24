"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Edit2,
  Layers,
  Sparkles,
  BookOpen,
  Figma,
  ExternalLink,
  Loader2,
  Check,
} from "lucide-react";
import EmptyState from "@/components/feedback/EmptyState";
import ConfirmDialog from "@/components/feedback/ConfirmDialog";
import { createCategory, updateCategory, deleteCategory, reorderCategories } from "@/lib/actions/taxonomy";

interface CollectionsTreeViewProps {
  initialCategories: any[];
}

export default function CollectionsTreeView({
  initialCategories,
}: CollectionsTreeViewProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [selectedId, setSelectedId] = useState<string | null>(
    categories.length > 0 ? categories[0].id : null
  );
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedCategory = categories.find((c) => c.id === selectedId) || categories[0];

  const toggleExpand = (id: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCreate = async () => {
    if (!newCatName.trim()) return;
    try {
      setIsSubmitting(true);
      const created = await createCategory({
        name: newCatName.trim(),
        description: newCatDesc.trim(),
      });
      setCategories((prev) => [...prev, created]);
      setSelectedId(created.id);
      setNewCatName("");
      setNewCatDesc("");
      setIsAdding(false);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to create collection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (cat: any) => {
    setEditName(cat.name);
    setEditDesc(cat.description || "");
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedCategory || !editName.trim()) return;
    try {
      setIsSubmitting(true);
      const updated = await updateCategory(selectedCategory.id, {
        name: editName.trim(),
        description: editDesc.trim(),
      });
      setCategories((prev) =>
        prev.map((c) => (c.id === selectedCategory.id ? { ...c, ...updated } : c))
      );
      setIsEditing(false);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to update collection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === categories.length - 1) return;

    const newOrder = [...categories];
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    const temp = newOrder[index];
    newOrder[index] = newOrder[swapIndex];
    newOrder[swapIndex] = temp;

    setCategories(newOrder);

    try {
      await reorderCategories(newOrder.map((c) => c.id));
      router.refresh();
    } catch (e) {
      alert("Failed to save collection order.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteCategory(deleteTarget.id);
      const remaining = categories.filter((c) => c.id !== deleteTarget.id);
      setCategories(remaining);
      setSelectedId(remaining.length > 0 ? remaining[0].id : null);
      setDeleteTarget(null);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to delete collection.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (categories.length === 0 && !isAdding) {
    return (
      <EmptyState
        icon={Layers}
        title="No collections yet"
        description="Create a collection to organize your projects."
        actionLabel="Create Collection"
        onAction={() => setIsAdding(true)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <span>{categories.length} Collections active</span>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="btn-base bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>New Collection</span>
          </button>
        )}
      </div>

      {/* New Collection Form */}
      {isAdding && (
        <div className="glass-panel p-5 rounded-2xl border border-primary/40 bg-card/80 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <span>Create New Collection</span>
            </h4>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Collection Name</label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Web Applications, UI/UX Design, Open Source"
                className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Description (Optional)</label>
              <input
                type="text"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="Brief purpose of this project group..."
                className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3.5 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={isSubmitting || !newCatName.trim()}
              className="btn-base bg-primary text-primary-foreground px-5 py-1.5 text-xs font-semibold shadow-md flex items-center gap-1.5"
            >
              {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              <span>Save Collection</span>
            </button>
          </div>
        </div>
      )}

      {/* Two Column Layout: Left Tree, Right Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Collection Tree Panel */}
        <div className="lg:col-span-6 glass-panel rounded-2xl border border-border/80 p-4 bg-card/60 space-y-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 px-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Collection Hierarchy & Ordering
            </h3>
            <span className="text-xs text-muted-foreground">Reorder collections</span>
          </div>

          <div className="space-y-1.5">
            {categories.map((cat, index) => {
              const isSelected = selectedCategory?.id === cat.id;
              const isExpanded = !!expandedNodes[cat.id];
              const projectCount = cat.projects?.length || 0;

              return (
                <div
                  key={cat.id}
                  className={`rounded-xl border transition-all ${
                    isSelected
                      ? "bg-primary/10 border-primary shadow-sm"
                      : "bg-background/40 border-border/50 hover:border-border"
                  }`}
                >
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer select-none"
                    onClick={() => setSelectedId(cat.id)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {projectCount > 0 ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(cat.id);
                          }}
                          className="p-1 text-muted-foreground hover:text-foreground rounded"
                        >
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      ) : (
                        <div className="w-5" />
                      )}

                      {isExpanded ? (
                        <FolderOpen size={16} className="text-primary shrink-0" />
                      ) : (
                        <Folder size={16} className="text-primary/70 shrink-0" />
                      )}

                      <span className="text-sm font-semibold text-foreground truncate">
                        {cat.name}
                      </span>

                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                        {projectCount}
                      </span>
                    </div>

                    {/* Move Up / Down Ordering Controls */}
                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleMoveOrder(index, "up")}
                        disabled={index === 0}
                        title="Move Collection Up"
                        className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 rounded"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveOrder(index, "down")}
                        disabled={index === categories.length - 1}
                        title="Move Collection Down"
                        className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 rounded"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Nested Project List */}
                  {isExpanded && projectCount > 0 && (
                    <div className="pl-11 pr-3 pb-3 pt-1 space-y-1 border-t border-border/40 text-xs">
                      {cat.projects.map((proj: any) => (
                        <div
                          key={proj.id}
                          className="flex items-center justify-between py-1 px-2 rounded-lg bg-card/60 text-muted-foreground"
                        >
                          <div className="flex items-center gap-2 truncate">
                            {proj.project_type === "figma" ? (
                              <Figma size={12} className="text-secondary shrink-0" />
                            ) : proj.project_type === "shortlist" ? (
                              <Layers size={12} className="text-success shrink-0" />
                            ) : (
                              <BookOpen size={12} className="text-primary shrink-0" />
                            )}
                            <span className="truncate">{proj.title}</span>
                          </div>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted/80">
                            {proj.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Collection Inspector */}
        <div className="lg:col-span-6 glass-panel rounded-2xl border border-border/80 p-6 bg-card/60 space-y-5">
          {selectedCategory ? (
            <>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">{selectedCategory.name}</h3>
                    <p className="text-xs font-mono text-muted-foreground">Slug: {selectedCategory.slug}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(selectedCategory)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted text-xs flex items-center gap-1 border border-border/60"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(selectedCategory)}
                    className="p-2 rounded-lg text-destructive hover:bg-destructive/10 text-xs flex items-center gap-1 border border-destructive/20"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-3 bg-muted/30 p-4 rounded-xl border border-border/60">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-background border border-border outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Description</label>
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-background border border-border outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      disabled={isSubmitting || !editName.trim()}
                      className="btn-base bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold flex items-center gap-1"
                    >
                      {isSubmitting && <Loader2 size={12} className="animate-spin" />}
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground block">Description</span>
                    <p className="text-foreground leading-relaxed">
                      {selectedCategory.description || "No description assigned to this collection."}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/60">
                    <span className="text-xs text-muted-foreground block mb-2">
                      Attached Projects ({selectedCategory.projects?.length || 0})
                    </span>
                    {selectedCategory.projects && selectedCategory.projects.length > 0 ? (
                      <div className="space-y-2">
                        {selectedCategory.projects.map((proj: any) => (
                          <div
                            key={proj.id}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/40"
                          >
                            <div className="truncate min-w-0 pr-2">
                              <p className="font-semibold text-xs text-foreground truncate">{proj.title}</p>
                              <span className="text-[10px] uppercase font-mono text-muted-foreground">
                                Type: {proj.project_type || "case_study"}
                              </span>
                            </div>
                            <Link
                              href={`/admin/projects/${proj.id}`}
                              className="text-xs text-primary hover:underline shrink-0 flex items-center gap-1 font-medium"
                            >
                              <span>Edit</span>
                              <ExternalLink size={11} />
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">
                        No projects currently assigned to this collection.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Select a collection from the left hierarchy to inspect and configure its details.
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title={`Delete Collection: "${deleteTarget?.name}"?`}
        description="Are you sure you want to delete this collection? Any attached projects will have their collection unassigned, but the projects themselves will not be deleted."
        confirmLabel="Delete Collection"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
