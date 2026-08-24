"use server";

import { createClient } from "@/lib/database/server";
import { ProjectFormValues } from "@/lib/validators/project.schema";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "./auth";

// Safe insert/update helper that handles optional columns cleanly
async function safeInsertProject(supabase: any, values: any) {
  // First attempt with full payload
  const { data, error } = await supabase.from("projects").insert(values).select().single();
  if (!error) return data;

  // If a column is missing in schema cache, sanitize payload and retry
  if (error.message && error.message.includes("Could not find the") && error.message.includes("column")) {
    console.warn("Retrying insert with sanitized database payload due to schema difference:", error.message);
    const sanitized = { ...values };
    delete sanitized.figma_prototype_url;
    delete sanitized.figma_community_url;
    delete sanitized.project_type;

    const { data: retryData, error: retryErr } = await supabase.from("projects").insert(sanitized).select().single();
    if (retryErr) throw new Error(retryErr.message);
    return retryData;
  }

  throw new Error(error.message);
}

async function safeUpdateProject(supabase: any, id: string, values: any) {
  const { data, error } = await supabase.from("projects").update(values).eq("id", id).select().single();
  if (!error) return data;

  if (error.message && error.message.includes("Could not find the") && error.message.includes("column")) {
    console.warn("Retrying update with sanitized database payload due to schema difference:", error.message);
    const sanitized = { ...values };
    delete sanitized.figma_prototype_url;
    delete sanitized.figma_community_url;
    delete sanitized.project_type;

    const { data: retryData, error: retryErr } = await supabase.from("projects").update(sanitized).eq("id", id).select().single();
    if (retryErr) throw new Error(retryErr.message);
    return retryData;
  }

  throw new Error(error.message);
}

export async function getProjects(statusFilter?: "all" | "draft" | "published" | "archived") {
  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select(`
      *,
      categories(*),
      project_media(*),
      project_videos(*),
      project_technologies(
        technologies(*)
      ),
      project_tags(
        tags(*)
      )
    `)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (statusFilter && statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;
  if (error) {
    console.warn("getProjects joined query fallback:", error.message);
    const fallback = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    return fallback.data || [];
  }
  return data || [];
}

export async function createProject(values: ProjectFormValues) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const supabase = await createClient();
  const data = await safeInsertProject(supabase, values);

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return data;
}

export async function updateProject(id: string, values: Partial<ProjectFormValues>) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const supabase = await createClient();
  const data = await safeUpdateProject(supabase, id, values);

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  if (data?.slug) {
    revalidatePath(`/projects/${data.slug}`);
  }
  return data;
}

export async function toggleProjectVisibility(id: string, isCurrentlyVisible: boolean) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const supabase = await createClient();
  const nextStatus = isCurrentlyVisible ? "draft" : "published";

  const { data, error } = await supabase
    .from("projects")
    .update({ status: nextStatus })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return data;
}

export async function setProjectStatus(id: string, status: "draft" | "published" | "archived") {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return data;
}

export async function copyProject(id: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const supabase = await createClient();

  // 1. Fetch original project with relations
  const { data: original, error: fetchErr } = await supabase
    .from("projects")
    .select(`
      *,
      project_sections(*),
      project_media(*),
      project_videos(*),
      project_technologies(*),
      project_tags(*)
    `)
    .eq("id", id)
    .single();

  if (fetchErr || !original) throw new Error("Original project not found.");

  // 2. Generate unique copy title and slug
  const copySuffix = Math.floor(1000 + Math.random() * 9000);
  const newTitle = `${original.title} (Copy)`;
  const newSlug = `${original.slug}-copy-${copySuffix}`;

  // 3. Create independent copy in DRAFT + HIDDEN status
  const copyPayload = {
    title: newTitle,
    slug: newSlug,
    project_type: original.project_type || "case_study",
    category_id: original.category_id,
    status: "draft",
    featured: false,
    display_order: (original.display_order || 0) + 1,
    short_description: original.short_description || "",
    full_description: original.full_description || "",
    problem: original.problem || "",
    solution: original.solution || "",
    github_url: original.github_url || "",
    demo_url: original.demo_url || "",
    figma_url: original.figma_url || "",
    figma_prototype_url: original.figma_prototype_url || "",
    figma_community_url: original.figma_community_url || "",
    started_at: original.started_at || null,
    completed_at: original.completed_at || null,
    duration: original.duration || "",
    role: original.role || "",
    team_size: original.team_size || "",
    client_name: original.client_name || "",
    is_personal_project: Boolean(original.is_personal_project),
    impact_summary: original.impact_summary || "",
    featured_reason: original.featured_reason || "",
  };

  const newProject = await safeInsertProject(supabase, copyPayload);

  // 4. Duplicate project_sections
  if (original.project_sections && original.project_sections.length > 0) {
    const sectionsToInsert = original.project_sections.map((s: any) => ({
      project_id: newProject.id,
      title: s.title,
      content: s.content,
      order_index: s.order_index,
      type: s.type,
      caption: s.caption,
      key_takeaway: s.key_takeaway,
    }));
    await supabase.from("project_sections").insert(sectionsToInsert);
  }

  // 5. Duplicate project_media records
  if (original.project_media && original.project_media.length > 0) {
    const mediaToInsert = original.project_media.map((m: any) => ({
      project_id: newProject.id,
      type: m.type,
      role: m.role || "gallery",
      url: m.url,
      storage_path: m.storage_path,
      caption: m.caption,
      alt_text: m.alt_text,
      file_name: m.file_name,
      file_size: m.file_size,
      mime_type: m.mime_type,
      order_index: m.order_index,
    }));
    await supabase.from("project_media").insert(mediaToInsert);
  }

  // 6. Duplicate project_videos
  if (original.project_videos && original.project_videos.length > 0) {
    const videosToInsert = original.project_videos.map((v: any) => ({
      project_id: newProject.id,
      provider: v.provider || "youtube",
      video_id: v.video_id,
      url: v.url,
      title: v.title,
      thumbnail_url: v.thumbnail_url,
      caption: v.caption,
      duration: v.duration,
      order_index: v.order_index,
    }));
    await supabase.from("project_videos").insert(videosToInsert);
  }

  // 7. Duplicate technologies and tags junctions
  if (original.project_technologies && original.project_technologies.length > 0) {
    const techToInsert = original.project_technologies.map((t: any) => ({
      project_id: newProject.id,
      technology_id: t.technology_id,
    }));
    await supabase.from("project_technologies").insert(techToInsert);
  }

  if (original.project_tags && original.project_tags.length > 0) {
    const tagsToInsert = original.project_tags.map((t: any) => ({
      project_id: newProject.id,
      tag_id: t.tag_id,
    }));
    await supabase.from("project_tags").insert(tagsToInsert);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  return newProject;
}

export async function deleteProject(id: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw new Error(error.message);
  
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
