import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FABRICS } from '../data/mockData';
import { useAtelier } from '../context/AtelierContext';
import { ZoomIn, Bookmark, Layers } from 'lucide-react';
import { FabricItem } from '../types';

export const FabricLibrary: React.FC = () => {
  const { theme, wishlist, toggleWishlist, playSfx } = useAtelier();
  const [selectedFabric, setSelectedFabric] = useState<FabricItem>(FABRICS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  return (
    <section className={`py-28 sm:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 select-none ${
      theme === 'midnight' ? 'bg-[#0F0D0C]' : 'bg-[#FBF9F5]'
    }`}>
      <div className="max-w-[1720px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-2 font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>05 / TACTILE ARCHIVE</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              THE MATERIALITY ENGINE
            </h2>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md font-sans leading-relaxed">
            Touch textile through the screen. Hover or zoom to inspect warp density, zari purity, and weave grain structure.
          </p>
        </div>

        {/* Fabric Engine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Swatches Navigation */}
          <div className="lg:col-span-5 space-y-3">
            {FABRICS.map((fabric) => {
              const isSelected = fabric.id === selectedFabric.id;
              const isSaved = wishlist.includes(fabric.id);

              return (
                <div
                  key={fabric.id}
                  onClick={() => {
                    setSelectedFabric(fabric);
                    setZoomLevel(1);
                    playSfx('rustle');
                  }}
                  className={`p-5 border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#C5A880]/10 shadow-sm'
                      : 'border-current/10 hover:border-current/30'
                  }`}
                  data-cursor="TOUCH"
                >
                  <div className="flex items-center gap-4">
                    {/* Small Swatch Preview */}
                    <div className="w-12 h-12 rounded-sm overflow-hidden border border-current/20 flex-shrink-0">
                      <img
                        src={fabric.textureImage}
                        alt={fabric.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-light tracking-wide">
                        {fabric.name}
                      </h4>
                      <p className="text-[10px] tracking-[0.15em] opacity-60 uppercase font-sans">
                        {fabric.origin}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(fabric.id);
                      }}
                      className="p-1 text-current/60 hover:text-[#C5A880] transition-colors"
                      title={isSaved ? 'Remove from My Atelier' : 'Save to My Atelier'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
                    </button>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-mono px-2 py-0.5 bg-current/5 border border-current/10">
                      {fabric.drapeWeight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Large Interactive Tactile Texture Stage */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden border border-current/15 bg-black/10 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFabric.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full cursor-zoom-in"
                  onClick={() => {
                    setZoomLevel(prev => (prev === 1 ? 2.2 : 1));
                    playSfx('click');
                  }}
                >
                  <img
                    src={selectedFabric.textureImage}
                    alt={selectedFabric.name}
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'center center',
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 select-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Magnifier / Interaction Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => {
                    setZoomLevel(prev => (prev === 1 ? 2.2 : 1));
                    playSfx('click');
                  }}
                  className="px-3 py-1.5 bg-[#0F0D0C]/80 backdrop-blur-md text-[#FBF9F5] text-[9px] tracking-[0.2em] font-mono flex items-center gap-1.5 border border-white/15 cursor-pointer"
                  data-cursor="MAGNIFY"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{zoomLevel > 1 ? 'RESET 1X' : 'INSPECT FIBER 2.2X'}</span>
                </button>
              </div>

              {/* Bottom Metadata Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#0F0D0C]/90 via-[#0F0D0C]/60 to-transparent text-[#FBF9F5]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#C5A880] font-mono block mb-1">
                      {selectedFabric.composition}
                    </span>
                    <h3 className="font-serif text-2xl font-light tracking-tight">
                      {selectedFabric.name}
                    </h3>
                    <p className="text-xs opacity-80 font-sans max-w-md mt-1">
                      {selectedFabric.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A880] block font-mono">
                      DRAPE WEIGHT
                    </span>
                    <span className="text-xs font-mono">
                      {selectedFabric.drapeWeight}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
