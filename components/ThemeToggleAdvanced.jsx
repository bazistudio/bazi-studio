// components/ThemeToggleAdvanced.jsx
'use client';
import { useState } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';

export default function ThemeToggleAdvanced() {
  const { theme, setThemeMode, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    { id: 'light', label: 'Light', icon: <Sun size={16} />, color: 'text-yellow-500' },
    { id: 'dark', label: 'Dark', icon: <Moon size={16} />, color: 'text-blue-400' },
    { id: 'system', label: 'System', icon: <Monitor size={16} />, color: 'text-gray-500' },
  ];

  const handleThemeSelect = (themeId) => {
    if (themeId === 'system') {
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeMode(prefersDark ? 'dark' : 'light');
    } else {
      setThemeMode(themeId);
    }
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div className="relative">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
          <div className="w-5 h-5"></div>
        </button>
      </div>
    );
  }

  const currentTheme = themeOptions.find(t => t.id === theme) || themeOptions[0];

  return (
    <div className="relative">
      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        aria-label="Change theme"
      >
        <div className={currentTheme.color}>
          {currentTheme.icon}
        </div>
        <span className="text-sm font-medium hidden sm:inline">
          {currentTheme.label}
        </span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleThemeSelect(option.id)}
                className={`flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  theme === option.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                }`}
              >
                <div className={option.color}>
                  {option.icon}
                </div>
                <span className="text-sm font-medium">{option.label}</span>
                {theme === option.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}