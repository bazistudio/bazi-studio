import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background space-y-6">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
        <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-[spin_1.5s_reverse_infinite]" />
        <Loader2 className="w-8 h-8 text-primary animate-pulse" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-widest uppercase text-foreground/80">Compiling Data</h2>
        <p className="text-muted-foreground font-mono text-sm">Fetching case study architecture...</p>
      </div>
    </div>
  )
}
