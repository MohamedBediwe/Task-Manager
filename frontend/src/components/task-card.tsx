'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { Task, TaskPriority, TaskCategory } from '@/types/task';
import { useTaskStore } from '@/store/task-store';

interface TaskCardProps {
  task: Task;
}

const priorityStyles: Record<TaskPriority, string> = {
  high: 'bg-red-500/15 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  low: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
};

const categoryBorder: Record<TaskCategory, string> = {
  Work: 'border-l-purple-500',
  Personal: 'border-l-blue-500',
  Learning: 'border-l-emerald-500',
  Health: 'border-l-rose-500',
};

const categoryBadge: Record<TaskCategory, string> = {
  Work: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  Personal: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  Learning: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  Health: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

export default function TaskCard({ task }: TaskCardProps) {
  const { setEditingTask, setModalOpen, deleteTask } = useTaskStore();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
      }
    : undefined;

  const handleEdit = () => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task._id);
    }
  };

  const dueDateText = task.dueDate
    ? format(new Date(task.dueDate), 'MMM d')
    : 'No date';

  const dueDateColor =
    task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate))
      ? 'text-red-400'
      : task.dueDate && isToday(new Date(task.dueDate))
      ? 'text-amber-400'
      : 'text-gray-500';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-gray-800/50 border border-white/10 rounded-xl p-4 hover:bg-gray-800 hover:border-white/20 hover:shadow-lg hover:shadow-black/20 transition-all ${categoryBorder[task.category]} border-l-4 ${isDragging ? 'opacity-50 rotate-2' : ''}`}
    >
      {/* Top Row: Category + Priority */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryBadge[task.category]}`}>
          {task.category}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-medium text-gray-100 mb-1 line-clamp-2">{task.title}</h4>

      {/* Description */}
      <p className="text-sm text-gray-400 line-clamp-2 mb-3">{task.description}</p>

      {/* Footer: Due Date + Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className={`flex items-center gap-1.5 text-xs ${dueDateColor}`}>
          <Calendar className="w-3.5 h-3.5" />
          <span>{dueDateText}</span>
        </div>
        <div className="flex gap-1" onPointerDown={(e) => e.stopPropagation()}>
          <button
            onClick={handleEdit}
            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}