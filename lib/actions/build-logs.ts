"use server";

import { createClient } from "@/lib/database/server";
import { verifyAdmin } from "./auth";
import { revalidatePath } from "next/cache";

export async function getBuildLogs(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("build_logs")
    .select("*")
    .eq("project_id", projectId)
    .order("day_number", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function createBuildLog(projectId: string, values: any) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("build_logs")
    .insert({ ...values, project_id: projectId })
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  return data;
}

export async function updateBuildLog(id: string, values: any, projectId: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("build_logs")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  return data;
}

export async function deleteBuildLog(id: string, projectId: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  
  const { error } = await supabase.from("build_logs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
}
