"use server";

import { createClient } from "@/lib/database/server";
import { ProjectFormValues } from "@/lib/validators/project.schema";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "./auth";

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function createProject(values: ProjectFormValues) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").insert(values).select().single();

  if (error) throw new Error(error.message);
  
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return data;
}

export async function updateProject(id: string, values: Partial<ProjectFormValues>) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").update(values).eq("id", id).select().single();

  if (error) throw new Error(error.message);
  
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  return data;
}

export async function deleteProject(id: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw new Error(error.message);
  
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
