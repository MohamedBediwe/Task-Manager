'use client';

import { useEffect } from 'react';
import { useTaskStore } from '@/store/task-store';
import { useAuthStore } from '@/store/auth-store';
import { getTasks } from '@/lib/api';
import StatsHeader from './stats-header';
import FilterBar from './filter-bar';
import TaskBoard from './task-board';
import TaskForm from './task-form';

export default function DashboardClient() {
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
        // If unauthorized, modal will show via auth store
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
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-xl dark:bg-gray-800/50" />
            ))}
          </div>
          <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-800/50" />
          <div className="h-96 bg-gray-200 rounded-xl dark:bg-gray-800/50" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !loginModalOpen) {
    return (
      <div className="p-8 flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Please sign in to view your tasks</p>
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
      <StatsHeader />
      <FilterBar />
      <TaskBoard />
      <TaskForm />
    </div>
  );
}