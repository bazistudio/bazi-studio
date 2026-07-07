"use client"

import { useState } from "react"
import ProjectOverviewTab from "./components/ProjectOverviewTab"
import SectionsManager from "./components/SectionsManager"
import MediaManager from "./components/MediaManager"
import BuildLogsManager from "./components/BuildLogsManager"
import SeoManager from "./components/SeoManager"

export default function ProjectEditorClient({ project }: { project: any }) {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "case_study", label: "Case Study" },
    { id: "media", label: "Media" },
    { id: "build_logs", label: "Build Logs" },
    { id: "seo", label: "SEO" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto border-b border-border hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
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
        {activeTab === "case_study" && <SectionsManager project={project} />}
        {activeTab === "media" && <MediaManager project={project} />}
        {activeTab === "build_logs" && <BuildLogsManager project={project} />}
        {activeTab === "seo" && <SeoManager project={project} />}
      </div>
    </div>
  )
}
