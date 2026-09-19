import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Eye, Bookmark } from 'lucide-react';
import { COLLECTIONS } from '../data/mockData';
import { useAtelier } from '../context/AtelierContext';
import { CollectionItem } from '../types';

export const SignatureCollections: React.FC = () => {
  const { theme, navigateTo, wishlist, toggleWishlist, playSfx } = useAtelier();
  const [activeItem, setActiveItem] = useState<CollectionItem>(COLLECTIONS[0]);
  const [selectedDrawerItem, setSelectedDrawerItem] = useState<CollectionItem | null>(null);

  return (
    <section className={`py-24 sm:py-32 px-6 sm:px-12 lg:px-16 transition-colors duration-500 select-none ${
      theme === 'midnight' ? 'bg-[#141110]' : 'bg-[#F5F2EB]'
    }`}>
      <div className="max-w-[1720px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880] block mb-2 font-mono">
              02 / CURATED SILHOUETTES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              SIGNATURE ARCHIVES
            </h2>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md font-sans leading-relaxed">
            Each collection is produced in numbered limited editions of seven, tailored exclusively to the bespoke measurements of the wearer.
          </p>
        </div>

        {/* Large Asymmetric Editorial Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Huge Editorial Image Showcase with 3D Tilt & Zoom */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] overflow-hidden bg-black/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.heroImage}
                  alt={activeItem.title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>

              {/* Overlaid Badges */}
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span className="px-3 py-1 bg-[#0F0D0C]/80 backdrop-blur-md text-[#FBF9F5] text-[9px] tracking-[0.25em] uppercase font-mono border border-white/10">
                  LOOK {activeItem.number} / 06
                </span>
                <span className="px-3 py-1 bg-[#C5A880] text-[#0F0D0C] text-[9px] tracking-[0.25em] uppercase font-bold">
                  {activeItem.craft}
                </span>
              </div>

              {/* Quick View Drawer Trigger */}
              <button
                onClick={() => {
                  setSelectedDrawerItem(activeItem);
                  playSfx('click');
                }}
                className="absolute bottom-6 right-6 px-4 py-2 bg-[#0F0D0C]/80 backdrop-blur-md text-[#FBF9F5] text-[9px] tracking-[0.2em] uppercase hover:bg-[#C5A880] hover:text-[#0F0D0C] transition-all flex items-center gap-2 cursor-pointer"
                data-cursor="INSPECT"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT SPECIFICATIONS</span>
              </button>
            </div>

            {/* Asymmetric Quote under image */}
            <p className="font-serif italic text-lg sm:text-xl text-[#C5A880] mt-6 max-w-xl font-light">
              “{activeItem.quote}”
            </p>
          </div>

          {/* Right Column: Editorial Collection Index Selector */}
          <div className="lg:col-span-5 space-y-4">
            {COLLECTIONS.map((col) => {
              const isSelected = col.id === activeItem.id;
              const isSaved = wishlist.includes(col.id);

              return (
                <div
                  key={col.id}
                  onMouseEnter={() => {
                    setActiveItem(col);
                    playSfx('rustle');
                  }}
                  className={`p-6 border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? theme === 'midnight'
                        ? 'bg-[#1C1816] border-[#C5A880]'
                        : 'bg-[#FBF9F5] border-[#C5A880] shadow-md'
                      : 'border-current/10 hover:border-current/30'
                  }`}
                  data-cursor="SELECT"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] tracking-[0.3em] font-mono text-[#C5A880]">
                      COLLECTION {col.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(col.id);
                        }}
                        className="p-1 text-current/60 hover:text-[#C5A880] transition-colors"
                        title={isSaved ? 'Remove from My Atelier' : 'Save to My Atelier'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
                      </button>
                      <span className="text-[9px] tracking-[0.2em] uppercase opacity-50">
                        {col.leadTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-tight mb-1">
                    {col.title}
                  </h3>
                  <p className="text-[11px] tracking-[0.15em] uppercase opacity-75 mb-3 font-sans">
                    {col.subtitle}
                  </p>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-xs opacity-70 leading-relaxed font-sans mb-4">
                        {col.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateTo('/collections');
                            playSfx('click');
                          }}
                          className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#C5A880] hover:underline"
                        >
                          <span>VIEW COLLECTION</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Couture Specification Detail Drawer Modal */}
      <AnimatePresence>
        {selectedDrawerItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedDrawerItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-3xl w-full p-8 sm:p-12 overflow-y-auto max-h-[90vh] shadow-2xl border ${
                theme === 'midnight'
                  ? 'bg-[#1A1614] text-[#FBF9F5] border-[#332C28]'
                  : 'bg-[#FBF9F5] text-[#1A1614] border-[#E6DFD5]'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-current/15 mb-6">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880]">
                  SPECIFICATIONS SHEET — {selectedDrawerItem.number}
                </span>
                <button
                  onClick={() => setSelectedDrawerItem(null)}
                  className="text-xs uppercase tracking-widest text-current/60 hover:text-[#C5A880] cursor-pointer"
                >
                  ✕ CLOSE
                </button>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl mb-2 font-light">
                {selectedDrawerItem.title}
              </h2>
              <p className="text-xs tracking-[0.2em] uppercase text-[#C5A880] mb-6">
                {selectedDrawerItem.silhouette}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {selectedDrawerItem.detailImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Detail specification"
                    className="w-full h-48 object-cover object-center border border-current/10"
                  />
                ))}
              </div>

              <div className="space-y-3 mb-8">
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-mono">
                  ARTISANAL HIGHLIGHTS
                </h4>
                {selectedDrawerItem.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs opacity-80">
                    <span className="text-[#C5A880] mt-1">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-current/15">
                <div className="text-xs">
                  <span className="opacity-60 block text-[9px] uppercase tracking-widest">
                    ATELIER ESTIMATE
                  </span>
                  <span className="font-mono text-sm text-[#C5A880]">
                    Available Upon Consultation ({selectedDrawerItem.leadTime})
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedDrawerItem(null);
                    navigateTo('/book-appointment');
                    playSfx('click');
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#C5A880] text-[#0F0D0C] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#FBF9F5] transition-colors cursor-pointer"
                >
                  REQUEST PRIVATE FITTING
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
