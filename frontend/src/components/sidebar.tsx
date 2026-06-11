import { getTasks } from '@/lib/api';
import Sidebar from '@/components/sidebar';
import StatsHeader from '@/components/stats-header';
import FilterBar from '@/components/filter-bar';
import TaskBoard from '@/components/task-board';
import TaskForm from '@/components/task-form';
import TaskInitializer from '@/components/task-initializer';

export default async function HomePage() {
  const tasks = await getTasks();

  return (
    <>
      <TaskInitializer initialTasks={tasks} />
      <Sidebar />
      <main className="ml-60 min-h-screen bg-gray-950">
        <div className="p-8">
          <StatsHeader />
          <FilterBar />
          <TaskBoard />
        </div>
      </main>
      <TaskForm />
    </>
  );
}