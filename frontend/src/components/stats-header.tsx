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
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
    },
    {
      label: 'To Do',
      value: todo,
      icon: Clock,
      subtext: 'Pending',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Loader2,
      subtext: 'Active',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Done',
      value: done,
      icon: CheckCircle2,
      subtext: 'Completed',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gray-800/50 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">{stat.label}</span>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-100">{stat.value}</div>
          <div className="text-xs text-gray-500 mt-1">{stat.subtext}</div>
        </div>
      ))}
    </div>
  );
}