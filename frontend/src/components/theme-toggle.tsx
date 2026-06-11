'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 transition-colors text-sm"
    >
      {/* Icons - both rendered, CSS toggles visibility */}
      <span className="relative flex items-center justify-center w-4 h-4">
        <Sun className="absolute inset-0 w-4 h-4 transition-all duration-200 dark:opacity-0 dark:scale-0" />
        <Moon className="absolute inset-0 w-4 h-4 opacity-0 scale-0 transition-all duration-200 dark:opacity-100 dark:scale-100" />
      </span>

      {/* Text - vertical slide, no absolute on inline elements */}
      <span className="relative h-5 overflow-hidden">
        <span className="flex items-center h-5 transition-transform duration-200 dark:-translate-y-5">
          <span className="h-5 flex items-center">Dark Mode</span>
          <span className="h-5 flex items-center">Light Mode</span>
        </span>
      </span>
    </button>
  );
}