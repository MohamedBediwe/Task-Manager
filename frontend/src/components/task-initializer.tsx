'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { useTaskStore } from '@/store/task-store';

interface TaskInitializerProps {
  initialTasks: Task[];
}

export default function TaskInitializer({ initialTasks }: TaskInitializerProps) {
  useState(() => {
    // Lazy initializer runs once on mount — no refs, no effects
    const currentTasks = useTaskStore.getState().tasks;
    if (currentTasks.length === 0 && initialTasks.length > 0) {
      useTaskStore.setState({ tasks: initialTasks });
      useTaskStore.getState().applyFilters();
    }
    return null;
  });

  return null;
}