import type { FC } from 'react';
import NewSkeleton from './ui/Skeleton';

export const SkeletonBase: FC<{ className?: string }> = ({ className }) => (
  <NewSkeleton variant="rect" className={className} />
);

export const ProfileCardSkeleton: FC = () => (
  <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
    <SkeletonBase className="h-6 w-32 mb-4" />
    <div className="flex flex-col items-center space-y-3">
      <SkeletonBase className="h-24 w-24 rounded-full" />
      <SkeletonBase className="h-6 w-48" />
      <SkeletonBase className="h-4 w-36" />
      <SkeletonBase className="h-12 w-full mt-2" />
    </div>
    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
      <div className="flex flex-col items-center space-y-1">
        <SkeletonBase className="h-5 w-8" />
        <SkeletonBase className="h-3 w-16" />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <SkeletonBase className="h-5 w-8" />
        <SkeletonBase className="h-3 w-16" />
      </div>
    </div>
  </div>
);

export const AISuggestionsSkeleton: FC = () => (
  <div className="space-y-4 py-2">
    <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 space-y-2">
      <div className="flex justify-between items-center">
        <SkeletonBase className="h-4 w-32" />
        <SkeletonBase className="h-4 w-12" />
      </div>
      <SkeletonBase className="h-10 w-full" />
    </div>
    <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 space-y-2">
      <div className="flex justify-between items-center">
        <SkeletonBase className="h-4 w-40" />
        <SkeletonBase className="h-4 w-12" />
      </div>
      <SkeletonBase className="h-12 w-full" />
    </div>
    <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 space-y-2">
      <div className="flex justify-between items-center">
        <SkeletonBase className="h-4 w-28" />
        <SkeletonBase className="h-4 w-12" />
      </div>
      <SkeletonBase className="h-8 w-full" />
    </div>
  </div>
);

export const ChartSkeleton: FC = () => (
  <div className="w-full space-y-4">
    <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
      <SkeletonBase className="h-6 w-48" />
      <div className="flex space-x-2">
        <SkeletonBase className="h-8 w-16" />
        <SkeletonBase className="h-8 w-24" />
        <SkeletonBase className="h-8 w-24" />
      </div>
    </div>
    <div className="flex items-center justify-center min-h-[300px]">
      <NewSkeleton variant="circle" className="h-[220px] w-[220px]" />
    </div>
  </div>
);

export default SkeletonBase;
export { SkeletonBase as LegacySkeleton };
