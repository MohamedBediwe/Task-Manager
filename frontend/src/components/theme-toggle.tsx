'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch — render identical placeholder on server and client initial paint
  if (!mounted) {
    return (
      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">
        <div className="w-4 h-4" />
        <span className="text-sm">...</span>
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => {
        setTheme(isDark ? 'light' : 'dark');
      }}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-200 transition-colors text-sm"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}