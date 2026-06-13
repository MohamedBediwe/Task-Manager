'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth-store';
import { login, register } from '@/lib/auth-api';

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, loginMode, setLoginMode, setUser } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!loginModalOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Email and password are required');
      return;
    }

    if (loginMode === 'register' && !formData.name) {
      toast.error('Name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const user =
        loginMode === 'login'
          ? await login({ email: formData.email, password: formData.password })
          : await register({
              email: formData.email,
              password: formData.password,
              name: formData.name,
            });

      setUser(user);
      setLoginModalOpen(false);
      toast.success(loginMode === 'login' ? 'Welcome back!' : 'Account created!');
      setFormData({ email: '', password: '', name: '' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setLoginMode(loginMode === 'login' ? 'register' : 'login');
    setFormData({ email: '', password: '', name: '' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 dark:bg-black/60">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-gray-900 dark:border-white/10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl dark:bg-gray-900 dark:border-white/10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {loginMode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button
            onClick={() => setLoginModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {loginMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5 dark:text-gray-400">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-500/50"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5 dark:text-gray-400">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5 dark:text-gray-400">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all dark:bg-gray-800/50 dark:border-white/10 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-500/50"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:disabled:bg-indigo-500/30"
          >
            {isSubmitting
              ? 'Please wait...'
              : loginMode === 'login'
              ? 'Sign In'
              : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {loginMode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-indigo-600 hover:text-indigo-700 font-medium dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-indigo-600 hover:text-indigo-700 font-medium dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}