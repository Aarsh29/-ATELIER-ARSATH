import React from 'react';
import { useAtelier } from '../context/AtelierContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AtelierPage: React.FC = () => {
  const { theme, navigateTo, playSfx } = useAtelier();

  return (
    <div className={`pt-32 pb-24 px-6 sm:px-12 lg:px-16 min-h-screen transition-colors duration-500 select-none ${
      theme === 'midnight' ? 'bg-[#0F0D0C] text-[#FBF9F5]' : 'bg-[#FBF9F5] text-[#1A1614]'
   }}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880] block mb-2 font-mono">
            THE HOUSE MANIFESTO
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-light tracking-tight mb-8">
            THE ARCHITECTURE OF COUTURE.
          </h1>
          <p className="font-serif italic text-2xl sm:text-3xl max-w-3xl opacity-90 leading-relaxed text-[#C5A880]">
            “We do not sew clothing. We construct ancestral armor disguised as silk.”
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="aspect-[4/3] overflow-hidden bg-black/10 border border-current/15">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
              alt="Atelier Aarsh Pattern Drafting"
              className="w-full h-full object-cover"/>
          </div>
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#C5A880] uppercase block">
              FOUNDING TENET
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light">
              THE REJECTION OF MASS PRODUCTION
            </h2>
            <p className="text-sm opacity-80 font-sans leading-relaxed">
              Atelier Aarsh was founded in Chennai with a singular purpose: to rescue classical South Indian textiles from industrial compromises. When a commercial mill weaves a saree in 40 minutes, the spirit of the warp is extinguished. Our pit-looms take three weeks to weave a single length of pure mulberry silk.
            </p>
            <p className="text-sm opacity-80 font-sans leading-relaxed">
              Every garment is created for one woman only. We reject standard S/M/L sizing in favor of 28 precise bodily measurements, accounting for how she walks, bows during rituals, and dances at night.
            </p>
          </div>
        </div>

        <div className="p-12 sm:p-16 border border-[#C5A880]/40 bg-current/5 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-3xl font-light">
              EXPERIENCE THE ATELIER IN PERSON
            </h3>
            <p className="text-xs opacity-75 mt-1 font-sans">
              Our salon in Raja Annamalaipuram, Chennai welcomes visits by advance reservation.
            </p>
          </div>
          <button
            onClick={() => {
              navigateTo('/book-appointment');
              playSfx('click');
            }}
            className="px-8 py-4 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer whitespace-nowrap">
            REQUEST PRIVATE APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
};
