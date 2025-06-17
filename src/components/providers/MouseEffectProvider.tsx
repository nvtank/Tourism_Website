'use client';

import { useMouseEffect } from '@/hooks/useMouseEffect';

export function MouseEffectProvider({ children }: { children: React.ReactNode }) {
  useMouseEffect();

  return (
    <>
      <div className="mouse-follower fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-white/50 mix-blend-difference" />
      <div className="mouse-dot fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-white" />
      {children}
    </>
  );
} 