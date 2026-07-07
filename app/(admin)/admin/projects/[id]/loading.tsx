import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-2">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-foreground">Loading Project Editor...</h2>
      <p className="text-muted-foreground text-sm max-w-md text-center">
        Fetching relational data, case study sections, and developer journey logs.
      </p>
    </div>
  )
}
