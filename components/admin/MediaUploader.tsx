"use client"

import { UploadCloud } from "lucide-react"

export default function MediaUploader() {
  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer bg-card/50">
        <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-sm font-semibold text-foreground mb-1">Upload Media</h3>
        <p className="text-xs text-muted-foreground max-w-xs">
          Drag and drop images or videos here, or click to browse files.
        </p>
      </div>
    </div>
  )
}
