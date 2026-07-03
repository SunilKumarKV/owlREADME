import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from '@/components/ThemeProvider';
import Analytics from '@/components/Analytics';
import { Suspense } from 'react';
import { BRANDING } from "@/config/branding";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://owlreadme.com';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: BRANDING.seo.defaultTitle,
  description: BRANDING.seo.defaultDescription,
  keywords: BRANDING.seo.keywords,
  authors: [{ name: BRANDING.seo.author }],
  icons: {
    icon: BRANDING.assets.faviconSvg,
    shortcut: BRANDING.assets.faviconPng,
    apple: BRANDING.assets.appleTouchIcon,
  },
  openGraph: {
    title: BRANDING.openGraph.title,
    description: BRANDING.openGraph.description,
    type: "website",
    locale: BRANDING.openGraph.locale,
    siteName: BRANDING.openGraph.siteName,
    url: BRANDING.openGraph.url,
    images: [
      {
        url: BRANDING.openGraph.image.url,
        width: BRANDING.openGraph.image.width,
        height: BRANDING.openGraph.image.height,
        alt: BRANDING.openGraph.image.alt,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRANDING.openGraph.title,
    description: BRANDING.openGraph.description,
    images: [BRANDING.openGraph.image.url],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}

