import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/lib/validators/project.schema";

export default function StoryFields({ form }: { form: UseFormReturn<ProjectFormValues> }) {
  const { register, formState: { errors } } = form;

  return (
    <div className="glass-panel p-6 rounded-xl space-y-4">
      <h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">Case Study Story</h3>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Short Description (Summary)</label>
        <textarea 
          {...register("short_description")} 
          rows={2}
          className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none resize-none"
          placeholder="Brief overview of the project..."
        />
        {errors.short_description && <p className="text-xs text-destructive">{errors.short_description.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Full Description</label>
        <textarea 
          {...register("full_description")} 
          rows={4}
          className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
          placeholder="Detailed description of the project..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">The Problem</label>
          <textarea 
            {...register("problem")} 
            rows={4}
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder="What challenge were you solving?"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">The Solution</label>
          <textarea 
            {...register("solution")} 
            rows={4}
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder="How did you solve it?"
          />
        </div>
      </div>
    </div>
  )
}
