'use client';

import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { Task, TaskStatus } from '@/types/task';
import TaskCard from './task-card';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  title: string;
  dotColor: string;
}

export default function TaskColumn({ status, tasks, title, dotColor }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className="flex-shrink-0 w-72 sm:w-80 flex flex-col">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${dotColor}`} />
          <h3 className="font-semibold text-gray-800 text-sm lg:text-base dark:text-gray-200">{title}</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full dark:bg-gray-800/80 dark:text-gray-500">
            {tasks.length}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-500 dark:hover:text-gray-300">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 bg-gray-50 rounded-xl border p-3 space-y-3 min-h-[200px] transition-colors dark:bg-gray-900/50 ${isOver ? 'border-indigo-400 bg-indigo-50/50 dark:border-indigo-500/50 dark:bg-indigo-500/5' : 'border-gray-200 dark:border-white/5'}`}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 dark:bg-gray-800/80">
              <Plus className="w-6 h-6 text-gray-400 dark:text-gray-600" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">No tasks yet</p>
            <p className="text-xs text-gray-400 mt-1 dark:text-gray-600">Drag tasks here or click + to add</p>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}