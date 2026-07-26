import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DharaPod | Global Geopolitical & Strategic Intelligence Platform',
  description: 'Explore, understand, and analyze global geopolitical landscapes, military capabilities, historical timelines, and strategic alliances with DharaPod.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" data-accent="amber">
      <body className="antialiased min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
