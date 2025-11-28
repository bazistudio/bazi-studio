'use client';

import { Trash2 } from 'lucide-react';

export function ProjectCardAdmin({ project, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-300 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-2">
        <span className="px-3 py-1 rounded-full text-black text-xs" style={{ backgroundColor: '#F5D76E' }}>
          {project.category}
        </span>
        <button
          onClick={() => onDelete(project.id)}
          className="p-2 bg-black text-white rounded-lg hover:bg-[#D4AF37] transition-all"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <h3 className="text-black font-semibold">{project.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{project.description}</p>
      <p className="text-amber-600 font-bold">${project.price.toLocaleString()}</p>
    </div>
  );
}
