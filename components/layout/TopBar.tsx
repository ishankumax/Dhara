'use client';

import React from 'react';
import { Shield } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-secondary)]/90 border-b border-[var(--border-color)] px-4 lg:px-8 py-1.5 backdrop-blur-2xl flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] tracking-wider">
      <div className="flex items-center space-x-2">
        <Shield className="w-3.5 h-3.5 text-[var(--accent-primary)] animate-pulse" />
        <span className="font-bold text-[var(--text-primary)] uppercase tracking-widest">
          DHARAPOD PLATFORM TOP BAR
        </span>
      </div>
      <div className="hidden sm:block text-[var(--text-secondary)] uppercase">
        SYSTEM STATUS: ONLINE • ALL INTEL ENGINES OPERATIONAL
      </div>
      <div className="font-bold text-[var(--accent-primary)] uppercase">
        [ CONTENT TO BE DECIDED ]
      </div>
    </div>
  );
};
