"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import ProjectsView from "./components/ProjectsView";
import SettingsView from "./components/SettingsView";

const initialProjects = [
  // optional initial projects
];

export default function AdminPage() {
  const [activeView, setActiveView] = useState("dashboard");
  const [projects, setProjects] = useState(initialProjects);

  const handleAddProject = (project) => {
    setProjects([
      ...projects,
      { ...project, id: Date.now().toString(), createdAt: new Date() },
    ]);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView projects={projects} />;
      case "projects":
        return (
          <ProjectsView
            projects={projects}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
          />
        );
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView projects={projects} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      {/* Main content */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}
