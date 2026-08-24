import { z } from "zod";

export const MediaSchema = z.object({
  id: z.string().uuid().optional(),
  project_id: z.string().uuid(),
  type: z.enum(["image", "video", "document"]).default("image"),
  role: z.enum(["cover", "gallery", "thumbnail"]).default("gallery"),
  url: z.string().url(),
  storage_path: z.string().optional(),
  caption: z.string().optional(),
  alt_text: z.string().optional(),
  file_name: z.string().optional(),
  file_size: z.number().int().optional(),
  mime_type: z.string().optional(),
  order_index: z.number().int().default(0),
});

export type MediaFormValues = z.infer<typeof MediaSchema>;
