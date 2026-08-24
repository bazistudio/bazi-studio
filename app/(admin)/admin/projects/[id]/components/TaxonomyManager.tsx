"use client"

import { useState, useEffect } from "react"
import { getTaxonomies, getProjectTaxonomies, syncProjectTechnologies, syncProjectTags, createTechnology, createTag } from "@/lib/actions/taxonomy"
import { Loader2, Plus, Check, Tag, Cpu, Save } from "lucide-react"

export default function TaxonomyManager({ project }: { project: any }) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [allTechs, setAllTechs] = useState<any[]>([])
  const [allTags, setAllTags] = useState<any[]>([])
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([])
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])

  // Quick add states
  const [newTechName, setNewTechName] = useState("")
  const [newTagName, setNewTagName] = useState("")
  const [isAddingTech, setIsAddingTech] = useState(false)
  const [isAddingTag, setIsAddingTag] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [taxonomyData, projectTaxData] = await Promise.all([
          getTaxonomies(),
          getProjectTaxonomies(project.id),
        ])
        setAllTechs(taxonomyData.technologies)
        setAllTags(taxonomyData.tags)
        setSelectedTechIds(projectTaxData.technologyIds)
        setSelectedTagIds(projectTaxData.tagIds)
      } catch (e) {
        console.error("Failed to load taxonomy data:", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [project.id])

  const toggleTech = (id: string) => {
    setSelectedTechIds(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    )
  }

  const toggleTag = (id: string) => {
    setSelectedTagIds(prev => 
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    )
  }

  const handleCreateTech = async () => {
    if (!newTechName.trim()) return
    try {
      const created = await createTechnology(newTechName.trim())
      setAllTechs(prev => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)))
      setSelectedTechIds(prev => [...prev, created.id])
      setNewTechName("")
      setIsAddingTech(false)
    } catch (err: any) {
      alert(err.message || "Failed to create technology.")
    }
  }

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return
    try {
      const created = await createTag(newTagName.trim())
      setAllTags(prev => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)))
      setSelectedTagIds(prev => [...prev, created.id])
      setNewTagName("")
      setIsAddingTag(false)
    } catch (err: any) {
      alert(err.message || "Failed to create tag.")
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await Promise.all([
        syncProjectTechnologies(project.id, selectedTechIds),
        syncProjectTags(project.id, selectedTagIds),
      ])
      alert("Taxonomy saved successfully!")
    } catch (err: any) {
      alert(err.message || "Failed to save taxonomy.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div>
          <h3 className="font-semibold text-primary mb-1">Tags & Technologies</h3>
          <p className="text-sm text-foreground/80">
            Attach reusable technologies, design tools, and categorization tags to this project.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-base bg-primary text-primary-foreground px-6 py-2.5 flex items-center gap-2"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Taxonomy
        </button>
      </div>

      {/* Technologies / Stack */}
      <div className="glass-panel p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 font-semibold">
            <Cpu size={18} className="text-primary" />
            <h3>Technologies & Tools ({selectedTechIds.length} selected)</h3>
          </div>
          <button
            onClick={() => setIsAddingTech(!isAddingTech)}
            className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
          >
            <Plus size={14} /> Add New Tool
          </button>
        </div>

        {isAddingTech && (
          <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg border border-border">
            <input
              type="text"
              value={newTechName}
              onChange={(e) => setNewTechName(e.target.value)}
              placeholder="e.g. Next.js, Figma, PyTorch"
              className="flex-1 p-2 text-sm bg-background border border-border rounded-md outline-none"
            />
            <button
              onClick={handleCreateTech}
              className="btn-base bg-primary text-primary-foreground px-4 py-2 text-sm"
            >
              Add
            </button>
            <button
              onClick={() => setIsAddingTech(false)}
              className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {allTechs.map((tech) => {
            const isSelected = selectedTechIds.includes(tech.id)
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => toggleTech(tech.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {isSelected && <Check size={14} />}
                {tech.name}
              </button>
            )
          })}
          {allTechs.length === 0 && !isAddingTech && (
            <p className="text-sm text-muted-foreground py-2">No technologies registered yet. Click &apos;Add New Tool&apos; to create one.</p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="glass-panel p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 font-semibold">
            <Tag size={18} className="text-primary" />
            <h3>Project Tags ({selectedTagIds.length} selected)</h3>
          </div>
          <button
            onClick={() => setIsAddingTag(!isAddingTag)}
            className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
          >
            <Plus size={14} /> Add New Tag
          </button>
        </div>

        {isAddingTag && (
          <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg border border-border">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="e.g. Design System, Full Stack, SaaS"
              className="flex-1 p-2 text-sm bg-background border border-border rounded-md outline-none"
            />
            <button
              onClick={handleCreateTag}
              className="btn-base bg-primary text-primary-foreground px-4 py-2 text-sm"
            >
              Add
            </button>
            <button
              onClick={() => setIsAddingTag(false)}
              className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {allTags.map((tag) => {
            const isSelected = selectedTagIds.includes(tag.id)
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {isSelected && <Check size={14} />}
                #{tag.name}
              </button>
            )
          })}
          {allTags.length === 0 && !isAddingTag && (
            <p className="text-sm text-muted-foreground py-2">No tags registered yet. Click &apos;Add New Tag&apos; to create one.</p>
          )}
        </div>
      </div>
    </div>
  )
}
