import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "@/lib/validators/project.schema";

export default function TimelineFields({ form }: { form: UseFormReturn<ProjectFormValues> }) {
  const { register } = form;

  return (
    <div className="glass-panel p-6 rounded-xl space-y-4">
      <h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">Project Timeline</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Started At</label>
          <input 
            type="date" 
            {...register("started_at")} 
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Completed At</label>
          <input 
            type="date" 
            {...register("completed_at")} 
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <input 
            type="text" 
            {...register("duration")} 
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder="e.g. 3 months"
          />
        </div>
      </div>
    </div>
  );
}
