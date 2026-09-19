import React from 'react';
import { motion } from 'framer-motion';
import { useAtelier } from '../context/AtelierContext';

export const Manifesto: React.FC = () => {
  const { navigateTo, playSfx } = useAtelier();

  return (
    <section
      id="manifesto-section"
      className="py-28 sm:py-40 px-6 sm:px-12 lg:px-24 transition-colors duration-500 select-none"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Subtle Numbering */}
        <div className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-12">
          <span>01 / THE MANIFESTO</span>
          <span className="w-12 h-[1px] bg-[#C5A880]/40" />
        </div>

        {/* Large Editorial Typographic Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-10">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] tracking-tight font-light"
            >
              “Some garments are merely worn.
              <br />
              <span className="italic font-normal text-[#C5A880]">
                Ours become part of your memory.
              </span>
              <br />
              Crafted not for an algorithm, but for the sacred anatomy of the woman who inhabits it.”
            </motion.p>
          </div>

          <div className="lg:col-span-2 lg:pt-4 flex flex-col justify-between h-full border-l border-current/15 pl-6">
            <div className="space-y-4 text-[11px] tracking-[0.2em] uppercase opacity-70 font-sans">
              <div>
                <span className="block text-[#C5A880] font-mono">01</span>
                SILK CONSCIOUSNESS
              </div>
              <div>
                <span className="block text-[#C5A880] font-mono">02</span>
                SINGLE-ARTISAN PROVENANCE
              </div>
              <div>
                <span className="block text-[#C5A880] font-mono">03</span>
                DRAVIDIAN ARCHITECTURAL CUT
              </div>
            </div>

            <button
              onClick={() => {
                navigateTo('/atelier');
                playSfx('click');
              }}
              className="mt-8 text-[10px] tracking-[0.25em] uppercase text-[#C5A880] hover:underline cursor-pointer inline-flex items-center gap-1"
              data-cursor="PHILOSOPHY"
            >
              READ PHILOSOPHY →
            </button>
          </div>
        </div>

        {/* Triple Micro Quote Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 pt-12 border-t border-current/10">
          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880] mb-2 font-mono">
              THE WEFT
            </h4>
            <p className="text-xs opacity-75 font-sans leading-relaxed">
              Three-ply pure mulberry silk, warped on slow wooden frames where each beat of the reed is calibrated to the morning humidity.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880] mb-2 font-mono">
              THE AARI
            </h4>
            <p className="text-xs opacity-75 font-sans leading-relaxed">
              Tambour micro-needle embroidery executed without stencils, relying on generational spatial intuition and antique kardana beads.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880] mb-2 font-mono">
              THE POSTURE
            </h4>
            <p className="text-xs opacity-75 font-sans leading-relaxed">
              Internal Japanese silk linings and contoured weight-distribution corsetry that eliminate physical strain through long ceremonies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
