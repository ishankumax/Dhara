'use client';

import { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 text-[var(--text-primary)]">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-primary)] flex items-center justify-center text-[var(--accent-primary)] mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="font-serif font-bold text-lg mb-2">Dhara Engine Error</h2>
        <p className="text-xs text-[var(--text-secondary)] font-mono mb-4">
          {error.message || 'An unexpected error occurred while loading intelligence metrics.'}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--accent-primary)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Intelligence Engine</span>
        </button>
      </div>
    </div>
  );
}
