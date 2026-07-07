"use client"

import { useState } from "react"
import { upsertSeoMetadata } from "@/lib/actions/seo"
import { Loader2, Save } from "lucide-react"

export default function SeoManager({ project }: { project: any }) {
  const [loading, setLoading] = useState(false)
  const seoData = project.seo_metadata || {}
  
  const [data, setData] = useState({
    meta_title: seoData.meta_title || "",
    meta_description: seoData.meta_description || "",
    og_image_url: seoData.og_image_url || "",
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      await upsertSeoMetadata(project.id, data)
      // Show success toast here in production
    } catch (error) {
      console.error("Failed to save SEO metadata:", error)
      alert("Failed to save SEO metadata.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-primary mb-1">Search Engine Optimization</h3>
        <p className="text-sm text-foreground/80">
          Optimize how this project appears in Google search results and on social media link previews (Twitter, LinkedIn).
        </p>
      </div>

      <div className="glass-panel p-6 rounded-xl space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Meta Title</label>
          <input 
            type="text" 
            value={data.meta_title}
            onChange={(e) => setData({ ...data, meta_title: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder={project.title}
          />
          <p className="text-xs text-muted-foreground">Keep it under 60 characters for best results.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Meta Description</label>
          <textarea 
            value={data.meta_description}
            onChange={(e) => setData({ ...data, meta_description: e.target.value })}
            rows={3}
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none resize-none"
            placeholder={project.short_description}
          />
          <p className="text-xs text-muted-foreground">Keep it under 160 characters. This is the snippet shown in search results.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">OpenGraph Image URL</label>
          <input 
            type="url" 
            value={data.og_image_url}
            onChange={(e) => setData({ ...data, og_image_url: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none"
            placeholder="https://..."
          />
          <p className="text-xs text-muted-foreground">This image is displayed when the project link is shared. Use a 1200x630px image.</p>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-border">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="btn-base bg-primary text-primary-foreground px-8 py-2.5 flex items-center gap-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save SEO Metadata
        </button>
      </div>
    </div>
  )
}
