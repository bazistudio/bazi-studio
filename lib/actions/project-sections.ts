"use server";

import { createClient } from "@/lib/database/server";
import { verifyAdmin } from "./auth";
import { revalidatePath } from "next/cache";

export async function getProjectSections(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_sections")
    .select("*")
    .eq("project_id", projectId)
    .order("order_index", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function createProjectSection(projectId: string, values: any) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("project_sections")
    .insert({ ...values, project_id: projectId })
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  return data;
}

export async function updateProjectSection(id: string, values: any, projectId: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("project_sections")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  return data;
}

export async function deleteProjectSection(id: string, projectId: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  
  const { error } = await supabase.from("project_sections").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function reorderProjectSections(projectId: string, orderedIds: string[]) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  
  // Update order_index for each id
  for (let i = 0; i < orderedIds.length; i++) {
    await supabase
      .from("project_sections")
      .update({ order_index: i })
      .eq("id", orderedIds[i]);
  }
  
  revalidatePath(`/admin/projects/${projectId}`);
}
