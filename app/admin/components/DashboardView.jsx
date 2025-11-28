'use client';

import { TrendingUp, DollarSign, FolderKanban, Eye } from 'lucide-react';

export default function DashboardView({ projects }) {
  const totalRevenue = projects.reduce((sum, p) => sum + (p.price || 0), 0);
  const categories = Array.from(new Set(projects.map(p => p.category)));

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FolderKanban,
      bgColor: '#F5D76E',
      color: '#000000',
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      bgColor: '#D4AF37',
      color: '#000000',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: TrendingUp,
      bgColor: '#00E5FF',
      color: '#000000',
    },
    {
      label: 'Avg. Project Value',
      value: `$${Math.round(totalRevenue / (projects.length || 1)).toLocaleString()}`,
      icon: Eye,
      bgColor: '#4F46E5',
      color: '#FFFFFF',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-black">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-xl shadow hover:shadow-lg transition-all bg-white"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon size={24} color={stat.color} />
                </div>
              </div>
              <p className="text-gray-600 mb-1">{stat.label}</p>
              <p className="text-black font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
