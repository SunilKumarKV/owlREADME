import { Suspense } from 'react';
import ShowcaseGalleryPage from '@/features/showcase/ShowcaseGalleryPage';

export const metadata = {
  title: 'Showcase Gallery | OwlRoadmap',
  description: 'Browse, inspect, and duplicate stunning developer profile README configurations and visual layouts.',
};

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <svg className="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-xs font-semibold">Loading Showcase Gallery...</span>
        </div>
      </div>
    }>
      <ShowcaseGalleryPage />
    </Suspense>
  );
}
