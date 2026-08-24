import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category_id: z.string().uuid().nullable().optional(),
  project_type: z.enum(["case_study", "shortlist", "figma"]),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean(),
  display_order: z.number().int(),
  short_description: z.string().min(1, "Short description is required"),
  full_description: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  github_url: z.string().url().optional().or(z.literal("")),
  demo_url: z.string().url().optional().or(z.literal("")),
  figma_url: z.string().url().optional().or(z.literal("")),
  figma_prototype_url: z.string().url().optional().or(z.literal("")),
  figma_community_url: z.string().url().optional().or(z.literal("")),
  started_at: z.string().optional(),
  completed_at: z.string().optional(),
  duration: z.string().optional(),
  role: z.string().optional(),
  team_size: z.string().optional(),
  client_name: z.string().optional(),
  is_personal_project: z.boolean(),
  impact_summary: z.string().optional(),
  featured_reason: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;
