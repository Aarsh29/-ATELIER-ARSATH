import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { COLLECTIONS } from '../data/mockData';
import { useAtelier } from '../context/AtelierContext';

export const Carousel3D: React.FC = () => {
  const { theme, navigateTo, playSfx, setCursorText } = useAtelier();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % COLLECTIONS.length);
    playSfx('rustle');
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + COLLECTIONS.length) % COLLECTIONS.length);
    playSfx('rustle');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      className="py-28 sm:py-36 px-6 sm:px-12 overflow-hidden select-none transition-colors duration-500"
      onMouseEnter={() => setCursorText('DRAG')}
      onMouseLeave={() => setCursorText('')}
    >
      <div className="max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-current/15">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-2 font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>03 / SPATIAL LOOKBOOK</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight">
              3D PERSPECTIVE CAROUSEL
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="p-3 border border-current/20 rounded-full hover:border-[#C5A880] hover:text-[#C5A880] transition-colors cursor-pointer"
              title="Previous Look"
              data-cursor="PREV"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] tracking-[0.25em] font-mono text-[#C5A880]">
              {(activeIndex + 1).toString().padStart(2, '0')} / {COLLECTIONS.length.toString().padStart(2, '0')}
            </span>
            <button
              onClick={nextSlide}
              className="p-3 border border-current/20 rounded-full hover:border-[#C5A880] hover:text-[#C5A880] transition-colors cursor-pointer"
              title="Next Look"
              data-cursor="NEXT"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Perspective Stage */}
        <div
          ref={containerRef}
          className="relative h-[480px] sm:h-[620px] flex items-center justify-center [perspective:1400px]"
        >
          {COLLECTIONS.map((item, index) => {
            let offset = index - activeIndex;
            if (offset > COLLECTIONS.length / 2) offset -= COLLECTIONS.length;
            if (offset < -COLLECTIONS.length / 2) offset += COLLECTIONS.length;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            const xOffset = offset * 260;
            const zOffset = -Math.abs(offset) * 180;
            const rotateY = offset * -18;
            const scale = 1 - Math.abs(offset) * 0.14;
            const opacity = 1 - Math.abs(offset) * 0.45;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(index);
                    playSfx('rustle');
                  } else {
                    navigateTo('/collections');
                    playSfx('click');
                  }
                }}
                className="absolute w-[280px] sm:w-[380px] h-[400px] sm:h-[540px] cursor-pointer shadow-2xl transition-shadow"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-full h-full overflow-hidden bg-black/20 group">
                  <img
                    src={item.heroImage}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                  )}

                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-[#FBF9F5]"
                    >
                      <span className="text-[9px] tracking-[0.3em] uppercase text-[#C5A880] block mb-1 font-mono">
                        {item.craft}
                      </span>
                      <h3 className="font-serif text-2xl font-light tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[10px] tracking-[0.2em] uppercase opacity-75">
                        CLICK TO ENTER ARCHIVE →
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tactile Hint */}
        <div className="text-center mt-8 text-[9px] tracking-[0.3em] uppercase opacity-50 font-mono">
          DRAG OR USE ARROW KEYS TO EXPLORE THE SILK ROTATION
        </div>
      </div>
    </section>
  );
};
