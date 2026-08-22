"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ProjectSchema, ProjectFormValues } from "@/lib/validators/project.schema"
import { createProject, updateProject } from "@/lib/actions/projects"

import BasicInfoFields from "./BasicInfoFields"
import StoryFields from "./StoryFields"
import LinksFields from "./LinksFields"
import TimelineFields from "./TimelineFields"
import ProfessionalSignalsFields from "./ProfessionalSignalsFields"
import FormActions from "./FormActions"

export default function ProjectForm({ initialData }: { initialData?: Partial<ProjectFormValues> }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      slug: "",
      status: "draft",
      featured: false,
      short_description: "",
      full_description: "",
      problem: "",
      solution: "",
      github_url: "",
      demo_url: "",
      figma_url: "",
      started_at: "",
      completed_at: "",
      duration: "",
      display_order: 0,
      role: "",
      team_size: "",
      client_name: "",
      is_personal_project: false,
      impact_summary: "",
      featured_reason: "",
      ...initialData,
    }
  })

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      setLoading(true)
      if (values.id) {
        await updateProject(values.id, values)
      } else {
        await createProject(values)
      }
      
      router.push("/admin/projects")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("An error occurred while saving the project.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-20">
      <BasicInfoFields form={form} />
      <ProfessionalSignalsFields form={form} />
      <StoryFields form={form} />
      <LinksFields form={form} />
      <TimelineFields form={form} />
      <FormActions loading={loading} isEdit={!!initialData?.id} />
    </form>
  )
}
