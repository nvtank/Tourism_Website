'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function FloatingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = Array.from({ length: 15 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 backdrop-blur-sm';
      
      // Random size and position
      const size = gsap.utils.random(5, 15);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${gsap.utils.random(0, 100)}%`;
      particle.style.top = `${gsap.utils.random(0, 100)}%`;
      
      containerRef.current?.appendChild(particle);
      return particle;
    });

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
}