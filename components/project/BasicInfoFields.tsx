import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/lib/validators/project.schema";

export default function BasicInfoFields({ form }: { form: UseFormReturn<ProjectFormValues> }) {
  const { register, formState: { errors }, setValue, getValues } = form;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title, { shouldValidate: true });
    
    // Auto-generate slug if it's empty or matches the old auto-generated one loosely
    const currentSlug = getValues("slug");
    if (!currentSlug || currentSlug.length < 2) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setValue("slug", slug, { shouldValidate: true });
    }
  };

  return (
    <div className="glass-panel p-6 rounded-xl space-y-4">
      <h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input 
            type="text" 
            {...register("title")} 
            onChange={handleTitleChange}
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder="Project Title"
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <input 
            type="text" 
            {...register("slug")} 
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder="project-slug"
          />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Type</label>
          <select 
            {...register("project_type")}
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
          >
            <option value="case_study">Complete Case Study</option>
            <option value="shortlist">Shortlisted Project</option>
            <option value="figma">Figma Design Project</option>
          </select>
          {errors.project_type && <p className="text-xs text-destructive">{errors.project_type.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <select 
            {...register("status")}
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Display Order</label>
          <input 
            type="number" 
            {...register("display_order", { valueAsNumber: true })} 
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
          />
          {errors.display_order && <p className="text-xs text-destructive">{errors.display_order.message}</p>}
        </div>

        <div className="flex flex-col justify-center space-y-2 pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              {...register("featured")} 
              className="w-4 h-4 rounded text-primary focus:ring-primary border-border bg-background"
            />
            <span className="text-sm font-medium">Featured Project</span>
          </label>
        </div>
      </div>
    </div>
  );
}
