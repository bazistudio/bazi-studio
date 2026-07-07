"use client"

import { useState, useRef } from "react"
import { uploadMedia, deleteMedia } from "@/lib/actions/media"
import { Loader2, UploadCloud, Trash2, File as FileIcon, Image as ImageIcon, Video } from "lucide-react"

export default function MediaManager({ project }: { project: any }) {
  const [mediaList, setMediaList] = useState<any[]>(project.project_media || [])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Client-side quick validation before touching server
    let type = "document"
    if (file.type.startsWith("image/")) type = "image"
    else if (file.type.startsWith("video/")) type = "video"
    else if (file.type === "application/pdf") type = "document"
    else return alert("Unsupported file type.")

    if (type === "image" && file.size > 10 * 1024 * 1024) return alert("Image exceeds 10MB.")
    if (type === "video" && file.size > 100 * 1024 * 1024) return alert("Video exceeds 100MB.")
    if (type === "document" && file.size > 20 * 1024 * 1024) return alert("Document exceeds 20MB.")

    const formData = new FormData()
    formData.append("file", file)

    setUploading(true)
    setProgress(20)
    try {
      // In a real upload, progress events are tricky with Server Actions,
      // so we just simulate a jump. 
      setProgress(60)
      const newMedia = await uploadMedia(project.id, formData, type)
      setMediaList([...mediaList, newMedia])
      setProgress(100)
    } catch (err: any) {
      console.error(err)
      alert(err.message || "Failed to upload media.")
    } finally {
      setTimeout(() => {
        setUploading(false)
        setProgress(0)
      }, 500)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to permanently delete this file?")) return
    try {
      await deleteMedia(id, url, project.id)
      setMediaList(mediaList.filter(m => m.id !== id))
    } catch (e) {
      alert("Failed to delete media.")
    }
  }

  return (
    <div className="max-w-5xl space-y-8">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold text-primary mb-1">Media Storage Bucket</h3>
        <p className="text-sm text-foreground/80">
          Upload assets directly to Supabase Storage. (Images: max 10MB | Videos: max 100MB | PDFs: max 20MB)
        </p>
      </div>

      <div 
        className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer bg-card/50 relative overflow-hidden"
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleUpload}
          accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4,video/webm,application/pdf"
        />
        
        {uploading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <div className="w-64 h-2 bg-background rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm font-medium text-foreground">Uploading asset securely...</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <UploadCloud size={28} />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">Click to Upload Media</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Supports JPG, PNG, WEBP, SVG, MP4, WEBM, PDF.
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((media) => (
          <div key={media.id} className="glass-panel rounded-xl overflow-hidden group border border-border hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-muted/30 relative flex items-center justify-center overflow-hidden">
              {media.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={media.url} alt={media.file_name} className="object-cover w-full h-full" />
              ) : media.type === 'video' ? (
                <div className="flex flex-col items-center text-muted-foreground">
                  <Video size={32} className="mb-2 opacity-50" />
                  <span className="text-xs font-medium">Video Asset</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                  <FileIcon size={32} className="mb-2 opacity-50" />
                  <span className="text-xs font-medium">Document Asset</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(media.id, media.url); }}
                  className="bg-destructive text-destructive-foreground p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2 mb-1">
                {media.type === 'image' ? <ImageIcon size={14} className="text-blue-500" /> : media.type === 'video' ? <Video size={14} className="text-purple-500" /> : <FileIcon size={14} className="text-orange-500" />}
                <p className="text-sm font-medium truncate" title={media.file_name}>{media.file_name}</p>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span className="uppercase tracking-wider font-semibold">{media.type}</span>
                <span>{(media.file_size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
