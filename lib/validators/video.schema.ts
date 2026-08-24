import { z } from "zod";

export const VideoSchema = z.object({
  id: z.string().uuid().optional(),
  project_id: z.string().uuid(),
  provider: z.enum(["youtube", "vimeo", "custom"]).default("youtube"),
  video_id: z.string().min(1, "Video ID is required"),
  url: z.string().url("Must be a valid video URL"),
  title: z.string().optional(),
  thumbnail_url: z.string().url().optional().or(z.literal("")),
  caption: z.string().optional(),
  duration: z.string().optional(),
  order_index: z.number().int().default(0),
});

export type VideoFormValues = z.infer<typeof VideoSchema>;
