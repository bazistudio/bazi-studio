import { z } from "zod";

export const MediaSchema = z.object({
  id: z.string().uuid().optional(),
  project_id: z.string().uuid(),
  type: z.enum(["image", "video", "document"]).default("image"),
  url: z.string().url(),
  caption: z.string().optional(),
  alt_text: z.string().optional(),
  file_name: z.string().optional(),
  file_size: z.number().int().optional(),
  order_index: z.number().int().default(0),
});

export type MediaFormValues = z.infer<typeof MediaSchema>;
