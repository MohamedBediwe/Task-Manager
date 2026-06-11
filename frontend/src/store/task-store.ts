import { create } from 'zustand';
import { Task, CreateTaskInput, UpdateTaskInput, FilterState } from '@/types/task';

interface TaskStore {
  tasks: Task[];
  filteredTasks: Task[];
  isLoading: boolean;
  error: string | null;
  filters: FilterState;
  modalOpen: boolean;
  editingTask: Task | null;

  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setModalOpen: (open: boolean) => void;
  setEditingTask: (task: Task | null) => void;
  applyFilters: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filteredTasks: [],
  isLoading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all',
  },
  modalOpen: false,
  editingTask: null,

  setTasks: (tasks) => {
    set({ tasks });
    get().applyFilters();
  },

  addTask: (task) => {
    const newTasks = [task, ...get().tasks];
    set({ tasks: newTasks });
    get().applyFilters();
  },

  updateTask: (id, data) => {
    const newTasks = get().tasks.map((t) =>
      t._id === id ? { ...t, ...data } : t
    );
    set({ tasks: newTasks });
    get().applyFilters();
  },

  deleteTask: (id) => {
    const newTasks = get().tasks.filter((t) => t._id !== id);
    set({ tasks: newTasks });
    get().applyFilters();
  },

  setFilters: (filters) => {
    set((state) => ({ filters: { ...state.filters, ...filters } }));
    get().applyFilters();
  },

  setModalOpen: (open) => set({ modalOpen: open }),
  setEditingTask: (task) => set({ editingTask: task }),

  applyFilters: () => {
    const { tasks, filters } = get();
    let result = [...tasks];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(search) ||
          (t.description?.toLowerCase().includes(search) ?? false)
      );
    }

    if (filters.status !== 'all') {
      result = result.filter((t) => t.status === filters.status);
    }

    if (filters.priority !== 'all') {
      result = result.filter((t) => t.priority === filters.priority);
    }

    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }

    set({ filteredTasks: result });
  },
}));