'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export function useMouseEffect() {
  useEffect(() => {
    const follower = document.querySelector('.mouse-follower') as HTMLElement;
    const dot = document.querySelector('.mouse-dot') as HTMLElement;
    
    if (!follower || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const updatePosition = () => {
      const dx = mouseX - posX;
      const dy = mouseY - posY;
      
      posX += dx * 0.1;
      posY += dy * 0.1;
      
      gsap.set(follower, { x: posX, y: posY });
      gsap.set(dot, { x: mouseX, y: mouseY });
      
      requestAnimationFrame(updatePosition);
    };

    updatePosition();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Scale effect on interactive elements
      const target = e.target as HTMLElement;
      if (target?.closest('button, a, input, .interactive')) {
        gsap.to(follower, { scale: 3, opacity: 0.1, duration: 0.3 });
      } else {
        gsap.to(follower, { scale: 1, opacity: 0.5, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
} 