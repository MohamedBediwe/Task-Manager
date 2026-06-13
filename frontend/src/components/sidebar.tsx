'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Plus,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './theme-toggle';
import { useTaskStore } from '@/store/task-store';
import { useAuthStore } from '@/store/auth-store';
import { logout } from '@/lib/auth-api';
import { toast } from 'sonner';

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setModalOpen, setEditingTask } = useTaskStore();
  const { user, isAuthenticated, logout: logoutStore } = useAuthStore();
  const pathname = usePathname();

  const handleNewProject = () => {
    setEditingTask(null);
    setModalOpen(true);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      logoutStore();
      toast.success('Logged out successfully');
    } catch {
      logoutStore();
    }
  };

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', href: '/analytics' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '#' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-4 z-50 lg:hidden dark:bg-gray-900 dark:border-white/10">
        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">TaskFlow</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-gray-200 text-gray-600 dark:hover:bg-white/10 dark:text-gray-300"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-gray-100 border-r border-gray-200 flex flex-col z-40 transition-transform duration-200 lg:translate-x-0 dark:bg-gray-900 dark:border-white/10 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-200 flex-shrink-0 dark:border-white/10">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">TaskFlow</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                pathname === item.href
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-400 dark:border-indigo-500/20'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-4 pb-4 flex-shrink-0">
          <button
            onClick={handleNewProject}
            className="w-full flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium dark:bg-indigo-500/15 dark:text-indigo-400 dark:border-indigo-500/20 dark:hover:bg-indigo-500/25"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        <div className="p-4 border-t border-gray-200 space-y-3 flex-shrink-0 dark:border-white/10">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-500/20">
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">G</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Guest</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}