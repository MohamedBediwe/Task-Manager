'use client';

import { CheckSquare, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { useTaskStore } from '@/store/task-store';

export default function StatsHeader() {
  const tasks = useTaskStore((state) => state.tasks);

  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const done = tasks.filter((t) => t.status === 'done').length;

  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: CheckSquare,
      subtext: 'All tasks',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-100 dark:bg-indigo-500/10',
      border: 'border-indigo-200 dark:border-indigo-500/20',
    },
    {
      label: 'To Do',
      value: todo,
      icon: Clock,
      subtext: 'Pending',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-500/10',
      border: 'border-amber-200 dark:border-amber-500/20',
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Loader2,
      subtext: 'Active',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-500/10',
      border: 'border-blue-200 dark:border-blue-500/20',
    },
    {
      label: 'Done',
      value: done,
      icon: CheckCircle2,
      subtext: 'Completed',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-500/10',
      border: 'border-emerald-200 dark:border-emerald-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-white border rounded-xl p-4 lg:p-5 hover:border-gray-300 transition-colors dark:bg-gray-800/50 dark:border-white/10 dark:hover:border-white/20 ${stat.border}`}
        >
          <div className="flex items-center justify-between mb-2 lg:mb-3">
            <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
            <div className={`p-1.5 lg:p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${stat.color}`} />
            </div>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
          <div className="text-xs text-gray-500 mt-1 dark:text-gray-500">{stat.subtext}</div>
        </div>
      ))}
    </div>
  );
}