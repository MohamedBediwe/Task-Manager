'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTaskStore } from '@/store/task-store';

const STATUS_COLORS = {
  todo: '#f59e0b',
  'in-progress': '#3b82f6',
  done: '#10b981',
};

const CATEGORY_COLORS = {
  Work: '#8b5cf6',
  Personal: '#3b82f6',
  Learning: '#10b981',
  Health: '#f43f5e',
};

const PRIORITY_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

export default function AnalyticsCharts() {
  const tasks = useTaskStore((state) => state.tasks);

  const statusData = [
    { name: 'To Do', value: tasks.filter((t) => t.status === 'todo').length, color: STATUS_COLORS.todo },
    { name: 'In Progress', value: tasks.filter((t) => t.status === 'in-progress').length, color: STATUS_COLORS['in-progress'] },
    { name: 'Done', value: tasks.filter((t) => t.status === 'done').length, color: STATUS_COLORS.done },
  ];

  const categoryData = Object.entries(
    tasks.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS] || '#6b7280' }));

  const priorityData = Object.entries(
    tasks.reduce((acc, t) => {
      acc[t.priority] = (acc[t.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value, color: PRIORITY_COLORS[name as keyof typeof PRIORITY_COLORS] || '#6b7280' }));

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'done').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const overdue = tasks.filter((t) => {
    if (!t.dueDate || t.status === 'done') return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <SummaryCard label="Total Tasks" value={total} color="bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400" />
        <SummaryCard label="Completed" value={completed} color="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" />
        <SummaryCard label="Completion Rate" value={`${completionRate}%`} color="bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" />
        <SummaryCard label="Overdue" value={overdue} color="bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Status Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 dark:bg-gray-800/50 dark:border-white/10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Tasks by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#f3f4f6',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 dark:bg-gray-800/50 dark:border-white/10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Tasks by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
              <YAxis tick={{ fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#f3f4f6',
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 dark:bg-gray-800/50 dark:border-white/10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
              <YAxis tick={{ fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#f3f4f6',
                }}
              />
              <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 dark:bg-gray-800/50 dark:border-white/10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Recent Tasks</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {tasks
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 10)
              .map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/5"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{task.category} • {task.priority}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      task.status === 'done'
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/20'
                        : task.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/20'
                        : 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/20'
                    }`}
                  >
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
            {tasks.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8 dark:text-gray-400">No tasks yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className={`rounded-xl p-5 ${color}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}