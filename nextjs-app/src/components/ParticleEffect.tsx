'use client';

import { useEffect, useRef } from 'react';

export default function ParticleEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = [
      'rgba(110, 45, 163, 0.4)',
      'rgba(45, 122, 45, 0.4)',
      'rgba(168, 137, 61, 0.4)',
      'rgba(255, 212, 59, 0.3)',
    ];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return <div ref={containerRef} className="particles absolute inset-0 overflow-hidden" />;
}
