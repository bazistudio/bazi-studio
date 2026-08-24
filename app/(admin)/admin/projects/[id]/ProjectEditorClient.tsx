"use client"

import { useState } from "react"
import ProjectOverviewTab from "./components/ProjectOverviewTab"
import SectionsManager from "./components/SectionsManager"
import MediaManager from "./components/MediaManager"
import VideosManager from "./components/VideosManager"
import TaxonomyManager from "./components/TaxonomyManager"
import BuildLogsManager from "./components/BuildLogsManager"
import SeoManager from "./components/SeoManager"

export default function ProjectEditorClient({ project }: { project: any }) {
  const [activeTab, setActiveTab] = useState("overview")
  const projectType = project.project_type || "case_study"

  // Dynamic tab configuration based on project_type
  let tabs = [
    { id: "overview", label: "Overview" },
    { id: "media", label: projectType === "figma" ? "UI Screens & Assets" : "Visual Assets" },
    { id: "videos", label: "Videos & Demos" },
    { id: "taxonomy", label: projectType === "figma" ? "Tools & Tags" : "Stack & Tags" },
    { id: "case_study", label: "Case Study Story" },
    { id: "build_logs", label: "Dev Logs" },
    { id: "seo", label: "SEO & Social" },
  ]

  if (projectType === "shortlist") {
    tabs = [
      { id: "overview", label: "Overview" },
      { id: "media", label: "Visual Assets" },
      { id: "videos", label: "Videos & Demos" },
      { id: "taxonomy", label: "Stack & Tags" },
      { id: "seo", label: "SEO & Social" },
    ]
  } else if (projectType === "figma") {
    tabs = [
      { id: "overview", label: "Design Overview" },
      { id: "media", label: "Screens & Visuals" },
      { id: "videos", label: "Prototype Walkthroughs" },
      { id: "taxonomy", label: "Tools & Tags" },
      { id: "seo", label: "SEO & Social" },
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto border-b border-border hide-scrollbar gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "overview" && <ProjectOverviewTab project={project} />}
        {activeTab === "media" && <MediaManager project={project} />}
        {activeTab === "videos" && <VideosManager project={project} />}
        {activeTab === "taxonomy" && <TaxonomyManager project={project} />}
        {activeTab === "case_study" && <SectionsManager project={project} />}
        {activeTab === "build_logs" && <BuildLogsManager project={project} />}
        {activeTab === "seo" && <SeoManager project={project} />}
      </div>
    </div>
  )
}
