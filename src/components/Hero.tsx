import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export const Hero: React.FC = () => {
  const { navigateTo, playSfx } = useAtelier();

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 lg:px-16 overflow-hidden select-none">
      {/* Background Architectural Canvas with subtle movement */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Cinematic Backdrop Image with Film Wash */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2200&auto=format&fit=crop"
            alt="Atelier Aarsh Couture Silks"
            className="w-full h-full object-cover object-top opacity-85 brightness-90 contrast-[0.95]"
          />
        </motion.div>

        {/* Tactile Dark Wash Gradient to guarantee editorial text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0C]/90 via-[#0F0D0C]/35 to-[#0F0D0C]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0C]/80 via-transparent to-[#0F0D0C]/40" />
      </div>

      {/* Top Meta Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex items-center justify-between text-[#E6DFD5] text-[10px] tracking-[0.35em] uppercase font-sans border-b border-white/10 pb-4 max-w-[1720px] w-full mx-auto"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span>AUTUMN / WINTER 2026 BRIDAL SALON</span>
        </div>
        <div className="hidden sm:block">
          <span>CHENNAI — COUTURE HOUSE NO. 07</span>
        </div>
      </motion.div>

      {/* Center Cinematic Typography Composition */}
      <div className="max-w-[1720px] w-full mx-auto my-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Title Stack */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1614]/70 border border-[#C5A880]/30 rounded-full text-[#C5A880] text-[9px] tracking-[0.3em] uppercase mb-6"
            >
              <Sparkles className="w-3 h-3" />
              <span>THE COUTURE EXPERIMENT</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#FBF9F5] font-light leading-[0.92]"
              >
                CRAFTED FOR
                <br />
                <span className="italic font-normal text-[#C5A880]">EVERY</span> WOMAN.
              </motion.h1>
            </div>
          </div>

          {/* Right Column: Narrative Callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="lg:col-span-4 space-y-6 lg:pl-8 border-l border-white/10 pb-2"
          >
            <p className="text-[#E6DFD5]/90 text-sm sm:text-base font-sans font-light leading-relaxed tracking-wide">
              We reject the industrial repetition of standard fashion. Every drape is an architectural dialogue between pure Tamil pit-loom mulberry silk and the rhythm of human hands.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => {
                  navigateTo('/collections');
                  playSfx('rustle');
                }}
                className="px-7 py-4 bg-[#FBF9F5] text-[#0F0D0C] text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[#C5A880] transition-colors duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-2xl"
                data-cursor="EXPLORE"
              >
                <span>EXPLORE ARCHIVE</span>
                <span className="text-xs">→</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('/book-appointment');
                  playSfx('click');
                }}
                className="px-7 py-4 border border-[#C5A880]/60 text-[#FBF9F5] text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[#C5A880]/20 transition-colors duration-300 flex items-center justify-center cursor-pointer backdrop-blur-sm"
                data-cursor="BOOK"
              >
                <span>PRIVATE SALON</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Subtle Navigation Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex items-center justify-between text-[#E6DFD5]/70 text-[9px] tracking-[0.3em] uppercase max-w-[1720px] w-full mx-auto pt-4 border-t border-white/10"
      >
        <div className="flex items-center gap-4">
          <span>01 / 07 CHAPTERS</span>
          <span className="hidden md:inline-block opacity-40">•</span>
          <span className="hidden md:inline-block opacity-60">PURE KANCHIPURAM × AARI EMBROIDERY</span>
        </div>

        <button
          onClick={() => {
            const nextSec = document.getElementById('manifesto-section');
            nextSec?.scrollIntoView({ behavior: 'smooth' });
            playSfx('click');
          }}
          className="flex items-center gap-2 hover:text-[#C5A880] transition-colors cursor-pointer group"
          data-cursor="SCROLL"
        >
          <span>SCROLL DOWN</span>
          <ArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};
