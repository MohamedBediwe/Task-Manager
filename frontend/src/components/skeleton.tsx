export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse dark:bg-gray-800/50 dark:border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="h-5 w-16 bg-gray-200 rounded-full dark:bg-gray-700" />
        <div className="h-5 w-14 bg-gray-200 rounded-full dark:bg-gray-700" />
      </div>
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-1 dark:bg-gray-700" />
      <div className="h-3 w-full bg-gray-200 rounded mb-3 dark:bg-gray-700" />
      <div className="h-3 w-2/3 bg-gray-200 rounded dark:bg-gray-700" />
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3 dark:border-white/5">
        <div className="h-3 w-20 bg-gray-200 rounded dark:bg-gray-700" />
        <div className="flex gap-1">
          <div className="h-6 w-6 bg-gray-200 rounded dark:bg-gray-700" />
          <div className="h-6 w-6 bg-gray-200 rounded dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse dark:bg-gray-800/50 dark:border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-24 bg-gray-200 rounded dark:bg-gray-700" />
        <div className="h-8 w-8 bg-gray-200 rounded-lg dark:bg-gray-700" />
      </div>
      <div className="h-8 w-12 bg-gray-200 rounded mb-1 dark:bg-gray-700" />
      <div className="h-3 w-16 bg-gray-200 rounded dark:bg-gray-700" />
    </div>
  );
}

export function SkeletonColumn() {
  return (
    <div className="flex-shrink-0 w-80 flex flex-col">
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className="h-2 w-2 bg-gray-300 rounded-full dark:bg-gray-700" />
        <div className="h-5 w-20 bg-gray-200 rounded dark:bg-gray-700" />
        <div className="h-4 w-6 bg-gray-200 rounded-full dark:bg-gray-700" />
      </div>
      <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-3 space-y-3 min-h-[200px] dark:bg-gray-900/50 dark:border-white/5">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}