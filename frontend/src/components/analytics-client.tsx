'use client';

import { useEffect } from 'react';
import { useTaskStore } from '@/store/task-store';
import { useAuthStore } from '@/store/auth-store';
import { getTasks } from '@/lib/api';
import AnalyticsCharts from './analytics-charts';

export default function AnalyticsClient() {
  const { setTasks, isLoading, setLoading } = useTaskStore();
  const { isAuthenticated, isLoading: authLoading, loginModalOpen, setLoginModalOpen } = useAuthStore();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isAuthenticated, authLoading, setTasks, setLoading, setLoginModalOpen]);

  if (authLoading || isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded dark:bg-gray-800/50" />
          <div className="grid grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-xl dark:bg-gray-800/50" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !loginModalOpen) {
    return (
      <div className="p-8 flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Please sign in to view analytics</p>
          <button
            onClick={() => setLoginModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 dark:text-gray-100">Analytics</h1>
      <AnalyticsCharts />
    </div>
  );
}