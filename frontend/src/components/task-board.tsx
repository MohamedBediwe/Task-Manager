'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { toast } from 'sonner';
import { TaskStatus } from '@/types/task';
import { useTaskStore } from '@/store/task-store';
import { updateTask } from '@/lib/api';
import TaskCard from './task-card';
import TaskColumn from './task-column';

const columns: { status: TaskStatus; title: string; dotColor: string }[] = [
  { status: 'todo', title: 'To Do', dotColor: 'bg-amber-500' },
  { status: 'in-progress', title: 'In Progress', dotColor: 'bg-blue-500' },
  { status: 'done', title: 'Done', dotColor: 'bg-emerald-500' },
];

export default function TaskBoard() {
  const filteredTasks = useTaskStore((state) => state.filteredTasks);
  const tasks = useTaskStore((state) => state.tasks);
  const updateStoreTask = useTaskStore((state) => state.updateTask);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const tasksByStatus = (status: TaskStatus) =>
    filteredTasks.filter((t) => t.status === status);

  const activeTask = activeId ? tasks.find((t) => t._id === activeId) : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    const task = tasks.find((t) => t._id === taskId);
    if (!task || task.status === newStatus) return;

    updateStoreTask(taskId, { status: newStatus });

    try {
      await updateTask(taskId, { status: newStatus });
      toast.success(`Task moved to ${newStatus.replace('-', ' ')}`);
    } catch (error) {
      updateStoreTask(taskId, { status: task.status });
      toast.error(error instanceof Error ? error.message : 'Failed to move task');
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 lg:gap-6 h-[calc(100vh-16rem)] lg:h-[calc(100vh-12rem)] overflow-x-auto pb-4 -mx-2 px-2">
        {columns.map((col) => (
          <TaskColumn
            key={col.status}
            status={col.status}
            title={col.title}
            tasks={tasksByStatus(col.status)}
            dotColor={col.dotColor}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <div className="w-72 sm:w-80">
            <TaskCard task={activeTask} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}