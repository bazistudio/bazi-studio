import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/lib/validators/project.schema";
import { Github, Globe, Figma } from "lucide-react";

export default function LinksFields({ form }: { form: UseFormReturn<ProjectFormValues> }) {
  const { register, formState: { errors } } = form;

  return (
    <div className="glass-panel p-6 rounded-xl space-y-4">
      <h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">External Links</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Github size={14} /> GitHub Repository
          </label>
          <input 
            type="url" 
            {...register("github_url")} 
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder="https://github.com/..."
          />
          {errors.github_url && <p className="text-xs text-destructive">{errors.github_url.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Globe size={14} /> Live Demo
          </label>
          <input 
            type="url" 
            {...register("demo_url")} 
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder="https://..."
          />
          {errors.demo_url && <p className="text-xs text-destructive">{errors.demo_url.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Figma size={14} /> Figma Design
          </label>
          <input 
            type="url" 
            {...register("figma_url")} 
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder="https://figma.com/..."
          />
          {errors.figma_url && <p className="text-xs text-destructive">{errors.figma_url.message}</p>}
        </div>
      </div>
    </div>
  )
}
