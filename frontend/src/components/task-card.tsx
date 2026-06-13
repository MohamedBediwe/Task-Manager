'use client';

import { useDraggable } from '@dnd-kit/core';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { Task, TaskPriority, TaskCategory } from '@/types/task';
import { useTaskStore } from '@/store/task-store';
import { deleteTask as deleteTaskApi } from '@/lib/api';
import { toast } from 'sonner';

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

const priorityStyles: Record<TaskPriority, string> = {
  high: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/20',
  medium: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/20',
  low: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/20',
};

const categoryBorder: Record<TaskCategory, string> = {
  Work: 'border-l-purple-500',
  Personal: 'border-l-blue-500',
  Learning: 'border-l-emerald-500',
  Health: 'border-l-rose-500',
};

const categoryBadge: Record<TaskCategory, string> = {
  Work: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-400 dark:border-purple-500/20',
  Personal: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/20',
  Learning: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/20',
  Health: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/20',
};

export default function TaskCard({ task, isOverlay = false }: TaskCardProps) {
  const { setEditingTask, setModalOpen, deleteTask } = useTaskStore();

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task._id,
    disabled: isOverlay,
  });

  const handleEdit = () => {
    if (isOverlay) return;
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (isOverlay) return;
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTaskApi(task._id);
        deleteTask(task._id);
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to delete task');
      }
    }
  };

  const dueDateText = task.dueDate
    ? format(new Date(task.dueDate), 'MMM d')
    : 'No date';

  const dueDateColor =
    task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate))
      ? 'text-red-600 dark:text-red-400'
      : task.dueDate && isToday(new Date(task.dueDate))
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-gray-500 dark:text-gray-500';

  return (
    <div
      ref={setNodeRef}
      {...(!isOverlay ? listeners : {})}
      {...(!isOverlay ? attributes : {})}
      className={`bg-white border border-gray-200 rounded-xl p-4 transition-all dark:bg-gray-800/50 dark:border-white/10 ${categoryBorder[task.category]} border-l-4 
        ${isOverlay 
          ? 'shadow-2xl scale-[1.02] cursor-grabbing pointer-events-none' 
          : 'hover:bg-gray-50 hover:border-gray-300 hover:shadow-md cursor-grab active:cursor-grabbing dark:hover:bg-gray-800 dark:hover:border-white/20 dark:hover:shadow-lg dark:hover:shadow-black/20'
        }
        ${!isOverlay && isDragging ? 'opacity-30' : 'opacity-100'}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryBadge[task.category]}`}>
          {task.category}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <h4 className="font-medium text-gray-900 mb-1 line-clamp-2 dark:text-gray-100">{task.title}</h4>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3 dark:text-gray-400">{task.description}</p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
        <div className={`flex items-center gap-1.5 text-xs ${dueDateColor}`}>
          <Calendar className="w-3.5 h-3.5" />
          <span>{dueDateText}</span>
        </div>
        <div className="flex gap-1" onPointerDown={(e) => e.stopPropagation()}>
          <button
            onClick={handleEdit}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors dark:hover:bg-white/5 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors dark:hover:bg-red-500/10 dark:text-gray-500 dark:hover:text-red-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}