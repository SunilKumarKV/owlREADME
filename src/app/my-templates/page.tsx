import React from 'react';
import MyTemplatesPage from '@/features/community-templates/MyTemplatesPage';
import { Metadata } from 'next';
import { BRANDING } from '@/config/branding';

export const metadata: Metadata = {
  title: `My Templates - ${BRANDING.name}`,
  description: 'Manage, edit, duplicate, and export your custom-designed README templates.',
};

export default function MyTemplatesRoute() {
  return <MyTemplatesPage />;
}
