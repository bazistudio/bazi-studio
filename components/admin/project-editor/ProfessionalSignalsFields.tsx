"use client"

import { UseFormReturn } from "react-hook-form"
import { ProjectFormValues } from "@/lib/validators/project.schema"
import { Building2, Users, Briefcase, FileText, Star, UserCircle2 } from "lucide-react"

export default function ProfessionalSignalsFields({ form }: { form: UseFormReturn<ProjectFormValues> }) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-border/50 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-foreground font-semibold">
        <Briefcase size={20} className="text-primary" />
        <h2 className="text-xl">Professional Signals</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <UserCircle2 size={14} /> My Role
          </label>
          <input
            {...form.register("role")}
            placeholder="e.g. Lead Engineer, Full Stack Developer"
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users size={14} /> Team Size
          </label>
          <input
            {...form.register("team_size")}
            placeholder="e.g. Solo, 3 Engineers, Cross-functional team of 10"
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Building2 size={14} /> Client Name
          </label>
          <input
            {...form.register("client_name")}
            placeholder="e.g. Acme Corp (Leave blank if internal/NDA)"
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center space-x-3 pt-8">
          <input
            type="checkbox"
            {...form.register("is_personal_project")}
            id="is_personal"
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 bg-background"
          />
          <label htmlFor="is_personal" className="text-sm font-medium text-foreground cursor-pointer">
            Personal / Independent Project
          </label>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <FileText size={14} /> Impact Summary
          </label>
          <textarea
            {...form.register("impact_summary")}
            placeholder="e.g. Reduced manual inventory tracking by replacing spreadsheet workflows..."
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors min-h-[80px] resize-y"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Star size={14} /> Featured Reason
          </label>
          <textarea
            {...form.register("featured_reason")}
            placeholder="e.g. Selected because it demonstrates full-stack SaaS architecture."
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors min-h-[80px] resize-y"
          />
        </div>
      </div>
    </div>
  )
}
