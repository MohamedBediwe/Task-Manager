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
    <div className="flex items-center gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          placeholder="Search tasks..."
          className="w-full bg-gray-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
        />
      </div>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => setFilters({ status: e.target.value as TaskStatus | 'all' })}
        className="bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50"
      >
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {/* Priority Filter */}
      <select
        value={filters.priority}
        onChange={(e) => setFilters({ priority: e.target.value as TaskPriority | 'all' })}
        className="bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50"
      >
        <option value="all">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* Category Filter */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value as TaskCategory | 'all' })}
        className="bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50"
      >
        <option value="all">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Learning">Learning</option>
        <option value="Health">Health</option>
      </select>

      {/* New Task Button */}
      <button
        onClick={handleNewTask}
        className="ml-auto bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        New Task
      </button>
    </div>
  );
}