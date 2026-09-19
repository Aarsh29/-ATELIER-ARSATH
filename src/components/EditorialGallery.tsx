import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtelier } from '../context/AtelierContext';
import { Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const EditorialGallery: React.FC = () => {
  const { theme, playSfx, setCursorText } = useAtelier();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
      caption: 'The Kaveri Sunrise Muhurtham drape with antique temple border',
      category: 'BRIDAL',
      span: 'md:col-span-8',
      height: 'h-[480px]'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
      caption: 'Dravidian Gilded Pillars Aari needlework back silhouette',
      category: 'BLOUSE',
      span: 'md:col-span-4',
      height: 'h-[480px]'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
      caption: 'Pure mulberry raw silk weave under morning sunlight',
      category: 'SAREE',
      span: 'md:col-span-4',
      height: 'h-[420px]'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200&auto=format&fit=crop',
      caption: 'Nocturne midnight draped trail with iridescent micro-crystals',
      category: 'RECEPTION',
      span: 'md:col-span-8',
      height: 'h-[420px]'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop',
      caption: 'Micro-kardana tambours on midnight velvet foundation',
      category: 'AARI',
      span: 'md:col-span-6',
      height: 'h-[460px]'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      caption: 'Crimson Vermilion woven pallu draped with heirloom temple gold',
      category: 'BRIDAL',
      span: 'md:col-span-6',
      height: 'h-[460px]'
    }
  ];

  const filteredItems = activeCategory === 'ALL'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 select-none">
      <div className="max-w-[1720px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-current/15 mb-16">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>08 / ASYMMETRIC MASONRY</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight">
              CURATED GALLERY.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['ALL', 'BRIDAL', 'BLOUSE', 'SAREE', 'RECEPTION', 'AARI'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  playSfx('click');
                }}
                className={`px-4 py-2 text-[9px] tracking-[0.2em] font-mono uppercase transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#C5A880] text-[#0F0D0C] font-bold'
                    : 'border border-current/15 hover:border-current/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`${item.span} relative group overflow-hidden bg-black/10 cursor-pointer`}
              onClick={() => {
                setLightboxIndex(index);
                playSfx('rustle');
              }}
              onMouseEnter={() => setCursorText('OPEN')}
              onMouseLeave={() => setCursorText('')}
            >
              <div className={`w-full ${item.height} overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Hover Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-[#FBF9F5]">
                <span className="text-[9px] tracking-[0.3em] font-mono text-[#C5A880] block mb-1">
                  {item.category} • LOOK {index + 1}
                </span>
                <p className="font-serif text-sm leading-snug">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Experience */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-12 text-[#FBF9F5]"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
                playSfx('click');
              }}
              className="absolute left-6 p-4 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Stage Image & Caption */}
            <div
              className="max-w-4xl max-h-[85vh] flex flex-col items-center text-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].caption}
                className="max-h-[68vh] object-contain shadow-2xl border border-white/10 mb-4"
              />
              <span className="text-[9px] tracking-[0.3em] font-mono text-[#C5A880] uppercase mb-1">
                {filteredItems[lightboxIndex].category} ARCHIVE EXHIBIT
              </span>
              <p className="font-serif text-lg sm:text-xl font-light max-w-xl">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>

            {/* Right Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
                playSfx('click');
              }}
              className="absolute right-6 p-4 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
