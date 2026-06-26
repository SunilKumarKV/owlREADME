import React, { Suspense } from 'react';
import DeveloperAnalyticsPage from '@/features/analytics/DeveloperAnalyticsPage';

const Analytics: React.FC = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-[#1e1e1e] text-black dark:text-white font-semibold">Loading Analytics...</div>}>
      <DeveloperAnalyticsPage />
    </Suspense>
  );
};

export default Analytics;
