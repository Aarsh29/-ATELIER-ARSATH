import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Orbit, Compass } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';
import { HeroScene3D, TextileType } from './HeroScene3D';

const TEXTILES: { id: TextileType; num: string; name: string; subtitle: string; color: string }[] = [
  { id: 'crimson', num: '01', name: 'CRIMSON & 24K ZARI', subtitle: 'Heavy Mulberry Drape', color: '#8B1E2D' },
  { id: 'champagne', num: '02', name: 'CHAMPAGNE TISSUE', subtitle: 'Liquid Metallic Sheen', color: '#D4AF37' },
  { id: 'emerald', num: '03', name: 'EMERALD MATKA', subtitle: 'Raw Loom Texture', color: '#1B4D3E' },
];

export const Hero: React.FC = () => {
  const { navigateTo, playSfx } = useAtelier();
  const [activeTextile, setActiveTextile] = useState<TextileType>('crimson');

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-10 px-6 sm:px-12 lg:px-16 overflow-hidden select-none">
      {/* Interactive 3D WebGL Cloth Canvas (Awwwards 3D Silk Simulation) */}
      <HeroScene3D
        activeTextile={activeTextile}
        onInteract={() => playSfx('rustle')}
      />

      {/* Editorial Vignette & Depth Gradients (Guarantees Typography Contrast) */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-t from-[#0F0D0C] via-[#0F0D0C]/40 to-[#0F0D0C]/70" />
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-r from-[#0F0D0C]/85 via-transparent to-[#0F0D0C]/60" />
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(15,13,12,0.7)_100%)]" />

      {/* Top Meta Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between text-[#E6DFD5] text-[10px] tracking-[0.35em] uppercase font-sans border-b border-white/10 pb-4 max-w-[1720px] w-full mx-auto"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span>AUTUMN / WINTER 2026 BRIDAL SALON</span>
        </div>

        {/* 3D Interaction Prompt Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[9px] tracking-[0.25em] text-[#C5A880]">
          <Orbit className="w-3 h-3 animate-spin" style={{ animationDuration: '10s' }} />
          <span>3D TEXTILE SCULPTURE • DRAG TO ROTATE • HOVER TO RIPPLE</span>
        </div>

        <div className="hidden sm:block text-[#C5A880]">
          <span>CHENNAI — COUTURE HOUSE NO. 07</span>
        </div>
      </motion.div>

      {/* Center Cinematic Typography & Spatial Composition */}
      <div className="relative z-10 max-w-[1720px] w-full mx-auto my-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Title Stack */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1614]/80 backdrop-blur-md border border-[#C5A880]/35 rounded-full text-[#C5A880] text-[9px] tracking-[0.3em] uppercase mb-6"
            >
              <Sparkles className="w-3 h-3" />
              <span>THE COUTURE EXPERIMENT • GENERATIVE SILK</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#FBF9F5] font-light leading-[0.92] drop-shadow-2xl"
              >
                CRAFTED FOR
                <br />
                <span className="italic font-normal text-[#C5A880]">EVERY</span> WOMAN.
              </motion.h1>
            </div>
          </div>

          {/* Right Column: Narrative Callout + Live Textile Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="lg:col-span-4 space-y-6 lg:pl-8 border-l border-white/10 pb-2"
          >
            <p className="text-[#E6DFD5]/90 text-sm sm:text-base font-sans font-light leading-relaxed tracking-wide drop-shadow-sm">
              We reject the industrial repetition of standard fashion. Every drape is an architectural dialogue between pure Tamil pit-loom mulberry silk and the rhythm of human hands.
            </p>

            {/* Interactive 3D Textile Morphing HUD */}
            <div className="pt-2">
              <div className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] mb-2.5 flex items-center gap-1.5 font-medium">
                <Compass className="w-3 h-3 text-[#C5A880]" />
                <span>SELECT WEAVE / 3D MATERIAL</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {TEXTILES.map((t) => {
                  const isSelected = activeTextile === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setActiveTextile(t.id);
                        playSfx('rustle');
                      }}
                      className={`relative group p-2.5 rounded border text-left transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-white/15 border-[#C5A880] shadow-lg shadow-[#C5A880]/10 scale-[1.02]'
                          : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                      data-cursor="TOUCH"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] font-mono tracking-widest text-[#E6DFD5]/60">{t.num}</span>
                        <span
                          className="w-2 h-2 rounded-full border border-white/30 transition-transform group-hover:scale-125"
                          style={{ backgroundColor: t.color }}
                        />
                      </div>
                      <div className="text-[9px] font-sans tracking-[0.15em] text-[#FBF9F5] uppercase font-medium truncate">
                        {t.name.split('&')[0]}
                      </div>
                      <div className="text-[7.5px] tracking-wider text-[#E6DFD5]/50 truncate mt-0.5">
                        {t.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Action Buttons */}
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

      {/* Bottom Status / Navigation Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 flex items-center justify-between text-[#E6DFD5]/70 text-[9px] tracking-[0.3em] uppercase max-w-[1720px] w-full mx-auto pt-4 border-t border-white/10"
      >
        <div className="flex items-center gap-4">
          <span>01 / 07 CHAPTERS</span>
          <span className="hidden md:inline-block opacity-40">•</span>
          <span className="hidden md:inline-block text-[#C5A880]">KANCHIPURAM WEAVE SIMULATOR (60 FPS)</span>
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

