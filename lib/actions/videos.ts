"use server";

import { createClient } from "@/lib/database/server";
import { verifyAdmin } from "./auth";
import { revalidatePath } from "next/cache";

/**
 * Extracts YouTube video ID from various standard URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const cleanUrl = url.trim();

  // youtu.be/VIDEO_ID
  const shortMatch = cleanUrl.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = cleanUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // youtube.com/embed/VIDEO_ID
  const embedMatch = cleanUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // youtube.com/shorts/VIDEO_ID
  const shortsMatch = cleanUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // Raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;

  return null;
}

export async function getProjectVideos(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_videos")
    .select("*")
    .eq("project_id", projectId)
    .order("order_index", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function addYouTubeVideo(projectId: string, input: {
  url: string;
  title?: string;
  caption?: string;
  customThumbnailUrl?: string;
}) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");

  const videoId = extractYouTubeId(input.url);
  if (!videoId) throw new Error("Invalid YouTube URL or Video ID.");

  const thumbnailUrl = input.customThumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const standardizedUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const supabase = await createClient();

  // Get current max order_index
  const { data: existing } = await supabase
    .from("project_videos")
    .select("order_index")
    .eq("project_id", projectId)
    .order("order_index", { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0 ? (existing[0].order_index + 1) : 0;

  const { data, error } = await supabase
    .from("project_videos")
    .insert({
      project_id: projectId,
      provider: "youtube",
      video_id: videoId,
      url: standardizedUrl,
      title: input.title || "",
      thumbnail_url: thumbnailUrl,
      caption: input.caption || "",
      order_index: nextOrder,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/projects");
  return data;
}

export async function updateVideo(id: string, projectId: string, values: {
  title?: string;
  caption?: string;
  thumbnail_url?: string;
  order_index?: number;
}) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("project_videos")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath(`/admin/projects/${projectId}`);
  return data;
}

export async function deleteVideo(id: string, projectId: string) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  const { error } = await supabase.from("project_videos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function reorderVideos(projectId: string, orderedIds: string[]) {
  if (!(await verifyAdmin())) throw new Error("Unauthorized");
  const supabase = await createClient();

  for (let i = 0; i < orderedIds.length; i++) {
    await supabase
      .from("project_videos")
      .update({ order_index: i })
      .eq("id", orderedIds[i]);
  }

  revalidatePath(`/admin/projects/${projectId}`);
}
