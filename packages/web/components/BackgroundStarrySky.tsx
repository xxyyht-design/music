import React, { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import settings from '../states/settings';

const BackgroundStarrySky: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snap = useSnapshot(settings);

  useEffect(() => {
    if (!snap.enableStarrySky) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    const initStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      const starCount = 200;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.2 + 0.05,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 不再在 Canvas 内部画黑色背景，让 CSS 的 linear-gradient 作为底色
      // 这样亮度调节可以交给前景的 mask 层去处理
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    initStars();
    draw();

    const handleResize = () => {
      initStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [snap.glassBrightness, snap.enableStarrySky]);

  if (!snap.enableStarrySky) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'linear-gradient(112deg, #020606 0%, #050607 42%, #000 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      {/* 晚清二创：全局环境滤镜层 (The Global Veil) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 22% 8%, rgba(255, 255, 255, var(--glass-veil, 0.08)), transparent 34%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.16))
          `,
          backdropFilter: `
            blur(var(--glass-blur, 32px)) 
            saturate(var(--glass-saturate, 180%)) 
            brightness(var(--glass-brightness, 100%))
          `,
          WebkitBackdropFilter: `
            blur(var(--glass-blur, 32px)) 
            saturate(var(--glass-saturate, 180%)) 
            brightness(var(--glass-brightness, 100%))
          `,
        }}
      />
    </div>
  );
};

export default BackgroundStarrySky;
