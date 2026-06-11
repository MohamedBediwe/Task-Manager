'use client';

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { toast } from 'sonner';
import { TaskStatus } from '@/types/task';
import { useTaskStore } from '@/store/task-store';
import { updateTask } from '@/lib/api';
import TaskColumn from './task-column';

const columns: { status: TaskStatus; dotColor: string }[] = [
  { status: 'todo', dotColor: 'bg-amber-500' },
  { status: 'in-progress', dotColor: 'bg-blue-500' },
  { status: 'done', dotColor: 'bg-emerald-500' },
];

export default function TaskBoard() {
  const filteredTasks = useTaskStore((state) => state.filteredTasks);
  const tasks = useTaskStore((state) => state.tasks);
  const updateStoreTask = useTaskStore((state) => state.updateTask);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const tasksByStatus = (status: TaskStatus) =>
    filteredTasks.filter((t) => t.status === status);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    const task = tasks.find((t) => t._id === taskId);
    if (!task || task.status === newStatus) return;

    // Optimistic update
    updateStoreTask(taskId, { status: newStatus });

    try {
      await updateTask(taskId, { status: newStatus });
      toast.success(`Task moved to ${newStatus.replace('-', ' ')}`);
    } catch (error) {
      // Rollback on error
      updateStoreTask(taskId, { status: task.status });
      toast.error(error instanceof Error ? error.message : 'Failed to move task');
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-[calc(100vh-12rem)] overflow-x-auto pb-4">
        {columns.map((col) => (
          <TaskColumn
            key={col.status}
            title=""
            status={col.status}
            tasks={tasksByStatus(col.status)}
            dotColor={col.dotColor}
          />
        ))}
      </div>
    </DndContext>
  );
}