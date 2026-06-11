import api from './axios';
import { Task, CreateTaskInput, UpdateTaskInput, ApiResponse } from '@/types/task';

export const getTasks = async (filters?: {
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
}): Promise<Task[]> => {
  const params = new URLSearchParams();
  if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
  if (filters?.priority && filters.priority !== 'all') params.append('priority', filters.priority);
  if (filters?.category && filters.category !== 'all') params.append('category', filters.category);
  if (filters?.search) params.append('search', filters.search);

  const response = await api.get<ApiResponse<Task[]>>(`/tasks?${params.toString()}`);
  return response.data.data;
};

export const getTask = async (id: string): Promise<Task> => {
  const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
  return response.data.data;
};

export const createTask = async (data: CreateTaskInput): Promise<Task> => {
  const response = await api.post<ApiResponse<Task>>('/tasks', data);
  return response.data.data;
};

export const updateTask = async (id: string, data: UpdateTaskInput): Promise<Task> => {
  const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, data);
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};