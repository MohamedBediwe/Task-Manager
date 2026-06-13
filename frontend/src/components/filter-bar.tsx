'use client';

import { Search, Plus } from 'lucide-react';
import { useTaskStore } from '@/store/task-store';
import { TaskStatus, TaskPriority, TaskCategory } from '@/types/task';

export default function FilterBar() {
  const { filters, setFilters, setModalOpen, setEditingTask } = useTaskStore();

  const handleNewTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 mb-6">
      <div className="relative w-full lg:flex-1 lg:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          placeholder="Search tasks..."
          className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-500/50"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as TaskStatus | 'all' })}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-300 dark:focus:border-indigo-500/50"
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value as TaskPriority | 'all' })}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-300 dark:focus:border-indigo-500/50"
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value as TaskCategory | 'all' })}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-300 dark:focus:border-indigo-500/50"
        >
          <option value="all">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Learning">Learning</option>
          <option value="Health">Health</option>
        </select>

        <button
          onClick={handleNewTask}
          className="ml-auto lg:ml-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>
    </div>
  );
}