import React, { useEffect } from 'react';

export const CursorEffect: React.FC = () => {
  useEffect(() => {
    let lastSpawnTime = 0;
    const throttleMs = 100; // Spawn less often

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSpawnTime < throttleMs) return;
      
      // Additional random check so it looks more organic (spawn even less)
      if (Math.random() > 0.15) return;
      
      lastSpawnTime = now;

      const bubble = document.createElement('div');
      bubble.className = 'pointer-events-none fixed w-1.5 h-1.5 bg-gradient-to-tr from-[#a3e635] to-[#4ade80] rounded-full z-50 mix-blend-screen animate-cursor-bubble shadow-[0_0_8px_#a3e635] opacity-60';
      bubble.style.left = `${e.clientX - 6}px`; // Center bubble on cursor
      bubble.style.top = `${e.clientY - 6}px`;
      
      document.body.appendChild(bubble);
      
      setTimeout(() => {
        bubble.remove();
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return null;
};
