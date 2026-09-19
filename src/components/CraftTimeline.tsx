import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CRAFT_STEPS } from '../data/mockData';
import { useAtelier } from '../context/AtelierContext';
import { Sparkles, Clock } from 'lucide-react';

export const CraftTimeline: React.FC = () => {
  const { theme, playSfx } = useAtelier();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = CRAFT_STEPS[activeStepIndex];

  return (
    <section className={`py-28 sm:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 select-none ${
      theme === 'midnight' ? 'bg-[#141110]' : 'bg-[#F2EFE8]'
    }`}>
      <div className="max-w-[1720px] mx-auto">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-3 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 / CRAFTSMANSHIP DISCLOSURE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight mb-4">
            THE HAND BEHIND THE BEAUTY.
          </h2>
          <p className="text-xs sm:text-sm opacity-70 font-sans leading-relaxed">
            We document every transformation from virgin mulberry filament to final ceremonial drape. No industrial shortcuts, no synthetic bonding.
          </p>
        </div>

        {/* Step Navigation Pill Strip */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-12 border-b border-current/15 scrollbar-none">
          {CRAFT_STEPS.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => {
                setActiveStepIndex(idx);
                playSfx('needle');
              }}
              className={`px-4 sm:px-6 py-3 text-left transition-all duration-300 whitespace-nowrap cursor-pointer ${
                idx === activeStepIndex
                  ? 'bg-[#C5A880] text-[#0F0D0C] font-semibold shadow-md'
                  : 'border border-current/10 hover:border-current/30 text-current/70'
              }`}
              data-cursor={`STEP ${step.step}`}
            >
              <span className="block text-[9px] tracking-[0.25em] font-mono opacity-80">
                PHASE {step.step}
              </span>
              <span className="text-xs sm:text-sm tracking-[0.05em] uppercase font-serif">
                {step.title.replace('THE ', '')}
              </span>
            </button>
          ))}
        </div>

        {/* Cinematic Step Dual-Column Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Canvas */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black/10 border border-current/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentStep.step}
                  src={currentStep.image}
                  alt={currentStep.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
            </div>

            {/* Micro Badge for Duration */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-[#0F0D0C]/80 backdrop-blur-md text-[#FBF9F5] text-[9px] tracking-[0.2em] font-mono uppercase flex items-center gap-2 border border-white/10">
              <Clock className="w-3 h-3 text-[#C5A880]" />
              <span>DURATION: {currentStep.timeframe}</span>
            </div>
          </div>

          {/* Narrative & Artisan Voice */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs tracking-[0.3em] font-mono text-[#C5A880] block mb-2">
                STEP {currentStep.step} OF 06
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-2">
                {currentStep.title}
              </h3>
              <p className="text-xs tracking-[0.2em] uppercase opacity-60 font-sans">
                {currentStep.subtitle}
              </p>
            </div>

            <p className="text-sm opacity-80 leading-relaxed font-sans">
              {currentStep.description}
            </p>

            {/* Artisan Quote Box */}
            <div className="p-6 border-l-2 border-[#C5A880] bg-current/5 space-y-2">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#C5A880] font-mono block">
                MASTER ARTISAN VOICE
              </span>
              <p className="font-serif italic text-base sm:text-lg opacity-90">
                “{currentStep.artisanQuote}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
