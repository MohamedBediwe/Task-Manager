'use client';

import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { Task, TaskStatus } from '@/types/task';
import TaskCard from './task-card';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  dotColor: string;
}

const statusConfig: Record<TaskStatus, { title: string; dot: string }> = {
  todo: { title: 'To Do', dot: 'bg-amber-500' },
  'in-progress': { title: 'In Progress', dot: 'bg-blue-500' },
  done: { title: 'Done', dot: 'bg-emerald-500' },
};

export default function TaskColumn({ status, tasks }: TaskColumnProps) {
  const config = statusConfig[status];

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className="flex-shrink-0 w-80 flex flex-col">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.dot}`} />
          <h3 className="font-semibold text-gray-200">{config.title}</h3>
          <span className="text-xs text-gray-500 bg-gray-800/80 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-gray-500 hover:text-gray-300 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={`flex-1 bg-gray-900/50 rounded-xl border p-3 space-y-3 min-h-[200px] transition-colors ${isOver ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/5'}`}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-800/80 flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">No tasks yet</p>
            <p className="text-xs text-gray-600 mt-1">Drag tasks here or click + to add</p>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}