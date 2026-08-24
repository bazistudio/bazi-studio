"use client"

import { useState, useRef } from "react"
import { uploadMedia, deleteMedia, setCoverMedia, reorderMedia } from "@/lib/actions/media"
import { Loader2, UploadCloud, Trash2, File as FileIcon, Image as ImageIcon, Video, Star, GripVertical } from "lucide-react"

export default function MediaManager({ project }: { project: any }) {
  const [mediaList, setMediaList] = useState<any[]>(project.project_media || [])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

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

  const handleDelete = async (id: string, url: string, storagePath?: string) => {
    if (!confirm("Are you sure you want to permanently delete this file?")) return
    try {
      await deleteMedia(id, url, project.id, storagePath)
      setMediaList(mediaList.filter(m => m.id !== id))
    } catch (e) {
      alert("Failed to delete media.")
    }
  }

  const handleSetCover = async (mediaId: string) => {
    try {
      await setCoverMedia(project.id, mediaId)
      setMediaList(mediaList.map(m => ({
        ...m,
        role: m.id === mediaId ? "cover" : (m.role === "cover" ? "gallery" : m.role)
      })))
    } catch (e: any) {
      alert(e.message || "Failed to set cover image.")
    }
  }

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === mediaList.length - 1) return

    const newMedia = [...mediaList]
    const swapIndex = direction === "up" ? index - 1 : index + 1

    const temp = newMedia[index]
    newMedia[index] = newMedia[swapIndex]
    newMedia[swapIndex] = temp

    setMediaList(newMedia)

    try {
      await reorderMedia(project.id, newMedia.map((m) => m.id))
    } catch (err) {
      alert("Failed to save media order.")
    }
  }

  return (
    <div className="max-w-5xl space-y-8">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold text-primary mb-1">Visual Assets & Storage Gallery</h3>
        <p className="text-sm text-foreground/80">
          Upload UI screenshots, cover images, diagrams, or documentation files. Click the star icon to set the Primary Cover image.
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
        {mediaList.map((media, index) => {
          const isCover = media.role === "cover"

          return (
            <div 
              key={media.id} 
              className={`glass-panel rounded-xl overflow-hidden group border transition-all ${
                isCover ? "border-primary shadow-md ring-2 ring-primary/20" : "border-border hover:border-primary/50"
              }`}
            >
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

                {/* Cover badge */}
                {isCover && (
                  <div className="absolute top-2 left-2 z-20 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Star size={12} className="fill-primary-foreground" /> Cover Image
                  </div>
                )}
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  {media.type === "image" && !isCover && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSetCover(media.id); }}
                      className="bg-primary text-primary-foreground p-2.5 rounded-full hover:scale-110 transition-transform shadow-lg"
                      title="Set as Cover Image"
                    >
                      <Star size={16} />
                    </button>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(media.id, media.url, media.storage_path); }}
                    className="bg-destructive text-destructive-foreground p-2.5 rounded-full hover:scale-110 transition-transform shadow-lg"
                    title="Delete Asset"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {media.type === 'image' ? <ImageIcon size={14} className="text-blue-500 shrink-0" /> : media.type === 'video' ? <Video size={14} className="text-purple-500 shrink-0" /> : <FileIcon size={14} className="text-orange-500 shrink-0" />}
                    <p className="text-sm font-medium truncate" title={media.file_name}>{media.file_name}</p>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <button
                      onClick={() => handleMove(index, "up")}
                      disabled={index === 0}
                      className="hover:text-primary disabled:opacity-20 p-0.5"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <button
                      onClick={() => handleMove(index, "down")}
                      disabled={index === mediaList.length - 1}
                      className="hover:text-primary disabled:opacity-20 p-0.5"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span className="uppercase tracking-wider font-semibold">{media.role || media.type}</span>
                  <span>{media.file_size ? (media.file_size / 1024 / 1024).toFixed(2) + " MB" : ""}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
