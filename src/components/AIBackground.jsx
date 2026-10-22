import React, { useEffect, useRef } from 'react';
import '../styles/AIBackground.css';

/**
 * Fond animé discret : un réseau de neurones (nœuds reliés quand ils sont proches)
 * qui dérive lentement. Désactivé si l'utilisateur préfère réduire les animations.
 */
const AIBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes = [];
    let frame = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = ['37, 99, 235', '124, 58, 237', '6, 182, 212'];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Densité adaptée à la taille d'écran (moins de nœuds sur mobile)
      const count = Math.round(Math.min(70, Math.max(22, (width * height) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1.2,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const maxDist = () => (width < 640 ? 110 : 150);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const md = maxDist();

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < md) {
            ctx.strokeStyle = `rgba(${a.c}, ${0.14 * (1 - d / md)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.fillStyle = `rgba(${n.c}, 0.45)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const step = () => {
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      });
      draw();
      frame = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (frame === null && !reduceMotion) frame = window.requestAnimationFrame(step);
    };
    const stop = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
    };

    const onResize = () => {
      init();
      draw();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    init();
    draw();
    start();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="ai-background" aria-hidden="true">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-grid" />
      <canvas ref={canvasRef} className="bg-network" />
    </div>
  );
};

export default AIBackground;
