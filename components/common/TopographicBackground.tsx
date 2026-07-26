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

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Number of contour layers
    const numLines = 45;
    let time = 0;

    const render = () => {
      time += 0.005;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Get current theme accent color from CSS custom property
      const computedStyle = getComputedStyle(document.documentElement);
      const accentColor = computedStyle.getPropertyValue('--accent-primary').trim() || '#0891B2';

      ctx.lineWidth = 1;

      // Render Topographic Contour Lines
      for (let i = 0; i < numLines; i++) {
        const radiusBase = (i + 1) * 22;
        const scale = i * 0.08;

        ctx.beginPath();
        const numPoints = 80;

        for (let j = 0; j <= numPoints; j++) {
          const angle = (j / numPoints) * Math.PI * 2;

          // Organic Perlin-like mathematical terrain distortion
          const distortion1 = Math.sin(angle * 3 + time + i * 0.3) * 25;
          const distortion2 = Math.cos(angle * 5 - time * 0.8 + i * 0.2) * 15;
          const distortion3 = Math.sin(angle * 2 + time * 1.2) * 35;

          // Distance to interactive mouse cursor
          const cx = width / 2 + (mouseX - width / 2) * (0.1 + scale * 0.05);
          const cy = height / 2 + (mouseY - height / 2) * (0.1 + scale * 0.05);

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

        // Calculate opacity based on layer depth
        const opacity = Math.max(0.04, 0.25 - (i / numLines) * 0.2);
        ctx.strokeStyle = accentColor;
        ctx.globalAlpha = opacity;
        ctx.stroke();
      }

      // Cursor Interactive Elevation Radial Glow
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
      gradient.addColorStop(0, accentColor);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.08;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 300, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
