import api from './axios';
import { User, LoginInput, RegisterInput, AuthResponse } from '@/types/user';

export const register = async (data: RegisterInput): Promise<User> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data.data;
};

export const login = async (data: LoginInput): Promise<User> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<AuthResponse>('/auth/me');
  return response.data.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};