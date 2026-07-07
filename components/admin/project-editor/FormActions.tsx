import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function FormActions({ loading, isEdit }: { loading: boolean, isEdit?: boolean }) {
  return (
    <div className="flex items-center justify-end gap-4 pt-6 mt-8">
      <Link href="/admin/projects" className="px-6 py-2.5 rounded-lg font-medium text-muted-foreground hover:bg-muted transition-colors">
        Cancel
      </Link>
      
      <button 
        type="submit" 
        disabled={loading}
        className="btn-base bg-primary text-primary-foreground px-8 py-2.5 flex items-center justify-center gap-2 font-semibold shadow-lg shadow-primary/20"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {isEdit ? "Update Project" : "Create Project"}
      </button>
    </div>
  )
}
