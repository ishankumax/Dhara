import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dhara | Global Geopolitical & Strategic Intelligence Platform',
  description: 'Explore, understand, and compare global geopolitical landscapes, military capabilities, historical timelines, and strategic alliances.',
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
      </body>
    </html>
  );
}
