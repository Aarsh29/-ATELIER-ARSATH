import React, { useState } from 'react';
import { useAtelier } from '../context/AtelierContext';
import { MapPin, Navigation, Clock } from 'lucide-react';

export const BoutiqueExperience: React.FC = () => {
  const { theme, navigateTo, playSfx } = useAtelier();
  const [activeRoom, setActiveRoom] = useState<'salon' | 'fitting' | 'archive' | 'entry'>('salon');

  const rooms = {
    salon: {
      name: 'THE PRIVATE COUTURE SALON',
      description: 'Teakwood consultations facing the morning sunlight. Filtered jasmine tea served while reviewing custom silk warp drapes.',
      capacity: 'Private suite reserved for 1 bride & family at a time',
      coordinates: 'Suite A, North Pavilion'
    },
    fitting: {
      name: 'THE TRIPLE-MIRROR TOILE CHAMBER',
      description: '360-degree calibrated warm temperature illumination recreating temple mandapam and evening reception lighting conditions.',
      capacity: 'Precision fitting & corsetry contouring',
      coordinates: 'Suite B, East Wing'
    },
    archive: {
      name: 'THE TEXTILE VAULT & LOOM SAMPLES',
      description: 'Temperature-controlled cedarwood drawers housing our 24k silver-gilt Kanchipuram loom strikes dating from 1948.',
      capacity: 'Open to brides with bespoke orders',
      coordinates: 'The Vault, Central Core'
    },
    entry: {
      name: 'THE WATER COURTYARD & ATRIUM',
      description: 'Traditional Tamil stone courtyard with floating lotus petals and natural granite threshold to leave the rush of the city behind.',
      capacity: 'Arrival & Welcome Reception',
      coordinates: 'Ground Level Court'
    }
  };

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 select-none">
      <div className="max-w-[1720px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-2 font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>10 / ARCHITECTURAL SANCTUARY</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              THE CHENNAI BOUTIQUE.
            </h2>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md font-sans leading-relaxed">
            Not a retail storefront with cash registers. An intimate architectural sanctuary designed to make every bride feel calm, heard, and celebrated.
          </p>
        </div>

        {/* Blueprint Layout & Interactive Salon Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive Architectural Map Graphic */}
          <div className="lg:col-span-7 p-8 sm:p-12 border border-current/15 bg-current/5 relative">
            <div className="flex justify-between items-center pb-4 border-b border-current/15 mb-8">
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#C5A880] uppercase">
                ARCHITECTURAL SCHEMATIC — PLAN LEVEL 01
              </span>
              <span className="text-[10px] font-mono opacity-50">SCALE 1:50</span>
            </div>

            {/* Spatial Layout Blueprint Blocks */}
            <div className="grid grid-cols-2 gap-4 h-[320px]">
              {(['entry', 'salon', 'archive', 'fitting'] as const).map((rKey) => {
                const room = rooms[rKey];
                const isSelected = activeRoom === rKey;
                return (
                  <button
                    key={rKey}
                    onClick={() => {
                      setActiveRoom(rKey);
                      playSfx('click');
                    }}
                    className={`p-6 border transition-all text-left flex flex-col justify-between cursor-pointer ${
                      isSelected ? 'border-[#C5A880] bg-[#C5A880]/15' : 'border-current/15 hover:border-current/30'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-[#C5A880] block mb-1">
                        {room.coordinates}
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl font-light">
                        {room.name}
                      </h4>
                    </div>
                    <span className="text-[9px] tracking-widest uppercase opacity-60 font-mono">
                      {isSelected ? '● CURRENTLY VIEWING' : 'CLICK TO ENTER'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Room Dossier & Appointment Prompt */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#C5A880] uppercase block">
              CHAMBER DOSSIER
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light">
              {rooms[activeRoom].name}
            </h3>
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              {rooms[activeRoom].description}
            </p>

            <div className="p-4 border-l-2 border-[#C5A880] bg-current/5 text-xs opacity-75">
              <span className="font-mono text-[#C5A880] block text-[9px] tracking-widest uppercase mb-1">
                ACCESS PROTOCOL
              </span>
              {rooms[activeRoom].capacity}
            </div>

            <div className="pt-6 border-t border-current/10 space-y-3 text-xs opacity-75 font-sans">
              <div className="flex items-center gap-3">
                <Navigation className="w-4 h-4 text-[#C5A880]" />
                <span>14 Kaveri Residency, Raja Annamalaipuram, Chennai, TN 600028</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C5A880]" />
                <span>Tuesday – Sunday: 10:30 AM – 7:30 PM (Mondays Closed for Loom Visits)</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigateTo('/book-appointment');
                playSfx('click');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer"
            >
              REQUEST SALON ACCESS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
