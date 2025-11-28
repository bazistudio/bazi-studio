'use client';

import { useState } from 'react';
import { Plus, Filter, FolderKanban } from 'lucide-react';
import { AddProjectModal } from './AddProjectModal';
import { ProjectCardAdmin } from './ProjectCardAdmin';

export default function ProjectsView({ projects, onAddProject, onDeleteProject }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const availableCategories = categories.filter(c => c !== 'All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const groupedProjects = selectedCategory === 'All'
    ? availableCategories.reduce((acc, cat) => {
        acc[cat] = projects.filter(p => p.category === cat);
        return acc;
      }, {})
    : { [selectedCategory]: filteredProjects };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#00E5FF] rounded-lg"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {Object.entries(groupedProjects).map(([category, catProjects]) => (
        <div key={category}>
          <h2 className="font-semibold text-black mb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {catProjects.map((p) => (
              <ProjectCardAdmin key={p.id} project={p} onDelete={onDeleteProject} />
            ))}
          </div>
        </div>
      ))}

      {isAddModalOpen && (
        <AddProjectModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={onAddProject}
          existingCategories={availableCategories}
        />
      )}
    </div>
  );
}
