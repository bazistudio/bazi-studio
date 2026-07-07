"use client"

import { useState } from "react"
import { createBuildLog, updateBuildLog, deleteBuildLog } from "@/lib/actions/build-logs"
import { Loader2, Plus, Trash2, Edit2, Check, X } from "lucide-react"

export default function BuildLogsManager({ project }: { project: any }) {
  const [logs, setLogs] = useState<any[]>(project.build_logs || [])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({ day_number: 1, title: "", content: "" })

  const handleCreate = async () => {
    if (!formData.title || !formData.content) return alert("Please fill in all fields.")
    setLoading(true)
    try {
      const newLog = await createBuildLog(project.id, formData)
      setLogs([...logs, newLog].sort((a, b) => a.day_number - b.day_number))
      setIsAdding(false)
      setFormData({ day_number: logs.length + 2, title: "", content: "" })
    } catch (e) {
      console.error(e)
      alert("Failed to add log.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this log?")) return
    try {
      await deleteBuildLog(id, project.id)
      setLogs(logs.filter(l => l.id !== id))
    } catch (e) {
      alert("Failed to delete log.")
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div>
          <h3 className="font-semibold text-primary mb-1">Developer Journey Timeline</h3>
          <p className="text-sm text-foreground/80">Document the day-by-day development process of this case study.</p>
        </div>
        <button 
          onClick={() => { setIsAdding(true); setFormData({ day_number: logs.length + 1, title: "", content: "" }) }}
          className="btn-base bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2"
        >
          <Plus size={16} /> Add Log Entry
        </button>
      </div>

      {isAdding && (
        <div className="glass-panel p-6 rounded-xl border border-primary/30 relative">
          <h4 className="text-lg font-bold mb-4">New Log Entry</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Day #</label>
              <input type="number" value={formData.day_number} onChange={(e) => setFormData({...formData, day_number: parseInt(e.target.value)})} className="w-full p-2 rounded-lg bg-background border border-border" />
            </div>
            <div className="space-y-1 md:col-span-3">
              <label className="text-sm font-medium">Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2 rounded-lg bg-background border border-border" placeholder="e.g. Authentication Setup" />
            </div>
          </div>
          <div className="space-y-1 mb-4">
            <label className="text-sm font-medium">Content / Learnings</label>
            <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={4} className="w-full p-2 rounded-lg bg-background border border-border resize-none" placeholder="What did you build or learn?" />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-md">Cancel</button>
            <button onClick={handleCreate} disabled={loading} className="btn-base bg-primary text-primary-foreground px-6 py-2 flex items-center gap-2">
              {loading && <Loader2 size={16} className="animate-spin" />} Save Log
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {logs.length === 0 && !isAdding && (
          <p className="text-center text-muted-foreground py-8 relative z-10">No build logs yet. Start documenting your journey!</p>
        )}
        
        {logs.map((log) => (
          <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-background text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-primary/20 z-10">
              <span className="text-sm font-bold">{log.day_number}</span>
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-5 rounded-xl group-hover:border-primary/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg text-foreground">{log.title}</h4>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(log.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-muted-foreground text-sm whitespace-pre-wrap">{log.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
