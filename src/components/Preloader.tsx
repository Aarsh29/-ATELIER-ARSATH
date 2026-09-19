import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }
        // Organic easing speed
        const increment = Math.max(1, Math.floor((105 - prev) * 0.12));
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0F0D0C] text-[#FBF9F5] select-none exit={{ y: '-100%', transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}"
    >
      <div className="flex flex-col items-center text-center px-6 max-w-lg">
        {/* Subtle top atelier mark */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-8 font-sans">
          Haute Couture — Chennai / Paris
        </motion.div>

        {/* Master Brand Wordmark */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.15em] font-light text-[#FBF9F5]">
            ATELIER AARSH
          </motion.h1>
        </div>

        {/* Brand Philosophy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#C5A880]/90 font-sans font-light mb-12">
          CRAFT / FORM / MOTION
        </motion.p>

        {/* Hairline Progress Bar */}
        <div className="w-48 sm:w-64 h-[1px] bg-[#332C28] relative overflow-hidden mb-4">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#C5A880]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        {/* Counter & Metier indicator */}
        <div className="flex items-center justify-between w-48 sm:w-64 text-[10px] tracking-[0.25em] text-[#8C7A6B] font-mono">
          <span>INITIALIZING ATELIER</span>
          <span>{progress.toString().padStart(3, '0')}%</span>
        </div>
      </div>
    </motion.div>
  );
};
