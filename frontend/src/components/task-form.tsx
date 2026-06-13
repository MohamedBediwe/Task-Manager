'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useTaskStore } from '@/store/task-store';
import { createTask, updateTask } from '@/lib/api';
import { Task, CreateTaskInput, UpdateTaskInput, TaskStatus, TaskPriority, TaskCategory } from '@/types/task';

export default function TaskForm() {
  const { modalOpen, setModalOpen, editingTask, addTask, updateTask: updateStoreTask } = useTaskStore();

  const [formData, setFormData] = useState<CreateTaskInput>({
    title: '',
    description: '',
    category: 'Work',
    priority: 'medium',
    status: 'todo',
    dueDate: null,
  });

  useEffect(() => {
    if (modalOpen) {
      if (editingTask) {
        setFormData({
          title: editingTask.title,
          description: editingTask.description || '',
          category: editingTask.category,
          priority: editingTask.priority,
          status: editingTask.status,
          dueDate: editingTask.dueDate,
        });
      } else {
        setFormData({
          title: '',
          description: '',
          category: 'Work',
          priority: 'medium',
          status: 'todo',
          dueDate: null,
        });
      }
    }
  }, [editingTask, modalOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!modalOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'dueDate' ? (value || null) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formData.category) {
      toast.error('Category is required');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingTask) {
        const updateData: UpdateTaskInput = {};
        if (formData.title !== editingTask.title) updateData.title = formData.title;
        if (formData.description !== (editingTask.description || '')) updateData.description = formData.description;
        if (formData.category !== editingTask.category) updateData.category = formData.category;
        if (formData.priority !== editingTask.priority) updateData.priority = formData.priority;
        if (formData.status !== editingTask.status) updateData.status = formData.status as TaskStatus;
        if (formData.dueDate !== editingTask.dueDate) updateData.dueDate = formData.dueDate;

        const updated = await updateTask(editingTask._id, updateData);
        updateStoreTask(editingTask._id, updated);
        toast.success('Task updated successfully');
      } else {
        const created = await createTask(formData);
        addTask(created);
        toast.success('Task created successfully');
      }

      setModalOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 dark:bg-black/60">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-gray-900 dark:border-white/10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl dark:bg-gray-900 dark:border-white/10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {editingTask ? 'Edit Task' : 'Create Task'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5 dark:text-gray-400">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5 dark:text-gray-400">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter task description"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 resize-none transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5 dark:text-gray-400">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-300 dark:focus:border-indigo-500/50"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Learning">Learning</option>
                <option value="Health">Health</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5 dark:text-gray-400">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-300 dark:focus:border-indigo-500/50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {editingTask && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5 dark:text-gray-400">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-300 dark:focus:border-indigo-500/50"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5 dark:text-gray-400">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate || ''}
              onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-300 dark:focus:border-indigo-500/50"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 sticky bottom-0 bg-white pb-2 dark:bg-gray-900">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:disabled:bg-indigo-500/30"
            >
              {isSubmitting ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}