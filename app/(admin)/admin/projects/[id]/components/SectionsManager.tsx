"use client"

import { useState } from "react"
import { createProjectSection, deleteProjectSection, reorderProjectSections } from "@/lib/actions/project-sections"
import { Loader2, Plus, Trash2, GripVertical, Code, Type, Layout, Quote } from "lucide-react"

export default function SectionsManager({ project }: { project: any }) {
  const [sections, setSections] = useState<any[]>(project.project_sections || [])
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ type: "text", title: "", content: "" })

  const handleCreate = async () => {
    if (!formData.content) return alert("Content is required.")
    setLoading(true)
    try {
      const newSection = await createProjectSection(project.id, {
        ...formData,
        order_index: sections.length
      })
      setSections([...sections, newSection])
      setIsAdding(false)
      setFormData({ type: "text", title: "", content: "" })
    } catch (e) {
      console.error(e)
      alert("Failed to add section.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this section?")) return
    try {
      await deleteProjectSection(id, project.id)
      setSections(sections.filter(s => s.id !== id))
    } catch (e) {
      alert("Failed to delete section.")
    }
  }

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === sections.length - 1) return

    const newSections = [...sections]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    
    // Swap
    const temp = newSections[index]
    newSections[index] = newSections[swapIndex]
    newSections[swapIndex] = temp

    setSections(newSections)
    
    try {
      await reorderProjectSections(project.id, newSections.map(s => s.id))
    } catch (e) {
      alert("Failed to save order.")
    }
  }

  const getIconForType = (type: string) => {
    switch(type) {
      case 'code_showcase': return <Code size={18} className="text-blue-500" />
      case 'architecture': return <Layout size={18} className="text-purple-500" />
      case 'quote': return <Quote size={18} className="text-green-500" />
      default: return <Type size={18} className="text-orange-500" />
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div>
          <h3 className="font-semibold text-primary mb-1">Case Study Sections</h3>
          <p className="text-sm text-foreground/80">Build your case study modularly using Text, Code, Architecture, and Quote blocks.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="btn-base bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2"
        >
          <Plus size={16} /> Add Section
        </button>
      </div>

      {isAdding && (
        <div className="glass-panel p-6 rounded-xl border border-primary/30 relative">
          <h4 className="text-lg font-bold mb-4">New Section</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Type</label>
              <select 
                value={formData.type} 
                onChange={(e) => setFormData({...formData, type: e.target.value})} 
                className="w-full p-2.5 rounded-lg bg-background border border-border outline-none"
              >
                <option value="text">Text / Markdown</option>
                <option value="code_showcase">Code Showcase</option>
                <option value="architecture">Architecture Note</option>
                <option value="quote">Quote / Highlight</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Title (Optional)</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2.5 rounded-lg bg-background border border-border outline-none" placeholder="e.g. Authentication Setup" />
            </div>
          </div>
          <div className="space-y-1 mb-4">
            <label className="text-sm font-medium">Content</label>
            <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={6} className="w-full p-3 rounded-lg bg-background border border-border outline-none resize-y font-mono text-sm" placeholder="Write markdown or code here..." />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-md">Cancel</button>
            <button onClick={handleCreate} disabled={loading} className="btn-base bg-primary text-primary-foreground px-6 py-2 flex items-center gap-2">
              {loading && <Loader2 size={16} className="animate-spin" />} Save Section
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {sections.length === 0 && !isAdding && (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-xl text-muted-foreground">
            No sections added yet. Build your case study story!
          </div>
        )}

        {sections.map((section, index) => (
          <div key={section.id} className="glass-panel p-4 rounded-xl flex gap-4 items-start group transition-colors hover:border-primary/30">
            <div className="flex flex-col items-center gap-2 pt-1 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="hover:text-primary disabled:opacity-30 p-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>
              <GripVertical size={16} />
              <button onClick={() => handleMove(index, 'down')} disabled={index === sections.length - 1} className="hover:text-primary disabled:opacity-30 p-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {getIconForType(section.type)}
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.type.replace('_', ' ')}</span>
                {section.title && <span className="font-medium text-foreground ml-2 truncate">{section.title}</span>}
              </div>
              <div className="text-sm text-foreground/80 line-clamp-3 bg-background/50 p-3 rounded-lg border border-border/50 font-mono">
                {section.content}
              </div>
            </div>

            <button onClick={() => handleDelete(section.id)} className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-md hover:bg-destructive/10">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
