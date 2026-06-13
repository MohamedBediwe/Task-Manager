import Sidebar from '@/components/sidebar';
import AnalyticsClient from '@/components/analytics-client';

export default function AnalyticsPage() {
  return (
    <>
      <Sidebar />
      <main className="lg:ml-60 min-h-screen bg-white pt-16 lg:pt-0 dark:bg-gray-950">
        <AnalyticsClient />
      </main>
    </>
  );
}