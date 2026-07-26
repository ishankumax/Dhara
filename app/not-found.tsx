import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 text-[var(--text-primary)] font-serif">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-primary)] flex items-center justify-center text-[var(--accent-primary)] mx-auto mb-4">
          <Compass className="w-6 h-6 animate-spin-slow" />
        </div>
        <h2 className="font-bold text-xl mb-1">404 — Page Not Found</h2>
        <p className="text-xs text-[var(--text-secondary)] font-mono mb-6">
          The requested intelligence route or country profile does not exist in the active index.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--accent-primary)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dhara Core</span>
        </Link>
      </div>
    </div>
  );
}
