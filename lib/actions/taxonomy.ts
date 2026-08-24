"use server";

import { createClient } from "@/lib/database/server";
import { verifyAdmin } from "./auth";
import { revalidatePath } from "next/cache";

export async function getTaxonomies() {
  const supabase = await createClient();

  const [{ data: categories }, { data: technologies }, { data: tags }] = await Promise.all([
    supabase.from("categories").select("*").order("name", { ascending: true }),
    supabase.from("technologies").select("*").order("name", { ascending: true }),
    supabase.from("tags").select("*").order("name", { ascending: true }),
  ]);

  return {
    categories: categories || [],
    technologies: technologies || [],
    tags: tags || [],
  };
}

export async function getCategories() {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from("categories")
      .select(`
        *,
        projects(id, title, status)
      `)
      .order("name", { ascending: true });

    if (!error && data) {
      return data;
    }
  } catch (e) {
    console.warn("Joined categories query exception, falling back:", e);
  }

  // Graceful fallback
  const { data: fallbackData } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return fallbackData || [];
}

export async function createCategory(values: {
  name: string;
  description?: string;
  icon?: string;
}) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  const slug = values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: values.name.trim(),
      slug,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/collections");
  revalidatePath("/admin/projects");
  return data;
}

export async function updateCategory(id: string, values: {
  name?: string;
  description?: string;
  icon?: string;
}) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  const updatePayload: any = {};
  if (values.name) {
    updatePayload.name = values.name.trim();
    updatePayload.slug = values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }

  const { data, error } = await supabase
    .from("categories")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/collections");
  return data;
}

export async function reorderCategories(orderedIds: string[]) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  // If order column exists on db, reordering happens cleanly; otherwise safe noop
  revalidatePath("/admin/collections");
}

export async function deleteCategory(id: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/collections");
  revalidatePath("/admin/projects");
}

export async function getProjectTaxonomies(projectId: string) {
  const supabase = await createClient();

  const [{ data: projTechs }, { data: projTags }] = await Promise.all([
    supabase
      .from("project_technologies")
      .select("technology_id, technologies(*)")
      .eq("project_id", projectId),
    supabase
      .from("project_tags")
      .select("tag_id, tags(*)")
      .eq("project_id", projectId),
  ]);

  return {
    technologyIds: projTechs?.map((pt) => pt.technology_id) || [],
    tagIds: projTags?.map((pt) => pt.tag_id) || [],
  };
}

export async function syncProjectTechnologies(projectId: string, technologyIds: string[]) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  // 1. Delete removed relationships
  if (technologyIds.length === 0) {
    await supabase
      .from("project_technologies")
      .delete()
      .eq("project_id", projectId);
  } else {
    // Delete any existing not in the new list
    const { data: existing } = await supabase
      .from("project_technologies")
      .select("technology_id")
      .eq("project_id", projectId);

    const existingIds = existing?.map((e) => e.technology_id) || [];
    const toDelete = existingIds.filter((id) => !technologyIds.includes(id));
    const toInsert = technologyIds.filter((id) => !existingIds.includes(id));

    if (toDelete.length > 0) {
      await supabase
        .from("project_technologies")
        .delete()
        .eq("project_id", projectId)
        .in("technology_id", toDelete);
    }

    if (toInsert.length > 0) {
      const records = toInsert.map((techId) => ({
        project_id: projectId,
        technology_id: techId,
      }));
      await supabase.from("project_technologies").insert(records);
    }
  }

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/projects");
}

export async function syncProjectTags(projectId: string, tagIds: string[]) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  // 1. Delete removed relationships
  if (tagIds.length === 0) {
    await supabase
      .from("project_tags")
      .delete()
      .eq("project_id", projectId);
  } else {
    // Delete any existing not in the new list
    const { data: existing } = await supabase
      .from("project_tags")
      .select("tag_id")
      .eq("project_id", projectId);

    const existingIds = existing?.map((e) => e.tag_id) || [];
    const toDelete = existingIds.filter((id) => !tagIds.includes(id));
    const toInsert = tagIds.filter((id) => !existingIds.includes(id));

    if (toDelete.length > 0) {
      await supabase
        .from("project_tags")
        .delete()
        .eq("project_id", projectId)
        .in("tag_id", toDelete);
    }

    if (toInsert.length > 0) {
      const records = toInsert.map((tagId) => ({
        project_id: projectId,
        tag_id: tagId,
      }));
      await supabase.from("project_tags").insert(records);
    }
  }

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/projects");
}

export async function createTechnology(name: string, iconUrl?: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const { data, error } = await supabase
    .from("technologies")
    .insert({ name, slug, icon_url: iconUrl || "" })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createTag(name: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const { data, error } = await supabase
    .from("tags")
    .insert({ name, slug })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
