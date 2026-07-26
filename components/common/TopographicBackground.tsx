'use client';

import React, { useEffect, useRef } from 'react';

export const TopographicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const numLines = 45;
    let time = 0;

    const render = () => {
      time += 0.003; // Gentle ambient animation

      ctx.clearRect(0, 0, width, height);

      // Get current theme accent color from CSS custom property
      const computedStyle = getComputedStyle(document.documentElement);
      const accentColor = computedStyle.getPropertyValue('--accent-primary').trim() || '#0891B2';

      ctx.lineWidth = 1;

      // Render Static Topographic Contour Lines (No mouse tracking)
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numLines; i++) {
        const radiusBase = (i + 1) * 22;

        ctx.beginPath();
        const numPoints = 80;

        for (let j = 0; j <= numPoints; j++) {
          const angle = (j / numPoints) * Math.PI * 2;

          // Gentle static terrain waves
          const distortion1 = Math.sin(angle * 3 + time + i * 0.3) * 25;
          const distortion2 = Math.cos(angle * 5 - time * 0.8 + i * 0.2) * 15;
          const distortion3 = Math.sin(angle * 2 + time * 1.2) * 35;

          const r = radiusBase + distortion1 + distortion2 + distortion3;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();

        const opacity = Math.max(0.04, 0.22 - (i / numLines) * 0.18);
        ctx.strokeStyle = accentColor;
        ctx.globalAlpha = opacity;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-500"
    />
  );
};
