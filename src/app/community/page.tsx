import React from 'react';
import CommunityPage from '@/features/community-templates/CommunityPage';
import { Metadata } from 'next';
import { BRANDING } from '@/config/branding';

export const metadata: Metadata = {
  title: `Community Templates - ${BRANDING.name}`,
  description: 'Explore popular, trending, and featured README templates shared by the community.',
};

export default function CommunityRoute() {
  return <CommunityPage />;
}
