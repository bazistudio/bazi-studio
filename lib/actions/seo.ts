"use server";

import { createClient } from "@/lib/database/server";
import { verifyAdmin } from "./auth";
import { revalidatePath } from "next/cache";

export async function getSeoMetadata(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("seo_metadata")
    .select("*")
    .eq("project_id", projectId)
    .single();

  // It's okay if no SEO data exists yet
  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data;
}

export async function upsertSeoMetadata(projectId: string, values: any) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("seo_metadata")
    .upsert(
      { ...values, project_id: projectId },
      { onConflict: 'project_id' }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  return data;
}
