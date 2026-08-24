"use client"

import { useState } from "react"
import { addYouTubeVideo, updateVideo, deleteVideo, reorderVideos } from "@/lib/actions/videos"
import { extractYouTubeId } from "@/lib/utils/youtube"
import { Loader2, Plus, Trash2, Youtube, ExternalLink, GripVertical, Play, Save, Check } from "lucide-react"

export default function VideosManager({ project }: { project: any }) {
  const [videos, setVideos] = useState<any[]>(project.project_videos || [])
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  // Add form state
  const [videoUrl, setVideoUrl] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoCaption, setVideoCaption] = useState("")
  const [previewId, setPreviewId] = useState<string | null>(null)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setVideoUrl(val)
    const extracted = extractYouTubeId(val)
    setPreviewId(extracted)
  }

  const handleAdd = async () => {
    if (!previewId) return alert("Please enter a valid YouTube video URL.")
    try {
      setLoading(true)
      const newVideo = await addYouTubeVideo(project.id, {
        url: videoUrl,
        title: videoTitle,
        caption: videoCaption,
      })
      setVideos([...videos, newVideo])
      setIsAdding(false)
      setVideoUrl("")
      setVideoTitle("")
      setVideoCaption("")
      setPreviewId(null)
    } catch (err: any) {
      alert(err.message || "Failed to add YouTube video.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video embed?")) return
    try {
      await deleteVideo(id, project.id)
      setVideos(videos.filter((v) => v.id !== id))
    } catch (err: any) {
      alert("Failed to delete video.")
    }
  }

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === videos.length - 1) return

    const newVideos = [...videos]
    const swapIndex = direction === "up" ? index - 1 : index + 1

    const temp = newVideos[index]
    newVideos[index] = newVideos[swapIndex]
    newVideos[swapIndex] = temp

    setVideos(newVideos)

    try {
      await reorderVideos(project.id, newVideos.map((v) => v.id))
    } catch (err) {
      alert("Failed to save order.")
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div>
          <h3 className="font-semibold text-primary mb-1">YouTube & Video Embeds</h3>
          <p className="text-sm text-foreground/80">
            Attach YouTube demo walkthroughs, architecture presentations, or video highlights.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-base bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2"
        >
          <Plus size={16} /> Add Video
        </button>
      </div>

      {isAdding && (
        <div className="glass-panel p-6 rounded-xl border border-primary/30 space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg border-b border-border pb-2">
            <Youtube size={20} className="text-red-500" />
            <h4>New YouTube Video</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">YouTube URL / Share Link</label>
              <input
                type="url"
                value={videoUrl}
                onChange={handleUrlChange}
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                className="w-full p-2.5 rounded-lg bg-background border border-border outline-none focus:border-primary"
              />
              {previewId && (
                <p className="text-xs text-green-500 flex items-center gap-1 font-medium">
                  <Check size={14} /> Valid Video ID: <span className="font-mono">{previewId}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Video Title</label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g. 5-Minute System Architecture Walkthrough"
                className="w-full p-2.5 rounded-lg bg-background border border-border outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Caption / Description (Optional)</label>
            <textarea
              value={videoCaption}
              onChange={(e) => setVideoCaption(e.target.value)}
              rows={2}
              placeholder="Key timestamps or brief summary of the video content..."
              className="w-full p-2.5 rounded-lg bg-background border border-border outline-none resize-none"
            />
          </div>

          {/* Live Thumbnail Preview */}
          {previewId && (
            <div className="p-4 bg-muted/30 rounded-xl border border-border flex items-center gap-4">
              <div className="w-36 aspect-video rounded-lg overflow-hidden bg-black relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`}
                  alt="YouTube Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play size={20} className="text-white fill-white" />
                </div>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">{videoTitle || "Untitled Video"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ready to embed from YouTube.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false)
                setPreviewId(null)
              }}
              className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={loading || !previewId}
              className="btn-base bg-primary text-primary-foreground px-6 py-2 flex items-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />} Save Video
            </button>
          </div>
        </div>
      )}

      {/* Videos List */}
      <div className="space-y-4">
        {videos.length === 0 && !isAdding && (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-xl text-muted-foreground">
            No video walkthroughs added yet. Add a YouTube demo to showcase this project!
          </div>
        )}

        {videos.map((vid, index) => (
          <div
            key={vid.id}
            className="glass-panel p-4 rounded-xl flex gap-4 items-center group hover:border-primary/40 transition-colors"
          >
            <div className="flex flex-col items-center gap-1 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleMove(index, "up")}
                disabled={index === 0}
                className="hover:text-primary disabled:opacity-20 p-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>
              <GripVertical size={16} />
              <button
                onClick={() => handleMove(index, "down")}
                disabled={index === videos.length - 1}
                className="hover:text-primary disabled:opacity-20 p-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>

            <div className="w-32 aspect-video bg-black rounded-lg overflow-relative shrink-0 relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vid.thumbnail_url || `https://img.youtube.com/vi/${vid.video_id}/hqdefault.jpg`}
                alt={vid.title || "Video"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play size={16} className="text-white fill-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Youtube size={16} className="text-red-500 shrink-0" />
                <h4 className="font-semibold text-foreground truncate">{vid.title || "YouTube Walkthrough"}</h4>
              </div>
              <p className="text-xs text-muted-foreground font-mono truncate">{vid.url}</p>
              {vid.caption && (
                <p className="text-xs text-foreground/80 mt-1 line-clamp-1">{vid.caption}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                title="Open YouTube"
              >
                <ExternalLink size={16} />
              </a>
              <button
                onClick={() => handleDelete(vid.id)}
                className="p-2 text-muted-foreground hover:text-destructive rounded-md hover:bg-destructive/10 transition-colors"
                title="Delete Video"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
