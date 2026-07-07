"use server";

import { createClient } from "@/lib/database/server";
import { verifyAdmin } from "./auth";
import { revalidatePath } from "next/cache";

export async function uploadMedia(projectId: string, formData: FormData, type: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
  const MAX_DOC_SIZE = 20 * 1024 * 1024; // 20MB

  const ALLOWED_IMAGES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/jpg"];
  const ALLOWED_VIDEOS = ["video/mp4", "video/webm"];
  const ALLOWED_DOCS = ["application/pdf"];

  if (type === "image") {
    if (file.size > MAX_IMAGE_SIZE) throw new Error("Image exceeds 10MB limit.");
    if (!ALLOWED_IMAGES.includes(file.type)) throw new Error(`Invalid image type: ${file.type}`);
  } else if (type === "video") {
    if (file.size > MAX_VIDEO_SIZE) throw new Error("Video exceeds 100MB limit.");
    if (!ALLOWED_VIDEOS.includes(file.type)) throw new Error(`Invalid video type: ${file.type}`);
  } else if (type === "document") {
    if (file.size > MAX_DOC_SIZE) throw new Error("Document exceeds 20MB limit.");
    if (!ALLOWED_DOCS.includes(file.type)) throw new Error(`Invalid document type: ${file.type}`);
  } else {
    throw new Error("Invalid media type classification.");
  }

  const supabase = await createClient();

  // 1. Get project slug
  const { data: project } = await supabase.from("projects").select("slug").eq("id", projectId).single();
  const slug = project?.slug || "unknown";

  // 2. Upload to storage
  const fileExt = file.name.split('.').pop();
  const uuid = crypto.randomUUID();
  const fileName = `${uuid}.${fileExt}`;
  const filePath = `projects/${slug}/${type}s/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("portfolio-media")
    .upload(filePath, file);

  if (uploadError) throw new Error(uploadError.message);

  // 3. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from("portfolio-media")
    .getPublicUrl(filePath);

  // 4. Create database record
  const { data, error } = await supabase
    .from("project_media")
    .insert({
      project_id: projectId,
      type: type,
      url: publicUrl,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type,
    })
    .select()
    .single();

  if (error) {
    await supabase.storage.from("portfolio-media").remove([filePath]);
    throw new Error(error.message);
  }

  revalidatePath(`/admin/projects/${projectId}`);
  return data;
}

export async function getProjectMedia(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_media")
    .select("*")
    .eq("project_id", projectId)
    .order("order_index", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteMedia(id: string, url: string, projectId: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  const basePath = "portfolio-media/";
  const pathIndex = url.indexOf(basePath);
  
  if (pathIndex !== -1) {
    const filePath = url.substring(pathIndex + basePath.length);
    const { error: storageError } = await supabase.storage
      .from("portfolio-media")
      .remove([filePath]);
      
    if (storageError) console.error("Failed to delete storage file:", storageError.message);
  }

  const { error } = await supabase.from("project_media").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function updateMediaMetadata(id: string, values: any, projectId: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("project_media")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/projects/${projectId}`);
  return data;
}
