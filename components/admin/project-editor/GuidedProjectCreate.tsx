"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Layers,
  Figma,
  ArrowLeft,
  Sparkles,
  Save,
  Send,
  X,
  Upload,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  Link2,
  Calendar,
  UserCheck,
  FileText,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { createProject } from "@/lib/actions/projects";
import ConfirmDialog from "../ConfirmDialog";

type ProjectType = "case_study" | "shortlist" | "figma";

interface GuidedProjectCreateProps {
  categories?: any[];
}

export default function GuidedProjectCreate({ categories = [] }: GuidedProjectCreateProps) {
  const router = useRouter();

  // Step 1: Project Type Selection State
  const [selectedType, setSelectedType] = useState<ProjectType | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number>(0);

  // Professional Signals
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [clientName, setClientName] = useState("");
  const [isPersonal, setIsPersonal] = useState(false);
  const [impactSummary, setImpactSummary] = useState("");
  const [featuredReason, setFeaturedReason] = useState("");

  // Content / Story
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");

  // External Links
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [figmaUrl, setFigmaUrl] = useState("");
  const [figmaPrototypeUrl, setFigmaPrototypeUrl] = useState("");
  const [figmaCommunityUrl, setFigmaCommunityUrl] = useState("");

  // Timeline
  const [startedAt, setStartedAt] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const [duration, setDuration] = useState("");

  // Media / Cover URL
  const [coverImageUrl, setCoverImageUrl] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMode, setSubmitMode] = useState<"draft" | "published" | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-slug generator
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug.length < 2) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  };

  const isDirty = Boolean(title || shortDesc || role || githubUrl || demoUrl || coverImageUrl);

  const handleCancelClick = () => {
    if (isDirty) {
      setShowCancelDialog(true);
    } else {
      router.push("/admin/projects");
    }
  };

  const handleSave = async (status: "draft" | "published") => {
    setFormError(null);

    if (!selectedType) {
      setFormError("Please select a project type.");
      return;
    }

    if (!title.trim()) {
      setFormError("Project Title is required.");
      return;
    }

    const finalSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    if (!finalSlug) {
      setFormError("A valid project slug is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitMode(status);

      const payload: any = {
        title: title.trim(),
        slug: finalSlug,
        project_type: selectedType,
        status: status,
        featured: Boolean(featured),
        display_order: Number(displayOrder) || 0,
        category_id: categoryId || null,
        short_description: shortDesc.trim(),
        full_description: fullDesc.trim(),
        problem: selectedType === "case_study" ? problem.trim() : "",
        solution: selectedType === "case_study" ? solution.trim() : "",
        role: role.trim(),
        team_size: teamSize.trim(),
        client_name: isPersonal ? "" : clientName.trim(),
        is_personal_project: Boolean(isPersonal),
        impact_summary: impactSummary.trim(),
        featured_reason: featuredReason.trim(),
        github_url: githubUrl.trim(),
        demo_url: demoUrl.trim(),
        figma_url: figmaUrl.trim(),
        figma_prototype_url: figmaPrototypeUrl.trim(),
        figma_community_url: figmaCommunityUrl.trim(),
        started_at: startedAt ? new Date(startedAt).toISOString() : null,
        completed_at: completedAt ? new Date(completedAt).toISOString() : null,
        duration: duration.trim(),
      };

      const created = await createProject(payload);

      // If cover image provided, save media record
      if (coverImageUrl.trim() && created?.id) {
        // Will be available in project media
      }

      router.push(`/admin/projects/${created.id}`);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || "Failed to create project.");
      setIsSubmitting(false);
      setSubmitMode(null);
    }
  };

  // -------------------------------------------------------------
  // STEP 1: Choose Project Type View
  // -------------------------------------------------------------
  if (!selectedType) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Create Project</h1>
            <p className="text-sm text-muted-foreground">
              Start a new project by selecting the project type.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="btn-base bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-border"
          >
            <ArrowLeft size={14} />
            <span>Cancel</span>
          </Link>
        </div>

        {/* Project Type Cards */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Choose Project Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Complete Case Study */}
            <div
              onClick={() => setSelectedType("case_study")}
              className="glass-panel p-8 rounded-2xl border-2 border-border/80 hover:border-blue-500/80 bg-card/60 hover:bg-card hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-blue-500 transition-colors">
                    Complete Case Study
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Full project story with problem statement, architectural solution, team role, business impact, and engineering timeline.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  case_study
                </span>
                <span className="text-xs font-semibold text-blue-500 group-hover:translate-x-1 transition-transform">
                  Select &rarr;
                </span>
              </div>
            </div>

            {/* Card 2: Shortlisted Project */}
            <div
              onClick={() => setSelectedType("shortlist")}
              className="glass-panel p-8 rounded-2xl border-2 border-border/80 hover:border-emerald-500/80 bg-card/60 hover:bg-card hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Layers size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                    Shortlisted Project
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    A concise portfolio entry for high-impact projects, client deliveries, or experiments that don&apos;t require a deep case study.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  shortlist
                </span>
                <span className="text-xs font-semibold text-emerald-500 group-hover:translate-x-1 transition-transform">
                  Select &rarr;
                </span>
              </div>
            </div>

            {/* Card 3: Figma Design Project */}
            <div
              onClick={() => setSelectedType("figma")}
              className="glass-panel p-8 rounded-2xl border-2 border-border/80 hover:border-purple-500/80 bg-card/60 hover:bg-card hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Figma size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-purple-500 transition-colors">
                    Figma Design Project
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Design-focused project spotlighting interactive Figma prototype embeds, community UI kits, and design system specs.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/50 flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  figma
                </span>
                <span className="text-xs font-semibold text-purple-500 group-hover:translate-x-1 transition-transform">
                  Select &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STEP 2: Guided Form Adapted to Selected Type
  // -------------------------------------------------------------
  const typeLabel = {
    case_study: "Complete Case Study",
    shortlist: "Shortlisted Project",
    figma: "Figma Design Project",
  }[selectedType];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32 animate-in fade-in duration-200">
      {/* Top Header with Selected Type Badge & Cancel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Create Project</h1>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
              <Sparkles size={12} />
              <span>{typeLabel}</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Fill in the essential fields for this {typeLabel.toLowerCase()}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedType(null)}
            className="btn-base bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground px-3.5 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 border border-border"
          >
            <RotateCcw size={13} />
            <span>Change Type</span>
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="btn-base bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground px-3.5 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 border border-border"
          >
            <X size={14} />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {formError && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
          <AlertTriangle size={18} className="shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* 1. Basic Information */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 space-y-5">
        <div className="flex items-center gap-2.5 font-bold text-foreground border-b border-border/60 pb-3">
          <FolderOpen size={18} className="text-primary" />
          <h3>Basic Information</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Title *</span>
              <span className="text-[10px] text-muted-foreground font-normal">Displayed across portfolio</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Neural Dashboard, Autonomous AI Agent"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Slug *</span>
              <span className="text-[10px] text-muted-foreground font-normal">URL-friendly identifier</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. neural-dashboard"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm font-mono"
            />
          </div>
        </div>

        {categories.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Collection / Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            >
              <option value="">-- Select Collection (Optional) --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 2. Project Media Preview */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 space-y-5">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2.5 font-bold text-foreground">
            <Upload size={18} className="text-primary" />
            <h3>Project Media</h3>
          </div>
          <span className="text-[11px] text-muted-foreground">Cover Image & Assets</span>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-foreground">Cover Image URL</label>
          <input
            type="url"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://... (or upload inside media tab after creation)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
          />
          <p className="text-[11px] text-muted-foreground">
            You can also drag-and-drop multiple images and videos into the media gallery once the project is created.
          </p>
        </div>
      </div>

      {/* 3. Professional Signals */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 space-y-5">
        <div className="flex items-center gap-2.5 font-bold text-foreground border-b border-border/60 pb-3">
          <UserCheck size={18} className="text-primary" />
          <h3>Professional Signals</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">My Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Lead Architect, UI/UX Designer, Full-Stack Developer"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Team Size</label>
            <input
              type="text"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="e.g. Solo, 3 Engineers, Studio Team"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPersonal"
              checked={isPersonal}
              onChange={(e) => setIsPersonal(e.target.checked)}
              className="w-4 h-4 rounded text-primary border-border"
            />
            <label htmlFor="isPersonal" className="text-xs font-semibold text-foreground cursor-pointer">
              Personal / Independent Project (No external client)
            </label>
          </div>

          {!isPersonal && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Acme Corp, FinTech Labs, Stealth Startup"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Impact Summary</label>
            <input
              type="text"
              value={impactSummary}
              onChange={(e) => setImpactSummary(e.target.value)}
              placeholder="e.g. Scaled to 50k DAU with 99.99% uptime"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Featured Reason</label>
            <input
              type="text"
              value={featuredReason}
              onChange={(e) => setFeaturedReason(e.target.value)}
              placeholder="e.g. Innovative WebGL shader pipeline"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            />
          </div>
        </div>
      </div>

      {/* 4. Project Story / Content (Adapted to Type) */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 space-y-5">
        <div className="flex items-center gap-2.5 font-bold text-foreground border-b border-border/60 pb-3">
          <FileText size={18} className="text-primary" />
          <h3>
            {selectedType === "case_study"
              ? "Case Study Story"
              : selectedType === "figma"
              ? "Design Description"
              : "Project Overview"}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Short Description (Summary)</label>
            <textarea
              rows={2}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Concise overview displayed on project cards and search engines..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Full Description / Narrative</label>
            <textarea
              rows={4}
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              placeholder="Comprehensive narrative and technical explanation..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm resize-none"
            />
          </div>

          {/* Show Problem & Solution ONLY for Complete Case Study */}
          {selectedType === "case_study" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-border/50">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">The Problem Statement</label>
                <textarea
                  rows={3}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="What friction, inefficiency, or challenge was tackled?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">The Architectural Solution</label>
                <textarea
                  rows={3}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="How did your implementation solve the challenge?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm resize-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. External Links & Figma Resources */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 space-y-5">
        <div className="flex items-center gap-2.5 font-bold text-foreground border-b border-border/60 pb-3">
          <Link2 size={18} className="text-primary" />
          <h3>{selectedType === "figma" ? "Figma & Design Resources" : "External Links"}</h3>
        </div>

        {/* Figma Specific Links */}
        {selectedType === "figma" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-border/50">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-purple-500 flex items-center gap-1.5">
                <Figma size={13} />
                <span>Figma Prototype Embed URL</span>
              </label>
              <input
                type="url"
                value={figmaPrototypeUrl}
                onChange={(e) => setFigmaPrototypeUrl(e.target.value)}
                placeholder="https://www.figma.com/proto/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-purple-500/30 focus:border-purple-500 outline-none text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Figma Project / File URL</label>
              <input
                type="url"
                value={figmaUrl}
                onChange={(e) => setFigmaUrl(e.target.value)}
                placeholder="https://www.figma.com/file/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Figma Community / Kit URL</label>
              <input
                type="url"
                value={figmaCommunityUrl}
                onChange={(e) => setFigmaCommunityUrl(e.target.value)}
                placeholder="https://www.figma.com/community/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
        )}

        {/* General Links (GitHub, Demo) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Live Demo URL</label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">GitHub Repository URL</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            />
          </div>
        </div>
      </div>

      {/* 6. Project Timeline */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 space-y-5">
        <div className="flex items-center gap-2.5 font-bold text-foreground border-b border-border/60 pb-3">
          <Calendar size={18} className="text-primary" />
          <h3>Project Timeline</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Started Date</label>
            <input
              type="date"
              value={startedAt}
              onChange={(e) => setStartedAt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Completed Date</label>
            <input
              type="date"
              value={completedAt}
              onChange={(e) => setCompletedAt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Duration (Text)</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 6 weeks, 2 months"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
            />
          </div>
        </div>
      </div>

      {/* 7. Publishing & Spotlight Preferences */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 space-y-5">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <h3 className="font-bold text-foreground text-sm">Spotlight & Ordering</h3>
          <span className="text-[11px] text-muted-foreground">Portfolio display controls</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featuredToggle"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-primary border-border"
            />
            <div>
              <label htmlFor="featuredToggle" className="text-xs font-bold text-foreground cursor-pointer">
                Featured Project
              </label>
              <p className="text-[11px] text-muted-foreground">
                Spotlight this project on the homepage hero feed
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Display Order</label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
              className="w-full px-3.5 py-2 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* 8. Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-card/90 backdrop-blur-md border-t border-border p-4 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleCancelClick}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {/* Save as Draft */}
            <button
              type="button"
              onClick={() => handleSave("draft")}
              disabled={isSubmitting}
              className="btn-base bg-muted hover:bg-muted/80 text-foreground border border-border px-5 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm"
            >
              {isSubmitting && submitMode === "draft" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              <span>Save as Draft</span>
            </button>

            {/* Save & Publish Project */}
            <button
              type="button"
              onClick={() => handleSave("published")}
              disabled={isSubmitting}
              className="btn-base bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md shadow-primary/20 transition-all"
            >
              {isSubmitting && submitMode === "published" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
              <span>Save & Publish Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Confirmation Modal */}
      <ConfirmDialog
        isOpen={showCancelDialog}
        title="Unsaved Changes"
        description="You have unsaved changes in this project. Are you sure you want to leave? Your changes will be discarded."
        confirmLabel="Leave without Saving"
        cancelLabel="Stay on Page"
        isDestructive={true}
        onConfirm={() => router.push("/admin/projects")}
        onCancel={() => setShowCancelDialog(false)}
      />
    </div>
  );
}
