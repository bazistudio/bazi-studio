"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

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
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center justify-center mb-2">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-xl font-bold text-foreground">Failed to load project</h2>
      <p className="text-muted-foreground text-sm max-w-md text-center">
        There was a problem fetching this project's case study data from Supabase.
      </p>
      <button
        onClick={() => reset()}
        className="btn-base bg-destructive/10 text-destructive hover:bg-destructive/20 px-6 py-2 mt-4"
      >
        Try Again
      </button>
    </div>
  )
}
