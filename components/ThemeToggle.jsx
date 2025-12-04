// components/ThemeToggle.jsx
'use client';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"></button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon for light mode */}
        <Sun 
          className={`absolute inset-0 transition-all duration-300 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100 text-yellow-500' 
              : 'opacity-0 rotate-90 scale-0'
          }`}
          size={20}
        />
        
        {/* Moon icon for dark mode */}
        <Moon 
          className={`absolute inset-0 transition-all duration-300 ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100 text-blue-400' 
              : 'opacity-0 -rotate-90 scale-0'
          }`}
          size={20}
        />
      </div>
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-lg overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
      </span>
    </button>
  );
}