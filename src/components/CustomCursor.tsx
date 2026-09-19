import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAtelier } from '../context/AtelierContext';

export const CustomCursor: React.FC = () => {
  const { cursorText } = useAtelier();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, textarea, select, [data-cursor]');
        setIsPointer(!!clickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMouse, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Precision Core Point */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C5A880] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate={{ x: mousePosition.x, y: mousePosition.y, scale: cursorText ? 0 : isPointer ? 1.5 : 1, }}"
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Trailing Aura Ring / Context Label Badge */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none animate={{ x: mousePosition.x, y: mousePosition.y, width: cursorText ? 'auto' : isPointer ? 44 : 28, height: cursorText ? 28 : isPointer ? 44 : 28, backgroundColor: cursorText ? '#1A1614' : isPointer ? 'rgba(197, 168, 128, 0.08)' : 'transparent', }}"
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {cursorText && (
          <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-medium text-[#FBF9F5] px-3 py-1 bg-[#1A1614] border border-[#C5A880]/40 rounded-full whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
