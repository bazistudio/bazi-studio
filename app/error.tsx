"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCcw } from "lucide-react"

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-destructive/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="glass-panel p-10 rounded-2xl max-w-lg w-full text-center border border-destructive/20 relative z-10 shadow-2xl shadow-destructive/10">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        
        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
          System Malfunction
        </h1>
        
        <p className="text-muted-foreground mb-8">
          The BaziStudio Lab encountered an unexpected anomaly while compiling the environment data.
        </p>

        <button
          onClick={() => reset()}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative">Reinitialize System</span>
        </button>
      </div>
    </div>
  )
}
