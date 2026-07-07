"use client"

import { useEffect } from "react"
import { ShieldAlert, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4">
      <div className="glass-panel p-10 rounded-2xl max-w-md w-full text-center border border-destructive/20 relative z-10">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          This case study may have been archived, set to draft status, or removed from the public databank.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-2.5 bg-muted text-foreground font-medium rounded-lg transition-colors hover:bg-muted/80"
          >
            Retry Connection
          </button>
          
          <Link href="/projects" className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
            <ArrowLeft size={16} /> Return to Archives
          </Link>
        </div>
      </div>
    </div>
  )
}
