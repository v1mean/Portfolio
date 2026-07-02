import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 55;
const COLORS = ['168,85,247', '6,182,212', '124,58,237'];

function createParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.4,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.45 + 0.08,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    // pulse
    alphaDelta: (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
    alphaMin: 0.05,
    alphaMax: 0.55,
  };
}

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(w, h));
    window.addEventListener('resize', resize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        // Pulse alpha
        p.alpha += p.alphaDelta;
        if (p.alpha > p.alphaMax || p.alpha < p.alphaMin) p.alphaDelta *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      aria-hidden="true"
    />
  );
}
