import React, { useEffect, useRef } from 'react';

interface SparklesCanvasProps {
  active: boolean;
  durationMs?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  spin: number;
  rotation: number;
  type: 'star' | 'circle' | 'spark';
}

export const SparklesCanvas: React.FC<SparklesCanvasProps> = ({ active, durationMs = 6000 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const startTime = Date.now();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      '#F3D18A', // Light Gold
      '#D7A65B', // Royal Gold
      '#FFD700', // Metallic Gold
      '#FFFFFF', // Bright White Sparkle
      '#FFA500', // Amber Flare
      '#E6B800'  // Warm Gold
    ];

    // Create explosions at multiple points
    const spawnExplosions = () => {
      const centers = [
        { x: canvas.width * 0.5, y: canvas.height * 0.4 },
        { x: canvas.width * 0.25, y: canvas.height * 0.5 },
        { x: canvas.width * 0.75, y: canvas.height * 0.5 },
        { x: canvas.width * 0.15, y: canvas.height * 0.3 },
        { x: canvas.width * 0.85, y: canvas.height * 0.3 }
      ];

      centers.forEach((c) => {
        for (let i = 0; i < 60; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 12 + 4;
          particles.push({
            x: c.x,
            y: c.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 6 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.015 + 0.008,
            spin: (Math.random() - 0.5) * 0.2,
            rotation: Math.random() * Math.PI,
            type: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'spark' : 'circle'
          });
        }
      });
    };

    spawnExplosions();

    // Continuous sparkles burst during active duration
    const spawnInterval = setInterval(() => {
      if (Date.now() - startTime < durationMs) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.7);
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 2;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.02 + 0.01,
            spin: (Math.random() - 0.5) * 0.2,
            rotation: Math.random() * Math.PI,
            type: Math.random() > 0.5 ? 'star' : 'spark'
          });
        }
      }
    }, 400);

    const drawStar = (x: number, y: number, size: number, color: string, alpha: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * size, -Math.sin((18 + i * 72) * Math.PI / 180) * size);
        ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (size / 2), -Math.sin((54 + i * 72) * Math.PI / 180) * (size / 2));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;
        p.rotation += p.spin;

        if (p.alpha <= 0) {
          particles.splice(idx, 1);
          return;
        }

        if (p.type === 'star') {
          drawStar(p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else if (p.type === 'spark') {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size / 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (particles.length > 0 || Date.now() - startTime < durationMs + 2000) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(spawnInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [active, durationMs]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};
