import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Plus, Orbit } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';
import { FluidCanvas } from './FluidCanvas';
import { CoutureSculpture3D } from './CoutureSculpture3D';

export const Hero: React.FC = () => {
  const { navigateTo, playSfx } = useAtelier();

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-20 pb-0 overflow-hidden select-none bg-[#0A0908]">
      {/* 1. Interactive WebGL Fluid Canvas (meermohsin.me #fluid2) */}
      <FluidCanvas className="z-0 opacity-80" />

      {/* Top Meta Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-30 flex items-center justify-between text-[#E6DFD5] text-[10px] tracking-[0.35em] uppercase font-sans border-b border-white/10 pb-4 px-6 sm:px-12 lg:px-16 max-w-[1720px] w-full mx-auto"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span>AUTUMN / WINTER 2026 BRIDAL SALON</span>
        </div>

        {/* 3D Interaction Hint Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[8px] tracking-[0.25em] text-[#C5A880]">
          <Orbit className="w-3 h-3 animate-spin" style={{ animationDuration: '10s' }} />
          <span>3D COUTURE SCULPTURE • DRAG TO ROTATE 360°</span>
        </div>

        <div className="hidden sm:block text-[#C5A880]">
          <span>CHENNAI — COUTURE HOUSE NO. 07</span>
        </div>
      </motion.div>

      {/* 2. Giant Typography Marquee Rail (.scrolling-text .rail) */}
      <div className="absolute inset-0 z-10 flex items-center overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          className="flex whitespace-nowrap will-change-transform"
        >
          {[0, 1].map((idx) => (
            <div key={idx} className="flex items-center gap-12 pr-12">
              <h2 className="text-[14vw] lg:text-[16vw] font-serif font-light text-[#FBF9F5]/70 tracking-tight uppercase leading-none drop-shadow-2xl">
                IT WAS ALWAYS GOING TO BE THIS WAY.
              </h2>
              <span className="text-[6vw] text-[#C5A880]/60 font-serif">✦</span>
              <h2 className="text-[14vw] lg:text-[16vw] font-serif font-light text-[#FBF9F5]/70 tracking-tight uppercase leading-none drop-shadow-2xl">
                ATELIER AARSH COUTURE
              </h2>
              <span className="text-[6vw] text-[#C5A880]/60 font-serif">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. Awwwards-Level 3D WebGL Couture Mannequin Sculpture (Layered in front of marquee, behind UI) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto overflow-hidden">
        <div className="w-full max-w-[850px] h-[85vh] relative flex items-center justify-center">
          <CoutureSculpture3D />
        </div>
      </div>

      {/* 4. Top-Left Narrative Intro (.para-introduce-hero) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="relative z-30 max-w-[38ch] px-6 sm:px-12 lg:px-16 pt-6 sm:pt-10 space-y-4 pointer-events-none"
      >
        <span className="inline-block text-[9px] font-mono tracking-[0.35em] text-[#C5A880] uppercase">
          [ ATELIER PHILOSOPHY ]
        </span>
        <p className="font-sans font-light text-sm sm:text-[15px] text-[#E6DFD5]/90 leading-relaxed tracking-wide drop-shadow-md">
          I create digital experiences that aren't just seen — they're felt.
          From the first impression to the smallest interaction, I focus on making every experience clear, immersive, and memorable.
        </p>

        {/* Couture CTAs */}
        <div className="flex items-center gap-3 pt-2 pointer-events-auto">
          <button
            onClick={() => {
              navigateTo('/collections');
              playSfx('rustle');
            }}
            className="px-6 py-3 bg-[#FBF9F5] text-[#0A0908] text-[9px] tracking-[0.25em] uppercase font-medium hover:bg-[#C5A880] transition-colors cursor-pointer shadow-xl flex items-center gap-2 group"
            data-cursor="EXPLORE"
          >
            <span>EXPLORE ARCHIVE</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            onClick={() => {
              navigateTo('/book-appointment');
              playSfx('click');
            }}
            className="px-6 py-3 border border-[#C5A880]/50 text-[#FBF9F5] text-[9px] tracking-[0.25em] uppercase font-medium hover:bg-[#C5A880]/20 transition-colors cursor-pointer backdrop-blur-sm"
            data-cursor="BOOK"
          >
            <span>PRIVATE SALON</span>
          </button>
        </div>
      </motion.div>

      {/* 5. Bottom-Right Discipline Stack (.expertise-text) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="relative z-30 self-end px-6 sm:px-12 lg:px-16 pb-8 text-right font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#E6DFD5]/80 uppercase space-y-1.5 pointer-events-none"
      >
        <div className="text-[#C5A880]/60 text-[8px] tracking-[0.4em] mb-1">DISCIPLINES</div>
        <div className="hover:text-[#C5A880] transition-colors cursor-default pointer-events-auto">VISUAL STORYTELLER</div>
        <div className="hover:text-[#C5A880] transition-colors cursor-default pointer-events-auto">PURE KANCHIPURAM SILK</div>
        <div className="hover:text-[#C5A880] transition-colors cursor-default pointer-events-auto">3D COUTURE ARCHITECT</div>
      </motion.div>

      {/* 6. Fixed Brand Ledger Bar with Rotating '+' Icons (.fixed-bar-ledger) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative z-30 w-full border-t border-white/10 bg-[#0A0908]/90 backdrop-blur-md py-3.5 px-6"
      >
        <div className="flex items-center justify-between sm:justify-around max-w-[1720px] mx-auto text-[10px] sm:text-[11px] tracking-[0.35em] text-[#E6DFD5]/80 uppercase font-mono">
          <div className="flex items-center gap-2 group cursor-default">
            <Plus className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-500 group-hover:rotate-90" />
            <span className="group-hover:text-[#C5A880] transition-colors">TENSION</span>
          </div>

          <div className="flex items-center gap-2 group cursor-default">
            <Plus className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-500 group-hover:rotate-90" />
            <span className="group-hover:text-[#C5A880] transition-colors">IMMERSION</span>
          </div>

          <div className="flex items-center gap-2 group cursor-default">
            <Plus className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-500 group-hover:rotate-90" />
            <span className="group-hover:text-[#C5A880] transition-colors">IMPACT</span>
          </div>

          <button
            onClick={() => {
              const nextSec = document.getElementById('manifesto-section');
              nextSec?.scrollIntoView({ behavior: 'smooth' });
              playSfx('click');
            }}
            className="hidden md:flex items-center gap-2 text-[#C5A880] hover:text-white transition-colors cursor-pointer group"
          >
            <span>DISCOVER</span>
            <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

