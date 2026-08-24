"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import DataTable from "@/components/admin/DataTable"
import StatusBadge from "@/components/project/StatusBadge"
import { deleteProject } from "@/lib/actions/projects"

type ProjectRow = {
  id: string
  title: string
  status: string
  featured: boolean
  display_order: number
  created_at: string
}

export default function ProjectsClient({ data }: { data: ProjectRow[] }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete Project: "${title}"?\nThis will remove:\n- Project\n- Media\n- Sections\n- Build Logs\n\nCannot be undone.`)) {
      return
    }
    
    try {
      setIsDeleting(id)
      await deleteProject(id)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to delete project.")
    } finally {
      setIsDeleting(null)
    }
  }

  const columns = [
    {
      header: "Title",
      accessor: "title" as keyof ProjectRow,
      cell: (item: ProjectRow) => <span className="font-medium text-foreground">{item.title}</span>
    },
    {
      header: "Status",
      accessor: "status" as keyof ProjectRow,
      cell: (item: ProjectRow) => <StatusBadge status={item.status} />
    },
    {
      header: "Featured",
      accessor: "featured" as keyof ProjectRow,
      cell: (item: ProjectRow) => (
        item.featured ? <CheckCircle className="text-success w-5 h-5" /> : <XCircle className="text-muted-foreground w-5 h-5" />
      )
    },
    {
      header: "Order",
      accessor: "display_order" as keyof ProjectRow,
    },
    {
      header: "Created",
      accessor: "created_at" as keyof ProjectRow,
      cell: (item: ProjectRow) => new Date(item.created_at).toLocaleDateString()
    },
    {
      header: "Actions",
      accessor: "id" as keyof ProjectRow,
      cell: (item: ProjectRow) => (
        <div className="flex items-center gap-3">
          <Link href={`/admin/projects/${item.id}`} className="p-2 text-primary hover:bg-primary/10 rounded-md transition-colors">
            <Edit size={16} />
          </Link>
          <button 
            onClick={(e) => { e.stopPropagation(); handleDelete(item.id, item.title); }} 
            disabled={isDeleting === item.id}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors disabled:opacity-50"
          >
            {isDeleting === item.id ? <span className="text-xs">...</span> : <Trash2 size={16} />}
          </button>
        </div>
      )
    }
  ]

  const emptyState = (
    <div className="py-8 flex flex-col items-center justify-center">
      <p className="mb-4 text-muted-foreground">No projects created yet.</p>
      <Link href="/admin/projects/new" className="text-primary hover:underline font-medium">
        Create your first case study &rarr;
      </Link>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link 
          href="/admin/projects/new" 
          className="btn-base bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2"
        >
          <Plus size={18} />
          Create Project
        </Link>
      </div>
      <DataTable 
        data={data || []} 
        columns={columns} 
        emptyState={emptyState}
      />
    </div>
  )
}
