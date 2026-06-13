import { SkeletonStat, SkeletonColumn } from '@/components/skeleton';

export default function Loading() {
  return (
    <div className="ml-60 min-h-screen bg-white p-8 dark:bg-gray-950">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 max-w-md h-10 bg-white border border-gray-200 rounded-lg animate-pulse dark:bg-gray-800/50 dark:border-white/10" />
        <div className="h-10 w-32 bg-white border border-gray-200 rounded-lg animate-pulse dark:bg-gray-800/50 dark:border-white/10" />
        <div className="h-10 w-32 bg-white border border-gray-200 rounded-lg animate-pulse dark:bg-gray-800/50 dark:border-white/10" />
        <div className="h-10 w-32 bg-white border border-gray-200 rounded-lg animate-pulse dark:bg-gray-800/50 dark:border-white/10" />
        <div className="ml-auto h-10 w-28 bg-indigo-100 rounded-lg animate-pulse dark:bg-indigo-500/20" />
      </div>

      <div className="flex gap-6 h-[calc(100vh-12rem)]">
        <SkeletonColumn />
        <SkeletonColumn />
        <SkeletonColumn />
      </div>
    </div>
  );
}