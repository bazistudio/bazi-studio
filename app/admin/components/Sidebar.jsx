'use client';

import { LayoutDashboard, FolderKanban, ListChecks, Settings } from 'lucide-react';

export default function Sidebar({ activeView, onNavigate }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'tasks', label: 'Project Tasks', icon: ListChecks },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black flex flex-col p-4">
      <div className="mb-8">
        <h1 className="text-white font-bold text-xl">ADMIN PANEL</h1>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center w-full gap-3 p-3 rounded-lg mb-2 text-left ${
                isActive
                  ? 'bg-[#00E5FF] text-black'
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
